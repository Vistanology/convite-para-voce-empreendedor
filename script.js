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
  const hero = document.querySelector(".hero");
  const heroBg = document.querySelector(".hero-bg");
  const heroMotes = document.querySelector(".hero-motes");
  if (!reduceMotion && hero && heroBg && heroMotes) {
    const frag = document.createDocumentFragment();
    for (let index = 0; index < 14; index += 1) {
      const mote = document.createElement("span");
      const size = 2.2 + Math.random() * 3.5;
      mote.className = "hero-mote";
      mote.style.left = `${4 + Math.random() * 92}%`;
      mote.style.top = `${12 + Math.random() * 78}%`;
      mote.style.width = `${size}px`;
      mote.style.height = `${size}px`;
      mote.style.setProperty("--delay", `${Math.random() * 6}s`);
      mote.style.setProperty("--duration", `${9 + Math.random() * 9}s`);
      mote.style.setProperty("--drift", `${(Math.random() - .5) * 80}px`);
      frag.appendChild(mote);
    }
    heroMotes.appendChild(frag);
    hero.addEventListener("pointermove", (event) => {
      const rect = hero.getBoundingClientRect();
      const x = (event.clientX / rect.width - .5) * 2;
      const y = (event.clientY / rect.height - .5) * 2;
      heroBg.style.setProperty("--hero-x", `${x * -14}px`);
      heroBg.style.setProperty("--hero-y", `${y * -9}px`);
    });
    hero.addEventListener("pointerleave", () => {
      heroBg.style.setProperty("--hero-x", "0px");
      heroBg.style.setProperty("--hero-y", "0px");
    });
  }

  const starField = (() => {
    if (reduceMotion || !canvas?.getContext) return { active: false, draw: () => {}, dispose: () => {}, setPos: () => {}, pause: () => {}, resume: () => {} };
    const ctx = canvas.getContext("2d");
    if (!ctx) return { active: false, draw: () => {}, dispose: () => {}, setPos: () => {}, pause: () => {}, resume: () => {} };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const stars = [];
    const state = { x: 0, y: 0, on: true, raf: 0, last: 0, size: 0, h: 0 };
    let seed = Date.now() ^ (Math.random() * 65536);
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const palette = [
      ["#7ff2ff", 0.5, "#11496160"],
      ["#bf6aff", 0.35, "#3b298f60"],
      ["#00e5ff", 0.45, "#0d4a5860"],
      ["#ff9e4d", 0.25, "#6b332760"],
      ["#ffd166", 0.30, "#6b4d2270"],
      ["#7ef9a1", 0.28, "#2f5e4860"],
    ];
    const useGradient = (gradient) => {
      gradient.addColorStop(0, palette[Math.floor(random() * palette.length)][2]);
      gradient.addColorStop(1, palette[Math.floor(random() * palette.length)][0]);
    };

    const count = () => {
      const total = Math.min(90, Math.max(24, Math.round((canvas.clientWidth * canvas.clientHeight) / 110000)));
      return total;
    };
    const addStars = () => {
      const total = count();
      while (stars.length < total) {
        stars.push({
          x: random() * (canvas.clientWidth || 100),
          y: random() * (canvas.clientHeight || 100),
          size: random(),
          speed: 0.5 + random() * 1.4,
          drift: (random() - .5) * 1.5,
          glow: random() * .8,
          pulse: random() * Math.PI * 2,
        });
      }
    };
    addStars();

    const draw = () => {
      state.size = canvas.clientWidth || 100;
      state.h = canvas.clientHeight || 100;
      if (canvas.width !== state.size * dpr) canvas.width = Math.max(1, Math.round(state.size * dpr));
      if (canvas.height !== state.h * dpr) canvas.height = Math.max(1, Math.round(state.h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, state.size, state.h);
      const now = performance.now();
      const dt = Math.min(Math.max(now - state.last, 0) / 1000, .04);
      state.last = now;
      const time = now * .0008;
      const t = Math.sin(time) * .45;
      while (stars.length < count()) stars.push({
        x: random() * state.size,
        y: -random() * Math.min(state.h * .45, 160),
        size: random(),
        speed: 0.5 + random() * 1.4,
        drift: (random() - .5) * 1.5,
        glow: random() * .8,
        pulse: random() * Math.PI * 2,
      });
      stars.forEach((star) => {
        star.y -= star.speed * dt * (20 + star.size * 12);
        star.x += star.drift + Math.sin(star.y * .03 + time) * 0.8;
        const bottom = state.h + (star.size * 6);
        const edge = state.size * .12;
        if (Math.random() < .12) {
          ctx.globalAlpha = (0.07 + 0.15 * Math.sin(time * 5 + star.y * .015)) * star.size;
          ctx.strokeStyle = "#8cf1ff";
          ctx.lineWidth = 1.2 * star.size;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y - Math.min(state.h * .55, 170));
          ctx.lineTo(star.x + (star.drift * 45), star.y);
          ctx.lineTo(star.x, star.y + Math.min(state.h * .15, 40));
          ctx.stroke();
        }
        if (star.y > bottom + edge) {
          star.y = -random() * Math.min(state.h * .35, 140);
          star.x = random() * state.size + (t * state.size * 0.1);
        }
        if (star.x < -edge) star.x += state.size + edge * 2;
        if (star.x > state.size + edge) star.x -= state.size + edge * 2;
        const [outer, bright, inner] = palette[Math.floor(random() * palette.length)] || palette[0];
        const radius = star.size * 1.1;
        const pulse = .65 + .35 * Math.sin(star.pulse + star.y * .012 + time);
        const opacity = (0.10 + 0.10 * Math.sin(star.pulse + star.y * .01 + time)) * pulse;
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, radius);
        gradient.addColorStop(0, outer);
        gradient.addColorStop(String(0.42), bright);
        gradient.addColorStop(String(1), inner);
        if (star.size > 0.9) {
          const stopOffset = Math.max(0.02, Math.min(.98, 0.28 + Math.sin(star.pulse + star.y * .02 + time) * .12));
          gradient.addColorStop(Math.max(0.01, stopOffset - 0.18), "transparent");
          gradient.addColorStop(stopOffset, "#ffffffc8");
          gradient.addColorStop(Math.min(0.98, stopOffset + 0.18), "transparent");
        }
        ctx.globalAlpha = opacity;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
        ctx.fill();
        if (star.size > 0.72) {
          ctx.globalAlpha = opacity * .16;
          ctx.strokeStyle = outer;
          ctx.lineWidth = star.size * .12;
          ctx.beginPath();
          ctx.arc(star.x, star.y, radius * 1.6, 0, Math.PI * 2);
          ctx.stroke();
        }
      });
    };
    const loop = () => {
      if (!state.on || !canvas.isConnected) return;
      if (document.visibilityState === "visible") draw();
      state.on && (state.raf = requestAnimationFrame(loop));
    };
    state.raf = requestAnimationFrame(loop);
    const dispose = () => { state.on = false; cancelAnimationFrame(state.raf); };
    return { active: true, draw, dispose, setPos: (x, y) => { state.x = x; state.y = y; }, pause: dispose, resume: () => { if (state.on !== true) { state.on = true; state.raf = requestAnimationFrame(loop); } } };
  })();
  canvas.addEventListener("pointermove", (event) => {
    starField.setPos?.(event.offsetX, event.offsetY);
  });
  const particles = starField;

  // Separadores entre as seções: filete fino com medalhão de vidro.
  const dividerTemplate = `
    <div class="sepa">
      <span class="sepa-rule" aria-hidden="true"><span class="sepa-glint"></span></span>
      <span class="sepa-dot sepa-dot--a" aria-hidden="true"></span>
      <span class="sepa-dot sepa-dot--b" aria-hidden="true"></span>
      <button type="button" class="sepa-seal" data-story-open aria-haspopup="dialog" aria-expanded="false" aria-label="Conhecer a história da Vistanology"><svg class="glass-emblem" aria-hidden="true"><use href="#vista-emblem" /></svg></button>
      <span class="sepa-caption" aria-hidden="true">Conheça a história</span>
    </div>`;
  const siteSections = Array.from(document.querySelectorAll(".site > section"));
  siteSections.slice(1).forEach((section) => section.insertAdjacentHTML("beforebegin", dividerTemplate));

  // Poeira ambiente: partículas lentas sobre o gradiente do fundo.
  const dustCanvas = document.querySelector(".ambience-dust");
  if (dustCanvas?.getContext) {
    const dctx = dustCanvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const motes = [];
    const dust = { on: !reduceMotion, raf: 0, x: 0, y: 0, tx: 0, ty: 0, last: 0 };
    const fill = () => {
      const total = Math.min(120, Math.max(36, Math.round(window.innerWidth * window.innerHeight / 16000)));
      while (motes.length < total) motes.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: .4 + Math.random() * 1.5,
        vy: -(2 + Math.random() * 7),
        sway: Math.random() * Math.PI * 2,
        swaySpeed: .2 + Math.random() * .5,
        depth: .25 + Math.random() * .75,
        alpha: .12 + Math.random() * .3,
        warm: Math.random() < .18,
      });
      motes.length = total;
    };
    const drawDust = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (dustCanvas.width !== Math.round(w * dpr)) dustCanvas.width = Math.round(w * dpr);
      if (dustCanvas.height !== Math.round(h * dpr)) dustCanvas.height = Math.round(h * dpr);
      dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dctx.clearRect(0, 0, w, h);
      const now = performance.now();
      const dt = Math.min((now - (dust.last || now)) / 1000, .05);
      dust.last = now;
      dust.x += (dust.tx - dust.x) * .04;
      dust.y += (dust.ty - dust.y) * .04;
      const time = now * .001;
      motes.forEach((m) => {
        m.y += m.vy * dt;
        m.sway += m.swaySpeed * dt;
        if (m.y < -10) { m.y = h + 10; m.x = Math.random() * w; }
        const px = m.x + Math.sin(m.sway) * 14 + dust.x * m.depth * 26;
        const py = m.y + Math.cos(m.sway * .7) * 6 + dust.y * m.depth * 18;
        const twinkle = .7 + .3 * Math.sin(time * (1 + m.depth) + m.sway * 3);
        dctx.globalAlpha = m.alpha * twinkle * m.depth;
        dctx.fillStyle = m.warm ? "#ffe9c2" : "#cdefff";
        dctx.beginPath();
        dctx.arc(px, py, m.r * m.depth + .3, 0, Math.PI * 2);
        dctx.fill();
      });
      dctx.globalAlpha = 1;
    };
    const dustLoop = () => {
      if (!dust.on || document.visibilityState !== "visible") { dust.raf = 0; return; }
      drawDust();
      dust.raf = requestAnimationFrame(dustLoop);
    };
    fill();
    if (dust.on) {
      dust.raf = requestAnimationFrame(dustLoop);
      window.addEventListener("pointermove", (e) => {
        dust.tx = (e.clientX / window.innerWidth - .5) * 2;
        dust.ty = (e.clientY / window.innerHeight - .5) * 2;
      }, { passive: true });
      window.addEventListener("resize", fill);
      document.addEventListener("visibilitychange", () => {
        if (dust.on && !dust.raf && document.visibilityState === "visible") dust.raf = requestAnimationFrame(dustLoop);
      });
    } else {
      drawDust();
    }
  }

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

  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("nav-toggle");
  const navDrawer = document.getElementById("nav-drawer");
  const navDrawerSheet = navDrawer.querySelector(".nav-drawer-sheet");
  const navDrawerOverflow = () => {
    const previous = document.body.style.overflow;
    return () => { document.body.style.overflow = previous; };
  };
  const restoreNavOverflow = navDrawerOverflow();

  function openNav(focusDrawer = false) {
    if (!navDrawer.hasAttribute("hidden") || !document.getElementById("chat-modal").hidden || !storyModal.hidden || !pricingPanel.hidden) return;
    document.body.style.overflow = "hidden";
    navDrawer.removeAttribute("hidden");
    navToggle.setAttribute("aria-expanded", "true");
    navDrawerSheet.classList.add("is-open");
    if (focusDrawer) setTimeout(() => navDrawerSheet.querySelector("a, button")?.focus({ preventScroll: true }), delayed(420));
  }

  function closeNav() {
    if (navDrawer.hasAttribute("hidden")) return;
    navDrawer.classList.remove("is-open");
    navDrawerSheet.classList.remove("is-open");
    setTimeout(() => {
      navDrawer.setAttribute("hidden", "");
      navToggle.setAttribute("aria-expanded", "false");
      restoreNavOverflow();
    }, delayed(320));
  }

  navToggle.addEventListener("click", () => openNav(true));
  navDrawer.querySelectorAll(".nav-drawer-backdrop").forEach((element) => element.addEventListener("click", closeNav));
  navDrawer.querySelectorAll("a, .nav-drawer-cta").forEach((element) => element.addEventListener("click", () => {
    setTimeout(closeNav, delayed(80));
  }));
  navDrawer.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !navDrawer.hasAttribute("hidden")) {
      event.preventDefault();
      closeNav();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !navDrawer.hasAttribute("hidden")) {
      event.preventDefault();
      closeNav();
    }
  });

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
      navToggle.focus({ preventScroll: true });
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
      particles.draw?.();
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
    if (!chatModal.hidden || !modal.hidden || !storyModal.hidden || !pricingPanel.hidden || !navDrawer.hasAttribute("hidden")) return;
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
