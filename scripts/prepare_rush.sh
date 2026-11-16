#!/usr/bin/env bash
# Prépare une vidéo source pour Remotion :
#  - 1080x1920, 30 i/s
#  - voix nettoyée et normalisée (-14 LUFS)
#  - option : efface un texte incrusté (DELOGO="x:y:w:h:fin_en_secondes")
# Usage : DELOGO="160:235:720:135:3.05" scripts/prepare_rush.sh public/videos/rush1.mov public/videos/rush1.mp4
set -euo pipefail
in="$1"; out="$2"
vf="scale=1080:1920,fps=30"
if [ -n "${DELOGO:-}" ]; then
  IFS=: read -r x y w h until <<<"$DELOGO"
  vf="$vf,delogo=x=$x:y=$y:w=$w:h=$h:enable='lt(t,$until)'"
fi
ffmpeg -v error -y -i "$in" -map 0:v:0 -map 0:a:0 -vf "$vf" -c:v libx264 -preset veryfast -crf 18 \
  -af "highpass=f=80,acompressor=threshold=-24dB:ratio=3:attack=5:release=120,loudnorm=I=-14:TP=-1.5:LRA=9" \
  -c:a aac -b:a 192k -ar 48000 -movflags +faststart "$out"
echo "OK $out"
