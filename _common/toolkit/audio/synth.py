"""BAUBC procedural audio kit — every sound is synthesized here (numpy/scipy), so the
whole soundtrack is original, royalty-free and rebuilds from source.

    from synth import Mix, sfx, SR
    m = Mix(duration); m.add(sfx('whoosh'), t=1.2, gain=.6, pan=-.3); m.write('out.wav')
"""
import numpy as np, wave
from scipy.signal import butter, lfilter, fftconvolve

SR = 48000
rng = np.random.default_rng(7)
def tt(d): return np.arange(int(d * SR)) / SR
def noise(d): return rng.uniform(-1, 1, int(d * SR))
def lp(x, fc, o=2): b, a = butter(o, min(fc, SR * .45) / (SR / 2)); return lfilter(b, a, x)
def hp(x, fc, o=2): b, a = butter(o, fc / (SR / 2), 'high'); return lfilter(b, a, x)
def bp(x, lo, hi, o=2): b, a = butter(o, [lo / (SR / 2), hi / (SR / 2)], 'band'); return lfilter(b, a, x)
def env(d, a=.005, r=.05, curve=3.0):
    """fast attack, exponential decay over d"""
    t = tt(d); e = np.exp(-curve * t / max(d, 1e-4)); e *= np.minimum(1, t / a); e *= np.minimum(1, (d - t) / max(r, 1e-4)).clip(0, 1); return e
def sweep(f0, f1, d, shape=1.0):
    """phase of an exponential/shape-warped frequency glide"""
    t = tt(d); k = (t / d) ** shape; f = f0 * (f1 / f0) ** k; return 2 * np.pi * np.cumsum(f) / SR
def saw(ph): return 2 * ((ph / (2 * np.pi)) % 1) - 1
def sq(ph): return np.sign(np.sin(ph))
def midi(n): return 440 * 2 ** ((n - 69) / 12)
def svf_bp(x, fc, q=2.0):
    """time-varying state-variable band-pass (fc = array of Hz)"""
    out = np.empty_like(x); lo = bd = 0.0; f = 2 * np.sin(np.pi * np.minimum(fc, SR / 6.5) / SR); d = 1 / q
    for i in range(len(x)):
        lo += f[i] * bd; h = x[i] - lo - d * bd; bd += f[i] * h; out[i] = bd
    return out
_IR = None
def reverb(x, wet=.3, d=1.6):
    global _IR
    if _IR is None or len(_IR) != int(d * SR):
        t = tt(d); _IR = hp(rng.normal(0, 1, len(t)) * np.exp(-5.5 * t / d), 250) * .05
    w = fftconvolve(x, _IR)[:len(x) + len(_IR)]
    y = np.zeros(len(w)); y[:len(x)] = x; return y + wet * w

# ───────────── drums / instruments ─────────────
def kick(d=.42, f0=150, f1=42, drive=1.6):
    y = np.sin(sweep(f0, f1, d, .35)) * env(d, .001, .05, 5); y += hp(noise(d), 3000) * env(d, .0005, .01, 60) * .25
    return np.tanh(y * drive)
def clap(d=.22):
    n = bp(noise(d), 900, 4200); t = tt(d); e = sum(np.exp(-90 * np.abs(t - o)) for o in (0, .011, .023)) * .5 + np.exp(-22 * t) * (t > .03)
    return n * e * 1.4
def hat(d=.05, open_=False): return hp(noise(d if not open_ else .22), 7500) * env(d if not open_ else .22, .001, .01, 6 if not open_ else 4) * .6
def bass(note, d, cut=420, drive=1.4):
    f = midi(note); ph = 2 * np.pi * f * tt(d); y = saw(ph) * .6 + np.sin(ph / 2) * .9 + sq(ph) * .25
    return np.tanh(lp(y, cut) * env(d, .006, .04, 1.6) * drive)
def pluck(note, d=.5, bright=3500):
    f = midi(note); ph = 2 * np.pi * f * tt(d); raw = saw(ph) + saw(ph * 1.005) * .6
    return (lp(raw, bright) * env(d, .002, .02, 14) + lp(raw, 900) * env(d, .002, .05, 4) * .7) * .5
def pad(notes, d, cut=1100, a=.6, r=.8):
    t = tt(d); y = np.zeros(len(t))
    for n in notes:
        for det in (-.07, 0, .08): y += saw(2 * np.pi * midi(n + det) * t + det * 40)
    e = np.minimum(1, t / a) * np.minimum(1, (d - t) / r).clip(0, 1)
    return lp(y, cut, 2) * e / (len(notes) * 2.2)
def bell(f, d=.9, bright=1.0):
    t = tt(d); return (np.sin(2 * np.pi * f * t) + .5 * bright * np.sin(2 * np.pi * f * 2.76 * t) * np.exp(-6 * t) + .25 * bright * np.sin(2 * np.pi * f * 5.4 * t) * np.exp(-12 * t)) * env(d, .002, .05, 5) * .5

# ───────────── sound effects ─────────────
PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24]
def _whoosh(d, f0, f1, q=1.6, lowmix=0.0):
    n = noise(d); t = tt(d); fc = f0 * (f1 / f0) ** ((np.sin(np.pi * t / d)) ** 1.0)
    y = svf_bp(n, fc, q) * np.sin(np.pi * t / d) ** 1.6
    if lowmix: y += lp(n, 180) * np.sin(np.pi * t / d) ** 2 * lowmix
    return y
_cache = {}
def sfx(name, p=0, d=None, soft=0):
    key = (name, p, d, soft)
    if key in _cache: return _cache[key]
    y = _make(name, p, d, soft); _cache[key] = y; return y
def _make(name, p, d, soft):
    if name == 'whoosh': return _whoosh(.5, 300, 3800) * .9
    if name == 'swish': return _whoosh(.26, 900, 6500, 2.2) * .6
    if name == 'sweep': return _whoosh(.7, 180, 5200, 1.2, .8) * 1.0
    if name == 'click': return (np.sin(2 * np.pi * 2300 * tt(.03)) * env(.03, .0005, .005, 9) + hp(noise(.03), 5000) * env(.03, .0005, .005, 30) * .5) * .7
    if name == 'pop': f = 520 * 2 ** (PENTA[p % 11] / 12); return np.sin(sweep(f * 1.7, f, .11, .5)) * env(.11, .002, .02, 5) * .8
    if name == 'tick': f = 1400 * 2 ** (PENTA[p % 11] / 12 / 2); return np.sin(2 * np.pi * f * tt(.035)) * env(.035, .0005, .008, 8) * .5
    if name == 'clock': return (bp(noise(.05), 1500, 3500) * env(.05, .0005, .01, 12) + np.sin(2 * np.pi * (880 + p * 40) * tt(.05)) * env(.05, .001, .01, 10) * .6) * .9
    if name == 'ding': return reverb(bell(1318.5, 1.0), .35)
    if name == 'star': return reverb(bell(880 * 2 ** (PENTA[p % 11] / 12), .7), .3) * .8
    if name == 'impact':
        dd = 1.6; y = np.sin(sweep(95, 30, dd, .3)) * env(dd, .002, .2, 4) * 1.3 + lp(noise(dd), 2500) * env(dd, .001, .1, 14) * .8
        y[:int(.5 * SR)] += hp(noise(.5), 4000) * env(.5, .001, .05, 10) * .35
        return reverb(np.tanh(y * (1.0 if soft else 1.5)), .5) * (.6 if soft else 1.0)
    if name == 'boom': y = np.sin(sweep(110, 38, .7, .3)) * env(.7, .002, .1, 5) + lp(noise(.7), 1200) * env(.7, .001, .05, 18) * .5; return reverb(np.tanh(y * 1.4), .3) * .85
    if name == 'thud': return np.tanh(np.sin(sweep(130, 45, .28, .4)) * env(.28, .002, .05, 6) * 1.5) * .9
    if name == 'stamp': y = np.sin(sweep(160, 50, .3, .4)) * env(.3, .001, .05, 7) + bp(noise(.3), 600, 3000) * env(.3, .0005, .02, 25) * .9; return reverb(np.tanh(y * 1.6), .2)
    if name == 'error':
        y = np.concatenate([lp(sq(2 * np.pi * f * tt(.14)), 1800) * env(.14, .003, .02, 1.5) for f in (233, 174.6)]); return y * .5
    if name == 'deny': f = 190 * 2 ** (-p / 12); return lp(sq(2 * np.pi * f * tt(.1)) + saw(2 * np.pi * f * 1.5 * tt(.1)) * .4, 1500) * env(.1, .002, .02, 3) * .5
    if name == 'alarm':
        y = np.concatenate([lp(sq(2 * np.pi * f * tt(.085)), 3200) * env(.085, .003, .01, .8) for f in (932, 698) * 3]); return reverb(y * .32, .2)
    if name == 'glitch':
        y = np.concatenate([(sq(2 * np.pi * rng.choice([110, 220, 440, 1760, 3520]) * tt(l)) if rng.random() > .4 else noise(l)) * (rng.random() > .25) for l in rng.uniform(.012, .05, 12)]); return lp(y, 6000) * .32
    if name == 'heart':
        y = np.zeros(int(.5 * SR)); k = kick(.2, 90, 40, 1.2)
        y[:len(k)] += k; o = int(.17 * SR); y[o:o + len(k)] += k * .7; return y * .8
    if name == 'bubble': return np.sin(sweep(280, 1100, .16, 1.6)) * env(.16, .004, .03, 2) * .7 + np.pad(np.sin(sweep(500, 1500, .1, 1.5)) * env(.1, .003, .02, 2) * .5, (int(.09 * SR), 0))[:int(.16 * SR)]
    if name == 'flip': return (hp(noise(.05), 2500) * env(.05, .0005, .01, 10) * .6 + np.sin(2 * np.pi * (700 + p * 110) * tt(.05)) * env(.05, .001, .01, 9) * .5)
    if name == 'windup':
        dd = d or 2.6; y = np.zeros(int(dd * SR)); t0 = 0.0; i = 0
        while t0 < dd - .05:
            k = sfx('clock', i % 3) * (.4 + .6 * t0 / dd); o = int(t0 * SR); y[o:o + len(k)] += k[:len(y) - o]; t0 += max(.045, .26 * (1 - t0 / dd) ** 1.3); i += 1
        return y * .7
    if name == 'mystery':
        dd = 2.4; t = tt(dd); y = (np.sin(2 * np.pi * 220 * t) + np.sin(2 * np.pi * 233.1 * t) * .7 + np.sin(2 * np.pi * 110 * t)) * np.sin(np.pi * t / dd) ** 2 * .22; return reverb(y + np.pad(bell(659.3, 1.2) * .5, (0, len(y) - int(1.2 * SR))), .5)
    if name == 'rumble': return lp(noise(1.0), 90, 3) * np.sin(np.pi * tt(1.0)) ** 1.5 * 5.0
    if name == 'fall': f = 1000 * 2 ** (-p / 12); return np.sin(sweep(f, f * .22, .55, 1.4)) * env(.55, .01, .1, 1.2) * .28
    if name == 'riser':
        dd = d or 1.5; t = tt(dd); k = t / dd
        y = svf_bp(noise(dd), 400 * 20 ** k, 1.4) * k ** 2 * .9 + np.sin(sweep(110, 880, dd, 1.6)) * k ** 2 * .35 + saw(sweep(55, 440, dd, 1.6)) * k ** 3 * .12
        return y * np.minimum(1, (dd - t) / .02)
    if name == 'count':
        dd = d or 1.5; y = np.zeros(int(dd * SR)); n = int(dd * 26)
        for i in range(n):
            k = np.sin(2 * np.pi * (900 + 1500 * i / n) * tt(.022)) * env(.022, .0005, .005, 6) * (.25 if soft else .45); o = int(i * dd / n * SR); y[o:o + len(k)] += k
        return y
    if name == 'drain':
        dd = d or 1.7; t = tt(dd); return (np.sin(sweep(700, 70, dd, 1.3)) * .5 + saw(sweep(350, 35, dd, 1.3)) * .15) * (.6 + .4 * np.sin(2 * np.pi * 9 * t)) * np.minimum(1, t / .05) * np.minimum(1, (dd - t) / .08) * .55
    if name == 'stop': return (saw(sweep(260, 28, .5, .8)) * .4 + np.sin(sweep(520, 40, .5, .8)) * .5) * env(.5, .005, .08, 1.5) * .6
    if name == 'zap': return lp(saw(sweep(1500 * 2 ** (p / 6), 180, .1, .7)), 5000) * env(.1, .001, .02, 3) * .45
    if name == 'switch': return np.concatenate([sfx('click') * 1.3, np.zeros(int(.03 * SR)), sfx('thud')])
    if name == 'success':
        y = np.zeros(int(1.6 * SR))
        for i, n in enumerate((72, 76, 79, 84, 88)): b = bell(midi(n), 1.0) * (.5 if soft else .8); o = int(i * .07 * SR); y[o:o + len(b)] += b
        return reverb(y, .4)
    if name == 'shine':
        t = tt(.9); return reverb(bp(noise(.9), 6000, 12000) * np.sin(np.pi * t / .9) ** 2 * .25 + bell(2637, .9, .4) * .25, .4)
    if name == 'lock': y = np.concatenate([sfx('click') * 1.2, sfx('boom')[:int(1.2 * SR)]]); return y
    if name == 'ticks': return np.concatenate([np.pad(sfx('tick', i * 2), (0, int(.05 * SR) - int(.035 * SR))) for i in range(6)])
    raise KeyError(name)

class Mix:
    def __init__(self, duration): self.n = int(duration * SR); self.L = np.zeros(self.n + SR * 4); self.R = np.zeros(self.n + SR * 4)
    def add(self, y, t, gain=1.0, pan=0.0):
        o = int(max(0, t) * SR); y = y[:len(self.L) - o]; a = (pan + 1) * np.pi / 4
        self.L[o:o + len(y)] += y * gain * np.cos(a) * 1.414; self.R[o:o + len(y)] += y * gain * np.sin(a) * 1.414
    def bus(self): return np.stack([self.L[:self.n], self.R[:self.n]])
    def write(self, path, extra=None, fade_out=.25):
        x = self.bus() + (extra if extra is not None else 0)
        x = np.tanh(x * 1.1) ; x /= max(1e-9, np.abs(x).max()) / .89
        f = int(fade_out * SR); x[:, -f:] *= np.linspace(1, 0, f)
        with wave.open(path, 'wb') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((x.T * 32767).astype('<i2').tobytes())
        return x
