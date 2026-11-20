/**
 * Configuração central do site — Fábio Jardinagem & Paisagismo
 *
 * ATENÇÃO:
 * - Para ativar os botões de WhatsApp, preencha `contact.whatsappNumber` no formato
 *   internacional sem símbolos (ex.: "5511999999999").
 * - Enquanto estiver vazio, o site utiliza um fallback amigável sem links quebrados.
 * - Não adicione dados fictícios (endereço, telefone, cidade ou redes inexistentes).
 */

import heroDesktopImage from '@/assets/images/hero/hero-garden-desktop.jpg';
import heroMobileImage from '@/assets/images/hero/hero-garden-mobile.jpg';
import aboutMainImage from '@/assets/images/about/about-main.jpg';
import aboutDetailImage from '@/assets/images/about/about-detail.jpg';
import whyFeatureImage from '@/assets/images/why-choose-us/why-feature.jpg';
import ctaBackdropImage from '@/assets/images/hero/cta-backdrop.jpg';

export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  brand: {
    name: 'Fábio Jardinagem & Paisagismo',
    shortName: 'Fábio',
    subtitle: 'Jardinagem & Paisagismo',
    description:
      'Cuidado, manutenção de jardins e paisagismo com atenção aos detalhes para transformar e valorizar seus espaços verdes.',
  },

  contact: {
    /**
     * Preencha com código do país (55) + DDD + número, apenas dígitos.
     * Exemplo: "5511987654321"
     */
    whatsappNumber: '',
    /** Opcional: exibição formatada para o rodapé, ex.: "(11) 98765-4321" */
    whatsappDisplay: '',
    /** Opcional: URL completa do Instagram quando disponível */
    instagramUrl: '',
    /** Opcional: @usuario para exibição no rodapé */
    instagramHandle: '',
    /** Opcional: cidade/região atendida, exibir somente quando confirmada */
    serviceRegion: '',
    /** Opcional: horário de atendimento, exibir somente quando confirmado */
    businessHours: '',
  },

  seo: {
    /**
     * Deixe vazio até definir o domínio oficial (ou configure SITE_URL no ambiente).
     * Exemplo futuro: "https://fabiojardinagem.com.br"
     */
    siteUrl: (import.meta.env.SITE || '').trim(),
    title: 'Fábio Jardinagem & Paisagismo | Manutenção, Poda e Plantio',
    description:
      'Deixe seu jardim mais bonito com serviços de manutenção, poda, plantio e paisagismo. Converse com Fábio e peça um orçamento pelo WhatsApp.',
    locale: 'pt_BR',
    /** Opcional: caminho público da imagem Open Graph (ex.: "/branding/og-cover.jpg") */
    ogImage: '',
  },

  /** Crédito discreto opcional no rodapé (deixe `name` vazio para ocultar) */
  credits: {
    label: 'Desenvolvido por',
    name: '',
    url: '',
  },

  navigation: [
    { label: 'Início', href: '#inicio' },
    { label: 'Serviços', href: '#servicos' },
    { label: 'Sobre', href: '#sobre' },
    { label: 'Galeria', href: '#projetos' },
    { label: 'Contato', href: '#contato' },
  ] satisfies NavItem[],

  whatsappMessages: {
    header: 'Olá, Fábio! Vim pelo site e gostaria de solicitar um orçamento.',
    hero: 'Olá, Fábio! Vi seu site e gostaria de solicitar um orçamento de jardinagem.',
    about: 'Olá, Fábio! Gostaria de conversar sobre um atendimento para o meu espaço verde.',
    whyChooseUs: 'Olá, Fábio! Gostaria de saber mais sobre seus serviços de jardinagem e paisagismo.',
    ctaFinal: 'Olá, Fábio! Quero cuidar melhor do meu jardim e gostaria de solicitar um orçamento.',
    footer: 'Olá, Fábio! Vim pelo site e gostaria de falar com você.',
    floating: 'Olá, Fábio! Gostaria de pedir um orçamento pelo WhatsApp.',
    service: (serviceTitle: string) =>
      `Olá, Fábio! Tenho interesse no serviço de ${serviceTitle.toLowerCase()}. Podemos conversar sobre um orçamento?`,
    portfolio: 'Olá, Fábio! Gostaria de conversar sobre um serviço de jardinagem/paisagismo para meu espaço.',
  },

  /** Conteúdo textual editável das seções institucionais */
  sections: {
    hero: {
      eyebrow: 'Jardinagem & Paisagismo',
      titleStart: 'Seu jardim bem cuidado,',
      titleAccent: 'em cada detalhe.',
      description:
        'Manutenção, poda, plantio e paisagismo para deixar seu espaço mais bonito e agradável.',
      primaryCta: 'Pedir meu orçamento',
      secondaryCta: 'Conhecer os serviços',
      heroDesktop: heroDesktopImage,
      heroMobile: heroMobileImage,
      focalPointDesktop: '62% 52%',
      focalPointMobile: '58% 54%',
      alt: 'Jardim residencial com gramado, arbustos aparados e canteiros ao redor de um caminho curvo',
    },

    highlights: [
      {
        icon: 'message-circle',
        title: 'Atendimento direto',
        description: 'Conversa clara e sem intermediários diretamente pelo WhatsApp.',
      },
      {
        icon: 'sparkles',
        title: 'Cuidado com os detalhes',
        description: 'Acabamento caprichado respeitando cada espécie e o seu espaço.',
      },
      {
        icon: 'sprout',
        title: 'Soluções para o seu jardim',
        description: 'Da manutenção periódica à revitalização completa de áreas verdes.',
      },
    ] as const,

    about: {
      eyebrow: 'Sobre nós',
      titleStart: 'Cada jardim tem seu jeito.',
      titleAccent: 'E merece um cuidado especial.',
      paragraphs: [
        'Você conversa diretamente com o Fábio para contar como usa seu jardim e o que gostaria de melhorar.',
        'O cuidado leva em conta as plantas que já estão no espaço e a rotina de quem aproveita o jardim.',
      ],
      pillars: [
        'Cuidados adequados à luz e às plantas do local',
        'Atenção ao acabamento de canteiros e gramados',
        'Comunicação direta do orçamento à conclusão',
      ],
      ctaLabel: 'Conversar pelo WhatsApp',
      mainImage: aboutMainImage,
      mainAlt: 'Caminho de jardim sombreado por uma árvore e cercado de arbustos floridos',
      mainObjectPosition: '54% 50%',
      secondaryImage: aboutDetailImage,
      secondaryAlt: 'Folhas largas em tons de verde vistas de perto',
      secondaryObjectPosition: 'center center',
    },

    whyChooseUs: {
      eyebrow: 'Por que escolher nosso trabalho',
      titleStart: 'Seu espaço bem cuidado,',
      titleAccent: 'do jeito que merece.',
      ctaLabel: 'Solicitar orçamento',
      image: whyFeatureImage,
      alt: 'Gramado contornado por canteiros, cercas baixas e árvores',
      objectPosition: 'center center',
      cards: [
        {
          icon: 'eye',
          title: 'Atenção aos detalhes',
          description: 'Bordas aparadas, canteiros organizados e atenção ao acabamento.',
        },
        {
          icon: 'handshake',
          title: 'Atendimento próximo',
          description: 'Trate o orçamento e os detalhes do serviço diretamente com o Fábio.',
        },
        {
          icon: 'leaf',
          title: 'Cuidado com seu espaço',
          description: 'O corte, a poda e o plantio respeitam as necessidades de cada espécie.',
        },
      ] as const,
    },

    process: {
      eyebrow: 'Como funciona',
      titleStart: 'Do orçamento ao',
      titleAccent: 'atendimento.',
      steps: [
        {
          number: '01',
          icon: 'message-square',
          title: 'Entre em contato',
          description: 'Conte pelo WhatsApp o que precisa. Se puder, envie fotos do espaço.',
        },
        {
          number: '02',
          icon: 'clipboard-list',
          title: 'Avaliamos sua necessidade',
          description: 'O Fábio reúne as informações do jardim para preparar o orçamento.',
        },
        {
          number: '03',
          icon: 'calendar-check',
          title: 'Combinamos o atendimento',
          description: 'Depois de aprovar o orçamento, combine o atendimento com o Fábio.',
        },
      ] as const,
    },

    ctaFinal: {
      eyebrow: 'Orçamento pelo WhatsApp',
      titleStart: 'Seu jardim pode ficar',
      titleAccent: 'ainda mais bonito.',
      description:
        'Conte o que seu jardim precisa e converse diretamente com o Fábio pelo WhatsApp.',
      buttonLabel: 'Conversar sobre meu jardim',
      backdropImage: ctaBackdropImage,
    },
  },
};

/** Remove caracteres não numéricos do número configurado */
export function getSanitizedWhatsAppNumber(): string {
  return siteConfig.contact.whatsappNumber.replace(/\D/g, '');
}

/** Verifica se o WhatsApp possui um número válido configurado (mín. 55 + DDD + 8 dígitos) */
export function isWhatsAppConfigured(): boolean {
  return getSanitizedWhatsAppNumber().length >= 12;
}

/**
 * Gera a URL oficial do WhatsApp (`https://wa.me/NUMERO?text=MENSAGEM`).
 * Retorna `null` quando o número ainda não foi preenchido, evitando links inválidos.
 */
export function buildWhatsAppUrl(message: string): string | null {
  const digits = getSanitizedWhatsAppNumber();
  if (digits.length < 12) {
    return null;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
