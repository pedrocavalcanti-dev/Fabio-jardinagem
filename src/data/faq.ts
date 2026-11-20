export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  /** Indica respostas que podem ser refinadas após definição comercial */
  needsConfirmation?: boolean;
}

export const faqContent = {
  eyebrow: 'Antes de contratar',
  titleStart: 'Perguntas',
  titleAccent: 'frequentes.',
  description:
    'Veja como pedir um orçamento e combinar o atendimento.',
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
      'Toque em “Pedir meu orçamento” e conte o que seu jardim precisa. Se puder, envie também fotos do espaço.',
  },
  {
    id: 'quais-servicos',
    question: 'Quais serviços estão disponíveis?',
    answer:
      'Trabalhamos com cuidados de jardinagem, manutenção de jardins, poda, plantio, limpeza de áreas verdes e paisagismo. Conte ao Fábio como você usa o espaço para ajustar o serviço às suas necessidades.',
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
      'A área de atendimento é confirmada conforme a localização do seu espaço. Envie seu bairro ou cidade pelo WhatsApp para o Fábio confirmar se atende na sua região.',
    needsConfirmation: true,
  },
];
