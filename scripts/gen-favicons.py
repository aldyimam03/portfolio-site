"""Generate favicon & icon PWA dari monogram 'a' (tanpa aset eksternal)."""
from PIL import Image, ImageDraw, ImageFont

BG = (2, 6, 23)          # #020617
RING = (99, 102, 241)    # indigo-500
FG = (255, 255, 255)

FONT_CANDIDATES = [
    'C:/Windows/Fonts/arialbd.ttf',
    'C:/Windows/Fonts/segoeuib.ttf',
    'C:/Windows/Fonts/verdanab.ttf',
]

def font(size):
    for path in FONT_CANDIDATES:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()

S = 1024
img = Image.new('RGBA', (S, S), (0, 0, 0, 0))
d = ImageDraw.Draw(img)

# kotak membulat
d.rounded_rectangle([0, 0, S - 1, S - 1], radius=int(S * 0.22), fill=BG)
# garis tepi tipis bergradasi kasar (dua lapis)
d.rounded_rectangle([6, 6, S - 7, S - 7], radius=int(S * 0.21), outline=(99, 102, 241, 90), width=6)

# monogram 'a'
f = font(int(S * 0.62))
text = 'a'
bbox = d.textbbox((0, 0), text, font=f)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
d.text(((S - tw) / 2 - bbox[0], (S - th) / 2 - bbox[1] - int(S * 0.02)), text, font=f, fill=FG)

# titik aksen
r = int(S * 0.055)
cx, cy = int(S * 0.735), int(S * 0.735)
d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=RING)

img.save('public/android-chrome-512x512.png', optimize=True)
img.resize((192, 192), Image.LANCZOS).save('public/android-chrome-192x192.png', optimize=True)
img.resize((180, 180), Image.LANCZOS).save('public/apple-touch-icon.png', optimize=True)
img.resize((32, 32), Image.LANCZOS).save('public/favicon-32x32.png', optimize=True)
img.resize((16, 16), Image.LANCZOS).save('public/favicon-16x16.png', optimize=True)
img.resize((48, 48), Image.LANCZOS).save(
    'public/favicon.ico', format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48)],
)
print('selesai: favicon.ico, favicon-16/32, apple-touch-icon, android-chrome-192/512')
