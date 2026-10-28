"""Renders README screenshots and images/demo.gif from the real UI.

Mouse input is real (Playwright drives Chrome); the gamepad is simulated via an
init script that replaces navigator.getGamepads(). Requires: playwright, pillow
and an installed Chrome (no browser download needed).

    python tools/make_screens.py
"""
import io
import os
import pathlib
import random

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
INDEX = (ROOT / "assets" / "index.html").as_uri()
OUT = ROOT / "images"

FAKE_PAD = """
window.__pad = {index: 0, id: "Xbox Wireless Controller (STANDARD GAMEPAD Vendor: 045e Product: 0b13)",
  mapping: "standard", timestamp: 1, axes: [0, 0, 0, 0],
  buttons: Array.from({length: 21}, () => ({pressed: false, value: 0})),
  vibrationActuator: {playEffect: () => Promise.resolve()}};
navigator.getGamepads = () => [window.__pad];
"""

PAD_JS = """
async (mode) => {
  const p = window.__pad, wait = (ms) => new Promise(r => setTimeout(r, ms));
  const press = async (i, ms) => { p.buttons[i] = {pressed: true, value: 1}; p.timestamp++; await wait(ms); p.buttons[i] = {pressed: false, value: 0}; p.timestamp++; await wait(60); };
  if (mode === 'sticks') {
    for (let a = 0; a < 6.6; a += 0.09) {
      const rl = 0.97 - 0.05 * Math.abs(Math.sin(a * 2)), rr = 0.98 - 0.04 * Math.abs(Math.cos(a * 2));
      p.axes = [Math.cos(a) * rl, Math.sin(a) * rl, Math.cos(-a) * rr, Math.sin(-a) * rr]; p.timestamp++; await wait(14);
    }
    p.axes = [0, 0, 0, 0]; p.timestamp++;
  } else if (mode === 'buttons') {
    for (const i of [0, 1, 2, 3, 4, 5, 9, 12, 15, 17, 18, 19, 20]) await press(i, 90);
  } else if (mode === 'hold') {
    p.buttons[0] = {pressed: true, value: 1}; p.buttons[7] = {pressed: false, value: 0.62}; p.buttons[6] = {pressed: false, value: 0.3};
    p.axes = [0.55, -0.4, 0, 0]; p.timestamp++;
  } else if (mode === 'release') {
    p.buttons[0] = {pressed: false, value: 0}; p.buttons[7] = {pressed: false, value: 0}; p.buttons[6] = {pressed: false, value: 0};
    p.axes = [0, 0, 0, 0]; p.timestamp++;
  }
}
"""


class Recorder:
    def __init__(self, page):
        self.page, self.frames = page, []

    def snap(self, n=1):
        for _ in range(n):
            img = Image.open(io.BytesIO(self.page.screenshot())).convert("RGB")
            self.frames.append(img.resize((820, round(820 * img.height / img.width)), Image.LANCZOS))

    def save(self, path):
        pal = [f.quantize(colors=96, method=Image.MEDIANCUT, dither=Image.NONE) for f in self.frames]
        pal[0].save(path, save_all=True, append_images=pal[1:], duration=170, loop=0, optimize=True, disable_background_saving=True)


def nav(page, name):
    page.click(f'.rail-item[data-page="{name}"]')
    page.wait_for_timeout(350)


def click_wheel(page, n, rec=None):
    for _ in range(n):
        page.mouse.down(button="middle"); page.wait_for_timeout(random.randint(55, 105))
        page.mouse.up(button="middle"); page.wait_for_timeout(random.randint(120, 220))
        if rec: rec.snap()


def run(lang, theme, gif):
    random.seed(7)
    with sync_playwright() as pw:
        b = pw.chromium.launch(channel="chrome", headless=True)
        ctx = b.new_context(viewport={"width": 1180, "height": 760}, locale=lang, color_scheme=theme)
        ctx.add_init_script(FAKE_PAD)
        page = ctx.new_page()
        page.goto(INDEX)
        page.wait_for_timeout(500)
        out = OUT / lang
        out.mkdir(parents=True, exist_ok=True)
        rec = Recorder(page) if gif else None
        shot = lambda name: page.screenshot(path=str(out / f"{name}.png"))

        # --- buttons page ---
        page.mouse.move(700, 600)
        for btn, n in (("left", 9), ("right", 4)):
            for _ in range(n):
                page.mouse.down(button=btn); page.wait_for_timeout(random.randint(60, 120))
                if rec: rec.snap()
                page.mouse.up(button=btn); page.wait_for_timeout(random.randint(100, 180))
                if rec: rec.snap()
        click_wheel(page, 6, rec)
        page.mouse.down(button="middle"); page.wait_for_timeout(120)
        shot("buttons")
        if rec: rec.snap(3)
        page.mouse.up(button="middle")

        # --- wheel page ---
        nav(page, "wheel")
        if rec: rec.snap(2)
        click_wheel(page, 10, rec)
        page.hover("#scroll-zone")
        for i in range(34):
            page.mouse.wheel(0, 100 if i < 22 else -100)
            page.wait_for_timeout(35)
            if rec and i % 3 == 0: rec.snap()
        page.wait_for_timeout(300)
        shot("wheel")
        if rec: rec.snap(3)

        # --- gamepad page ---
        nav(page, "gamepad")
        page.wait_for_timeout(400)
        if rec: rec.snap(2)
        page.evaluate(PAD_JS, "buttons")
        page.evaluate(PAD_JS, "sticks")
        page.evaluate(PAD_JS, "sticks")
        if rec: rec.snap(2)
        page.click("#gp-drift")
        page.wait_for_timeout(3400)
        page.evaluate(PAD_JS, "hold")
        page.wait_for_timeout(300)
        page.set_viewport_size({"width": 1180, "height": 1240})
        page.wait_for_timeout(300)
        page.screenshot(path=str(out / "gamepad.png"))
        page.set_viewport_size({"width": 1180, "height": 760})
        page.wait_for_timeout(200)
        if rec: rec.snap(4)
        page.evaluate(PAD_JS, "release")
        ctx.close(); b.close()
        return rec


if __name__ == "__main__":
    OUT.mkdir(exist_ok=True)
    for lang in ("ru", "en"):
        r = run(lang, "dark", gif=(lang == "en"))
        if r:
            r.save(OUT / "demo.gif")
            print("gif frames:", len(r.frames), os.path.getsize(OUT / "demo.gif") // 1024, "KB")
    # one light-theme shot for the README gallery
    with sync_playwright() as pw:
        b = pw.chromium.launch(channel="chrome", headless=True)
        ctx = b.new_context(viewport={"width": 1180, "height": 760}, locale="en", color_scheme="light")
        ctx.add_init_script(FAKE_PAD)
        page = ctx.new_page(); page.goto(INDEX); page.wait_for_timeout(400)
        page.mouse.move(700, 600)
        for btn, n in (("left", 14), ("right", 5)):
            for _ in range(n):
                page.mouse.down(button=btn); page.wait_for_timeout(80); page.mouse.up(button=btn); page.wait_for_timeout(60)
        click_wheel(page, 8)
        page.mouse.down(button="left"); page.wait_for_timeout(100)
        page.screenshot(path=str(OUT / "light.png"))
        b.close()
    print("done")
