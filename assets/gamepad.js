"use strict";

/* Gamepad tester (standard mapping). Loaded after app.js and reuses its globals:
   I18N, t, log, snack, page, fmtMs, $, $$, cssVar, applyLang. */

Object.assign(I18N.ru, {
  nav_gamepad: "Геймпад", title_gamepad: "Геймпад",
  gp_none: "Геймпад не найден", gp_none_sub: "Подключи геймпад и нажми на нём любую кнопку — браузерный API видит устройство только после первого нажатия.",
  gp_info: "Кнопок: {b} · осей: {a} · раскладка: {m} · вибрация: {v}",
  gp_yes: "есть", gp_no: "нет", gp_std: "стандартная", gp_nonstd: "нестандартная",
  gp_rumble: "Проверить вибрацию", gp_no_rumble: "Вибрация не поддерживается этим устройством",
  gp_sticks: "Стики", gp_sticks_sub: "Покрути стики по кругу до упора: контур покажет, насколько ровно круглится ход. Тест дрейфа — отпусти стики и подожди 3 секунды.",
  gp_clear_trace: "Очистить след", gp_drift_btn: "Тест дрейфа",
  gp_drift_run: "Не трогай стики… {s} с", gp_drift_ok: "Дрейфа нет: в покое стики стоят в центре (L {l}%, R {r}%).",
  gp_drift_warn: "Небольшое смещение центра (L {l}%, R {r}%). Обычно лечится мёртвой зоной 10–15% в играх.",
  gp_drift_bad: "Сильный дрейф: в покое стик отклонён на L {l}%, R {r}%. Скорее всего изношен потенциометр/модуль стика.",
  gp_buttons: "Кнопки", gp_rate: "Опрос: {n} Гц", gp_connected: "Геймпад подключён", gp_disconnected: "Геймпад отключён",
  gp_stick_l: "Левый стик", gp_stick_r: "Правый стик",
  gp_b: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Back", "Start", "L3", "R3", "↑", "↓", "←", "→", "Home"],
});
Object.assign(I18N.en, {
  nav_gamepad: "Gamepad", title_gamepad: "Gamepad",
  gp_none: "No gamepad found", gp_none_sub: "Connect a gamepad and press any button on it — the browser API only reveals the device after the first press.",
  gp_info: "Buttons: {b} · axes: {a} · mapping: {m} · rumble: {v}",
  gp_yes: "yes", gp_no: "no", gp_std: "standard", gp_nonstd: "non-standard",
  gp_rumble: "Test rumble", gp_no_rumble: "This device does not support rumble",
  gp_sticks: "Sticks", gp_sticks_sub: "Rotate the sticks fully around: the outline shows how round their travel is. Drift test — release the sticks and wait 3 seconds.",
  gp_clear_trace: "Clear trace", gp_drift_btn: "Drift test",
  gp_drift_run: "Don't touch the sticks… {s} s", gp_drift_ok: "No drift: sticks rest at centre (L {l}%, R {r}%).",
  gp_drift_warn: "Slight centre offset (L {l}%, R {r}%). Usually fixed by a 10–15% deadzone in games.",
  gp_drift_bad: "Heavy drift: at rest the stick is off-centre by L {l}%, R {r}%. The stick module/potentiometer is probably worn.",
  gp_buttons: "Buttons", gp_rate: "Polling: {n} Hz", gp_connected: "Gamepad connected", gp_disconnected: "Gamepad disconnected",
  gp_stick_l: "Left stick", gp_stick_r: "Right stick",
  gp_b: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "Back", "Start", "L3", "R3", "↑", "↓", "←", "→", "Home"],
});

const GP_BOUNCE_MS = 50;
const GP_BINS = 72;
const gp = {
  idx: null, buttons: [], hadPad: false,
  trace: { l: new Array(GP_BINS).fill(0), r: new Array(GP_BINS).fill(0) },
  drift: null, stamps: [], lastTs: -1, rateHz: 0,
};
const newGpBtn = () => ({ count: 0, down: false, at: 0, hold: null, lastUp: -1e9, bounces: 0 });
for (let i = 0; i < 17; i++) gp.buttons.push(newGpBtn());

/* ---- build counters grid ---- */
const gpCounts = $("#gp-counts");
for (let i = 0; i < 17; i++) {
  const d = document.createElement("div");
  d.className = "gp-tile"; d.id = "gpt-" + i;
  d.innerHTML = `<span class="n"></span><span class="c">0</span><span class="m"></span>`;
  gpCounts.appendChild(d);
}
function renderGpTile(i) {
  const b = gp.buttons[i], el = $("#gpt-" + i);
  $(".n", el).textContent = t("gp_b")[i];
  $(".c", el).textContent = b.count;
  const m = $(".m", el);
  m.className = "m" + (b.bounces ? " bad" : "");
  m.textContent = b.bounces ? `${t("bounce_n")}: ${b.bounces}` : b.hold != null ? fmtMs(b.hold) : "—";
  el.classList.toggle("down", b.down);
}

/* ---- pad selection ---- */
const pads = () => [...(navigator.getGamepads ? navigator.getGamepads() : [])].filter(Boolean);
function currentPad() {
  const list = pads();
  return list.find((p) => p.index === gp.idx) || list[0] || null;
}
function renderPick(list) {
  const box = $("#gp-pick");
  const sig = list.map((p) => p.index).join(",") + "|" + gp.idx;
  if (box.dataset.sig === sig) return;
  box.dataset.sig = sig; box.textContent = "";
  if (list.length < 2) return;
  list.forEach((p) => {
    const c = document.createElement("button");
    c.className = "chip" + (p.index === gp.idx ? " on" : "");
    c.textContent = "#" + (p.index + 1);
    c.onclick = () => { gp.idx = p.index; gpReset(); };
    box.appendChild(c);
  });
}
window.addEventListener("gamepadconnected", (e) => { snack(t("gp_connected")); log(`${e.gamepad.id} — ${t("gp_connected")}`); });
window.addEventListener("gamepaddisconnected", (e) => { snack(t("gp_disconnected")); log(`${e.gamepad.id} — ${t("gp_disconnected")}`); });

/* ---- sticks ---- */
function drawStick(id, x, y, trace) {
  const cv = $(id), c = cv.getContext("2d"), S = cv.width, R = S / 2 - 12, mid = S / 2;
  c.clearRect(0, 0, S, S);
  c.lineWidth = 1.5; c.strokeStyle = cssVar("--outline"); c.fillStyle = cssVar("--surface-2");
  c.beginPath(); c.arc(mid, mid, R, 0, 7); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(mid - R, mid); c.lineTo(mid + R, mid); c.moveTo(mid, mid - R); c.lineTo(mid, mid + R); c.stroke();
  c.setLineDash([4, 4]); c.beginPath(); c.arc(mid, mid, R * 0.1, 0, 7); c.stroke(); c.setLineDash([]);
  const prim = cssVar("--primary");
  if (trace.some((v) => v > 0.05)) {
    c.beginPath();
    let first = true;
    trace.forEach((v, i) => {
      if (v <= 0.05) return;
      const a = (i / GP_BINS) * Math.PI * 2, r = v * R;
      const px = mid + Math.cos(a) * r, py = mid + Math.sin(a) * r;
      first ? c.moveTo(px, py) : c.lineTo(px, py); first = false;
    });
    c.closePath(); c.fillStyle = prim + "33"; c.fill(); c.strokeStyle = prim + "aa"; c.lineWidth = 2; c.stroke();
  }
  c.beginPath(); c.arc(mid + x * R, mid + y * R, 8, 0, 7); c.fillStyle = prim; c.fill();
}
function updateStick(key, x, y) {
  const r = Math.hypot(x, y);
  if (r > 0.1) {
    const bin = Math.floor((((Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * GP_BINS) % GP_BINS;
    gp.trace[key][bin] = Math.max(gp.trace[key][bin], Math.min(r, 1.2));
  }
  drawStick("#cv-" + key, x, y, gp.trace[key]);
  $("#sv-" + key).textContent = `X ${x.toFixed(2)}  Y ${y.toFixed(2)}  ·  ${(r * 100).toFixed(0)}%`;
  const knob = $("#knob-" + key);
  const base = key === "l" ? [115, 112] : [255, 165];
  knob.setAttribute("cx", base[0] + x * 12); knob.setAttribute("cy", base[1] + y * 12);
}

/* ---- drift test ---- */
$("#gp-drift").onclick = () => {
  if (!currentPad()) return;
  gp.drift = { until: performance.now() + 3000, l: [], r: [] };
};
function driftStep(now, ax) {
  const d = gp.drift, v = $("#gp-verdict");
  d.l.push(Math.hypot(ax[0], ax[1])); d.r.push(Math.hypot(ax[2], ax[3]));
  const left = Math.max(0, Math.ceil((d.until - now) / 1000));
  if (now < d.until) { v.hidden = false; v.className = "verdict warn"; v.textContent = t("gp_drift_run", { s: left }); return; }
  const avg = (a) => a.reduce((s, x) => s + x, 0) / a.length;
  const l = Math.round(avg(d.l) * 100), r = Math.round(avg(d.r) * 100), worst = Math.max(l, r);
  v.hidden = false;
  v.className = "verdict " + (worst < 3 ? "ok" : worst < 10 ? "warn" : "bad");
  v.textContent = t(worst < 3 ? "gp_drift_ok" : worst < 10 ? "gp_drift_warn" : "gp_drift_bad", { l, r });
  gp.drift = null;
}
$("#gp-clear").onclick = () => { gp.trace.l.fill(0); gp.trace.r.fill(0); };

/* ---- rumble ---- */
$("#gp-rumble").onclick = () => {
  const p = currentPad(), a = p && (p.vibrationActuator || (p.hapticActuators && p.hapticActuators[0]));
  if (a && a.playEffect) a.playEffect("dual-rumble", { duration: 700, strongMagnitude: 1, weakMagnitude: 1 }).catch(() => snack(t("gp_no_rumble")));
  else snack(t("gp_no_rumble"));
};

/* ---- main loop ---- */
function gpFrame(now) {
  requestAnimationFrame(gpFrame);
  if (page !== "gamepad") return;
  const list = pads(), p = currentPad();
  if (p) gp.idx = p.index;
  renderPick(list);
  if (!p) {
    if (gp.hadPad || !$("#gp-name").textContent) { $("#gp-name").textContent = t("gp_none"); $("#gp-info").textContent = t("gp_none_sub"); $("#gp-rate").textContent = ""; }
    gp.hadPad = false;
    return;
  }
  if (!gp.hadPad) {
    gp.hadPad = true;
    $("#gp-name").textContent = p.id;
    $("#gp-info").textContent = t("gp_info", { b: p.buttons.length, a: p.axes.length, m: p.mapping === "standard" ? t("gp_std") : t("gp_nonstd"), v: p.vibrationActuator || (p.hapticActuators && p.hapticActuators.length) ? t("gp_yes") : t("gp_no") });
  }
  // polling rate: count distinct state updates per second
  if (p.timestamp !== gp.lastTs) { gp.lastTs = p.timestamp; gp.stamps.push(now); }
  while (gp.stamps.length && now - gp.stamps[0] > 1000) gp.stamps.shift();
  if (gp.stamps.length > 1) {
    const hz = Math.round(((gp.stamps.length - 1) * 1000) / (gp.stamps[gp.stamps.length - 1] - gp.stamps[0]));
    $("#gp-rate").textContent = t("gp_rate", { n: hz });
  }
  // buttons
  for (let i = 0; i < 17; i++) {
    const pb = p.buttons[i];
    if (!pb) continue;
    const pressed = pb.pressed || pb.value > 0.5, b = gp.buttons[i];
    if (pressed && !b.down) {
      const gap = now - b.lastUp;
      b.down = true; b.at = now; b.count++;
      if (gap < GP_BOUNCE_MS) { b.bounces++; log(`${t("gp_b")[i]} — ${t("bounce_log", { ms: Math.round(gap) })}`, true); }
      log(`${t("gp_b")[i]} ${t("down")}`);
      renderGpTile(i);
    } else if (!pressed && b.down) {
      b.down = false; b.lastUp = now; b.hold = now - b.at;
      log(`${t("gp_b")[i]} ${t("up")} (${t("held", { ms: Math.round(b.hold) })})`);
      renderGpTile(i);
    }
    const shape = $(`#gp-svg [data-gp="${i}"]`);
    if (shape) {
      shape.classList.toggle("down", pressed);
      if (i === 6 || i === 7) { // analog triggers: fill proportionally
        shape.style.fill = pb.value > 0.03 && !pressed ? `color-mix(in srgb, var(--primary) ${Math.round(pb.value * 100)}%, var(--surface-2))` : "";
        const k = i === 6 ? "lt" : "rt";
        $("#bar-" + k).style.width = pb.value * 100 + "%";
        $("#val-" + k).textContent = pb.value.toFixed(2);
      }
    }
  }
  const ax = p.axes;
  updateStick("l", ax[0] || 0, ax[1] || 0);
  updateStick("r", ax[2] || 0, ax[3] || 0);
  if (gp.drift) driftStep(now, [ax[0] || 0, ax[1] || 0, ax[2] || 0, ax[3] || 0]);
}

function gpReset() {
  gp.buttons = gp.buttons.map(newGpBtn);
  gp.trace.l.fill(0); gp.trace.r.fill(0); gp.drift = null;
  $("#gp-verdict").hidden = true;
  for (let i = 0; i < 17; i++) renderGpTile(i);
}
function gpRefresh() {
  gp.hadPad = false; $("#gp-name").textContent = "";
  for (let i = 0; i < 17; i++) renderGpTile(i);
}
gpReset();
requestAnimationFrame(gpFrame);
applyLang();
