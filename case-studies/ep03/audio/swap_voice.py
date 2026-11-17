#!/usr/bin/env python3
"""ONE command to replace the EP03 voice-over and get a finished video.

    python3 case-studies/ep03/audio/swap_voice.py  path/to/new_voice.mp3            # sync + audio + render
    python3 case-studies/ep03/audio/swap_voice.py  path/to/new_voice.mp3 --no-render

What it does: 1) copies the file to audio/vo/voice.mp3 and finds every line in it (voice_sync.py → src/vo_timing.js),
2) re-times all animation, subtitles and sound cues to the new voice, 3) rebuilds the stems + mix,
4) renders renders/BAUBC_CaseStudies_EP03_Nabanna_1080x1920_60fps.mp4.
Rules for the new recording: same 18 lines in the same order (src/lines.js), a short pause between lines.
If one line's timing looks wrong in the printed table, fix it by hand in src/vo_timing.js and re-run with no file argument.
"""
import os, sys, subprocess
A = os.path.dirname(os.path.abspath(__file__)); EP = os.path.dirname(A); REPO = os.path.abspath(os.path.join(EP, '..', '..'))
args = [x for x in sys.argv[1:] if not x.startswith('--')]
def run(*cmd): print('\n$', ' '.join(cmd)); subprocess.run(cmd, check=True, cwd=REPO)
run(sys.executable, os.path.join(A, 'voice_sync.py'), *[os.path.abspath(x) for x in args])
html = os.path.join(EP, 'src', 'index.html'); render = os.path.join(REPO, '_common', 'toolkit', 'render.mjs')
run('node', render, '--html', html, '--cues', os.path.join(A, 'cues.json'))
run(sys.executable, os.path.join(A, 'build_audio.py'))
if '--no-render' not in sys.argv:
    run('node', render, '--html', html, '--audio', os.path.join(A, 'stems', 'mix.wav'), '--out', os.path.join(EP, 'renders', 'BAUBC_CaseStudies_EP03_Nabanna_1080x1920_60fps.mp4'), '--crf', '21')
print('\ndone ✓')
