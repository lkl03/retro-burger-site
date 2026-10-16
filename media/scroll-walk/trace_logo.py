"""Vectoriza el logo oficial de FINO (foto 'Del propietario' en Google Maps) a SVG de un color.
Salida: public/brand/fino-logo.svg (fill=currentColor) + fino-logo.png transparente."""
import numpy as np
import potrace
from PIL import Image

src = "media/scroll-walk/extras/logo.jpg"
im = Image.open(src).convert("RGB")
a = np.asarray(im).astype(np.int16)
# tinta vino (#6a0019) vs fondo gris claro: luminancia baja = tinta
lum = 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
ink = lum < 150
ys, xs = np.where(ink)
pad = 4
y0, y1, x0, x1 = ys.min() - pad, ys.max() + pad, xs.min() - pad, xs.max() + pad
mask = ink[y0:y1, x0:x1]
h, w = mask.shape

bmp = potrace.Bitmap(~mask)
path = bmp.trace(turdsize=6, alphamax=1.0, opticurve=True, opttolerance=0.2)
parts = []
for curve in path:
    s = curve.start_point
    d = [f"M{s.x:.1f},{s.y:.1f}"]
    for seg in curve.segments:
        if seg.is_corner:
            d.append(f"L{seg.c.x:.1f},{seg.c.y:.1f}L{seg.end_point.x:.1f},{seg.end_point.y:.1f}")
        else:
            d.append(f"C{seg.c1.x:.1f},{seg.c1.y:.1f} {seg.c2.x:.1f},{seg.c2.y:.1f} {seg.end_point.x:.1f},{seg.end_point.y:.1f}")
    parts.append("".join(d) + "Z")
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="currentColor" fill-rule="evenodd">'
       f'<path d="{"".join(parts)}"/></svg>')
open("public/brand/fino-logo.svg", "w").write(svg)
rgba = np.zeros((h, w, 4), np.uint8)
rgba[mask] = (106, 0, 25, 255)
Image.fromarray(rgba).save("public/brand/fino-logo.png")
print("viewBox", w, h, "paths", len(parts), "bytes", len(svg))
