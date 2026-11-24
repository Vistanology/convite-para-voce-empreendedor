# Convite para você — Vistanology

Um convite de uma página só: transformar uma ideia em sistema, landing page ou presença digital. O único objetivo é levar o visitante a enviar uma mensagem no WhatsApp.

## Estrutura

- `index.html` — conteúdo da página e o loading (boot) reaproveitado do `our-site`.
- `styles.css` — estética aero/glass da Vistanology e o visual do loading.
- `script.js` — sequência de carregamento, partículas, parallax e link do WhatsApp.
- `assets/` — imagens reaproveitadas do `our-site` e ícone.

## WhatsApp

O número e a mensagem pré-preenchida ficam no topo de `script.js`:

```js
const WHATSAPP_NUMBER = "5513955488379";
const INVITE_MESSAGE = "…";
```

Para trocar o número, edite `WHATSAPP_NUMBER` e `WHATSAPP_DISPLAY`.

## Rodar localmente

Qualquer servidor estático serve:

```bash
python -m http.server 8000
```

Depois abra `http://localhost:8000`.

## Publicar

GitHub Pages: **Settings → Pages → Deploy from a branch → main / root**.
O site ficará em `https://vistanology.github.io/convite-para-voce-empreendedor/`.
