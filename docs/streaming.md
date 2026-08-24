# 📺 Streaming — Vise desktop i sanntid

## Alternativ 1: x11vnc + noVNC ⭐ ANBEFALT

```bash
# Installer
sudo apt install -y x11vnc novnc

# Start VNC-server
x11vnc -display :1 -forever -shared -nopw -localhost

# Start noVNC proxy
/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 6080

# Åpne i nettleser: http://localhost:6080/vnc.html
```

**Fordeler**: 
- ✅ Lav latency (~100ms)
- ✅ Vises i nettleser (Telegram-integrasjon?)
- ✅ Ingen port-åpning nødvendig (localhost)
- ✅ cua-driver jobber mens Tussie ser på

**Ulemper**: 
- ⚠️ Krever at Chromium/nettleser kjører
- ⚠️ Ikke kryptert (localhost)

## Alternativ 2: FFmpeg som webcam/grabber

```bash
# Stream til UDP
ffmpeg -f x11grab -framerate 5 -video_size 1280x720 \
  -i :1 -c:v libx264 -preset ultrafast -tune zerolatency \
  -f mpegts udp://localhost:1234
```

**Fordeler**: 
- ✅ Kan sendes som Telegram-video
- ✅ Opptak samtidig

**Ulemper**: 
- ❌ Høy CPU-bruk
- ❌ Ikke interaktivt (bare viewing)

## Alternativ 3: Telegram screenshot-loop

Agenten sender skjermbilde hvert 2-3 sekund til Telegram som et "live feed".

**Fordeler**:
- ✅ Ingen ekstra tjenester
- ✅ Allerede på Telegram

**Ulemper**:
- ❌ Høyt forbruk av API-kall
- ❌ Laggy / ikke ekte sanntid

## Anbefaling: Hybrid

1. **x11vnc + noVNC** for viewing i sanntid
2. **FFmpeg** for opptak av økter
3. **Telegram-screenshots** for øyeblikksbilder underveis