/**
 * Configuração central do site — Fábio Jardinagem & Paisagismo
 *
 * ATENÇÃO:
 * - Para ativar os botões de WhatsApp, preencha `contact.whatsappNumber` no formato
 *   internacional sem símbolos (ex.: "5511999999999").
 * - Enquanto estiver vazio, o site utiliza um fallback amigável sem links quebrados.
 * - Não adicione dados fictícios (endereço, telefone, cidade ou redes inexistentes).
 */

import heroDesktopImage from '@/assets/images/hero/hero-garden-desktop.svg';
import heroMobileImage from '@/assets/images/hero/hero-garden-mobile.svg';
import aboutMainImage from '@/assets/images/about/about-main.svg';
import aboutDetailImage from '@/assets/images/about/about-detail.svg';
import whyFeatureImage from '@/assets/images/why-choose-us/why-feature.svg';
import ctaBackdropImage from '@/assets/images/hero/cta-backdrop.svg';

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
    title: 'Fábio Jardinagem & Paisagismo | Cuidado, Manutenção e Paisagismo',
    description:
      'Serviços de jardinagem, manutenção de jardins, poda, plantio e paisagismo. Solicite seu orçamento diretamente pelo WhatsApp.',
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
    { label: 'Projetos', href: '#projetos' },
    { label: 'Contato', href: '#contato' },
  ] satisfies NavItem[],

  whatsappMessages: {
    header: 'Olá, Fábio! Vim pelo site e gostaria de solicitar um orçamento.',
    hero: 'Olá, Fábio! Gostaria de solicitar um orçamento para cuidar do meu jardim.',
    about: 'Olá, Fábio! Gostaria de conversar sobre um atendimento para o meu espaço verde.',
    whyChooseUs: 'Olá, Fábio! Gostaria de saber mais sobre seus serviços de jardinagem e paisagismo.',
    ctaFinal: 'Olá, Fábio! Gostaria de solicitar um orçamento para o meu jardim.',
    footer: 'Olá, Fábio! Vim pelo site e gostaria de falar com você.',
    floating: 'Olá, Fábio! Gostaria de pedir um orçamento pelo WhatsApp.',
    service: (serviceTitle: string) =>
      `Olá, Fábio! Gostaria de solicitar um orçamento para ${serviceTitle.toLowerCase()}.`,
    portfolio: (projectTitle: string) =>
      `Olá, Fábio! Vi o espaço "${projectTitle}" no site e gostaria de um orçamento para algo semelhante.`,
  },

  /** Conteúdo textual editável das seções institucionais */
  sections: {
    hero: {
      eyebrow: 'Jardinagem & Paisagismo',
      titleStart: 'Seu jardim bonito,',
      titleAccent: 'cuidado',
      titleEnd: 'e cheio de vida.',
      description:
        'Cuidado, manutenção e paisagismo para transformar e valorizar seus espaços verdes.',
      primaryCta: 'Solicitar orçamento',
      secondaryCta: 'Conhecer serviços',
      noteLabel: 'Atendimento personalizado',
      noteText: 'Cuidado sob medida para jardins e áreas verdes',
      desktopImage: heroDesktopImage,
      mobileImage: heroMobileImage,
      desktopAlt: 'Espaço reservado para fotografia real de jardim cuidado em destaque',
      mobileAlt: 'Espaço reservado para fotografia vertical de jardim em destaque',
      desktopObjectPosition: 'center center',
      mobileObjectPosition: 'center center',
      isPlaceholder: true,
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
      titleStart: 'Mais cuidado e vida para cada',
      titleAccent: 'espaço verde.',
      /** Textos provisórios editáveis até receber a história definitiva do Fábio */
      paragraphs: [
        'Acreditamos que um jardim bem cuidado transforma o ambiente. Nosso trabalho é oferecer soluções de jardinagem e paisagismo com atenção aos detalhes e às necessidades de cada espaço.',
        'Atendemos de forma próxima e transparente, entendendo o que o seu jardim precisa para se manter saudável, harmonioso e acolhedor no dia a dia.',
      ],
      pillars: [
        'Atenção individual para cada ambiente',
        'Respeito às plantas e ao acabamento do espaço',
        'Comunicação direta do orçamento à conclusão',
      ],
      ctaLabel: 'Conversar pelo WhatsApp',
      mainImage: aboutMainImage,
      mainAlt: 'Espaço reservado para fotografia real do Fábio cuidando de um jardim',
      mainObjectPosition: 'center center',
      secondaryImage: aboutDetailImage,
      secondaryAlt: 'Espaço reservado para fotografia complementar de detalhe botânico',
      secondaryObjectPosition: 'center center',
      isPlaceholder: true,
    },

    whyChooseUs: {
      eyebrow: 'Por que escolher nosso trabalho',
      titleStart: 'Cuidado verdadeiro em cada',
      titleAccent: 'detalhe',
      titleEnd: 'do seu jardim.',
      description:
        'Unimos olhar cuidadoso, respeito pela natureza e atendimento próximo para que você aproveite um espaço sempre bonito e bem mantido.',
      ctaLabel: 'Solicitar orçamento',
      image: whyFeatureImage,
      alt: 'Espaço reservado para fotografia ampla de jardim cuidado',
      objectPosition: 'center center',
      isPlaceholder: true,
      cards: [
        {
          icon: 'eye',
          title: 'Atenção aos detalhes',
          description: 'Cuidado com o corte, a limpeza e a harmonia visual de cada canteiro.',
        },
        {
          icon: 'handshake',
          title: 'Atendimento próximo',
          description: 'Alinhamento simples e transparente para atender exatamente o que você precisa.',
        },
        {
          icon: 'leaf',
          title: 'Cuidado com seu espaço',
          description: 'Trabalho organizado, respeitoso com o ambiente e focado na saúde das plantas.',
        },
      ] as const,
    },

    process: {
      eyebrow: 'Como funciona',
      titleStart: 'Simples do primeiro contato ao',
      titleAccent: 'cuidado final.',
      description: 'Um caminho direto e sem burocracia para cuidar do seu espaço verde.',
      steps: [
        {
          number: '01',
          icon: 'message-square',
          title: 'Entre em contato',
          description: 'Converse pelo WhatsApp e conte o que você precisa.',
        },
        {
          number: '02',
          icon: 'clipboard-list',
          title: 'Avaliamos sua necessidade',
          description: 'Alinhamos o serviço e as informações necessárias para o orçamento.',
        },
        {
          number: '03',
          icon: 'calendar-check',
          title: 'Combinamos o atendimento',
          description: 'Definimos os próximos passos diretamente com você.',
        },
      ] as const,
    },

    ctaFinal: {
      eyebrow: 'Orçamento pelo WhatsApp',
      titleStart: 'Vamos cuidar do seu',
      titleAccent: 'jardim?',
      description:
        'Fale diretamente com a gente e conte o que você precisa. Será um prazer conhecer seu espaço.',
      buttonLabel: 'Pedir orçamento pelo WhatsApp',
      backdropImage: ctaBackdropImage,
      backdropAlt: '',
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
