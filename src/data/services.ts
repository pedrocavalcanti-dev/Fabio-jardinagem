import type { ImageMetadata } from 'astro';
import manutencaoImg from '@/assets/images/services/manutencao.svg';
import paisagismoImg from '@/assets/images/services/paisagismo.svg';
import podaImg from '@/assets/images/services/poda.svg';
import plantioImg from '@/assets/images/services/plantio.svg';
import limpezaImg from '@/assets/images/services/limpeza.svg';

export type ServiceIconName = 'scissors' | 'trees' | 'sprout' | 'flower' | 'wind';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  icon: ServiceIconName;
  image: ImageMetadata;
  alt: string;
  objectPosition?: string;
  /** Mensagem personalizada opcional; se omitida, usa o padrão centralizado */
  whatsappMessage?: string;
  /** Marque como false ao substituir por fotografia real */
  isPlaceholder?: boolean;
}

/**
 * Lista inicial configurável de serviços (provisória — revisar conforme escopo confirmado).
 * Para editar, adicionar ou remover serviços, basta atualizar este array.
 */
export const servicesContent = {
  eyebrow: 'Serviços',
  titleStart: 'Tudo o que seu jardim',
  titleAccent: 'precisa.',
  description:
    'Serviços pensados para manter, renovar e valorizar áreas verdes com cuidado constante.',
  ctaLabel: 'Consultar serviço',
  /** Aviso discreto opcional enquanto a lista definitiva de serviços não é revisada */
  provisionalNote:
    'Consulte disponibilidade e detalhes de cada serviço diretamente pelo WhatsApp.',
};

export const servicesList: ServiceItem[] = [
  {
    id: 'manutencao-de-jardins',
    title: 'Manutenção de jardins',
    shortDescription:
      'Cuidados periódicos para manter gramados, canteiros e folhagens sempre saudáveis e bem apresentados.',
    icon: 'sprout',
    image: manutencaoImg,
    alt: 'Espaço reservado para foto real do serviço de manutenção de jardins',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'paisagismo',
    title: 'Paisagismo',
    shortDescription:
      'Composição e organização de áreas verdes para valorizar o ambiente e trazer mais harmonia natural.',
    icon: 'trees',
    image: paisagismoImg,
    alt: 'Espaço reservado para foto real de projeto de paisagismo',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'poda-e-cuidados',
    title: 'Poda e cuidados',
    shortDescription:
      'Poda cuidadosa de arbustos e folhagens para estimular o desenvolvimento equilibrado das plantas.',
    icon: 'scissors',
    image: podaImg,
    alt: 'Espaço reservado para foto real do serviço de poda e cuidados',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'plantio-e-revitalizacao',
    title: 'Plantio e revitalização',
    shortDescription:
      'Preparo de canteiros, plantio de novas espécies e renovação de jardins que precisam recuperar o vigor.',
    icon: 'flower',
    image: plantioImg,
    alt: 'Espaço reservado para foto real de plantio e revitalização de jardins',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'limpeza-de-areas-verdes',
    title: 'Limpeza de áreas verdes',
    shortDescription:
      'Remoção de folhas secas, galhos e acabamento geral para deixar o espaço limpo e agradável.',
    icon: 'wind',
    image: limpezaImg,
    alt: 'Espaço reservado para foto real de limpeza de áreas verdes',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
];
