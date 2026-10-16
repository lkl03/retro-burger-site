"""Clip 3 de Flow: Veo encogió la imagen con barras negras en los frames 6-59.
Se reemplazan los frames 0-59 por un fundido con leve push desde el frame 0
(= kf-2) al frame 60 (primer frame a pantalla completa). 0 créditos."""
import subprocess
import numpy as np
from PIL import Image

SRC, OUT, CUT = "flow-dl/clip-3-orig.mp4", "flow-dl/clip-3.mp4", 60
W, H = 1280, 720
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                     capture_output=True, check=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3)
a, b = Image.fromarray(fr[0]), Image.fromarray(fr[CUT])


def zoom(im, s):
    if s == 1:
        return im
    w, h = int(W / s), int(H / s)
    x, y = (W - w) // 2, (H - h) // 2
    return im.crop((x, y, x + w, y + h)).resize((W, H), Image.LANCZOS)


ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                       "-r", "24", "-i", "-", "-c:v", "libx264", "-crf", "14", "-pix_fmt", "yuv420p", OUT],
                      stdin=subprocess.PIPE)
for i in range(CUT):
    t = i / (CUT - 1)
    e = t * t * (3 - 2 * t)  # smoothstep
    fa = zoom(a, 1 + 0.06 * e)
    fb = zoom(b, 1.06 - 0.06 * e)
    ff.stdin.write(np.asarray(Image.blend(fa, fb, e)).tobytes())
for k in range(CUT, len(fr)):
    ff.stdin.write(fr[k].tobytes())
ff.stdin.close()
ff.wait()
print("frames", len(fr), "->", OUT)
