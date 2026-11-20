# Fábio Jardinagem & Paisagismo — Landing Page (Fase 1)

Landing page institucional, estática, responsiva (Mobile First) e orientada à conversão pelo WhatsApp, desenvolvida em **Astro (SSG) + TypeScript + CSS moderno**.

---

## Como executar localmente

Requisitos: **Node.js 22+** e **npm 9+**.

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Gerar versão estática de produção (pasta dist/)
npm run build

# 4. Pré-visualizar o build localmente (opcional)
npm run preview
```

---

## Estrutura do projeto

```text
src/
  assets/
    branding/                # Reservado para a logo oficial após o rebranding
    images/
      hero/                  # Fotos principais do hero (desktop e mobile) + fundo CTA
      about/                 # Fotos do profissional / espaço (seção Sobre)
      services/              # Fotos dos cards de serviços
      portfolio/             # Fotografias reais da galeria de projetos
      why-choose-us/         # Fotografia ampla da seção de diferenciais
  components/
    layout/                  # Header, Footer e ações flutuantes (mobile/desktop)
    sections/                # As seções da Home (Hero, Highlights, About, Services, etc.)
    ui/                      # BrandLogo, Button, WhatsAppButton, ServiceCard, GalleryCard, etc.
  config/
    site.ts                  # Configuração central: WhatsApp, textos, contato e SEO
  data/
    services.ts              # Lista editável de serviços
    portfolio.ts             # Itens da galeria e suporte a pares Antes/Depois
    faq.ts                   # Perguntas frequentes
  layouts/
    BaseLayout.astro         # Head semântico, fontes, Open Graph e JSON-LD
  pages/
    index.astro              # Página inicial completa
  scripts/
    interactions.ts          # Menu mobile, carrosséis, lightbox, FAQ e fallback do WhatsApp
  styles/
    tokens.css               # Design System (cores, tipografia, espaçamentos, raios)
    global.css               # Estilos base, botões e acessibilidade

public/
  branding/                  # Arquivos estáticos públicos (ex.: imagem Open Graph)
  icons/                     # Favicon provisório
  robots.txt                 # Regras de indexação
netlify.toml                 # Configuração de build estático para o Netlify
```

---

## Onde configurar o WhatsApp e dados de contato

Toda a configuração de contato fica em **`src/config/site.ts`**:

```ts
contact: {
  whatsappNumber: '5511999999999',      // DDI 55 + DDD + número (apenas dígitos)
  whatsappDisplay: '(11) 99999-9999',   // Opcional: exibição formatada no rodapé
  instagramUrl: 'https://instagram.com/...', // Opcional (só aparece se preenchido)
  instagramHandle: '@seuinstagram',     // Opcional
  serviceRegion: 'Cidade / Região',     // Opcional (só aparece quando confirmada)
  businessHours: 'Seg a Sáb · 08h às 18h', // Opcional
}
```

- **Enquanto `whatsappNumber` estiver vazio**, o site não gera links externos inválidos: os botões exibem um aviso interativo mostrando exatamente qual mensagem será enviada.
- **As mensagens contextuais** (Hero, Header, Serviços, Galeria, CTA Final e Rodapé) também são editáveis em `siteConfig.whatsappMessages` dentro de `src/config/site.ts`.

---

## Como substituir as imagens provisórias por fotos reais

Atualmente o site utiliza **placeholders visuais locais** em `src/assets/images/` para preservar o layout sem quebrar imagens nem exibir trabalhos fictícios.

Para inserir as fotografias reais (preferencialmente `.jpg`, `.jpeg`, `.png` ou `.webp` de boa resolução — o Astro otimiza automaticamente para **WebP** responsivo no build):

1. **Hero (`src/assets/images/hero/`)**
   - Adicione a foto horizontal (ex.: `hero-desktop.jpg`, ~1600px de largura) e opcionalmente uma vertical para celular (ex.: `hero-mobile.jpg`, ~900×1200px).
   - Atualize os imports em `src/config/site.ts` (`hero.desktopImage` e `hero.mobileImage`), ajuste `desktopObjectPosition` / `mobileObjectPosition` se precisar melhorar o recorte e altere `isPlaceholder: false`.

2. **Sobre (`src/assets/images/about/`)**
   - Adicione a foto principal do Fábio/trabalho (`about-main.jpg`) e opcionalmente uma foto complementar (`about-detail.jpg`).
   - Atualize os imports em `src/config/site.ts` (`sections.about`) e marque `isPlaceholder: false`.

3. **Serviços (`src/assets/images/services/`)**
   - Adicione uma fotografia vertical/retrato para cada serviço.
   - Atualize os imports, títulos, descrições e `isPlaceholder: false` em `src/data/services.ts`.

4. **Portfólio / Galeria (`src/assets/images/portfolio/`)**
   - Adicione as fotos reais dos jardins atendidos nesta pasta.
   - Cadastre ou atualize os itens em `src/data/portfolio.ts` (`orientation`: `'portrait'`, `'landscape'` ou `'square'`, legenda opcional e `isPlaceholder: false`).
   - Quando houver **2 ou mais categorias reais**, os botões de filtro da galeria são ativados automaticamente.
   - Se houver fotos reais de **Antes e Depois**, basta adicioná-las em `beforeAfterPairs` no mesmo arquivo para habilitar o comparativo interativo.

5. **Por que escolher nosso trabalho (`src/assets/images/why-choose-us/`)**
   - Substitua a imagem ampla em `src/config/site.ts` (`sections.whyChooseUs.image`) e marque `isPlaceholder: false`.

6. **Logo definitiva (Fase 2)**
   - A marca provisória está totalmente isolada em **`src/components/ui/BrandLogo.astro`**. Basta atualizar esse único componente (e o favicon em `public/icons/favicon.svg`).

---

## Como editar textos e FAQ

- **Textos das seções institucionais** (Hero, Diferenciais, Sobre, Por que nos escolher, Como funciona, CTA Final): `src/config/site.ts`
- **Serviços**: `src/data/services.ts`
- **Perguntas frequentes**: `src/data/faq.ts`
- **Cores, tipografia e espaçamentos**: `src/styles/tokens.css`

---

## Publicação no Netlify

O projeto já está configurado com `netlify.toml` para deploy 100% estático:

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Passo a passo

1. Acesse [app.netlify.com](https://app.netlify.com/) e clique em **Add new site → Import an existing project**.
2. Conecte sua conta do **GitHub** e selecione o repositório `pedrocavalcanti-dev/Fabio-jardinagem`.
3. Confirme as configurações de build (já lidas automaticamente do `netlify.toml`):
   - Branch: `main`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Clique em **Deploy site** para publicar a primeira versão.
5. **Quando conectar o domínio próprio:**
   - Em **Domain management**, adicione seu domínio e siga o apontamento DNS indicado pelo Netlify.
   - Em **Site configuration → Environment variables**, adicione `SITE_URL` com sua URL final (ex.: `https://fabiojardinagem.com.br`). Isso ativa automaticamente a tag `canonical`, `og:url` e a geração do `sitemap-index.xml`.
   - Ative o certificado **HTTPS (Let's Encrypt)** automático do Netlify e valide todos os links de WhatsApp e navegação.
