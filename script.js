/* =========================================================
   ✏️  EDIT YOUR LINKS HERE
   ========================================================= */
const LINKS = {
  github:   "https://github.com/Praj170206",
  linkedin: "https://www.linkedin.com/in/connectwithprajwal/",
  leetcode: "https://leetcode.com/u/Prajwal_C_Jain/",
};

/* LeetCode username for live stats. GFG_SOLVED is added on top for the "DSA problems solved" counter. */
const LEETCODE_USER = "Prajwal_C_Jain";
const GFG_SOLVED = 50;

/* Contact form: create a free form at https://formspree.io (sign up with the email
   you want messages delivered to), then paste the form ID here — e.g. "xyzabcd"
   from https://formspree.io/f/xyzabcd. While empty, the form opens Gmail instead. */
const FORMSPREE_ID = "";
/* Google Sheet: follow the steps in google-apps-script.gs, then paste the
   Web app URL (ends in /exec) here. You can use this, Formspree, or both. */
const GOOGLE_SHEET_URL = "";
const CONTACT_EMAIL = "prajwalcj1702@gmail.com";

const TYPED_WORDS = [
  "AI for accessibility.",
  "full-stack web apps.",
  "security tools.",
  "things that matter.",
];

/* Tech logos (Devicon). Any chip / stack item whose text matches a key
   below gets its logo; anything not listed stays as plain text.
   "inv" = logo is black, so it's inverted to show on the dark background. */
const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
const LOGOS = {
  "python":       "python/python-original",
  "c++":          "cplusplus/cplusplus-original",
  "c":            "c/c-original",
  "java":         "java/java-original",
  "javascript":   "javascript/javascript-original",
  "typescript":   "typescript/typescript-original",
  "sql":          "azuresqldatabase/azuresqldatabase-original",
  "mysql":        "mysql/mysql-original",
  "html":         "html5/html5-original",
  "css":          "css3/css3-original",
  "react":        "react/react-original",
  "react.js":     "react/react-original",
  "next.js":      { p: "nextjs/nextjs-original", inv: true },
  "node.js":      "nodejs/nodejs-original",
  "express":      { p: "express/express-original", inv: true },
  "express.js":   { p: "express/express-original", inv: true },
  "mongodb":      "mongodb/mongodb-original",
  "elk stack":    "elasticsearch/elasticsearch-original",
  "opencv":       "opencv/opencv-original",
  "google cloud": "googlecloud/googlecloud-original",
  "aws":          { p: "amazonwebservices/amazonwebservices-original-wordmark", inv: true },
  "git":          "git/git-original",
  "github":       { p: "github/github-original", inv: true },
  "vite":         "vitejs/vitejs-original",
  "spring boot":  "spring/spring-original",
  "supabase":     "supabase/supabase-original",
  "tailwind":     "tailwindcss/tailwindcss-original",
};

/* Scrolling strip under the hero */
const MARQUEE = ["Python", "C++", "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
  "Express", "MongoDB", "MySQL", "OpenCV", "Spring Boot", "Tailwind", "Git", "Google Cloud", "AWS"];

/* ========================================================= */
const $ =(s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- Links ---------- */
$$("[data-link]").forEach((a) => {
  const url = LINKS[a.dataset.link];
  if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
});
$("#year").textContent = new Date().getFullYear();

/* ---------- Tech logos ---------- */
function logoImg(name) {
  const entry = LOGOS[name.trim().toLowerCase()];
  if (!entry) return null;
  const { p, inv } = typeof entry === "string" ? { p: entry } : entry;
  const img = document.createElement("img");
  img.src = DEVICON + p + ".svg";
  img.alt = "";                       // decorative — the name is right next to it
  img.loading = "lazy";
  img.className = "tech-logo" + (inv ? " inv" : "");
  img.onerror = () => img.remove();   // CDN down → fall back to text only
  return img;
}

// chips in the Skills section + tech stacks on project cards
$$(".chips span, .stack li").forEach((el) => {
  const img = logoImg(el.textContent);
  if (img) { el.prepend(img); el.classList.add("has-logo"); }
});

// marquee (rendered twice so the loop is seamless)
(() => {
  const track = $("#marqueeTrack");
  const items = MARQUEE.map((name) => {
    const span = document.createElement("span");
    span.className = "mq-item";
    const img = logoImg(name);
    if (img) { img.loading = "eager"; span.append(img); }
    const label = document.createElement("b");
    label.textContent = name;
    span.append(label);
    return span;
  });
  [...items, ...items.map((n) => n.cloneNode(true))].forEach((n, i, all) => {
    if (i >= all.length / 2) n.setAttribute("aria-hidden", "true");
    track.append(n);
  });
})();
/* ---------- Preloader ---------- */
document.body.classList.add("loading");
(() => {
  const fill = $("#loaderFill"), count = $("#loaderCount");
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 14 + 4);
    fill.style.width = p + "%";
    count.textContent = Math.floor(p) + "%";
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        $("#preloader").classList.add("done");
        document.body.classList.remove("loading");
        document.body.classList.add("loaded");
        $$(".hero .reveal-up, .hero .reveal-scale").forEach((el, i) => {
          el.style.setProperty("--d", 0.35 + i * 0.1 + "s");
          el.classList.add("in-view");
        });
        startTyping();
      }, 250);
    }
  }, reduceMotion ? 10 : 90);
})();

/* ---------- Typing effect ---------- */
function startTyping() {
  const el = $("#typed");
  let w = 0, c = 0, deleting = false;
  (function loop() {
    const word = TYPED_WORDS[w];
    el.textContent = word.slice(0, c);
    let delay = deleting ? 40 : 85;
    if (!deleting && c === word.length) { deleting = true; delay = 1600; }
    else if (deleting && c === 0) { deleting = false; w = (w + 1) % TYPED_WORDS.length; delay = 350; }
    c += deleting ? -1 : 1;
    setTimeout(loop, delay);
  })();
}

/* ---------- Custom cursor ---------- */
if (finePointer) {
  const dot = $("#cursorDot"), ring = $("#cursorRing");
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
  });
  (function follow() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(follow);
  })();
  $$("a, button, .chips span, .project, .cert").forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });
}

/* ---------- Particle network background ---------- */
(() => {
  const canvas = $("#bg-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, particles = [];
  const mouse = { x: -9999, y: -9999 };
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let lastW = 0;
  function resize() {
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + "px";
    canvas.style.height = innerHeight + "px";
    // Mobile browsers fire resize when the address bar shows/hides while scrolling —
    // only rebuild particles when the width really changes, so they don't jump.
    if (innerWidth === lastW && particles.length) return;
    lastW = innerWidth;
    const n = Math.min(90, Math.floor((innerWidth * innerHeight) / 16000));
    particles = Array.from({ length: n }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35 * dpr, vy: (Math.random() - 0.5) * 0.35 * dpr,
      r: (Math.random() * 1.6 + 0.6) * dpr,
    }));
  }
  resize();
  addEventListener("resize", resize);
  addEventListener("mousemove", (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  addEventListener("mouseout", () => { mouse.x = mouse.y = -9999; });

  const LINK = 130 * dpr, MOUSE_R = 170 * dpr;
  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      const dxm = p.x - mouse.x, dym = p.y - mouse.y, dm = Math.hypot(dxm, dym);
      if (dm > 0 && dm < MOUSE_R) { p.x += (dxm / dm) * 1.2; p.y += (dym / dm) * 1.2; }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(167, 139, 250, .7)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < LINK) {
          ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - d / LINK) * 0.22})`;
          ctx.lineWidth = dpr * 0.8;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  if (!reduceMotion) draw();
})();

/* ---------- Nav: scroll state, hide on scroll down, progress ---------- */
const nav = $("#nav");
const progress = $("#scrollProgress");
let lastY = 0;
addEventListener("scroll", () => {
  const y = scrollY;
  nav.classList.toggle("scrolled", y > 40);
  nav.classList.toggle("hidden", y > lastY && y > 400 && !$("#navLinks").classList.contains("open"));
  lastY = y;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  updateTimeline();
}, { passive: true });

/* active link highlight */
const sections = $$("main section[id]");
const navAnchors = $$(".nav-links a[href^='#']");
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      navAnchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => navObserver.observe(s));

/* burger */
const burger = $("#burger"), navLinks = $("#navLinks");
function setMenu(open) {
  burger.classList.toggle("open", open);
  navLinks.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
}
burger.addEventListener("click", () => setMenu(!navLinks.classList.contains("open")));
$$("a", navLinks).forEach((a) => a.addEventListener("click", () => setMenu(false)));
addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
// close the menu if the window is resized up to desktop width while it's open
matchMedia("(min-width: 901px)").addEventListener("change", (e) => { if (e.matches) setMenu(false); });

/* ---------- Scroll reveal (with stagger) ---------- */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in-view");
    revealObserver.unobserve(el);

    // counters
    $$(".counter", el).forEach(runCounter);
    // skill bars
    $$(".fill", el).forEach((f) => (f.style.width = f.dataset.w + "%"));
  });
}, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });

$$(".reveal-up, .reveal-left, .reveal-right, .reveal-scale")
  .filter((el) => !el.closest(".hero"))
  .forEach((el) => {
    // stagger siblings inside the same parent
    const siblings = [...el.parentElement.children].filter((c) => c.matches(".reveal-up, .reveal-left, .reveal-right, .reveal-scale"));
    const idx = siblings.indexOf(el);
    el.style.setProperty("--d", Math.min(idx, 8) * 0.08 + "s");
    revealObserver.observe(el);
  });

/* ---------- Counters ---------- */
function runCounter(el) {
  const decimals = parseInt(el.dataset.decimals || "0", 10);
  const dur = 1800, start = performance.now();
  (function step(now) {
    const target = parseFloat(el.dataset.target);   // re-read: live data may arrive mid-animation
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = (target * eased).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
    else el.dataset.done = "1";
  })(start);
}
function setCounter(el, value) {
  if (!el) return;
  el.dataset.target = value;
  if (el.dataset.done) el.textContent = value;        // animation already finished
}

/* ---------- Live LeetCode stats ---------- */
(() => {
  const CACHE_KEY = "lc-stats", CACHE_MS = 6 * 60 * 60 * 1000; // refresh at most every 6h
  const SOURCES = [
    { url: `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USER}`,
      map: (d) => ({ total: d.totalSolved, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved,
                     totalQ: d.totalQuestions, ranking: d.ranking }) },
    { url: `https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}/solved`,
      map: (d) => ({ total: d.solvedProblem, easy: d.easySolved, medium: d.mediumSolved, hard: d.hardSolved }) },
  ];

  const live = $("#lcLive");
  function render(s, fresh) {
    if (!s || !Number.isFinite(s.total)) return;
    $("#lcBadge").textContent = s.total;
    $("#lcTotal").textContent = s.total;
    $("#lcEasy").textContent = s.easy;
    $("#lcMedium").textContent = s.medium;
    $("#lcHard").textContent = s.hard;
    const max = Math.max(s.easy, s.medium, s.hard, 1);
    [["#lcEasyBar", s.easy], ["#lcMediumBar", s.medium], ["#lcHardBar", s.hard]].forEach(([id, v]) => {
      const bar = $(id);
      bar.dataset.w = (v / max) * 100;
      bar.style.width = bar.dataset.w + "%";
    });
    // ring split into easy / medium / hard segments (small gap between each)
    const C = 2 * Math.PI * 42, GAP = 3, sum = s.easy + s.medium + s.hard || 1;
    let offset = 0;
    [["easy", s.easy], ["medium", s.medium], ["hard", s.hard]].forEach(([k, v]) => {
      const len = Math.max(0, (v / sum) * C - GAP);
      const seg = $(".lc-seg." + k);
      seg.style.strokeDasharray = `${len} ${C - len}`;
      seg.style.strokeDashoffset = -offset;
      offset += (v / sum) * C;
    });
    if (s.ranking) $("#lcRank").textContent = "Global rank #" + s.ranking.toLocaleString("en-IN");
    setCounter($("#dsaTotal"), s.total + GFG_SOLVED);
    live.textContent = fresh ? "● live" : "● cached";
    live.classList.add("on");
  }

  let cached = null;
  try { cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null"); } catch (e) {}
  if (cached) render(cached.data, false);
  if (cached && Date.now() - cached.at < CACHE_MS) { live.textContent = "● live"; return; }

  async function fetchStats() {
    for (const src of SOURCES) {
      try {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), 9000);
        const res = await fetch(src.url, { signal: ctrl.signal });
        clearTimeout(timer);
        if (!res.ok) continue;
        const data = src.map(await res.json());
        if (Number.isFinite(data.total)) return data;
      } catch (e) { /* try next source */ }
    }
    return null;
  }
  fetchStats().then((data) => {
    if (data) {
      render(data, true);
      try { localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data })); } catch (e) {}
    } else if (!cached) {
      live.textContent = "● offline";        // keep the static 150+ fallback
    }
  });
})();

/* ---------- Theme toggle ---------- */
(() => {
  const btn = $("#themeToggle"), root = document.documentElement;
  const sync = () => btn.setAttribute("aria-label",
    root.dataset.theme === "light" ? "Switch to dark theme" : "Switch to light theme");
  sync();
  btn.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });
})();

/* ---------- Contact form ---------- */
(() => {
  const form = $("#contactForm"), status = $("#cfStatus"), btn = $("#cfSubmit");
  const setStatus = (msg, type) => { status.textContent = msg; status.className = "cf-status " + (type || ""); };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data._gotcha) return;                                   // bot filled the hidden field
    if (!data.name.trim() || !data.message.trim()) return setStatus("Please fill in your name and a message.", "err");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return setStatus("That email doesn't look right.", "err");

    // Nothing connected yet → fall back to a pre-filled Gmail draft
    if (!FORMSPREE_ID && !GOOGLE_SHEET_URL) {
      const url = "https://mail.google.com/mail/?view=cm&fs=1"
        + "&to=" + encodeURIComponent(CONTACT_EMAIL)
        + "&su=" + encodeURIComponent("Portfolio message from " + data.name)
        + "&body=" + encodeURIComponent(data.message + "\n\n— " + data.name + " (" + data.email + ")");
      window.open(url, "_blank", "noopener");
      return setStatus("Opening Gmail with your message…", "ok");
    }

    btn.disabled = true;
    btn.classList.add("sending");
    setStatus("Sending…");
    const jobs = [];
    if (GOOGLE_SHEET_URL) {
      // Apps Script doesn't send CORS headers, so use no-cors: the request goes
      // through but the reply can't be read — a network error still rejects.
      const body = new URLSearchParams({ name: data.name, email: data.email, message: data.message, page: location.href });
      jobs.push(fetch(GOOGLE_SHEET_URL, { method: "POST", mode: "no-cors", body }));
    }
    if (FORMSPREE_ID) {
      jobs.push(fetch("https://formspree.io/f/" + FORMSPREE_ID, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, message: data.message, _subject: "Portfolio message from " + data.name }),
      }).then((res) => { if (!res.ok) throw new Error("formspree"); }));
    }
    try {
      const results = await Promise.allSettled(jobs);
      if (!results.some((r) => r.status === "fulfilled")) throw new Error();  // succeed if at least one got it
      form.reset();
      setStatus("Thanks! Your message is on its way — I'll get back to you soon. ✨", "ok");
    } catch (err) {
      setStatus("Couldn't send right now. Please email me at " + CONTACT_EMAIL + ".", "err");
    } finally {
      btn.disabled = false;
      btn.classList.remove("sending");
    }
  });
})();

/* ---------- Timeline progress line ---------- */
const timeline = $(".timeline"), tlFill = $("#timelineFill");
function updateTimeline() {
  const r = timeline.getBoundingClientRect();
  const pct = Math.max(0, Math.min(1, (innerHeight * 0.6 - r.top) / r.height));
  tlFill.style.height = pct * 100 + "%";
}
updateTimeline();

/* ---------- 3D tilt ---------- */
if (finePointer && !reduceMotion) {
  $$(".tilt").forEach((el) => {
    const strength = el.classList.contains("avatar") ? 14 : 7;
    el.addEventListener("mousemove", (e) => {
      if (el.classList.contains("reveal-up") && !el.classList.contains("in-view")) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateY(-4px)`;
      el.style.setProperty("--mx", (x + 0.5) * 100 + "%");
      el.style.setProperty("--my", (y + 0.5) * 100 + "%");
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* ---------- Magnetic buttons ---------- */
if (finePointer && !reduceMotion) {
  $$(".magnetic").forEach((el) => {
    if (el.classList.contains("tilt")) return;
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
    });
    el.addEventListener("mouseleave", () => { el.style.transform = ""; });
  });
}

/* ---------- Project filters ---------- */
$$(".filter").forEach((btn) => {
  btn.addEventListener("click", () => {
    $$(".filter").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    $$(".project").forEach((p) => {
      const show = f === "all" || p.dataset.cat.split(" ").includes(f);
      if (show) {
        p.classList.remove("hide");
        p.animate(
          [{ opacity: 0, transform: "translateY(30px) scale(.96)" }, { opacity: 1, transform: "none" }],
          { duration: 600, easing: "cubic-bezier(.22,1,.36,1)" }
        );
        p.classList.add("in-view");
      } else {
        p.classList.add("hide");
      }
    });
  });
});
