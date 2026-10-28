"use strict";

/* ====================================================================
   i18n
   ==================================================================== */
const I18N = {
  ru: {
    nav_buttons: "Кнопки", nav_wheel: "Колесо", nav_rate: "Частота", nav_log: "Журнал",
    title_buttons: "Кнопки мыши", title_wheel: "Колесо", title_rate: "Частота опроса", title_log: "Журнал событий",
    reset_all: "Сбросить всё", theme: "Тема", reset_done: "Все счётчики сброшены",
    buttons_hint: "Нажимайте любые кнопки мыши — они подсветятся.",
    b_0: "Левая кнопка", b_1: "Колесо (средняя)", b_2: "Правая кнопка", b_3: "Боковая «Назад»", b_4: "Боковая «Вперёд»",
    presses: "Нажатий", hold: "Удержание", avg: "Среднее", ok: "Ок", bounce_n: "Дребезг",
    wc_title: "Клик по колесу", wc_sub: "Нажми на колесо заданное число раз в своём обычном темпе. Приложение проверит, что каждое нажатие засчитано, и поймает дребезг контактов.",
    wc_start: "Начать заново", wc_reset: "Сброс", wc_wait: "Жми колесо…",
    st_avg_hold: "Среднее удержание", st_minmax: "Мин / макс удержание", st_interval: "Средний интервал", st_bounce: "Двойные срабатывания",
    wc_ok: "Все нажатия засчитаны чисто, дребезга нет. Если колесо при этом тугое — проблема механическая (грязь, износ пластика или пружинки), электроника в порядке.",
    wc_bounce: "Обнаружено двойных срабатываний: {n}. Контакты микропереключателя колеса изношены или загрязнены — один клик иногда считается за два. Лечится продувкой/чисткой или заменой микрика.",
    wc_short: "Некоторые нажатия очень короткие (< 15 мс). Контакт нестабильный — стоит проверить микропереключатель.",
    sc_title: "Прокрутка", sc_sub: "Крути колесо над этой областью. Тест ловит тики в обратную сторону — признак грязного или изношенного энкодера.",
    sc_up: "Вверх", sc_down: "Вниз", sc_tilt: "Наклоны / гориз.", sc_glitch: "Обратные тики",
    sc_ok: "Прокрутка чистая: ни одного тика в обратную сторону.", sc_bad: "Обратных тиков: {n}. Энкодер колеса дребезжит — это даёт «дёрганую» прокрутку страниц.",
    sc_idle: "Крути колесо", per_sec: "тик/с",
    rt_title: "Частота опроса мыши", rt_sub: "Быстро води мышью по области. Обычно мыши опрашиваются 125, 500 или 1000 Гц.",
    rt_max: "Максимум", rt_avg: "Среднее", rt_events: "Событий", rt_pos: "Позиция",
    lg_title: "Журнал событий", lg_clear: "Очистить", lg_empty: "Событий пока нет — нажми кнопку или покрути колесо.",
    down: "нажата", up: "отпущена", held: "держали {ms} мс", bounce_log: "дребезг: повторное нажатие через {ms} мс",
    wheel_up: "колесо вверх", wheel_down: "колесо вниз", wheel_tilt: "горизонтальная прокрутка", wheel_glitch: "тик в обратную сторону!",
    ms: "мс",
  },
  en: {
    nav_buttons: "Buttons", nav_wheel: "Wheel", nav_rate: "Polling", nav_log: "Log",
    title_buttons: "Mouse buttons", title_wheel: "Scroll wheel", title_rate: "Polling rate", title_log: "Event log",
    reset_all: "Reset all", theme: "Theme", reset_done: "All counters reset",
    buttons_hint: "Press any mouse button — it lights up.",
    b_0: "Left button", b_1: "Wheel (middle)", b_2: "Right button", b_3: "Side \"Back\"", b_4: "Side \"Forward\"",
    presses: "Presses", hold: "Hold", avg: "Average", ok: "OK", bounce_n: "Bounce",
    wc_title: "Wheel click", wc_sub: "Click the wheel the set number of times at your normal pace. The app checks every press is registered and catches contact bounce.",
    wc_start: "Restart", wc_reset: "Reset", wc_wait: "Click the wheel…",
    st_avg_hold: "Average hold", st_minmax: "Min / max hold", st_interval: "Average interval", st_bounce: "Double triggers",
    wc_ok: "All presses registered cleanly, no bounce. If the wheel still feels stiff, the problem is mechanical (dirt, worn plastic or spring) — the electronics are fine.",
    wc_bounce: "Double triggers detected: {n}. The wheel microswitch contacts are worn or dirty — one click sometimes counts as two. Fix: clean/blow out, or replace the switch.",
    wc_short: "Some presses are very short (< 15 ms). The contact is unstable — check the microswitch.",
    sc_title: "Scrolling", sc_sub: "Spin the wheel over this area. The test catches ticks in the wrong direction — a sign of a dirty or worn encoder.",
    sc_up: "Up", sc_down: "Down", sc_tilt: "Tilt / horiz.", sc_glitch: "Reverse ticks",
    sc_ok: "Scrolling is clean: no reverse ticks.", sc_bad: "Reverse ticks: {n}. The wheel encoder is chattering — this causes jumpy page scrolling.",
    sc_idle: "Spin the wheel", per_sec: "ticks/s",
    rt_title: "Mouse polling rate", rt_sub: "Move the mouse quickly over the area. Mice usually poll at 125, 500 or 1000 Hz.",
    rt_max: "Maximum", rt_avg: "Average", rt_events: "Events", rt_pos: "Position",
    lg_title: "Event log", lg_clear: "Clear", lg_empty: "No events yet — press a button or spin the wheel.",
    down: "pressed", up: "released", held: "held {ms} ms", bounce_log: "bounce: pressed again after {ms} ms",
    wheel_up: "wheel up", wheel_down: "wheel down", wheel_tilt: "horizontal scroll", wheel_glitch: "reverse tick!",
    ms: "ms",
  },
};
let lang = (navigator.language || "ru").toLowerCase().startsWith("ru") ? "ru" : "en";
const t = (k, vars) => {
  let s = (I18N[lang] && I18N[lang][k]) || k;
  if (vars) for (const v in vars) s = s.replace("{" + v + "}", vars[v]);
  return s;
};

/* ====================================================================
   helpers
   ==================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const fmtMs = (v) => (v == null ? "—" : Math.round(v) + " " + t("ms"));
const BOUNCE_MS = 50;      // re-press quicker than this after release = contact bounce
const SHORT_MS = 15;       // hold shorter than this = suspicious contact
let page = "buttons";

function snack(text) {
  const el = $("#snackbar");
  el.textContent = text;
  el.classList.add("show");
  clearTimeout(snack.t);
  snack.t = setTimeout(() => el.classList.remove("show"), 1800);
}

/* ====================================================================
   Log
   ==================================================================== */
const logEl = $("#log");
let logCount = 0;
function logTime() {
  const d = new Date();
  const p = (n, l = 2) => String(n).padStart(l, "0");
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`;
}
function log(msg, bad) {
  if (logCount === 0) logEl.textContent = "";
  const row = document.createElement("div");
  row.innerHTML = `<span class="t">${logTime()}</span><span class="${bad ? "bad" : ""}"></span>`;
  row.lastChild.textContent = msg;
  logEl.prepend(row);
  if (++logCount > 300) { logEl.lastChild.remove(); logCount--; }
}
function renderLogEmpty() {
  if (logCount === 0) logEl.innerHTML = `<div class="empty">${t("lg_empty")}</div>`;
}
$("#log-clear").onclick = () => { logEl.textContent = ""; logCount = 0; renderLogEmpty(); };

/* ====================================================================
   Buttons page
   ==================================================================== */
const BTN_IDS = [0, 1, 2, 3, 4];
const btn = {};
function newBtn() { return { count: 0, down: false, downAt: 0, lastHold: null, sum: 0, lastUp: -1e9, bounces: 0 }; }
BTN_IDS.forEach((i) => (btn[i] = newBtn()));

const listEl = $("#btn-list");
BTN_IDS.forEach((i) => {
  const d = document.createElement("div");
  d.className = "btn-tile";
  d.id = "tile-" + i;
  d.innerHTML = `<span class="nm"></span><span class="cnt">0</span>
    <div class="meta"><span><span class="l-hold"></span>: <b class="v-hold">—</b></span>
    <span><span class="l-avg"></span>: <b class="v-avg">—</b></span><span class="tag ok"></span></div>`;
  listEl.appendChild(d);
});

function renderTile(i) {
  const b = btn[i], el = $("#tile-" + i);
  $(".nm", el).textContent = t("b_" + i);
  $(".cnt", el).textContent = b.count;
  $(".l-hold", el).textContent = t("hold");
  $(".l-avg", el).textContent = t("avg");
  $(".v-hold", el).textContent = fmtMs(b.lastHold);
  $(".v-avg", el).textContent = b.count && b.sum ? fmtMs(b.sum / Math.max(1, b.holdN || 0)) : "—";
  const tag = $(".tag", el);
  if (b.bounces) { tag.className = "tag bad"; tag.textContent = `${t("bounce_n")}: ${b.bounces}`; }
  else { tag.className = "tag ok"; tag.textContent = t("ok"); tag.style.visibility = b.count ? "visible" : "hidden"; }
  el.classList.toggle("down", b.down);
}

function setVisual(i, down) {
  $$(`#mouse .m-btn[data-btn="${i}"]`).forEach((n) => n.classList.toggle("down", down));
}

/* ====================================================================
   Wheel click challenge
   ==================================================================== */
const wc = { target: 10, count: 0, active: false, done: false, holds: [], downTimes: [], bounces: 0 };
const RING_LEN = 427.3;

function wcReset(keepActive) {
  Object.assign(wc, { count: 0, active: !!keepActive, done: false, holds: [], downTimes: [], bounces: 0 });
  renderWheelClick();
}
function renderWheelClick() {
  $("#wc-count").textContent = wc.count;
  $("#wc-of").textContent = "/ " + wc.target;
  const fg = $("#ring-fg");
  fg.style.strokeDashoffset = RING_LEN * (1 - Math.min(1, wc.count / wc.target));
  fg.classList.toggle("done", wc.done && !wc.bounces);
  fg.classList.toggle("fail", wc.done && wc.bounces > 0);
  const h = wc.holds;
  $("#wc-avg").textContent = h.length ? fmtMs(h.reduce((a, b) => a + b, 0) / h.length) : "—";
  $("#wc-minmax").textContent = h.length ? `${Math.round(Math.min(...h))} / ${Math.round(Math.max(...h))} ${t("ms")}` : "—";
  const dt = wc.downTimes;
  $("#wc-int").textContent = dt.length > 1 ? fmtMs((dt[dt.length - 1] - dt[0]) / (dt.length - 1)) : "—";
  $("#wc-bounce").textContent = wc.bounces;
  const v = $("#wc-verdict");
  if (wc.done) {
    const tooShort = h.some((x) => x < SHORT_MS);
    v.hidden = false;
    if (wc.bounces) { v.className = "verdict bad"; v.textContent = t("wc_bounce", { n: wc.bounces }); }
    else if (tooShort) { v.className = "verdict warn"; v.textContent = t("wc_short"); }
    else { v.className = "verdict ok"; v.textContent = t("wc_ok"); }
  } else v.hidden = true;
  $("#wc-start").textContent = t("wc_start");
}
function buildTargets() {
  const box = $("#wc-targets");
  box.textContent = "";
  [10, 20, 50].forEach((n) => {
    const c = document.createElement("button");
    c.className = "chip" + (wc.target === n ? " on" : "");
    c.textContent = n;
    c.onclick = () => { wc.target = n; buildTargets(); wcReset(true); };
    box.appendChild(c);
  });
}
$("#wc-start").onclick = () => wcReset(true);
$("#wc-reset").onclick = () => wcReset(false);

function wcOnDown(now, isBounce) {
  if (wc.done) return;
  if (!wc.active) wc.active = true;
  wc.count++;
  wc.downTimes.push(now);
  if (isBounce) wc.bounces++;
  const ring = $(".ring-wrap");
  ring.classList.remove("pulse"); void ring.offsetWidth; ring.classList.add("pulse");
  if (wc.count >= wc.target) { wc.done = true; wc.active = false; }
  renderWheelClick();
}
function wcOnUp(hold) {
  if (wc.holds.length < wc.count) wc.holds.push(hold);
  renderWheelClick();
}

/* ====================================================================
   Mouse button events
   ==================================================================== */
function onDown(e) {
  const i = e.button;
  if (!btn[i]) return;
  e.preventDefault();
  const b = btn[i];
  if (b.down) return;
  const now = e.timeStamp;
  const gap = now - b.lastUp;
  const isBounce = gap >= 0 && gap < BOUNCE_MS;
  b.down = true; b.downAt = now; b.count++;
  if (isBounce) { b.bounces++; log(`${t("b_" + i)} — ${t("bounce_log", { ms: Math.round(gap) })}`, true); }
  log(`${t("b_" + i)} ${t("down")}`);
  setVisual(i, true);
  renderTile(i);
  if (i === 1 && page === "wheel") wcOnDown(now, isBounce);
}
function onUp(e) {
  const i = e.button;
  if (!btn[i]) return;
  e.preventDefault();
  const b = btn[i];
  if (!b.down) return;
  const hold = e.timeStamp - b.downAt;
  b.down = false; b.lastUp = e.timeStamp; b.lastHold = hold; b.sum += hold; b.holdN = (b.holdN || 0) + 1;
  log(`${t("b_" + i)} ${t("up")} (${t("held", { ms: Math.round(hold) })})`);
  setVisual(i, false);
  renderTile(i);
  if (i === 1 && page === "wheel" && wc.holds.length < wc.count) wcOnUp(hold);
}
window.addEventListener("mousedown", onDown, true);
window.addEventListener("mouseup", onUp, true);
["auxclick", "contextmenu", "dblclick", "click"].forEach((n) => window.addEventListener(n, (e) => e.preventDefault(), true));
window.addEventListener("blur", () => BTN_IDS.forEach((i) => { btn[i].down = false; setVisual(i, false); renderTile(i); }));

/* ====================================================================
   Scroll test
   ==================================================================== */
const sc = { up: 0, down: 0, tilt: 0, glitch: 0, lastDir: 0, lastT: -1e9, stamps: [], pos: 0 };
function renderScroll() {
  $("#sc-up").textContent = sc.up;
  $("#sc-down").textContent = sc.down;
  $("#sc-tilt").textContent = sc.tilt;
  $("#sc-glitch").textContent = sc.glitch;
  const v = $("#sc-verdict"), ticks = sc.up + sc.down;
  if (ticks >= 20) {
    v.hidden = false;
    if (sc.glitch) { v.className = "verdict bad"; v.textContent = t("sc_bad", { n: sc.glitch }); }
    else { v.className = "verdict ok"; v.textContent = t("sc_ok"); }
  } else v.hidden = true;
  if (!sc.lastDir) { $("#sc-dir").textContent = "·"; $("#sc-delta").textContent = t("sc_idle"); }
}
$("#scroll-zone").addEventListener("wheel", (e) => {
  e.preventDefault();
  const now = e.timeStamp;
  if (e.deltaY === 0 && e.deltaX !== 0) {
    sc.tilt++;
    $("#sc-dir").textContent = e.deltaX > 0 ? "→" : "←";
    log(t("wheel_tilt") + ` Δ${Math.round(e.deltaX)}`);
    renderScroll();
    return;
  }
  const dir = Math.sign(e.deltaY);
  if (!dir) return;
  let glitch = false;
  if (sc.lastDir && dir !== sc.lastDir && now - sc.lastT < 60) { sc.glitch++; glitch = true; }
  sc.lastDir = dir; sc.lastT = now;
  dir < 0 ? sc.up++ : sc.down++;
  sc.stamps.push(now);
  while (sc.stamps.length && now - sc.stamps[0] > 1000) sc.stamps.shift();
  sc.pos = (sc.pos - e.deltaY / 4) % 20;
  $("#wheel-vis").style.backgroundPosition = `0 ${sc.pos}px`;
  $("#sc-dir").textContent = dir < 0 ? "↑" : "↓";
  $("#sc-delta").textContent = `Δ ${Math.round(e.deltaY)}  ·  ${sc.stamps.length} ${t("per_sec")}`;
  const arrU = $("#arr-up"), arrD = $("#arr-down");
  (dir < 0 ? arrU : arrD).classList.add("on");
  clearTimeout(sc.arrT);
  sc.arrT = setTimeout(() => { arrU.classList.remove("on"); arrD.classList.remove("on"); }, 120);
  log(`${dir < 0 ? t("wheel_up") : t("wheel_down")} Δ${Math.round(e.deltaY)}` + (glitch ? " — " + t("wheel_glitch") : ""), glitch);
  renderScroll();
}, { passive: false });
// the wheel icon on the mouse picture reacts to scrolling anywhere, too
window.addEventListener("wheel", (e) => {
  if (e.target.closest && e.target.closest("#scroll-zone")) return;
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });

/* ====================================================================
   Polling rate
   ==================================================================== */
const rt = { stamps: [], now: 0, max: 0, sum: 0, n: 0, events: 0, hist: [], lastEvent: 0 };
const zone = $("#rate-zone"), cv = $("#rate-canvas"), ctx = cv.getContext("2d");
zone.addEventListener("pointermove", (e) => {
  const list = e.getCoalescedEvents ? e.getCoalescedEvents() : [];
  const evs = list.length ? list : [e];
  for (const ev of evs) rt.stamps.push(ev.timeStamp);
  rt.events += evs.length;
  rt.lastEvent = performance.now();
  const r = zone.getBoundingClientRect();
  $("#rt-pos").textContent = `${Math.round(e.clientX - r.left)}, ${Math.round(e.clientY - r.top)}`;
  $("#rt-events").textContent = rt.events;
});
function rtTick() {
  const nowT = performance.now();
  while (rt.stamps.length && nowT - rt.stamps[0] > 250) rt.stamps.shift();
  let hz = 0;
  if (nowT - rt.lastEvent < 150 && rt.stamps.length >= 3) {
    const span = rt.stamps[rt.stamps.length - 1] - rt.stamps[0];
    if (span > 0) hz = Math.round(((rt.stamps.length - 1) * 1000) / span);
  }
  rt.now = hz;
  if (hz > 0) { rt.max = Math.max(rt.max, hz); rt.sum += hz; rt.n++; }
  rt.hist.push(hz);
  if (rt.hist.length > 150) rt.hist.shift();
  $("#rt-now").textContent = hz;
  $("#rt-max").textContent = rt.max + " Hz";
  $("#rt-avg").textContent = (rt.n ? Math.round(rt.sum / rt.n) : 0) + " Hz";
  if (page === "rate") drawRate();
}
setInterval(rtTick, 100);

function cssVar(n) { return getComputedStyle(document.documentElement).getPropertyValue(n).trim(); }
function drawRate() {
  const dpr = window.devicePixelRatio || 1;
  const w = cv.clientWidth, h = cv.clientHeight;
  if (cv.width !== w * dpr || cv.height !== h * dpr) { cv.width = w * dpr; cv.height = h * dpr; }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  const peak = Math.max(1000, Math.ceil(Math.max(...rt.hist, 1) / 500) * 500);
  const top = 20, bottom = h - 22;
  ctx.font = "11px Segoe UI, sans-serif";
  ctx.textAlign = "right";
  ctx.strokeStyle = cssVar("--outline"); ctx.fillStyle = cssVar("--on-surface-var"); ctx.lineWidth = 1;
  for (let k = 0; k <= 4; k++) {
    const y = bottom - ((bottom - top) * k) / 4;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.globalAlpha = 0.5; ctx.stroke(); ctx.globalAlpha = 1;
    ctx.fillText(Math.round((peak * k) / 4), w - 6, y - 3);
  }
  const step = w / 149;
  const pts = rt.hist.map((v, i) => [w - (rt.hist.length - 1 - i) * step, bottom - ((bottom - top) * v) / peak]);
  if (pts.length < 2) return;
  const prim = cssVar("--primary");
  ctx.beginPath(); ctx.moveTo(pts[0][0], bottom);
  pts.forEach((p) => ctx.lineTo(p[0], p[1]));
  ctx.lineTo(pts[pts.length - 1][0], bottom); ctx.closePath();
  const g = ctx.createLinearGradient(0, top, 0, bottom);
  g.addColorStop(0, prim + "66"); g.addColorStop(1, prim + "05");
  ctx.fillStyle = g; ctx.fill();
  ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
  ctx.strokeStyle = prim; ctx.lineWidth = 2.5; ctx.lineJoin = "round"; ctx.stroke();
}
window.addEventListener("resize", () => page === "rate" && drawRate());

/* ====================================================================
   Navigation, theme, language, reset
   ==================================================================== */
function showPage(p) {
  page = p;
  $$(".page").forEach((s) => s.classList.toggle("active", s.id === "page-" + p));
  $$(".rail-item").forEach((b) => b.classList.toggle("active", b.dataset.page === p));
  $("#page-title").textContent = t("title_" + p);
  if (p === "rate") drawRate();
}
$$(".rail-item").forEach((b) => (b.onclick = () => showPage(b.dataset.page)));

function applyTheme(th) {
  document.documentElement.dataset.theme = th;
  if (page === "rate") drawRate();
}
applyTheme(window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
$("#btn-theme").onclick = () => applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");

function applyLang() {
  document.documentElement.lang = lang;
  $("#lang-label").textContent = lang === "ru" ? "EN" : "RU";
  $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
  $$("[data-i18n-title]").forEach((el) => (el.title = t(el.dataset.i18nTitle)));
  BTN_IDS.forEach(renderTile);
  renderWheelClick(); renderScroll(); renderLogEmpty();
  if (typeof gpRefresh === "function") gpRefresh();
  $("#page-title").textContent = t("title_" + page);
}
$("#btn-lang").onclick = () => { lang = lang === "ru" ? "en" : "ru"; applyLang(); };

$("#btn-reset").onclick = () => {
  BTN_IDS.forEach((i) => { btn[i] = newBtn(); setVisual(i, false); });
  wcReset(false);
  if (typeof gpReset === "function") gpReset();
  Object.assign(sc, { up: 0, down: 0, tilt: 0, glitch: 0, lastDir: 0, lastT: -1e9, stamps: [] });
  Object.assign(rt, { stamps: [], max: 0, sum: 0, n: 0, events: 0, hist: [] });
  $("#rt-events").textContent = "0";
  logEl.textContent = ""; logCount = 0;
  applyLang();
  snack(t("reset_done"));
};

buildTargets();
applyLang();
showPage("buttons");
