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
  isPlaceholder: boolean;
  whatsappMessage: string;
  whatsappUrl: string | null;
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
  const toggleBtn = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const drawer = document.querySelector<HTMLElement>('[data-mobile-nav]');
  if (!toggleBtn || !drawer) return;

  const closeTargets = drawer.querySelectorAll<HTMLElement>('[data-menu-close], [data-mobile-nav-link]');
  const closeBtn = drawer.querySelector<HTMLButtonElement>('.mobile-nav__close');

  const openMenu = () => {
    drawer.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('has-overlay-open');
    closeBtn?.focus();
  };

  const closeMenu = (restoreFocus = true) => {
    if (drawer.hidden) return;
    drawer.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('has-overlay-open');
    if (restoreFocus) toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.hidden) {
      openMenu();
    } else {
      closeMenu();
    }
  });

  closeTargets.forEach((el) => {
    el.addEventListener('click', () => {
      const isNavLink = el.hasAttribute('data-mobile-nav-link');
      closeMenu(!isNavLink);
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.hidden) {
      closeMenu(true);
    }
  });
}

function initMobileCtaBar(): void {
  const bar = document.querySelector<HTMLElement>('[data-mobile-cta-bar]');
  const desktopFloat = document.querySelector<HTMLElement>('[data-desktop-wa-float]');
  const heroCta = document.querySelector<HTMLElement>('[data-hero-cta]');
  if ((!bar && !desktopFloat) || !heroCta) return;

  const setVisible = (visible: boolean) => {
    const val = visible ? 'true' : 'false';
    if (bar) bar.dataset.visible = val;
    if (desktopFloat) desktopFloat.dataset.visible = val;
  };

  if (!('IntersectionObserver' in window)) {
    setVisible(true);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;
      if (!entry) return;
      const scrolledPastHero = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      setVisible(scrolledPastHero);
    },
    { threshold: 0.1 },
  );

  observer.observe(heroCta);
}

function initCarousels(): void {
  const tracks = document.querySelectorAll<HTMLElement>('[data-carousel-track]');

  tracks.forEach((track) => {
    const key = track.dataset.carouselTrack;
    if (!key) return;

    const prevBtn = document.querySelector<HTMLButtonElement>(`[data-carousel-prev="${key}"]`);
    const nextBtn = document.querySelector<HTMLButtonElement>(`[data-carousel-next="${key}"]`);
    const dotsWrap = document.querySelector<HTMLElement>(`[data-carousel-dots="${key}"]`);
    const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll<HTMLElement>('[data-dot]')) : [];

    const getStepWidth = (): number => {
      const firstChild = track.firstElementChild as HTMLElement | null;
      if (!firstChild) return track.clientWidth * 0.85;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.columnGap || styles.gap || '16');
      return firstChild.getBoundingClientRect().width + gap;
    };

    const syncState = () => {
      const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth - 4);
      if (prevBtn) prevBtn.disabled = track.scrollLeft <= 4;
      if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll;

      if (dots.length > 0) {
        const step = getStepWidth();
        const activeIndex = Math.min(
          dots.length - 1,
          Math.max(0, Math.round(track.scrollLeft / Math.max(1, step))),
        );
        dots.forEach((dot, idx) => {
          dot.classList.toggle('is-active', idx === activeIndex);
        });
      }
    };

    prevBtn?.addEventListener('click', () => {
      track.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
    });

    nextBtn?.addEventListener('click', () => {
      track.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
    });

    track.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        track.scrollBy({ left: getStepWidth(), behavior: 'smooth' });
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        track.scrollBy({ left: -getStepWidth(), behavior: 'smooth' });
      }
    });

    let rafId = 0;
    track.addEventListener(
      'scroll',
      () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(syncState);
      },
      { passive: true },
    );

    window.addEventListener('resize', syncState, { passive: true });
    syncState();
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
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      items.forEach((item) => {
        const matches = selected === 'Todos' || item.dataset.category === selected;
        item.hidden = !matches;
      });
    });
  });
}

function initLightbox(): void {
  const modal = document.querySelector<HTMLElement>('[data-lightbox]');
  const dataEl = document.getElementById('portfolio-lightbox-data');
  if (!modal || !dataEl?.textContent) return;

  let items: LightboxItem[] = [];
  try {
    items = JSON.parse(dataEl.textContent) as LightboxItem[];
  } catch {
    return;
  }
  if (items.length === 0) return;

  const imgEl = modal.querySelector<HTMLImageElement>('[data-lightbox-img]');
  const placeholderEl = modal.querySelector<HTMLElement>('[data-lightbox-placeholder]');
  const categoryEl = modal.querySelector<HTMLElement>('[data-lightbox-category]');
  const titleEl = modal.querySelector<HTMLElement>('[data-lightbox-title]');
  const descEl = modal.querySelector<HTMLElement>('[data-lightbox-desc]');
  const counterEl = modal.querySelector<HTMLElement>('[data-lightbox-counter]');
  const waLinkEl = modal.querySelector<HTMLAnchorElement>('[data-lightbox-wa-link]');
  const waFallbackEl = modal.querySelector<HTMLButtonElement>('[data-lightbox-wa-fallback]');
  const prevBtn = modal.querySelector<HTMLButtonElement>('[data-lightbox-prev]');
  const nextBtn = modal.querySelector<HTMLButtonElement>('[data-lightbox-next]');
  const closeBtn = modal.querySelector<HTMLButtonElement>('.lightbox__close');
  const closeTargets = modal.querySelectorAll<HTMLElement>('[data-lightbox-close]');
  const openTriggers = document.querySelectorAll<HTMLButtonElement>('[data-lightbox-open]');

  let currentIndex = 0;
  let lastTrigger: HTMLElement | null = null;

  const renderItem = (index: number) => {
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    if (!item) return;

    if (imgEl) {
      imgEl.src = item.src;
      imgEl.alt = item.alt;
    }
    if (placeholderEl) placeholderEl.hidden = !item.isPlaceholder;
    if (categoryEl) categoryEl.textContent = item.category;
    if (titleEl) titleEl.textContent = item.title;
    if (descEl) descEl.textContent = item.caption;
    if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${items.length}`;

    if (waLinkEl && item.whatsappUrl) {
      waLinkEl.href = item.whatsappUrl;
    }
    if (waFallbackEl) {
      waFallbackEl.dataset.whatsappMessage = item.whatsappMessage;
    }
  };

  const openModal = (index: number, trigger: HTMLElement | null) => {
    lastTrigger = trigger;
    renderItem(index);
    modal.hidden = false;
    document.body.classList.add('has-overlay-open');
    closeBtn?.focus();
  };

  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('has-overlay-open');
    lastTrigger?.focus();
  };

  openTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const index = Number(btn.dataset.lightboxOpen || '0');
      openModal(index, btn);
    });
  });

  prevBtn?.addEventListener('click', () => renderItem(currentIndex - 1));
  nextBtn?.addEventListener('click', () => renderItem(currentIndex + 1));

  closeTargets.forEach((el) => {
    el.addEventListener('click', closeModal);
  });

  // Se o usuário clicar no fallback do WhatsApp dentro do lightbox, fecha o lightbox primeiro
  waFallbackEl?.addEventListener('click', () => {
    modal.hidden = true;
  });

  document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      closeModal();
    } else if (event.key === 'ArrowLeft') {
      renderItem(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      renderItem(currentIndex + 1);
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
  const modal = document.getElementById('whatsapp-fallback-modal');
  if (!modal) return;

  const messageEl = modal.querySelector<HTMLElement>('[data-wa-modal-message]');
  const copyBtn = modal.querySelector<HTMLButtonElement>('[data-wa-copy-message]');
  const copyIcon = modal.querySelector<HTMLElement>('[data-copy-icon]');
  const copiedIcon = modal.querySelector<HTMLElement>('[data-copied-icon]');
  const copyLabel = modal.querySelector<HTMLElement>('[data-copy-label]');
  const closeBtn = modal.querySelector<HTMLButtonElement>('.wa-modal__close');
  const closeTargets = modal.querySelectorAll<HTMLElement>('[data-wa-modal-close]');

  let currentMessage = '';
  let lastTrigger: HTMLElement | null = null;

  const resetCopyState = () => {
    if (copyIcon) copyIcon.hidden = false;
    if (copiedIcon) copiedIcon.hidden = true;
    if (copyLabel) copyLabel.textContent = 'Copiar mensagem';
  };

  const openModal = (message: string, trigger: HTMLElement | null) => {
    currentMessage = message;
    lastTrigger = trigger;
    if (messageEl) messageEl.textContent = message;
    resetCopyState();
    modal.hidden = false;
    document.body.classList.add('has-overlay-open');
    closeBtn?.focus();
  };

  const closeModal = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('has-overlay-open');
    lastTrigger?.focus();
  };

  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement | null;
    const button = target?.closest<HTMLButtonElement>('[data-whatsapp-fallback]');
    if (!button) return;

    const msg = button.dataset.whatsappMessage || 'Olá, Fábio! Gostaria de solicitar um orçamento.';
    openModal(msg, button);
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
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) {
      closeModal();
    }
  });
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
  initMobileCtaBar();
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
