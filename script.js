(() => {
  "use strict";

  const WHATSAPP_NUMBER = "5513955488379";
  const WHATSAPP_DISPLAY = "+55 (13) 95548-8379";
  const SIMPLE_MESSAGE =
    "Oi, quero conhecer! Vim pelo convite da Vistanology e vi que estão em promoção. Gostaria de conversar sobre criar um sistema ou landing page para o meu negócio e saber as condições. Obrigado!";

  const waUrl = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  const chatTriggers = document.querySelectorAll("[data-chat-open]");

  function pointTriggers(message) {
    chatTriggers.forEach((link) => {
      link.setAttribute("href", waUrl(message));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      link.setAttribute("aria-label", "Quero conversar com a Vista — escolher a mensagem no WhatsApp");
    });
  }

  function openWhatsapp(message) {
    pointTriggers(message);
    window.open(waUrl(message), "_blank", "noopener,noreferrer");
  }

  pointTriggers(SIMPLE_MESSAGE);
  document.getElementById("wa-display").textContent = WHATSAPP_DISPLAY;
  document.getElementById("year").textContent = String(new Date().getFullYear());

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const delayed = (ms) => (reduceMotion ? 0 : ms);
  const boot = document.getElementById("boot");
  const site = document.getElementById("conteudo");
  const stage = document.getElementById("boot-stage");
  const reveal = document.getElementById("reveal");
  const skip = document.getElementById("boot-skip");
  const offButton = boot.querySelector(".boot-off");
  const bar = document.getElementById("boot-bar");
  const fill = document.getElementById("boot-fill");
  const tip = document.getElementById("boot-tip");
  const status = document.getElementById("boot-status");
  const canvas = document.getElementById("boot-particles");

  const particles = (() => {
    if (reduceMotion || !canvas?.getContext) return { active: false, draw: () => {}, dispose: () => {}, paused: true };
    const ctx = canvas.getContext("2d");
    if (!ctx) return { active: false, draw: () => {}, dispose: () => {}, paused: true };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const state = { x: 0, y: 0, offsetWidth: 0, offsetHeight: 0, raf: 0, last: 0, on: true };
    let raf = 0;
    let seed = Date.now();
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const items = Array.from({ length: 0 }, () => null);

    const add = () => {
      const width = Math.max(80, canvas.clientWidth || 0);
      const height = Math.max(80, canvas.clientHeight || 0);
      const count = Math.min(28, Math.max(8, Math.round((width * height) / 140000)));
      for (let index = 0; index < count; index += 1) {
        items.push({
          x: random() * width,
          y: -random() * 120,
          z: 0.22 + random() * 0.9,
          speed: 14 + random() * 22,
          drift: (random() - .5) * 20,
          bright: .35 + random() * .65,
        });
      }
    };
    add();

    const draw = () => {
      const width = Math.max(80, canvas.clientWidth || 0);
      const height = Math.max(80, canvas.clientHeight || 0);
      if (state.offsetWidth !== width || state.offsetHeight !== height) {
        state.offsetWidth = width;
        state.offsetHeight = height;
        canvas.width = Math.max(1, Math.round(width * dpr));
        canvas.height = Math.max(1, Math.round(height * dpr));
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      const now = performance.now();
      const dt = Math.min(now - state.last, 80) / 1000;
      state.last = now;
      const time = now * .0012;
      items.forEach((item) => {
        item.y += item.speed * dt;
        item.x += item.drift + Math.sin(item.y * .002 + time) * 1.5;
        const dx = item.x - state.x;
        const dy = item.y - state.y;
        const dist = Math.hypot(dx, dy);
        const size = item.bright * (1.8 + item.z * 2.2) * Math.max(0, 1 - dist / 900);
        if (size < .5) return;
        const shift = Math.sin(time * 3 + dist * .02) * 16;
        ctx.globalAlpha = Math.max(.1, size / 7);
        const gradient = ctx.createRadialGradient(item.x + shift, item.y + shift, 0, item.x + shift, item.y + shift, size);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(.5, "#7edbff");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(item.x + shift, item.y + shift, size, 0, Math.PI * 2);
        ctx.fill();
        if (dist < 180) {
          const alpha = Math.max(0, 1 - dist / 180);
          ctx.globalAlpha = alpha * .22;
          ctx.beginPath();
          ctx.moveTo(item.x, item.y);
          ctx.lineTo(state.x, state.y);
          ctx.strokeStyle = "#4ee0ff";
          ctx.lineWidth = .7;
          ctx.stroke();
        }
      });
      for (let index = items.length - 1; index >= 0; index -= 1) {
        if (items[index].y > height + 40) items.splice(index, 1);
      }
      if (items.length < Math.min(28, Math.max(8, Math.round((state.offsetWidth * state.offsetHeight) / 140000)))) add();
    };

    const loop = () => {
      if (!state.on || !canvas.isConnected) return;
      if (document.visibilityState === "visible") draw();
      state.on && (raf = requestAnimationFrame(loop));
    };
    raf = requestAnimationFrame(loop);
    const dispose = () => {
      state.on = false;
      cancelAnimationFrame(raf);
    };
    return { active: true, draw, dispose, setPos: (x, y) => { state.x = x; state.y = y; }, pause: dispose, resume: () => { if (state.on !== true) { state.on = true; raf = requestAnimationFrame(loop); } } };
  })();
  canvas.addEventListener("pointermove", (event) => {
    particles.setPos?.(event.offsetX, event.offsetY);
  });

  // Separadores entre as seções: um feixe de magia com hue iridescente.
  const dividerTemplate = `
    <div class="hue-divider">
      <span class="hue-beam hue-beam-a" aria-hidden="true"></span>
      <span class="hue-beam hue-beam-b" aria-hidden="true"></span>
      <span class="hue-beam hue-beam-c" aria-hidden="true"></span>
      <span class="hue-rays" aria-hidden="true"></span>
      <button type="button" class="hue-core" data-story-open aria-haspopup="dialog" aria-expanded="false" aria-label="Conhecer a história da Vistanology"><svg class="glass-emblem" aria-hidden="true"><use href="#vista-emblem" /></svg></button>
      <span class="hue-sparks" data-hue-sparks aria-hidden="true"></span>
      <span class="hue-word" aria-hidden="true">TOQUE NO EMBLEMA · CONHEÇA A HISTÓRIA</span>
    </div>`;
  const siteSections = Array.from(document.querySelectorAll(".site > section"));
  siteSections.slice(1).forEach((section) => section.insertAdjacentHTML("beforebegin", dividerTemplate));
  document.querySelectorAll("[data-hue-sparks]").forEach((container) => {
    if (reduceMotion) return;
    const frag = document.createDocumentFragment();
    for (let index = 0; index < 18; index += 1) {
      const spark = document.createElement("span");
      const size = 2 + Math.random() * 3;
      spark.className = "hue-spark";
      spark.style.left = `${3 + Math.random() * 94}%`;
      spark.style.top = `${28 + Math.random() * 52}%`;
      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.setProperty("--hue", String(Math.floor(Math.random() * 360)));
      spark.style.setProperty("--delay", `${Math.random() * 5}s`);
      spark.style.setProperty("--duration", `${4 + Math.random() * 5}s`);
      spark.style.setProperty("--drift", `${(Math.random() - .5) * 90}px`);
      frag.appendChild(spark);
    }
    container.appendChild(frag);
  });

  // Valores: páginas começam em R$ 100/mês; sistemas em R$ 500/mês.
  // Anual à vista equivale a 10 mensalidades — 12 meses com 2 grátis.
  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  const PRICE_PLANS = {
    page: [
      { name: "Essencial", min: 100, max: 500, note: "Uma página focada em transformar visita em contato." },
      { name: "Profissional", min: 600, max: 900, note: "Mais páginas, identidade e integrações com o seu fluxo." },
      { name: "Premium", min: 1200, max: 1500, note: "Experiência completa, conteúdo e acompanhamento." },
    ],
    system: [
      { name: "Essencial", min: 500, max: 900, note: "Sistemas começam em R$ 500/mês: painel e fluxos essenciais." },
      { name: "Profissional", min: 1200, max: 1500, note: "Automações, integrações e área de usuário." },
      { name: "Sob medida", min: 1500, max: null, note: "Escopo maior, evolução contínua e suporte dedicado." },
    ],
  };

  function priceRange(plan, billing) {
    const factor = billing === "annual" ? 10 : 1;
    const min = brl.format(plan.min * factor);
    if (!plan.max) return `A partir de ${min}`;
    return `${min} – ${brl.format(plan.max * factor)}`;
  }
  function pricePeriod(billing) {
    return billing === "annual" ? "12 meses à vista · 2 grátis" : "por mês";
  }
  function goalForKind(kind) {
    return kind === "system" ? "Um sistema" : "Uma landing page";
  }

  const pricingPanel = document.getElementById("pricing-panel");
  const pricingSheet = pricingPanel.querySelector(".pricing-sheet");
  const pricingOpen = document.querySelector("[data-pricing-open]");
  const pricingClose = pricingPanel.querySelector(".pricing-close");
  let pricingOverflow = "";
  let pricingCloseTimer = 0;

  function openPricing() {
    if (!pricingPanel.hidden || !document.getElementById("chat-modal").hidden || !document.getElementById("browser-modal").hidden || !document.getElementById("story-modal").hidden) return;
    clearTimeout(pricingCloseTimer);
    pricingOverflow = document.body.style.overflow;
    pricingPanel.hidden = false;
    document.body.style.overflow = "hidden";
    pricingOpen.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      pricingPanel.classList.add("is-open");
      pricingClose.focus({ preventScroll: true });
    });
  }

  function closePricing(restoreFocus = true) {
    if (pricingPanel.hidden) return;
    clearTimeout(pricingCloseTimer);
    pricingPanel.classList.remove("is-open");
    document.body.style.overflow = pricingOverflow;
    pricingOpen.setAttribute("aria-expanded", "false");
    pricingCloseTimer = setTimeout(() => {
      pricingPanel.hidden = true;
      if (restoreFocus) pricingOpen.focus({ preventScroll: true });
    }, delayed(400));
  }

  pricingOpen.addEventListener("click", openPricing);
  pricingPanel.querySelectorAll("[data-pricing-close]").forEach((element) => {
    element.addEventListener("click", () => closePricing());
  });

  document.addEventListener("keydown", (event) => {
    if (pricingPanel.hidden) return;
    if (event.key === "Escape") {
      closePricing();
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(pricingSheet.querySelectorAll("button, a[href]"))
      .filter((element) => !element.closest("[hidden]") && !element.disabled);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const priceGrid = document.getElementById("price-grid");
  let sitePriceKind = "page";
  let siteBilling = "monthly";

  function renderPrices() {
    priceGrid.replaceChildren();
    PRICE_PLANS[sitePriceKind].forEach((plan, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "price-card reveal in";
      card.dataset.priceCard = "";
      card.dataset.kind = sitePriceKind;
      card.dataset.tier = String(index);
      card.dataset.billing = siteBilling;
      card.setAttribute("aria-label", `${plan.name}: ${priceRange(plan, siteBilling)}, ${pricePeriod(siteBilling)}. Quero este.`);
      card.innerHTML = `
        <span class="price-index">0${index + 1}</span>
        <span class="price-name">${plan.name}</span>
        <strong class="price-value">${priceRange(plan, siteBilling)}</strong>
        <span class="price-period">${pricePeriod(siteBilling)}</span>
        <span class="price-note-card">${plan.note}</span>
        <span class="price-cta">QUERO ESTE →</span>`;
      priceGrid.appendChild(card);
    });
  }

  document.querySelectorAll("[data-price-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      sitePriceKind = button.dataset.priceKind;
      document.querySelectorAll("[data-price-kind]").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      renderPrices();
    });
  });
  document.querySelectorAll("[data-site-billing]").forEach((button) => {
    button.addEventListener("click", () => {
      siteBilling = button.dataset.siteBilling;
      document.querySelectorAll("[data-site-billing]").forEach((tab) => {
        const active = tab === button;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-pressed", String(active));
      });
      renderPrices();
    });
  });
  priceGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-price-card]");
    if (!card) return;
    const plan = PRICE_PLANS[card.dataset.kind][Number(card.dataset.tier)];
    const preset = {
      goal: goalForKind(card.dataset.kind),
      billing: card.dataset.billing,
      budget: priceRange(plan, card.dataset.billing),
    };
    closePricing(false);
    setTimeout(() => openChat(document.querySelector("[data-chat-open]"), preset), delayed(420));
  });
  renderPrices();

  // Núcleo limpo: só o leve parallax do cosmos e da aura, sem partículas.
  if (!reduceMotion) {
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

  const disableParticles = () => {
    offButton.setAttribute("aria-pressed", "true");
    offButton.textContent = "Anim. desligadas";
    particles.on = false;
    particles.dispose?.();
    canvas.style.display = "none";
  };
  offButton.addEventListener("click", () => {
    if (offButton.textContent.startsWith("Desligar")) {
      disableParticles();
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") particles.draw?.();
      });
    } else {
      offButton.setAttribute("aria-pressed", "false");
      offButton.textContent = "Desligar animações";
      canvas.style.display = "block";
      particles.on = true;
      particles.resume?.();
    }
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
    if (!modal.hidden || !pricingPanel.hidden || !document.getElementById("story-modal").hidden || !document.getElementById("chat-modal").hidden) return;
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

  // O emblema dos separadores abre a história da Vistanology em um modal.
  const storyModal = document.getElementById("story-modal");
  const storyCard = storyModal.querySelector(".story-card");
  const storySparks = document.getElementById("story-sparks");
  const storyTriggers = document.querySelectorAll("[data-story-open]");
  const storyChat = storyModal.querySelector("[data-story-chat]");
  const storyClose = storyModal.querySelector(".story-close");
  let storyOpener = null;
  let storyOverflow = "";
  let storyCloseTimer = 0;

  function buildStorySparks() {
    storySparks.replaceChildren();
    if (reduceMotion) return;
    for (let index = 0; index < 20; index += 1) {
      const spark = document.createElement("span");
      spark.className = "story-spark";
      spark.style.left = `${8 + Math.random() * 84}%`;
      spark.style.top = `${10 + Math.random() * 80}%`;
      spark.style.setProperty("--size", `${2 + Math.random() * 3}px`);
      spark.style.setProperty("--hue", String(Math.floor(Math.random() * 360)));
      spark.style.setProperty("--delay", `${Math.random() * 4}s`);
      spark.style.setProperty("--duration", `${3 + Math.random() * 4}s`);
      spark.style.setProperty("--drift", `${(Math.random() - .5) * 70}px`);
      storySparks.appendChild(spark);
    }
  }

  function openStory(trigger) {
    if (!storyModal.hidden || !modal.hidden || !pricingPanel.hidden || !document.getElementById("chat-modal").hidden) return;
    clearTimeout(storyCloseTimer);
    storyOpener = trigger;
    storyOverflow = document.body.style.overflow;
    buildStorySparks();
    storyModal.hidden = false;
    document.body.style.overflow = "hidden";
    storyTriggers.forEach((item) => item.setAttribute("aria-expanded", "true"));
    requestAnimationFrame(() => {
      storyModal.classList.add("is-open");
      storyClose.focus({ preventScroll: true });
    });
  }

  function closeStory() {
    if (storyModal.hidden) return;
    clearTimeout(storyCloseTimer);
    storyModal.classList.remove("is-open");
    document.body.style.overflow = storyOverflow;
    storyTriggers.forEach((item) => item.setAttribute("aria-expanded", "false"));
    storyCloseTimer = setTimeout(() => {
      storyModal.hidden = true;
      if (storyOpener) storyOpener.focus({ preventScroll: true });
    }, delayed(360));
  }

  storyTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openStory(trigger));
  });
  storyModal.querySelectorAll("[data-story-close]").forEach((element) => {
    element.addEventListener("click", closeStory);
  });
  storyChat.addEventListener("click", () => {
    const chatTrigger = document.querySelector("[data-chat-open]");
    closeStory();
    setTimeout(() => {
      if (chatTrigger) openChat(chatTrigger);
    }, delayed(380));
  });

  document.addEventListener("keydown", (event) => {
    if (storyModal.hidden) return;
    if (event.key === "Escape") {
      closeStory();
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(storyCard.querySelectorAll("button")).filter((element) => !element.disabled);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

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

  // O botão pergunta como começar e monta a mensagem com o que for informado.
  const chatModal = document.getElementById("chat-modal");
  const chatCard = chatModal.querySelector(".chat-card");
  const chatOptions = document.getElementById("chat-options");
  const chatForm = document.getElementById("chat-form");
  let chatOpener = null;
  let chatOverflow = "";
  let chatCloseTimer = 0;
  let formBilling = "monthly";

  function fieldValue(id) {
    return document.getElementById(id).value.trim();
  }

  function planKindForGoal() {
    return /sistema/i.test(fieldValue("chat-goal")) ? "system" : "page";
  }

  function syncBudgetOptions(preferred, keepIndex) {
    const budget = document.getElementById("chat-budget");
    const previousIndex = budget.selectedIndex;
    const previous = preferred || budget.value;
    budget.replaceChildren();
    PRICE_PLANS[planKindForGoal()].forEach((plan) => {
      const option = document.createElement("option");
      option.value = priceRange(plan, formBilling);
      option.textContent = `${option.value} · ${pricePeriod(formBilling)}`;
      budget.appendChild(option);
    });
    if (preferred) budget.value = preferred;
    else if (keepIndex) budget.selectedIndex = Math.min(previousIndex, budget.options.length - 1);
    else if (Array.from(budget.options).some((option) => option.value === previous)) budget.value = previous;
  }

  function setFormBilling(value) {
    formBilling = value;
    document.querySelectorAll("[data-form-billing]").forEach((button) => {
      const active = button.dataset.formBilling === value;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
    syncBudgetOptions(null, true);
  }

  function openChat(trigger, preset) {
    if (!chatModal.hidden || !modal.hidden || !storyModal.hidden || !pricingPanel.hidden) return;
    clearTimeout(chatCloseTimer);
    chatOpener = trigger;
    chatOverflow = document.body.style.overflow;
    if (preset) {
      document.getElementById("chat-goal").value = preset.goal;
      setFormBilling(preset.billing);
      syncBudgetOptions(preset.budget);
      chatOptions.hidden = true;
      chatForm.hidden = false;
    } else {
      chatOptions.hidden = false;
      chatForm.hidden = true;
    }
    chatModal.hidden = false;
    document.body.style.overflow = "hidden";
    trigger.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => {
      chatModal.classList.add("is-open");
      const firstFocus = preset ? chatForm.querySelector("input") : chatOptions.querySelector("button");
      firstFocus.focus({ preventScroll: true });
    });
  }

  function closeChat() {
    if (chatModal.hidden) return;
    clearTimeout(chatCloseTimer);
    chatModal.classList.remove("is-open");
    document.body.style.overflow = chatOverflow;
    chatTriggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
    chatCloseTimer = setTimeout(() => {
      chatModal.hidden = true;
      if (chatOpener) chatOpener.focus({ preventScroll: true });
    }, delayed(320));
  }

  function buildDetailedMessage() {
    const details = [
      ["Como te chamar", fieldValue("chat-name")],
      ["Negócio/projeto", fieldValue("chat-business")],
      ["O que quero criar", fieldValue("chat-goal")],
      ["Como prefere pagar", formBilling === "annual" ? "Anual à vista (12 meses, 2 meses grátis)" : "Mensal"],
      ["Prazo", fieldValue("chat-deadline")],
      ["O que precisa resolver", fieldValue("chat-detail")],
      ["Faixa escolhida", fieldValue("chat-budget")],
    ].filter(([, value]) => value);
    const lines = [
      "Olá, Vista! Vim pelo convite da Vistanology e quero adiantar algumas informações para você se organizar:",
      "",
    ];
    details.forEach(([label, value]) => lines.push(`• ${label}: ${value}`));
    lines.push("", "Pode me explicar como funciona, o prazo, o investimento e as condições da promoção com base nesses detalhes? Obrigado!");
    return lines.join("\n");
  }

  chatTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openChat(trigger);
    });
  });
  chatModal.querySelectorAll("[data-chat-close]").forEach((element) => {
    element.addEventListener("click", closeChat);
  });
  chatOptions.querySelector("[data-chat-simple]").addEventListener("click", () => {
    openWhatsapp(SIMPLE_MESSAGE);
    closeChat();
  });
  chatOptions.querySelector("[data-chat-guided]").addEventListener("click", () => {
    chatOptions.hidden = true;
    chatForm.hidden = false;
    chatForm.querySelector("input").focus({ preventScroll: true });
  });
  chatForm.querySelector("[data-chat-back]").addEventListener("click", () => {
    chatForm.hidden = true;
    chatOptions.hidden = false;
    chatOptions.querySelector("[data-chat-guided]").focus({ preventScroll: true });
  });
  document.querySelectorAll("[data-form-billing]").forEach((button) => {
    button.addEventListener("click", () => setFormBilling(button.dataset.formBilling));
  });
  document.getElementById("chat-goal").addEventListener("change", () => syncBudgetOptions(null, true));
  syncBudgetOptions();
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = buildDetailedMessage();
    openWhatsapp(message);
    closeChat();
  });

  document.addEventListener("keydown", (event) => {
    if (chatModal.hidden) return;
    if (event.key === "Escape") {
      closeChat();
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(chatCard.querySelectorAll("button, input, select, textarea, a[href]"))
      .filter((element) => !element.closest("[hidden]") && !element.disabled);
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
})();
