import type { ImageMetadata } from 'astro';
import manutencaoImg from '@/assets/images/services/manutencao.jpg';
import paisagismoImg from '@/assets/images/services/paisagismo.jpg';
import podaImg from '@/assets/images/services/poda.jpg';
import plantioImg from '@/assets/images/services/plantio.jpg';
import limpezaImg from '@/assets/images/services/limpeza.jpg';

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
}

export const servicesContent = {
  eyebrow: 'Nossos serviços',
  titleStart: 'O cuidado certo para',
  titleAccent: 'cada jardim.',
  description: 'Da manutenção do dia a dia à renovação do seu espaço verde, encontre o serviço que seu jardim precisa.',
  ctaLabel: 'Quero esse serviço',
};

export const servicesList: ServiceItem[] = [
  {
    id: 'manutencao-de-jardins',
    title: 'Manutenção de jardins',
    shortDescription: 'Corte de grama e cuidado com canteiros e folhagens para manter o jardim em ordem.',
    icon: 'sprout',
    image: manutencaoImg,
    alt: 'Cortador de grama em uso em um jardim',
    objectPosition: '51% 49%',
  },
  {
    id: 'paisagismo',
    title: 'Paisagismo',
    shortDescription: 'Planejamento de canteiros e escolha de plantas de acordo com o espaço e o uso do jardim.',
    icon: 'trees',
    image: paisagismoImg,
    alt: 'Caminho de tijolos entre vasos e canteiros em um jardim residencial',
    objectPosition: '52% 55%',
  },
  {
    id: 'poda-e-cuidados',
    title: 'Poda e cuidados',
    shortDescription: 'Poda de arbustos e folhagens para manter a forma das plantas e liberar a circulação.',
    icon: 'scissors',
    image: podaImg,
    alt: 'Tesoura de jardinagem em uso no corte de folhagens',
    objectPosition: '64% 51%',
  },
  {
    id: 'plantio-e-revitalizacao',
    title: 'Plantio e revitalização',
    shortDescription: 'Preparo da terra e plantio de novas espécies para renovar canteiros e áreas verdes.',
    icon: 'flower',
    image: plantioImg,
    alt: 'Mãos com luvas plantando flores em um canteiro',
    objectPosition: '50% 52%',
  },
  {
    id: 'limpeza-de-areas-verdes',
    title: 'Limpeza de áreas verdes',
    shortDescription: 'Remoção de folhas e galhos, com atenção à limpeza dos canteiros e caminhos.',
    icon: 'wind',
    image: limpezaImg,
    alt: 'Ancinho reunindo folhas e outros resíduos de jardim',
    objectPosition: '47% 56%',
  },
];
