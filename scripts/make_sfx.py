"""Génère les bruitages (sons courts) utilisés dans les vidéos : public/sfx/*.wav

Usage : python3 scripts/make_sfx.py public/sfx
- pop-hi / pop-mid / pop-lo : objet qui se range (aigu → grave)
- whoosh : apparition (hook, tableau)
- thud : petit impact sourd
- ding : bouton « Abonne-toi »
"""
import os
import sys
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 48000
OUT = sys.argv[1] if len(sys.argv) > 1 else "public/sfx"
os.makedirs(OUT, exist_ok=True)
rng = np.random.default_rng(3)


def t(d):
    return np.arange(int(d * SR)) / SR


def bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], "band", fs=SR, output="sos"), x)


def lp(x, f):
    return sosfilt(butter(2, f, "low", fs=SR, output="sos"), x)


def hp(x, f):
    return sosfilt(butter(2, f, "high", fs=SR, output="sos"), x)


def save(name, x, peak_db=-3.0):
    x = x / (np.max(np.abs(x)) + 1e-9) * 10 ** (peak_db / 20)
    fade = int(0.004 * SR)
    x[-fade:] *= np.linspace(1, 0, fade)
    st = np.stack([x, x], 1)
    wavfile.write(os.path.join(OUT, name + ".wav"), SR, (st * 32767).astype(np.int16))
    print("OK", name, f"{len(x) / SR:.2f}s")


def pop(f0):
    tt = t(0.16)
    f = f0 * (0.45 + 0.55 * np.exp(-tt / 0.018))  # glissement rapide vers le grave
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.045)
    click = hp(rng.standard_normal(len(tt)), 2500) * np.exp(-tt / 0.0025) * 0.35
    return body + click


def whoosh(d=0.42):
    tt = t(d)
    n = rng.standard_normal(len(tt))
    # bandes de bruit qui se relaient en douceur (fenêtres gaussiennes) : balayage grave → aigu
    out = np.zeros_like(n)
    bands = 14
    for i in range(bands):
        c = 350 * (9 ** (i / (bands - 1)))
        centre = (i + 0.5) / bands * d
        win = np.exp(-0.5 * ((tt - centre) / (d / bands * 1.4)) ** 2)
        out += bp(n, c * 0.7, min(c * 1.45, 20000)) * win
    env = np.sin(np.pi * np.clip(tt / d, 0, 1)) ** 1.4
    return out * env


def thud():
    tt = t(0.22)
    f = 55 + 90 * np.exp(-tt / 0.03)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / 0.07)
    knock = lp(rng.standard_normal(len(tt)), 900) * np.exp(-tt / 0.012) * 0.6
    return body + knock


def ding():
    tt = t(1.1)
    x = (np.sin(2 * np.pi * 1318.5 * tt) * 1.0 + np.sin(2 * np.pi * 1975.5 * tt) * 0.55
         + np.sin(2 * np.pi * 2637 * tt) * 0.25 + np.sin(2 * np.pi * 3520.7 * tt) * 0.1)
    env = np.exp(-tt / 0.32) * np.minimum(1, tt / 0.003)
    return x * env


save("pop-hi", pop(1150))
save("pop-mid", pop(900))
save("pop-lo", pop(680))
save("whoosh", whoosh())
save("thud", thud())
save("ding", ding(), peak_db=-5)
