# Convite para você — Vistanology

Página única de convite: uma ideia sua, tecnologia pronta. O único objetivo é levar o visitante a enviar uma mensagem no WhatsApp.

## Acesso

**Site publicado:** https://vistanology.github.io/convite-para-voce-empreendedor/

Hospedado no GitHub Pages, branch `main`, diretório `/` (root).

## Estrutura

- `index.html` — loading (boot), animação do convite, seções compactas, 6 protótipos, sidebar com a aba **Pricing** e modais.
- `styles.css` — estética aero/glass, boot sem sobreposição de controles, separadores com filete e medalhão, fundo noturno com partículas, drawer de preços e modais.
- `script.js` — sequência de carregamento, partículas ambientais, separadores, drawer de preços, navegação, escolha da mensagem, abertura/fechamento dos modais e escala dos iframes.
- `assets/` — imagens reaproveitadas do `our-site` e ícone.

## WhatsApp

Número e mensagem curta no topo de `script.js`:

```js
const WHATSAPP_NUMBER = "5513955488379";
const WHATSAPP_DISPLAY = "+55 (13) 95548-8379";
const SIMPLE_MESSAGE = "…";
```

O CTA **“Quero conversar com a Vista”** abre um painel com duas opções:

1. **Oi, quero conhecer** — envia `SIMPLE_MESSAGE` direto no WhatsApp.
2. **Enviar informações para você se organizar** — abre campos opcionais de nome, negócio, objetivo, prazo, detalhe e investimento; `buildDetailedMessage()` monta o texto final com só o que foi preenchido.

As duas opções terminam sempre no mesmo número, com link público `https://wa.me/5513955488379?text=…`. O selo “Estamos em promoção” aparece no hero e também no rodapé do painel.

## História da Vistanology

O emblema no centro de cada separador — e o link no convite final — abre o modal **“Um futuro que parece casa.”** O conteúdo usa a voz do `our-site`: “Sonhe. Explore. Evolua.”, a origem ligada a um futuro bonito que parecia casa, e os princípios **clareza antes de código**, **estética com propósito**, **honestidade radical** e **vida em cada detalhe**. Sem nomes de pessoa e sem dados inventados. O modal termina no mesmo CTA do WhatsApp.

## Valores

Os preços **não ficam na landing**. A landing mantém só o convite e o essencial. A aba **Pricing** na sidebar abre um drawer lateral com **Investimento sem surpresa**, onde as faixas alternam entre tipo de projeto e forma de pagamento:

- **Páginas:** R$ 100–500, R$ 600–900 e R$ 1.200–1.500 por mês.
- **Sistemas:** a partir de R$ 500/mês, com faixas de R$ 500–900, R$ 1.200–1.500 e sob medida.
- **Anual à vista:** 10x o valor mensal, equivalente a 12 meses com 2 grátis.

Clicar num cartão fecha o drawer e abre o painel do WhatsApp já com o objetivo, o regime de pagamento e a faixa escolhidos. No painel, trocar o objetivo ou o pagamento recalcula as opções de investimento antes de gerar a mensagem.

## Protótipos

Cada janela abre direto em um modal com navegador integrado (iframe). Dentro dele, o loading usa a arte do perfil GitHub da Vistanology (`assets/vistanology-avatar.png`), órbitas, faíscas e o cosmos do `our-site`; quando a página termina de carregar, a arte dissolve e o site aparece na mesma moldura — sem etapa separada. O iframe tem escala automática para caber no monitor sem cortar o conteúdo e fundo contínuo, sem borda branca. Há também link para abrir em nova aba.

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

## Publicar novamente

O GitHub Pages está configurado em **Settings → Pages → Deploy from a branch → main / root**. Basta enviar as alterações para `main`; o GitHub refaz o deploy automaticamente.

URL: https://vistanology.github.io/convite-para-voce-empreendedor/
