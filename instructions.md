# Instruções rápidas

## Editar conteúdo principal
- **Hero, sobre, serviços, contato**: `index.html`
- **Projetos da galeria**: array `projects` em `script.js`
- **Quiz**: arrays `quizData` e `results` em `script.js`
- **Erros que um projeto evita**: array `erros` em `script.js`

## Substituições rápidas (Find & Replace)
| Substituir | Por |
|---|---|
| `5521964984398` | seu WhatsApp principal |
| `5521964760440` | seu WhatsApp secundário |
| `contato@fasarquitetura.com.br` | seu e-mail |
| `https://www.instagram.com/fasarquitetura/` | seu Instagram |

## Paleta
Editável no topo de `style.css`, blocos `:root` (claro) e `[data-theme="dark"]` (escuro).

## Fonts
Trocar `Manrope` / `Space Grotesk` por outra família é só atualizar o `<link>` do Google Fonts em `index.html` e a `font-family` no `body`/títulos em `style.css`.

## Performance
- Imagens já usam `loading="lazy"`.
- Mantenha JPG/WEBP otimizados (recomendado < 250KB por imagem).
