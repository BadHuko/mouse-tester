"""Generates assets/icon.ico (a stylised mouse on a rounded blue tile)."""
import os

from PIL import Image, ImageDraw

S = 512
img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)
d.rounded_rectangle((0, 0, S - 1, S - 1), radius=112, fill=(59, 91, 219, 255))
# mouse body
d.rounded_rectangle((150, 70, 362, 442), radius=106, fill=(255, 255, 255, 255))
d.line((256, 70, 256, 235), fill=(59, 91, 219, 255), width=10)
d.line((150, 235, 362, 235), fill=(59, 91, 219, 255), width=10)
# wheel
d.rounded_rectangle((232, 115, 280, 205), radius=24, fill=(59, 91, 219, 255))

out = os.path.join(os.path.dirname(__file__), "..", "assets", "icon.ico")
img.save(out, sizes=[(16, 16), (24, 24), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)])
print("saved", os.path.abspath(out))

img.resize((256, 256), Image.LANCZOS).save(os.path.join(os.path.dirname(__file__), "..", "images", "logo.png"))
