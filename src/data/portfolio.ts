import type { ImageMetadata } from 'astro';
import projeto01 from '@/assets/images/portfolio/projeto-01.jpg';
import projeto02 from '@/assets/images/portfolio/projeto-02.jpg';
import projeto03 from '@/assets/images/portfolio/projeto-03.jpg';
import projeto04 from '@/assets/images/portfolio/projeto-04.jpg';
import projeto05 from '@/assets/images/portfolio/projeto-05.jpg';
import projeto06 from '@/assets/images/portfolio/projeto-06.jpg';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: ImageMetadata;
  alt: string;
  objectPosition?: string;
  isOwnWork: boolean;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  caption?: string;
  beforeImage: ImageMetadata;
  beforeAlt: string;
  afterImage: ImageMetadata;
  afterAlt: string;
}

export const portfolioContent = {
  illustrative: {
    eyebrow: 'Inspiração para o seu jardim',
    titleStart: 'Ideias para espaços verdes',
    titleAccent: 'bem cuidados.',
    description: 'Fotografias ilustrativas de jardins, gramados e canteiros.',
  },
  ownWork: {
    eyebrow: 'Projetos',
    titleStart: 'Veja nosso trabalho de',
    titleAccent: 'perto.',
    description: 'Conheça alguns dos espaços cuidados pelo Fábio.',
  },
};

// Marque isOwnWork como true apenas para registros de serviços realizados pelo Fábio.
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'espaco-01',
    title: 'Jardim residencial',
    category: 'Paisagismo',
    caption: 'Uma árvore alta cria sombra junto ao gramado e à área de convivência.',
    image: projeto01,
    alt: 'Árvore em um gramado ao lado de uma casa contemporânea',
    objectPosition: '55% 62%',
    isOwnWork: false,
  },
  {
    id: 'espaco-02',
    title: 'Gramado e arbustos',
    category: 'Manutenção',
    caption: 'Arbustos aparados contornam o gramado e definem os limites do jardim.',
    image: projeto02,
    alt: 'Gramado verde cercado por sebes e arbustos aparados',
    objectPosition: '52% 72%',
    isOwnWork: false,
  },
  {
    id: 'espaco-03',
    title: 'Cercas vivas',
    category: 'Poda e cuidados',
    caption: 'A poda dá forma às sebes e mantém o caminho livre.',
    image: projeto03,
    alt: 'Caminho estreito entre cercas vivas verdes aparadas',
    objectPosition: '52% 58%',
    isOwnWork: false,
  },
  {
    id: 'espaco-04',
    title: 'Caminhos no jardim',
    category: 'Paisagismo',
    caption: 'Pisos e folhagens conectam o gramado à varanda.',
    image: projeto04,
    alt: 'Caminho de pedra com folhagens nas laterais levando a uma varanda',
    objectPosition: '50% 56%',
    isOwnWork: false,
  },
  {
    id: 'espaco-05',
    title: 'Canteiros bem definidos',
    category: 'Manutenção',
    caption: 'Canteiros arredondados e caminhos organizam a circulação entre as plantas.',
    image: projeto05,
    alt: 'Jardim com arbustos arredondados, árvores e caminhos sinuosos',
    objectPosition: '58% 55%',
    isOwnWork: false,
  },
  {
    id: 'espaco-06',
    title: 'Vasos e folhagens',
    category: 'Plantio',
    caption: 'Vasos em diferentes alturas acompanham o acesso à casa.',
    image: projeto06,
    alt: 'Caminho de piso avermelhado ladeado por vasos e folhagens',
    objectPosition: '52% 58%',
    isOwnWork: false,
  },
];

// Preencha somente com pares de antes e depois de trabalhos próprios.
export const beforeAfterPairs: BeforeAfterPair[] = [];
