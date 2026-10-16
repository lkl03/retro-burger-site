"""Hace que un clip termine EXACTO en su keyframe final: funde los últimos N frames
hacia el keyframe (Veo a veces llega corrido). Uso: python patch_tail.py clips/clip-2.mp4 keyframes/kf-2.png 18"""
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image

src, kf, n = Path(sys.argv[1]), sys.argv[2], int(sys.argv[3])
W, H = 1920, 1080
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(src), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                     capture_output=True, check=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, H, W, 3)
k = np.asarray(Image.open(kf).convert("RGB").resize((W, H), Image.LANCZOS)).astype(np.float32)
tmp = src.with_suffix(".tmp.mp4")
ff = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}",
                       "-r", "24", "-i", "-", "-c:v", "libx264", "-crf", "14", "-pix_fmt", "yuv420p", str(tmp)],
                      stdin=subprocess.PIPE)
start = len(fr) - n
for i, f in enumerate(fr):
    if i < start:
        ff.stdin.write(f.tobytes())
        continue
    t = (i - start + 1) / n
    e = t * t * (3 - 2 * t)
    ff.stdin.write((f.astype(np.float32) * (1 - e) + k * e).clip(0, 255).astype(np.uint8).tobytes())
ff.stdin.close()
ff.wait()
tmp.replace(src)
print("ok", src, len(fr), "frames, tail", n)
