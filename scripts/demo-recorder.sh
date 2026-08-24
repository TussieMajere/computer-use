#!/bin/bash
# Demo-opptaker — tar opp en computer-use økt som video
# Bruk: bash scripts/demo-recorder.sh [varighet_i_sekunder]
# Se opptaket: ls -la ~/computer-use-recordings/

DURATION=${1:-60}  # default 60 sekunder
DATE=$(date +%Y%m%d_%H%M%S)
OUTPUT_DIR="$HOME/computer-use-recordings"
mkdir -p "$OUTPUT_DIR"
OUTPUT_FILE="$OUTPUT_DIR/computer-use_${DATE}.mp4"

echo "🎥 Starter opptak av computer-use økt..."
echo "   Varighet: ${DURATION}s"
echo "   Lagrer til: $OUTPUT_FILE"
echo ""
echo "⚠️  cua-driver vil fortsatt fungere mens opptaket kjører!"
echo "   Trykk Ctrl+C for å avbryte opptaket."
echo ""

# Start FFmpeg opptak
ffmpeg -f x11grab -framerate 10 -video_size 1920x1080 \
    -draw_mouse 1 \
    -i :1 \
    -c:v libx264 -preset ultrafast -crf 28 \
    -t "$DURATION" \
    -y "$OUTPUT_FILE" 2>/dev/null

if [ $? -eq 0 ]; then
    SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo ""
    echo "✅ Opptak ferdig!"
    echo "   Fil: $OUTPUT_FILE"
    echo "   Størrelse: $SIZE"
    echo ""
    echo "📂 Alle opptak: $OUTPUT_DIR"
else
    echo "❌ Opptak feilet."
    echo "   Sjekk at DISPLAY=:1 er satt."
fi