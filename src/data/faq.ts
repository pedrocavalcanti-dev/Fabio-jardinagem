export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Indica respostas que podem ser refinadas após definição comercial */
  needsConfirmation?: boolean;
}

export const faqContent = {
  eyebrow: 'Dúvidas frequentes',
  titleStart: 'Perguntas',
  titleAccent: 'frequentes.',
  description:
    'Reunimos as principais dúvidas para facilitar o primeiro contato. Se preferir, fale diretamente pelo WhatsApp.',
  helperCtaLabel: 'Tirar dúvida pelo WhatsApp',
};

/**
 * Respostas configuráveis e honestas — sem inventar regiões, prazos ou políticas
 * comerciais ainda não confirmadas.
 */
export const faqItems: FaqItem[] = [
  {
    id: 'como-solicitar-orcamento',
    question: 'Como posso solicitar um orçamento?',
    answer:
      'Basta clicar em qualquer botão de WhatsApp nesta página e contar brevemente o que você precisa para o seu jardim. Se puder, envie fotos ou uma breve descrição do espaço para agilizarmos o atendimento.',
  },
  {
    id: 'quais-servicos',
    question: 'Quais serviços estão disponíveis?',
    answer:
      'Trabalhamos com cuidados de jardinagem, manutenção de jardins, poda, plantio, limpeza de áreas verdes e paisagismo. Pelo WhatsApp, confirmamos rapidamente a melhor solução para o seu tipo de espaço.',
    needsConfirmation: true,
  },
  {
    id: 'como-funciona-agendamento',
    question: 'Como funciona o agendamento?',
    answer:
      'Após alinharmos o serviço e as informações do orçamento pelo WhatsApp, combinamos diretamente com você o melhor dia e horário conforme a disponibilidade da agenda.',
    needsConfirmation: true,
  },
  {
    id: 'regioes-atendidas',
    question: 'Em quais regiões vocês atendem?',
    answer:
      'A área de atendimento é confirmada conforme a localização do seu espaço. Envie seu bairro ou cidade pelo WhatsApp para verificarmos rapidamente a disponibilidade na sua região.',
    needsConfirmation: true,
  },
];
