(() => {
  "use strict";

  const WHATSAPP_NUMBER = "5513955488379";
  const WHATSAPP_DISPLAY = "+55 (13) 95548-8379";
  const INVITE_MESSAGE =
    "Olá! Vim pelo convite da Vistanology e gostaria de conversar sobre a criação de um sistema ou landing page para o meu negócio. Pode me explicar como funciona, o prazo e o investimento? Obrigado!";

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(INVITE_MESSAGE)}`;
  document.querySelectorAll("[data-wa]").forEach((link) => {
    link.setAttribute("href", waUrl);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
    link.setAttribute("aria-label", "Enviar convite no WhatsApp para " + WHATSAPP_DISPLAY);
  });
  document.getElementById("wa-display").textContent = WHATSAPP_DISPLAY;
  document.getElementById("year").textContent = String(new Date().getFullYear());

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const boot = document.getElementById("boot");
  const site = document.getElementById("conteudo");
  const stage = document.getElementById("boot-stage");
  const reveal = document.getElementById("boot-reveal");
  const skip = document.getElementById("boot-skip");
  const bar = document.getElementById("boot-bar");
  const fill = document.getElementById("boot-fill");
  const tip = document.getElementById("boot-tip");
  const status = document.getElementById("boot-status");
  const bloom = document.getElementById("boot-bloom");
  const particles = document.getElementById("boot-particles");

  // Partículas do mesmo vocabulário visual do our-site.
  const motes = [
    [7, 46, 3, .4, 8.2, 26], [14, 58, 2, 2.6, 10, -18], [22, 36, 4, 1.2, 9.4, 22],
    [31, 66, 2, 3.4, 8.8, -14], [39, 30, 3, .9, 11, 20], [47, 52, 2, 2, 9.6, -24],
    [55, 42, 3, 1.7, 10.6, 16], [63, 62, 2, 3, 8.4, -20], [70, 34, 4, .6, 9.8, 24],
    [78, 56, 2, 2.4, 10.2, -16], [85, 44, 3, 1.4, 9, 18], [92, 60, 2, 3.8, 10.8, -22],
  ];
  const bubbles = [
    [12, 13, .6, 8.4], [24, 8, 2.6, 9.8], [37, 17, 1.6, 10.6], [52, 9, 3.4, 8.8],
    [66, 15, 1.1, 11.4], [79, 7, 4.1, 9.2], [90, 11, 2.2, 10],
  ];
  if (!reduceMotion) {
    const frag = document.createDocumentFragment();
    motes.forEach(([left, top, size, delay, duration, drift]) => {
      const el = document.createElement("span");
      el.className = "boot-mote";
      el.style.cssText = `left:${left}%;top:${top}%;width:${size}px;height:${size}px;--delay:${delay}s;--duration:${duration}s;--drift:${drift}px`;
      frag.appendChild(el);
    });
    bubbles.forEach(([left, size, delay, duration]) => {
      const el = document.createElement("span");
      el.className = "boot-bubble";
      el.style.cssText = `left:${left}%;width:${size}px;height:${size}px;--delay:${delay}s;--duration:${duration}s`;
      frag.appendChild(el);
    });
    particles.appendChild(frag);

    boot.addEventListener("pointermove", (event) => {
      const rect = boot.getBoundingClientRect();
      const x = (event.clientX / rect.width - .5) * 2;
      const y = (event.clientY / rect.height - .5) * 2;
      document.querySelector(".boot-bg-frame").style.transform = `translate3d(${x * -12}px, ${y * -8}px, 0)`;
      bloom.style.transform = `translate3d(${x * 16}px, ${y * 10}px, 0)`;
    });
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const waitForIdle = () => new Promise((resolve) => {
    if ("requestIdleCallback" in window) requestIdleCallback(() => resolve());
    else setTimeout(resolve, 120);
  });
  const decodeBackground = (src) => {
    const image = new Image();
    image.src = src;
    return image.decode().catch(() => undefined);
  };

  const steps = [
    { label: "Preparando seu convite…", weight: .42, minMs: 950, run: () => decodeBackground("assets/aero-horizon.webp") },
    { label: "Abrindo o universo Vistanology…", weight: .22, minMs: 700, run: () => document.fonts?.ready.then(() => undefined) ?? Promise.resolve() },
    { label: "Ajustando os detalhes…", weight: .18, minMs: 700, run: () => nextFrame() },
    { label: "Sincronizando o convite…", weight: .18, minMs: 700, run: () => waitForIdle() },
  ];
  const READY_MESSAGE = "Seu convite está pronto.";
  const delayed = (ms) => (reduceMotion ? 0 : ms);

  let finished = false;
  let stepIndex = 0;

  function paintProgress(value) {
    const percent = Math.max(value * 100, 4);
    fill.style.width = `${percent}%`;
    tip.style.left = `${percent}%`;
    bar.setAttribute("aria-valuenow", String(Math.round(percent)));
  }

  function finish() {
    if (finished) return;
    finished = true;
    status.textContent = READY_MESSAGE;
    paintProgress(1);
    boot.classList.add("is-leaving");
    site.classList.add("is-visible");
    site.removeAttribute("aria-hidden");
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    setTimeout(() => {
      boot.hidden = true;
      document.getElementById("hero-title").setAttribute("tabindex", "-1");
      document.getElementById("hero-title").focus({ preventScroll: true });
    }, delayed(800));
  }

  function showReveal() {
    stage.hidden = true;
    reveal.hidden = false;
    setTimeout(finish, delayed(1700));
  }

  skip.addEventListener("click", finish);

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  (async () => {
    let cumulative = 0;
    for (const step of steps) {
      status.textContent = step.label;
      if (finished) return;
      await Promise.all([
        Promise.race([step.run(), sleep(5000)]),
        sleep(delayed(step.minMs)),
      ]);
      if (finished) return;
      cumulative += step.weight;
      paintProgress(cumulative);
      stepIndex += 1;
    }
    if (finished) return;
    paintProgress(1);
    status.textContent = READY_MESSAGE;
    setTimeout(showReveal, delayed(1000));
  })();

  window.addEventListener("pagehide", () => { document.body.style.overflow = previousOverflow; }, { once: true });
})();
