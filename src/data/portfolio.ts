import type { ImageMetadata } from 'astro';
import projeto01 from '@/assets/images/portfolio/projeto-01.svg';
import projeto02 from '@/assets/images/portfolio/projeto-02.svg';
import projeto03 from '@/assets/images/portfolio/projeto-03.svg';
import projeto04 from '@/assets/images/portfolio/projeto-04.svg';
import projeto05 from '@/assets/images/portfolio/projeto-05.svg';
import projeto06 from '@/assets/images/portfolio/projeto-06.svg';

export type PortfolioOrientation = 'portrait' | 'landscape' | 'square';

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  caption: string;
  image: ImageMetadata;
  alt: string;
  orientation: PortfolioOrientation;
  objectPosition?: string;
  /** Marque como false ao substituir pelo registro real do trabalho */
  isPlaceholder?: boolean;
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
  eyebrow: 'Galeria & Projetos',
  titleStart: 'Veja nosso trabalho de',
  titleAccent: 'perto.',
  description: 'Alguns dos jardins e espaços que recebem cuidado e atenção.',
  placeholderNotice:
    'Espaço preparado para as fotografias reais dos trabalhos realizados. Clique em qualquer card para testar a visualização ampliada.',
  /**
   * Os filtros por categoria são exibidos automaticamente apenas quando houver
   * fotografias reais cadastradas em 2 ou mais categorias (ou definindo true manualmente).
   */
  forceShowFilters: false,
};

/**
 * Adicione novas fotografias aqui sem precisar editar o layout da seção.
 * Ao trocar pelos arquivos reais em `src/assets/images/portfolio/`, altere `isPlaceholder: false`.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'espaco-01',
    title: 'Jardim residencial',
    category: 'Manutenção',
    caption: 'Espaço reservado para fotografia vertical de jardim mantido e cuidado.',
    image: projeto01,
    alt: 'Placeholder visual reservado para fotografia vertical de jardim residencial',
    orientation: 'portrait',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'espaco-02',
    title: 'Área verde e gramado',
    category: 'Manutenção',
    caption: 'Espaço reservado para fotografia horizontal de gramado e acabamento.',
    image: projeto02,
    alt: 'Placeholder visual reservado para fotografia horizontal de área verde e gramado',
    orientation: 'landscape',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'espaco-03',
    title: 'Canteiros e folhagens',
    category: 'Paisagismo',
    caption: 'Espaço reservado para fotografia vertical de composição de folhagens.',
    image: projeto03,
    alt: 'Placeholder visual reservado para fotografia vertical de canteiros e folhagens',
    orientation: 'portrait',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'espaco-04',
    title: 'Revitalização de jardim',
    category: 'Revitalização',
    caption: 'Espaço reservado para fotografia horizontal de área revitalizada.',
    image: projeto04,
    alt: 'Placeholder visual reservado para fotografia horizontal de revitalização de jardim',
    orientation: 'landscape',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'espaco-05',
    title: 'Detalhes de poda',
    category: 'Poda e cuidados',
    caption: 'Espaço reservado para registro aproximado de poda e acabamento.',
    image: projeto05,
    alt: 'Placeholder visual reservado para fotografia de detalhes de poda',
    orientation: 'square',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
  {
    id: 'espaco-06',
    title: 'Área externa completa',
    category: 'Paisagismo',
    caption: 'Espaço reservado para fotografia ampla de área externa após o atendimento.',
    image: projeto06,
    alt: 'Placeholder visual reservado para fotografia ampla de área externa',
    orientation: 'landscape',
    objectPosition: 'center center',
    isPlaceholder: true,
  },
];

/**
 * Pares reais de Antes e Depois (vazio por padrão — NÃO inventar transformações).
 * Quando houver pares reais fotografados, basta preenchê-los aqui para ativar
 * automaticamente o componente comparativo na seção de Portfólio.
 */
export const beforeAfterPairs: BeforeAfterPair[] = [];
