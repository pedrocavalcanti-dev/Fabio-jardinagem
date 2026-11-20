# Fábio Jardinagem & Paisagismo — Landing Page (versão 1.1)

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
      portfolio/             # Fotografias da galeria de inspiração ou de projetos
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

## Como inserir fotos do Fábio

Veja a licença e a autoria das fotos ilustrativas atuais em [FOTOGRAFIAS.md](FOTOGRAFIAS.md). Mantenha os arquivos locais em `src/assets/images/` para o Astro gerar versões responsivas.

- **Hero** em `src/config/site.ts`: configure `heroDesktop`, `heroMobile`, `focalPointDesktop`, `focalPointMobile` e `alt`. Use uma foto ampla para desktop e um recorte vertical para celular.
- **Sobre, diferenciais e CTA** em `src/config/site.ts`: atualize os imports e os textos alternativos das fotos informativas.
- **Serviços** em `src/data/services.ts`: atualize o arquivo, o texto alternativo e a posição do recorte de cada foto.
- **Galeria** em `src/data/portfolio.ts`: marque `isOwnWork: true` nos registros de trabalhos do Fábio. A galeria passa a exibir os projetos próprios e troca o título automaticamente. Com duas categorias ou mais, os filtros aparecem. O array `beforeAfterPairs` continua disponível para registros de antes e depois.

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
