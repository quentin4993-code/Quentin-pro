"""Génère une musique libre de droits (synthétisée) pour les vidéos.

Usage : python3 scripts/make_music.py public/music/run-beat.wav [durée_s] [bpm]
Style : électro motivante, La mineur, progression Am - F - C - G.
"""
import sys
import numpy as np
from scipy.signal import butter, sosfilt

SR = 44100
out = sys.argv[1]
DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 46.0
BPM = float(sys.argv[3]) if len(sys.argv) > 3 else 120.0
BEAT = 60.0 / BPM
N = int(DUR * SR)
rng = np.random.default_rng(7)


def note(n):  # numéro MIDI -> fréquence
    return 440.0 * 2 ** ((n - 69) / 12)


def lp(x, f):
    return sosfilt(butter(2, f, "low", fs=SR, output="sos"), x)


def hp(x, f):
    return sosfilt(butter(2, f, "high", fs=SR, output="sos"), x)


def place(buf, sig, t, gain=1.0):
    i = int(t * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def env(n, a, d):
    t = np.arange(n) / SR
    e = np.exp(-t / d)
    na = max(1, int(a * SR))
    e[:na] *= np.linspace(0, 1, na)
    return e


def saw(f, n, detune=(0.0,)):
    t = np.arange(n) / SR
    s = sum(2 * ((t * f * (1 + d)) % 1) - 1 for d in detune)
    return s / len(detune)


# --- Sons de base ---
def kick():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = 50 + 110 * np.exp(-t / 0.03)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.12)


def clap():
    n = int(0.25 * SR)
    return hp(rng.standard_normal(n), 1200) * env(n, 0.001, 0.06)


def hat(open_=False):
    n = int((0.18 if open_ else 0.05) * SR)
    return hp(rng.standard_normal(n), 7000) * env(n, 0.001, 0.05 if open_ else 0.015)


KICK, CLAP, HAT, OHAT = kick(), clap(), hat(), hat(True)

# Am, F, C, G (une mesure chacun)
CHORDS = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
ROOTS = [45, 41, 48, 43]

drums = np.zeros(N)
bass = np.zeros(N)
pad = np.zeros(N)
arp = np.zeros(N)

bar = 4 * BEAT
nbars = int(np.ceil(DUR / bar))
for b in range(nbars):
    t0 = b * bar
    c = CHORDS[b % 4]
    r = ROOTS[b % 4]
    intro = b < 1  # première mesure : sans grosse caisse, pour l'accroche
    for k in range(4):
        tb = t0 + k * BEAT
        if not intro:
            place(drums, KICK, tb, 0.9)
        if k in (1, 3):
            place(drums, CLAP, tb, 0.16)
        place(drums, HAT, tb + BEAT / 2, 0.07)
        if k == 3:
            place(drums, OHAT, tb + BEAT / 2, 0.05)
    # basse : croches sur la fondamentale, en contretemps du kick
    for k in range(8):
        if k % 2 == 1 or intro:
            n = int(BEAT / 2 * SR)
            s = lp(saw(note(r), n, (0, 0.005)), 600) * env(n, 0.005, 0.15)
            place(bass, s, t0 + k * BEAT / 2, 0.55)
    # nappe d'accords
    n = int(bar * SR)
    s = sum(saw(note(m), n, (-0.004, 0.004)) for m in c) / 3
    s = lp(s, 1800) * np.minimum(1, np.arange(n) / (0.05 * SR)) * np.minimum(1, (n - np.arange(n)) / (0.05 * SR))
    place(pad, s, t0, 0.3)
    # arpège en doubles croches (après l'intro)
    if b >= 2:
        seq = [c[0] + 12, c[1] + 12, c[2] + 12, c[1] + 12]
        for k in range(16):
            n = int(BEAT / 4 * SR)
            m = seq[k % 4]
            s = np.sign(np.sin(2 * np.pi * note(m) * np.arange(n) / SR)) * env(n, 0.002, 0.06)
            place(arp, lp(s, 3000), t0 + k * BEAT / 4, 0.12)

# "sidechain" : la nappe et la basse respirent avec le kick
t = np.arange(N) / SR
pump = 1 - 0.6 * np.exp(-((t % BEAT)) / 0.08)
mix = drums + (bass + pad + arp) * pump

# fondu de fin
fade = int(1.5 * SR)
mix[-fade:] *= np.linspace(1, 0, fade)
mix = np.tanh(mix * 1.2)
mix /= np.max(np.abs(mix)) * 1.12

stereo = np.stack([mix, mix], axis=1)
from scipy.io import wavfile

wavfile.write(out, SR, (stereo * 32767).astype(np.int16))
print(f"OK {out} {DUR}s {BPM}bpm")
