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
  const delayed = (ms) => (reduceMotion ? 0 : ms);
  const boot = document.getElementById("boot");
  const site = document.getElementById("conteudo");
  const stage = document.getElementById("boot-stage");
  const reveal = document.getElementById("reveal");
  const skip = document.getElementById("boot-skip");
  const bar = document.getElementById("boot-bar");
  const fill = document.getElementById("boot-fill");
  const tip = document.getElementById("boot-tip");
  const status = document.getElementById("boot-status");
  const bloom = document.getElementById("boot-bloom");
  const particles = document.getElementById("boot-particles");
  const frame = document.querySelector(".boot-bg-frame");

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
      frame.style.transform = `translate3d(${x * -12}px, ${y * -8}px, 0)`;
      bloom.style.transform = `translate3d(${x * 16}px, ${y * 10}px, 0)`;
    });
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const nextFrame = () => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  const waitForIdle = () => new Promise((resolve) => {
    if ("requestIdleCallback" in window) requestIdleCallback(() => resolve());
    else setTimeout(resolve, 100);
  });
  const decodeBackground = (src) => {
    const image = new Image();
    image.src = src;
    return image.decode().catch(() => undefined);
  };

  const steps = [
    { label: "Preparando seu convite…", weight: .42, minMs: 620, run: () => decodeBackground("assets/aero-horizon.webp") },
    { label: "Abrindo o universo Vistanology…", weight: .22, minMs: 460, run: () => document.fonts?.ready.then(() => undefined) ?? Promise.resolve() },
    { label: "Selando o convite…", weight: .18, minMs: 420, run: () => nextFrame() },
    { label: "Tudo pronto para você.", weight: .18, minMs: 420, run: () => waitForIdle() },
  ];

  let finished = false;
  let revealing = false;

  function paintProgress(value) {
    const percent = Math.max(value * 100, 4);
    fill.style.width = `${percent}%`;
    tip.style.left = `${percent}%`;
    bar.setAttribute("aria-valuenow", String(Math.round(percent)));
  }

  function observeReveals() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || reduceMotion) {
      items.forEach((item) => item.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: .15, rootMargin: "0px 0px -8% 0px" });
    items.forEach((item) => observer.observe(item));
  }

  function finish() {
    if (finished) return;
    finished = true;
    paintProgress(1);
    status.textContent = "Tudo pronto para você.";
    boot.classList.add("is-leaving");
    reveal.classList.add("is-leaving");
    site.classList.add("is-visible");
    site.removeAttribute("aria-hidden");
    document.body.style.overflow = "";
    window.scrollTo(0, 0);
    observeReveals();
    setTimeout(() => {
      boot.hidden = true;
      reveal.hidden = true;
      const title = document.getElementById("hero-title");
      title.setAttribute("tabindex", "-1");
      title.focus({ preventScroll: true });
    }, delayed(760));
  }

  function showReveal() {
    if (finished || revealing) return;
    revealing = true;
    stage.hidden = true;
    reveal.hidden = false;
    reveal.removeAttribute("aria-hidden");
    setTimeout(finish, delayed(2500));
  }

  skip.addEventListener("click", () => {
    if (revealing) finish();
    else showReveal();
  });

  document.body.style.overflow = "hidden";

  (async () => {
    let cumulative = 0;
    for (const step of steps) {
      status.textContent = step.label;
      await Promise.all([
        Promise.race([step.run(), sleep(5000)]),
        sleep(delayed(step.minMs)),
      ]);
      if (finished || revealing) return;
      cumulative += step.weight;
      paintProgress(cumulative);
    }
    if (finished || revealing) return;
    paintProgress(1);
    status.textContent = "Tudo pronto para você.";
    setTimeout(showReveal, delayed(650));
  })();

  // Navegador integrado: cada protótipo abre em um modal com iframe.
  const modal = document.getElementById("browser-modal");
  const viewport = document.querySelector(".browser-viewport");
  const iframe = document.getElementById("modal-frame");
  const modalTitle = document.getElementById("modal-title");
  const modalOwner = document.getElementById("modal-owner");
  const modalUrl = document.getElementById("modal-url");
  const modalExternal = document.getElementById("modal-external");
  const modalClose = document.getElementById("modal-close");
  const magicLoadingTitle = document.getElementById("modal-loading-title");
  const magicSparks = document.getElementById("magic-sparks");

  let opener = null;
  let previousOverflow = "";
  let closeTimer = 0;
  let loadTimer = 0;
  let loadStart = 0;

  // Cada protótipo é renderizado em 1440x900 e escalado para caber no monitor inteiro.
  const FIT_WIDTH = 1440;
  const FIT_HEIGHT = 900;

  function fitIframe() {
    if (modal.hidden) return;
    const area = viewport.getBoundingClientRect();
    if (!area.width || !area.height) return;
    const scale = Math.min(area.width / FIT_WIDTH, area.height / FIT_HEIGHT);
    const left = (area.width - FIT_WIDTH * scale) / 2;
    const top = (area.height - FIT_HEIGHT * scale) / 2;
    iframe.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
  }

  iframe.addEventListener("load", () => {
    clearTimeout(loadTimer);
    const wait = Math.max(0, 750 - (Date.now() - loadStart));
    loadTimer = setTimeout(() => {
      if (modal.hidden) return;
      viewport.classList.add("is-loaded");
      fitIframe();
      modalClose.focus({ preventScroll: true });
    }, wait);
  });
  window.addEventListener("resize", fitIframe);

  // O loading mágico acontece dentro do próprio modal, sem etapa separada.
  function buildSparks() {
    magicSparks.replaceChildren();
    if (reduceMotion) return;
    for (let index = 0; index < 22; index += 1) {
      const spark = document.createElement("span");
      spark.className = "magic-spark";
      spark.style.left = `${8 + Math.random() * 84}%`;
      spark.style.top = `${52 + Math.random() * 44}%`;
      spark.style.setProperty("--size", `${2 + Math.random() * 4}px`);
      spark.style.setProperty("--delay", `${Math.random() * .8}s`);
      spark.style.setProperty("--duration", `${1.4 + Math.random() * 1.3}s`);
      spark.style.setProperty("--dx", `${(Math.random() - .5) * 160}px`);
      magicSparks.appendChild(spark);
    }
  }

  function showModal(button) {
    clearTimeout(loadTimer);
    const title = button.dataset.title || "Protótipo";
    modalTitle.textContent = title;
    magicLoadingTitle.textContent = title;
    modalOwner.textContent = button.dataset.owner || "Vistanology";
    modalUrl.textContent = button.dataset.url || "";
    modalExternal.href = button.dataset.url || "#";
    viewport.classList.remove("is-loaded");
    buildSparks();
    iframe.removeAttribute("src");
    iframe.title = `Prévia ao vivo: ${title}`;
    modal.hidden = false;
    modal.classList.remove("is-closing");
    document.body.style.overflow = "hidden";
    loadStart = Date.now();
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
      fitIframe();
      iframe.src = button.dataset.url;
      modalClose.focus({ preventScroll: true });
    });
  }

  function openPrototype(button) {
    if (!modal.hidden) return;
    clearTimeout(closeTimer);
    opener = button;
    previousOverflow = document.body.style.overflow;
    showModal(button);
  }

  function closeModal() {
    if (modal.hidden) return;
    clearTimeout(closeTimer);
    clearTimeout(loadTimer);
    modal.classList.remove("is-open");
    modal.classList.add("is-closing");
    document.body.style.overflow = previousOverflow;
    closeTimer = setTimeout(() => {
      modal.hidden = true;
      iframe.removeAttribute("src");
      modal.classList.remove("is-closing");
      if (opener) opener.focus({ preventScroll: true });
    }, delayed(380));
  }

  document.querySelectorAll(".prototype-window").forEach((button) => {
    button.addEventListener("click", () => openPrototype(button));
  });
  modal.querySelector("[data-close]").addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);

  window.addEventListener("keydown", (event) => {
    if (modal.hidden) return;
    if (event.key === "Escape") {
      closeModal();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = [modalClose, modalExternal];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
