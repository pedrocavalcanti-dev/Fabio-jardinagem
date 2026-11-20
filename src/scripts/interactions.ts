/**
 * Interações essenciais da landing page (JS mínimo, acessível e sem dependências externas).
 */

interface LightboxItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  src: string;
  alt: string;
}

function syncOverlayState(): void {
  document.body.classList.toggle(
    'has-overlay-open',
    Boolean(document.querySelector('dialog[open]')),
  );
}

function initHeaderScroll(): void {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  if (!header) return;

  const update = () => {
    header.dataset.scrolled = window.scrollY > 24 ? 'true' : 'false';
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initMobileMenu(): void {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const drawer = document.querySelector<HTMLDialogElement>('[data-mobile-nav]');
  if (!toggle || !drawer) return;

  toggle.addEventListener('click', () => {
    drawer.showModal();
    toggle.setAttribute('aria-expanded', 'true');
    syncOverlayState();
  });

  drawer.addEventListener('close', () => {
    toggle.setAttribute('aria-expanded', 'false');
    syncOverlayState();
  });

  drawer.querySelectorAll('[data-menu-close]').forEach((control) => {
    control.addEventListener('click', () => drawer.close());
  });

  drawer.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.close();
      const section = document.getElementById(link.hash.slice(1));
      if (section) {
        section.tabIndex = -1;
        section.focus({ preventScroll: true });
      }
    });
  });

  window.matchMedia('(min-width: 1024px)').addEventListener('change', (event) => {
    if (event.matches && drawer.open) drawer.close();
  });
}

function initFloatingActions(): void {
  const bar = document.querySelector<HTMLElement>('[data-mobile-cta-bar]');
  const desktopFloat = document.querySelector<HTMLElement>('[data-desktop-wa-float]');
  const floatButton = desktopFloat?.querySelector<HTMLElement>('.desktop-whatsapp-float__fab');
  const heroButton = document.querySelector<HTMLElement>('[data-hero-cta] .btn');
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const viewport = window.visualViewport;
  const controls = Array.from(document.querySelectorAll<HTMLElement>(
    'main a[href], main button, footer a[href], footer button',
  )).filter((control) => !control.closest('dialog'));
  let frame = 0;

  const update = () => {
    frame = 0;
    const headerBottom = header?.getBoundingClientRect().bottom ?? 0;
    const hero = heroButton?.getBoundingClientRect();
    const heroAvailable = hero && hero.top >= headerBottom && hero.bottom <= window.innerHeight;
    const keyboardOpen = viewport && viewport.scale === 1 &&
      window.innerHeight - viewport.height > 150 &&
      document.activeElement?.matches('input, textarea, [contenteditable="true"]');

    const barVisible = String(!heroAvailable && !keyboardOpen);
    if (bar && bar.dataset.visible !== barVisible) bar.dataset.visible = barVisible;
    if (!desktopFloat || !floatButton || !desktop.matches) return;

    const floatVisible = String(!heroAvailable);
    if (desktopFloat.dataset.visible !== floatVisible) desktopFloat.dataset.visible = floatVisible;
    if (heroAvailable) return;

    const { left, right, height } = floatButton.getBoundingClientRect();
    const inset = Number.parseFloat(getComputedStyle(desktopFloat).bottom);
    const dockBottom = document.documentElement.clientHeight - inset;
    const clearance = 8;
    let bottom = dockBottom;

    // Move o botão apenas quando sua posição cobriria um controle da página.
    const nearby = controls.map((control) => control.getBoundingClientRect())
      .filter((rect) => rect.height > 0 && rect.width > 0 && rect.left < right &&
        rect.right > left && rect.top < dockBottom + clearance && rect.bottom > headerBottom)
      .sort((a, b) => b.bottom - a.bottom);

    for (const rect of nearby) {
      if (rect.top < bottom + clearance && rect.bottom > bottom - height - clearance) {
        bottom = rect.top - clearance;
      }
    }

    const minBottom = headerBottom + height + clearance;
    const lift = Math.max(0, dockBottom - Math.max(bottom, minBottom));
    desktopFloat.style.setProperty('--whatsapp-lift', `${lift}px`);
  };

  const scheduleUpdate = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true, capture: true });
  window.addEventListener('resize', scheduleUpdate);
  viewport?.addEventListener('resize', scheduleUpdate);
  new ResizeObserver(scheduleUpdate).observe(document.body);
  document.fonts.ready.then(scheduleUpdate);
  update();
}

function initCarousels(): void {
  document.querySelectorAll<HTMLElement>('[data-carousel-track]').forEach((track) => {
    const key = track.dataset.carouselTrack;
    const prev = document.querySelector<HTMLButtonElement>(`[data-carousel-prev="${key}"]`);
    const next = document.querySelector<HTMLButtonElement>(`[data-carousel-next="${key}"]`);
    const dotsWrap = document.querySelector<HTMLElement>(`[data-carousel-dots="${key}"]`);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let positions = [0];
    let dots: HTMLSpanElement[] = [];

    const currentIndex = () => positions.reduce(
      (closest, position, index) =>
        Math.abs(position - track.scrollLeft) < Math.abs(positions[closest] - track.scrollLeft)
          ? index
          : closest,
      0,
    );

    const sync = () => {
      const active = currentIndex();
      if (prev) prev.disabled = track.scrollLeft <= 2;
      if (next) next.disabled = track.scrollLeft >= positions[positions.length - 1] - 2;
      dots.forEach((dot, index) => dot.classList.toggle('is-active', index === active));
    };

    const measure = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
      const left = track.getBoundingClientRect().left;
      positions = [0];
      for (const card of track.children) {
        if (!(card instanceof HTMLElement) || card.hidden) continue;
        const offset = card.getBoundingClientRect().left - left + track.scrollLeft;
        const position = Math.min(Math.round(offset), maxScroll);
        if (position > positions[positions.length - 1] + 2) positions.push(position);
      }

      if (dotsWrap && dots.length !== (positions.length > 1 ? positions.length : 0)) {
        dots = positions.length > 1 ? positions.map(() => {
          const dot = document.createElement('span');
          dot.className = 'carousel-dots__item';
          return dot;
        }) : [];
        dotsWrap.replaceChildren(...dots);
      }
      sync();
    };

    const goTo = (index: number) => {
      const position = positions[Math.min(Math.max(0, index), positions.length - 1)];
      track.scrollTo({ left: position, behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    };

    prev?.addEventListener('click', () => goTo(currentIndex() - 1));
    next?.addEventListener('click', () => goTo(currentIndex() + 1));
    track.addEventListener('keydown', (event) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const index = currentIndex();
      const destinations: Record<string, number> = {
        ArrowLeft: index - 1,
        ArrowRight: index + 1,
        Home: 0,
        End: positions.length - 1,
      };
      const destination = destinations[event.key];
      if (typeof destination !== 'number') return;
      event.preventDefault();
      goTo(destination);
    });

    track.addEventListener('scroll', sync, { passive: true });
    track.addEventListener('gallery-filter-change', measure);
    new ResizeObserver(measure).observe(track);
    measure();
  });
}

function initGalleryFilters(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-gallery-filter]');
  const items = document.querySelectorAll<HTMLElement>('[data-gallery-item]');
  if (buttons.length === 0 || items.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.galleryFilter || 'Todos';

      buttons.forEach((other) => {
        const active = other === btn;
        other.setAttribute('aria-pressed', String(active));
      });

      items.forEach((item) => {
        const matches = selected === 'Todos' || item.dataset.category === selected;
        item.hidden = !matches;
      });
      const track = items[0].parentElement;
      track?.scrollTo({ left: 0, behavior: 'instant' });
      track?.dispatchEvent(new Event('gallery-filter-change'));
    });
  });
}

function initLightbox(): void {
  const modal = document.querySelector<HTMLDialogElement>('[data-lightbox]');
  const data = document.getElementById('portfolio-lightbox-data')?.textContent;
  if (!modal || !data) return;

  const items: LightboxItem[] = JSON.parse(data);
  const img = modal.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const category = modal.querySelector<HTMLElement>('[data-lightbox-category]');
  const title = modal.querySelector<HTMLElement>('[data-lightbox-title]');
  const description = modal.querySelector<HTMLElement>('[data-lightbox-desc]');
  const counter = modal.querySelector<HTMLElement>('[data-lightbox-counter]');
  const prev = modal.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const next = modal.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  const triggers = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-lightbox-open]'));
  let visibleItems: LightboxItem[] = [];
  let currentIndex = 0;

  const show = (index: number) => {
    currentIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIndex];
    if (img) {
      img.src = item.src;
      img.alt = item.alt;
    }
    if (category) category.textContent = item.category;
    if (title) title.textContent = item.title;
    if (description) description.textContent = item.caption;
    if (counter) counter.textContent = `${currentIndex + 1} / ${visibleItems.length}`;
    if (prev) prev.hidden = visibleItems.length < 2;
    if (next) next.hidden = visibleItems.length < 2;
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const visibleIds = new Set(triggers.filter((button) => !button.closest('[hidden]'))
        .map((button) => button.dataset.lightboxOpen));
      visibleItems = items.filter((item) => visibleIds.has(item.id));
      const index = visibleItems.findIndex((item) => item.id === trigger.dataset.lightboxOpen);
      if (index < 0) return;
      show(index);
      modal.showModal();
      syncOverlayState();
    });
  });

  prev?.addEventListener('click', () => show(currentIndex - 1));
  next?.addEventListener('click', () => show(currentIndex + 1));
  modal.querySelectorAll('[data-lightbox-close]').forEach((control) => {
    control.addEventListener('click', () => modal.close());
  });
  modal.addEventListener('close', syncOverlayState);
  modal.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(currentIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
}

function initBeforeAfter(): void {
  const sliders = document.querySelectorAll<HTMLElement>('[data-before-after]');
  sliders.forEach((wrapper) => {
    const stage = wrapper.querySelector<HTMLElement>('.before-after__stage');
    const range = wrapper.querySelector<HTMLInputElement>('[data-before-after-range]');
    if (!stage || !range) return;

    range.addEventListener('input', () => {
      stage.style.setProperty('--split', `${range.value}%`);
    });
  });
}

function initFaqAccordion(): void {
  const accordion = document.querySelector<HTMLElement>('[data-faq-accordion]');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll<HTMLElement>('[data-faq-item]'));

  items.forEach((item) => {
    const trigger = item.querySelector<HTMLButtonElement>('[data-faq-trigger]');
    const panel = item.querySelector<HTMLElement>('[data-faq-panel]');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', () => {
      const willOpen = trigger.getAttribute('aria-expanded') !== 'true';

      items.forEach((other) => {
        const otherTrigger = other.querySelector<HTMLButtonElement>('[data-faq-trigger]');
        const otherPanel = other.querySelector<HTMLElement>('[data-faq-panel]');
        if (!otherTrigger || !otherPanel) return;

        const open = other === item && willOpen;
        other.classList.toggle('is-open', open);
        otherTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
        otherPanel.hidden = !open;
      });
    });
  });
}

function initWhatsAppFallback(): void {
  const modal = document.querySelector<HTMLDialogElement>('#whatsapp-fallback-modal');
  if (!modal) return;

  const messageEl = modal.querySelector<HTMLElement>('[data-wa-modal-message]');
  const copyBtn = modal.querySelector<HTMLButtonElement>('[data-wa-copy-message]');
  const copyIcon = modal.querySelector<HTMLElement>('[data-copy-icon]');
  const copiedIcon = modal.querySelector<HTMLElement>('[data-copied-icon]');
  const copyLabel = modal.querySelector<HTMLElement>('[data-copy-label]');
  const closeTargets = modal.querySelectorAll<HTMLElement>('[data-wa-modal-close]');

  let currentMessage = '';

  const resetCopyState = () => {
    if (copyIcon) copyIcon.hidden = false;
    if (copiedIcon) copiedIcon.hidden = true;
    if (copyLabel) copyLabel.textContent = 'Copiar mensagem';
  };

  const openModal = (message: string) => {
    currentMessage = message;
    if (messageEl) messageEl.textContent = message;
    resetCopyState();
    modal.showModal();
    syncOverlayState();
  };

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest<HTMLButtonElement>('[data-whatsapp-fallback]');
    if (!button) return;

    const msg = button.dataset.whatsappMessage || 'Olá, Fábio! Gostaria de solicitar um orçamento.';
    openModal(msg);
  });

  copyBtn?.addEventListener('click', async () => {
    if (!currentMessage) return;
    try {
      await navigator.clipboard.writeText(currentMessage);
      if (copyIcon) copyIcon.hidden = true;
      if (copiedIcon) copiedIcon.hidden = false;
      if (copyLabel) copyLabel.textContent = 'Mensagem copiada';
    } catch {
      if (copyLabel) copyLabel.textContent = 'Selecione e copie acima';
    }
  });

  closeTargets.forEach((el) => {
    el.addEventListener('click', () => modal.close());
  });

  modal.addEventListener('close', syncOverlayState);
}

function initScrollReveal(): void {
  const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (nodes.length === 0) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    nodes.forEach((node) => {
      node.dataset.reveal = 'visible';
    });
    return;
  }

  document.documentElement.classList.add('js-ready');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target as HTMLElement;
        target.dataset.reveal = 'visible';
        obs.unobserve(target);
      });
    },
    { threshold: 0.04, rootMargin: '0px 0px -8px 0px' },
  );

  nodes.forEach((node) => observer.observe(node));
}

function bootstrap(): void {
  initHeaderScroll();
  initMobileMenu();
  initFloatingActions();
  initCarousels();
  initGalleryFilters();
  initLightbox();
  initBeforeAfter();
  initFaqAccordion();
  initWhatsAppFallback();
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap, { once: true });
} else {
  bootstrap();
}
