# FAS Arquitetura — Site Institucional

Site premium, mobile-first, em HTML/CSS/JS puro. Glassmorphism, modo claro/escuro, quiz interativo, galeria com filtros, chat IA flutuante.

## Como abrir

Basta abrir `index.html` no navegador. Para desenvolvimento, use uma extensão tipo *Live Server* no VS Code (recomendado para evitar problemas de CORS no fetch do chat).

## Estrutura

```
fas-arquitetura/
├── index.html
├── style.css
├── script.js
├── README.md
├── docs/
│   └── instructions.md
└── assets/
    ├── images/   (logo + projetos do portfólio)
    └── icons/
```

## Como editar

### Textos
Tudo em `index.html`. Cada seção está comentada (`<!-- HERO -->`, `<!-- SOBRE -->`, etc.).

### Trocar imagens / projetos
1. Coloque novas fotos em `assets/images/`.
2. Em `script.js`, edite o array `projects` (campos: `img`, `title`, `cat`, `catLabel`, `desc`).

### Editar o quiz
Em `script.js`, edite `quizData` (perguntas/opções) e `results` (resultados).

### Trocar WhatsApp
Faça **localizar/substituir** por `5521964984398` em todo o projeto.

### Trocar Instagram
Localizar `https://www.instagram.com/fasarquitetura/`.

### Trocar e-mail
Localizar `contato@fasarquitetura.com.br`.

### Configurar o webhook do chat IA
Em `script.js`, função `chatForm.addEventListener('submit', ...)`, altere a URL `https://memoken.com/webhook/artificial-inteligence/completion`. O body enviado:
```json
{ "chat_id": "<id único do usuário>", "human_message": "<texto>" }
```
A resposta esperada do webhook pode vir em qualquer um destes campos: `response`, `message`, `output` ou `text`.

## Hospedagem

### GitHub Pages
1. Suba a pasta para um repositório no GitHub.
2. Em *Settings → Pages*, selecione branch `main` / pasta `/root`.
3. Acesse em `https://<seu-user>.github.io/<repo>/`.

### Vercel
1. Importe o repo em [vercel.com/new](https://vercel.com/new).
2. Framework: *Other*. Build: vazio. Output: `./`.
3. Deploy.

### Netlify
1. Arraste a pasta inteira em [app.netlify.com/drop](https://app.netlify.com/drop).
2. Pronto.

## Modo claro/escuro
Botão no header. Preferência salva em `localStorage` (`fas-theme`).

## Acessibilidade
- Foco visível, `aria-label` em botões.
- Estrutura semântica (header, nav, section, footer).
- Alt em imagens.
- Contraste validado nas duas paletas.

## SEO
Title, description, keywords e Open Graph já configurados em `<head>`.
Substitua `assets/images/projeto-05.jpg` no `og:image` pela imagem oficial quando disponível.

---
© FAS Arquitetura.
