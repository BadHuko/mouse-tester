"use strict";

/* Gamepad tester. Loaded after app.js and reuses its globals:
   I18N, t, log, snack, page, fmtMs, $, $$, cssVar, applyLang. */

Object.assign(I18N.ru, {
  nav_gamepad: "Геймпад", title_gamepad: "Геймпад",
  gp_none: "Геймпад не найден", gp_none_sub: "Подключи геймпад и нажми на нём любую кнопку — браузерный API видит устройство только после первого нажатия.",
  gp_yes: "есть", gp_no: "нет", gp_std: "стандартная", gp_nonstd: "нестандартная (номера кнопок могут не совпадать со схемой)",
  gp_rumble: "Проверить вибрацию", gp_no_rumble: "Вибрация не поддерживается этим устройством",
  gp_sticks: "Стики", gp_clear_trace: "Очистить след", gp_drift_btn: "Тест дрейфа",
  gp_sticks_sub: "Круг — ход стика. Точка — текущее положение, пунктир в центре — мёртвая зона 10%, закрашенный контур — куда ты доводил стик в каждом направлении. Исправный стик рисует ровный круг. Покрути стик по кругу до упора, затем отпусти и нажми «Тест дрейфа».",
  gp_drift_run: "Не трогай стики… {s} с", gp_drift_ok: "Дрейфа нет: в покое стики стоят в центре (L {l}%, R {r}%).",
  gp_drift_warn: "Небольшое смещение центра (L {l}%, R {r}%). Обычно лечится мёртвой зоной 10–15% в играх.",
  gp_drift_bad: "Сильный дрейф: в покое стик отклонён на L {l}%, R {r}%. Скорее всего изношен потенциометр/модуль стика.",
  gp_buttons: "Кнопки", gp_rate: "Опрос: {n} Гц", gp_connected: "Геймпад подключён", gp_disconnected: "Геймпад отключён",
  gp_stick_l: "Левый стик (L3)", gp_stick_r: "Правый стик (R3)",
  gp_extra: "Доп. {n}", gp_touchpad: "Тачпад", gp_btn_n: "Кнопка {n}",
  gp_f_type: "Тип", gp_f_vendor: "Производитель", gp_f_map: "Раскладка", gp_f_btn: "Кнопки", gp_f_axes: "Оси", gp_f_rumble: "Вибрация", gp_f_slot: "Слот в системе",
  gp_k_xbox: "Xbox / XInput", gp_k_ps: "PlayStation", gp_k_nin: "Nintendo", gp_k_gen: "Универсальный",
  gp_btn_val: "{n} ({s} стандартных + {e} доп.)", gp_slot_val: "№{i} из {c}",
  gp_badge: { none: "Нужны данные", ok: "В норме", warn: "Есть замечания", bad: "Проблема" },
  gp_c: {
    centre: { name: "Центр в покое", none: "Отпусти стик и нажми «Тест дрейфа».", ok: "Стик возвращается ровно в центр.", warn: "Лёгкое смещение центра — лечится мёртвой зоной в играх.", bad: "Дрейф: стик «уезжает» сам. Вероятен износ модуля." },
    reach: { name: "Ход до упора", none: "Доведи стик до края и покрути по кругу.", ok: "Стик доходит до края.", warn: "Почти до края — возможно, мешает люфт или грязь.", bad: "Не доходит до края: износ или ограничитель." },
    round: { name: "Ровность круга", none: "Покрути стик по кругу ({p}% круга пройдено).", ok: "Круг ровный, мёртвых зон нет.", warn: "Заметно неровный ход — нормально для квадратной рамки, но проверь на играх.", bad: "Сильно неровный ход: западания или износ шарнира." },
  },
});
Object.assign(I18N.en, {
  nav_gamepad: "Gamepad", title_gamepad: "Gamepad",
  gp_none: "No gamepad found", gp_none_sub: "Connect a gamepad and press any button on it — the browser API only reveals the device after the first press.",
  gp_yes: "yes", gp_no: "no", gp_std: "standard", gp_nonstd: "non-standard (button numbers may not match the diagram)",
  gp_rumble: "Test rumble", gp_no_rumble: "This device does not support rumble",
  gp_sticks: "Sticks", gp_clear_trace: "Clear trace", gp_drift_btn: "Drift test",
  gp_sticks_sub: "Each circle is the stick's travel. The dot is its current position, the dashed ring is a 10% deadzone, the filled outline shows how far you pushed it in each direction. A healthy stick draws an even circle. Rotate it fully around, then release and press \"Drift test\".",
  gp_drift_run: "Don't touch the sticks… {s} s", gp_drift_ok: "No drift: sticks rest at centre (L {l}%, R {r}%).",
  gp_drift_warn: "Slight centre offset (L {l}%, R {r}%). Usually fixed by a 10–15% deadzone in games.",
  gp_drift_bad: "Heavy drift: at rest the stick is off-centre by L {l}%, R {r}%. The stick module/potentiometer is probably worn.",
  gp_buttons: "Buttons", gp_rate: "Polling: {n} Hz", gp_connected: "Gamepad connected", gp_disconnected: "Gamepad disconnected",
  gp_stick_l: "Left stick (L3)", gp_stick_r: "Right stick (R3)",
  gp_extra: "Extra {n}", gp_touchpad: "Touchpad", gp_btn_n: "Button {n}",
  gp_f_type: "Type", gp_f_vendor: "Vendor", gp_f_map: "Mapping", gp_f_btn: "Buttons", gp_f_axes: "Axes", gp_f_rumble: "Rumble", gp_f_slot: "System slot",
  gp_k_xbox: "Xbox / XInput", gp_k_ps: "PlayStation", gp_k_nin: "Nintendo", gp_k_gen: "Generic",
  gp_btn_val: "{n} ({s} standard + {e} extra)", gp_slot_val: "#{i} of {c}",
  gp_badge: { none: "Need data", ok: "Healthy", warn: "Minor issues", bad: "Problem" },
  gp_c: {
    centre: { name: "Rest centre", none: "Release the stick and press \"Drift test\".", ok: "Stick returns exactly to centre.", warn: "Slight centre offset — fixed by a deadzone in games.", bad: "Drift: the stick moves on its own. The module is likely worn." },
    reach: { name: "Full travel", none: "Push the stick to the edge and rotate it.", ok: "Stick reaches the edge.", warn: "Almost to the edge — maybe play or dirt in the way.", bad: "Does not reach the edge: wear or a blocked gate." },
    round: { name: "Circle evenness", none: "Rotate the stick around ({p}% of the circle done).", ok: "Even circle, no dead spots.", warn: "Noticeably uneven — normal for a square gate, but check in games.", bad: "Very uneven: sticking spots or a worn joint." },
  },
});

/* Button names per controller family. Standard-mapping indices:
   0-3 face (bottom/right/left/top), 4-5 bumpers, 6-7 triggers, 8-9 centre, 10-11 stick clicks, 12-15 d-pad, 16 home. */
const GP_NAMES = {
  xbox: ["A", "B", "X", "Y", "LB", "RB", "LT", "RT", "View", "Menu", "L3", "R3", "↑", "↓", "←", "→", "Xbox"],
  ps: ["✕ Cross", "○ Circle", "□ Square", "△ Triangle", "L1", "R1", "L2", "R2", "Share", "Options", "L3", "R3", "↑", "↓", "←", "→", "PS"],
  nin: ["B", "A", "Y", "X", "L", "R", "ZL", "ZR", "−", "+", "LS", "RS", "↑", "↓", "←", "→", "Home"],
};
GP_NAMES.gen = GP_NAMES.xbox;
const GP_SVG_LABELS = {
  xbox: ["A", "B", "X", "Y", "", "", "LT", "RT"], ps: ["✕", "○", "□", "△", "", "", "L2", "R2"],
  nin: ["B", "A", "Y", "X", "", "", "ZL", "ZR"],
};
GP_SVG_LABELS.gen = GP_SVG_LABELS.xbox;
const GP_VENDORS = { "045e": "Microsoft", "054c": "Sony", "057e": "Nintendo", "28de": "Valve", "046d": "Logitech", "0e6f": "PDP", "2dc8": "8BitDo", "0f0d": "Hori", "1532": "Razer", "0738": "Mad Catz", "24c6": "PowerA", "1bad": "Harmonix", "0079": "DragonRise" };
const GP_PS_MODELS = { "05c4": "DualShock 4", "09cc": "DualShock 4", "0ce6": "DualSense", "0df2": "DualSense Edge", "0268": "DualShock 3" };

function parsePad(p) {
  const id = p.id || "";
  let m = id.match(/Vendor:\s*([0-9a-f]{4})\s*Product:\s*([0-9a-f]{4})/i) || id.match(/^([0-9a-f]{4})-([0-9a-f]{4})-/i);
  const vid = m ? m[1].toLowerCase() : "", pid = m ? m[2].toLowerCase() : "";
  let kind = "gen";
  if (vid === "054c" || /dualshock|dualsense|playstation|wireless controller/i.test(id)) kind = "ps";
  else if (vid === "057e" || /nintendo|pro controller|joy-?con/i.test(id)) kind = "nin";
  else if (vid === "045e" || /xbox|xinput|microsoft/i.test(id)) kind = "xbox";
  const name = id.replace(/\s*\((?:[^()]*(?:STANDARD|Vendor|XInput)[^()]*)\)\s*$/i, "").replace(/^[0-9a-f]{4}-[0-9a-f]{4}-/i, "").trim() || id;
  const model = kind === "ps" && GP_PS_MODELS[pid] ? GP_PS_MODELS[pid] : "";
  return { name, vid, pid, kind, vendor: GP_VENDORS[vid] || "", model };
}

const GP_BOUNCE_MS = 50;
const GP_BINS = 72;
const GP_MAX_BTN = 32;
const gp = {
  idx: null, buttons: [], sig: null, info: null, std: true,
  trace: { l: new Array(GP_BINS).fill(0), r: new Array(GP_BINS).fill(0) },
  prev: { l: null, r: null }, driftRes: { l: null, r: null },
  drift: null, stamps: [], lastTs: -1, checksSig: { l: "", r: "" },
};
const newGpBtn = () => ({ count: 0, down: false, at: 0, hold: null, lastUp: -1e9, bounces: 0 });

function btnName(i) {
  const k = gp.info ? gp.info.kind : "gen";
  if (!gp.std) return t("gp_btn_n", { n: i + 1 });
  if (i < 17) return GP_NAMES[k][i];
  if (k === "ps" && i === 17) return t("gp_touchpad");
  return t("gp_extra", { n: i + 1 });
}

/* ---- button tiles (count follows the real number of buttons on the pad) ---- */
const gpCounts = $("#gp-counts");
function ensureTiles(n) {
  while (gp.buttons.length < n) gp.buttons.push(newGpBtn());
  gp.buttons.length = n;
  while (gpCounts.children.length < n) {
    const d = document.createElement("div");
    d.id = "gpt-" + gpCounts.children.length;
    d.innerHTML = `<span class="n"></span><span class="c">0</span><span class="m"></span>`;
    gpCounts.appendChild(d);
  }
  while (gpCounts.children.length > n) gpCounts.lastChild.remove();
  for (let i = 0; i < n; i++) renderGpTile(i);
}
function renderGpTile(i) {
  const b = gp.buttons[i], el = $("#gpt-" + i);
  if (!el || !b) return;
  el.className = "gp-tile" + (i >= 17 ? " extra" : "") + (b.down ? " down" : "");
  $(".n", el).textContent = btnName(i);
  $(".c", el).textContent = b.count;
  const m = $(".m", el);
  m.className = "m" + (b.bounces ? " bad" : "");
  m.textContent = b.bounces ? `${t("bounce_n")}: ${b.bounces}` : b.hold != null ? fmtMs(b.hold) : "—";
}

/* ---- pad discovery ---- */
const pads = () => [...(navigator.getGamepads ? navigator.getGamepads() : [])].filter(Boolean);
function currentPad() {
  const list = pads();
  return list.find((p) => p.index === gp.idx) || list[0] || null;
}
function renderPick(list) {
  const box = $("#gp-pick");
  const sig = list.map((p) => p.index + p.id).join(",") + "|" + gp.idx;
  if (box.dataset.sig === sig) return;
  box.dataset.sig = sig; box.textContent = "";
  if (list.length < 2) return;
  list.forEach((p) => {
    const c = document.createElement("button");
    c.className = "chip" + (p.index === gp.idx ? " on" : "");
    c.textContent = `${t("gp_k_" + parsePad(p).kind.replace("nintendo", "nin"))} #${p.index + 1}`;
    c.onclick = () => { gp.idx = p.index; gp.sig = null; gpReset(); };
    box.appendChild(c);
  });
}
window.addEventListener("gamepadconnected", (e) => { snack(t("gp_connected")); log(`${e.gamepad.id} — ${t("gp_connected")}`); });
window.addEventListener("gamepaddisconnected", (e) => { snack(t("gp_disconnected")); log(`${e.gamepad.id} — ${t("gp_disconnected")}`); });

function setupPad(p, list) {
  const info = parsePad(p);
  gp.info = info; gp.std = p.mapping === "standard";
  $("#gp-name").textContent = info.name;
  $("#gp-info").textContent = "";
  const nb = Math.min(p.buttons.length, GP_MAX_BTN), std = Math.min(nb, 17);
  const rumble = p.vibrationActuator || (p.hapticActuators && p.hapticActuators.length);
  const kindName = t("gp_k_" + info.kind) + (info.model ? " · " + info.model : "");
  const facts = [
    ["gp_f_type", kindName],
    ["gp_f_vendor", info.vid ? `${info.vendor || "?"} (${info.vid}:${info.pid})` : "—"],
    ["gp_f_map", gp.std ? t("gp_std") : t("gp_nonstd")],
    ["gp_f_btn", nb > std ? t("gp_btn_val", { n: nb, s: std, e: nb - std }) : String(nb)],
    ["gp_f_axes", String(p.axes.length)],
    ["gp_f_rumble", rumble ? t("gp_yes") : t("gp_no")],
    ["gp_f_slot", t("gp_slot_val", { i: p.index + 1, c: list.length })],
  ];
  const box = $("#gp-facts");
  box.hidden = false; box.textContent = "";
  facts.forEach(([k, v]) => {
    const d = document.createElement("div");
    d.innerHTML = "<span></span><b></b>";
    d.firstChild.textContent = t(k); d.lastChild.textContent = v;
    box.appendChild(d);
  });
  // face-button labels on the picture follow the controller family
  const lab = GP_SVG_LABELS[info.kind];
  $$("#gp-svg [data-gl]").forEach((el) => (el.textContent = lab[+el.dataset.gl]));
  // extra axes beyond the two sticks
  const ax = $("#gp-axes-extra");
  ax.textContent = "";
  for (let k = 4; k < p.axes.length; k++) {
    const d = document.createElement("div");
    d.innerHTML = `<span>A${k + 1}</span><i><u id="xa-${k}"></u></i><b id="xv-${k}">0.00</b>`;
    ax.appendChild(d);
  }
  ensureTiles(nb);
}

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
const binOf = (a) => Math.floor((((a + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2)) * GP_BINS) % GP_BINS;
function recordTrace(key, x, y) {
  const r = Math.hypot(x, y), tr = gp.trace[key];
  if (r <= 0.1) { gp.prev[key] = null; return; }
  const a = Math.atan2(y, x), rr = Math.min(r, 1.2), pv = gp.prev[key];
  if (pv) { // fill the bins we skipped between two frames
    let d = a - pv.a;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    if (Math.abs(d) < Math.PI / 3) {
      const steps = Math.ceil(Math.abs(d) / ((Math.PI * 2) / GP_BINS));
      for (let s = 1; s < steps; s++) {
        const f = s / steps, b = binOf(pv.a + d * f);
        tr[b] = Math.max(tr[b], pv.r + (rr - pv.r) * f);
      }
    }
  }
  const b = binOf(a);
  tr[b] = Math.max(tr[b], rr);
  gp.prev[key] = { a, r: rr };
}

const ICON = { none: "…", ok: "✓", warn: "!", bad: "✕" };
function stickChecks(key) {
  const tr = gp.trace[key];
  const used = tr.filter((v) => v > 0.1).sort((a, b) => a - b);
  const coverage = used.length / GP_BINS;
  const q = (f) => used[Math.min(used.length - 1, Math.floor(f * used.length))];
  const res = {};
  const dr = gp.driftRes[key];
  res.centre = dr == null ? ["none", "—"] : [dr < 3 ? "ok" : dr < 10 ? "warn" : "bad", dr + "%"];
  if (coverage < 0.9) {
    res.reach = ["none", used.length ? Math.round(Math.max(...tr) * 100) + "%" : "—"];
    res.round = ["none", "—", Math.round(coverage * 100)];
  } else {
    const mx = Math.max(...tr), ratio = q(0.1) / q(0.9);
    res.reach = [mx >= 0.95 ? "ok" : mx >= 0.85 ? "warn" : "bad", Math.round(mx * 100) + "%"];
    res.round = [ratio >= 0.85 ? "ok" : ratio >= 0.7 ? "warn" : "bad", Math.round(ratio * 100) + "%", 100];
  }
  return res;
}
function renderChecks(key) {
  const res = stickChecks(key);
  const sig = JSON.stringify(res) + lang;
  if (gp.checksSig[key] === sig) return;
  gp.checksSig[key] = sig;
  const txt = I18N[lang].gp_c, ul = $("#ck-" + key);
  ul.textContent = "";
  for (const name of ["centre", "reach", "round"]) {
    const [st, val, cov] = res[name];
    const li = document.createElement("li");
    li.className = st;
    li.innerHTML = `<span class="ic"></span><span class="nm"></span><b class="v"></b><span class="ds"></span>`;
    $(".ic", li).textContent = ICON[st];
    $(".nm", li).textContent = txt[name].name;
    $(".v", li).textContent = val;
    $(".ds", li).textContent = txt[name][st].replace("{p}", cov || 0);
    ul.appendChild(li);
  }
  // badge: "healthy" only once every check has data and passed
  const all = ["centre", "reach", "round"].map((n) => res[n][0]);
  const badge = all.includes("bad") ? "bad" : all.includes("warn") ? "warn" : all.every((s) => s === "ok") ? "ok" : "none";
  const bd = $("#bd-" + key);
  bd.className = "badge " + badge;
  bd.textContent = I18N[lang].gp_badge[badge];
}
function updateStick(key, x, y) {
  recordTrace(key, x, y);
  drawStick("#cv-" + key, x, y, gp.trace[key]);
  $("#sv-" + key).textContent = `X ${x.toFixed(2)}  Y ${y.toFixed(2)}  ·  ${(Math.hypot(x, y) * 100).toFixed(0)}%`;
  const knob = $("#knob-" + key), base = key === "l" ? [115, 112] : [255, 165];
  knob.setAttribute("cx", base[0] + x * 12); knob.setAttribute("cy", base[1] + y * 12);
  renderChecks(key);
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
  gp.driftRes.l = l; gp.driftRes.r = r;
  v.hidden = false;
  v.className = "verdict " + (worst < 3 ? "ok" : worst < 10 ? "warn" : "bad");
  v.textContent = t(worst < 3 ? "gp_drift_ok" : worst < 10 ? "gp_drift_warn" : "gp_drift_bad", { l, r });
  gp.drift = null;
}
$("#gp-clear").onclick = () => { gp.trace.l.fill(0); gp.trace.r.fill(0); gp.prev.l = gp.prev.r = null; };

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
    if (gp.sig !== "none") {
      gp.sig = "none"; gp.info = null;
      $("#gp-name").textContent = t("gp_none"); $("#gp-info").textContent = t("gp_none_sub");
      $("#gp-facts").hidden = true; $("#gp-rate").textContent = "";
    }
    return;
  }
  const sig = p.id + "|" + p.index + "|" + p.buttons.length + "|" + p.axes.length + "|" + list.length;
  if (sig !== gp.sig) { gp.sig = sig; setupPad(p, list); }
  // polling rate: count distinct state updates per second
  if (p.timestamp !== gp.lastTs) { gp.lastTs = p.timestamp; gp.stamps.push(now); }
  while (gp.stamps.length && now - gp.stamps[0] > 1000) gp.stamps.shift();
  if (gp.stamps.length > 1) {
    const hz = Math.round(((gp.stamps.length - 1) * 1000) / (gp.stamps[gp.stamps.length - 1] - gp.stamps[0]));
    $("#gp-rate").textContent = t("gp_rate", { n: hz });
  }
  // buttons (all of them, including extra paddles/touchpad)
  const n = Math.min(p.buttons.length, GP_MAX_BTN);
  for (let i = 0; i < n; i++) {
    const pb = p.buttons[i], pressed = pb.pressed || pb.value > 0.5, b = gp.buttons[i];
    if (!b) continue;
    if (pressed && !b.down) {
      const gap = now - b.lastUp;
      b.down = true; b.at = now; b.count++;
      if (gap < GP_BOUNCE_MS) { b.bounces++; log(`${btnName(i)} — ${t("bounce_log", { ms: Math.round(gap) })}`, true); }
      log(`${btnName(i)} ${t("down")}`);
      renderGpTile(i);
    } else if (!pressed && b.down) {
      b.down = false; b.lastUp = now; b.hold = now - b.at;
      log(`${btnName(i)} ${t("up")} (${t("held", { ms: Math.round(b.hold) })})`);
      renderGpTile(i);
    }
    if (i < 17 && gp.std) {
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
  }
  const ax = p.axes;
  for (let k = 4; k < ax.length; k++) {
    const u = $("#xa-" + k);
    if (u) { u.style.left = `calc(${((ax[k] + 1) / 2) * 100}% - ${((ax[k] + 1) / 2) * 8}px)`; $("#xv-" + k).textContent = ax[k].toFixed(2); }
  }
  updateStick("l", ax[0] || 0, ax[1] || 0);
  updateStick("r", ax[2] || 0, ax[3] || 0);
  if (gp.drift) driftStep(now, [ax[0] || 0, ax[1] || 0, ax[2] || 0, ax[3] || 0]);
}

function gpReset() {
  gp.buttons = gp.buttons.map(newGpBtn);
  gp.trace.l.fill(0); gp.trace.r.fill(0); gp.prev.l = gp.prev.r = null;
  gp.driftRes.l = gp.driftRes.r = null; gp.drift = null;
  gp.checksSig.l = gp.checksSig.r = "";
  $("#gp-verdict").hidden = true;
  gp.buttons.forEach((_, i) => renderGpTile(i));
  renderChecks("l"); renderChecks("r");
}
function gpRefresh() { // language changed
  gp.sig = null; gp.checksSig.l = gp.checksSig.r = "";
  gp.buttons.forEach((_, i) => renderGpTile(i));
  renderChecks("l"); renderChecks("r");
}
renderChecks("l"); renderChecks("r");
requestAnimationFrame(gpFrame);
applyLang();
