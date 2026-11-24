# Convite para você — Vistanology

Página única de convite: uma ideia sua, tecnologia pronta. O único objetivo é levar o visitante a enviar uma mensagem no WhatsApp.

## Estrutura

- `index.html` — loading (boot), animação do convite, seções e os 6 protótipos clicáveis.
- `styles.css` — estética aero/glass, animações e modal com navegador integrado.
- `script.js` — sequência de carregamento, partículas, CTA do WhatsApp, abertura/fechamento do modal e escala dos iframes.
- `assets/` — imagens reaproveitadas do `our-site` e ícone.

## WhatsApp

Número e mensagem pré-preenchida no topo de `script.js`:

```js
const WHATSAPP_NUMBER = "5513955488379";
const WHATSAPP_DISPLAY = "+55 (13) 95548-8379";
const INVITE_MESSAGE = "…";
```

## Protótipos

Cada janela abre um modal com navegador integrado (iframe), com escala automática para caber no monitor sem cortar o conteúdo e fundo contínuo, sem borda branca. Há também link para abrir em nova aba.

Páginas vinculadas (GitHub Pages):

- `Nuwget/bearify` — https://nuwget.github.io/bearify/
- `Nuwget/budu-crush` — https://nuwget.github.io/budu-crush/
- `Nuwget/nuwget-page` — https://nuwget.github.io/nuwget-page/
- `Nuwget/welcome-to-your-past` — https://nuwget.github.io/welcome-to-your-past/
- `Vistanology/aero-tools` — https://vistanology.github.io/aero-tools/
- `Vistanology/our-site` — https://vistanology.github.io/our-site/

## Rodar localmente

Qualquer servidor estático serve:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Publicar

GitHub Pages: **Settings → Pages → Deploy from a branch → main / root**.
URL: https://vistanology.github.io/convite-para-voce-empreendedor/
