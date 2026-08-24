# 🔬 RESEARCH — Computer Use Synlighet og Samarbeid

> Sist oppdatert: 2026-08-24

## 📋 Problemstilling

Computer Use (cua-driver) kjører i **background mode** — agenten klikker, skriver og navigerer uten at brukeren ser musepekeren, tastetrykkene eller skjermendringene i sanntid. Dette gjør samarbeid vanskelig.

## 🎯 Forskningsområder

### 1. Sanntids-visualisering av cua-driver

**Mål**: Brukeren skal se musepeker, tastetrykk og skjermbilder i sanntid.

**Hypoteser**:
- **WebRTC-streaming** av X11-skjermbildet til en nettleser
- **VNC-protokoll** — x11vnc + noVNC i nettleser
- **Screen capture API** via Electron/Chromium
- **FFmpeg + HLS** — konstant skjermopptak strømmet som video

**Eksisterende løsninger**:
- `x11vnc` + `noVNC` → web-VNC, ~100ms latency
- `ffmpeg -f x11grab` → videoopptak/screencast
- `cua-driver` tar allerede skjermbilder (capture-screenshot)

### 2. Samarbeidsflyt (BankID, 2FA, innlogginger)

**Mål**: Sømløs overlevering — agenten stopper, brukeren logger inn, agenten fortsetter.

**Hypoteser**:
- **Vent-på-bruker-modus**: Agenten pauser ved login/2FA og sier "nå må du ta over"
- **Deling av skjermbilder** i sanntid via Telegram/web
- **Marker-knapper** — agenten tegner sirkel rundt der brukeren skal klikke

### 3. Opptak og avspilling

**Mål**: Lagre økter slik at brukeren kan se hva som skjedde.

**Hypoteser**:
- **MP4-opptak** av hver økt (ffmpeg)
- **Step-by-step playback** — hvert skjermbilde + beskrivelse
- **Timeline** — se alle handlinger i kronologisk rekkefølge

### 4. Læringsspor

**Mål**: Brukeren lærer hvordan skytjenester administreres.

**Hypoteser**:
- **Voice-over** — agenten forklarer hva den gjør mens den jobber
- **Transkriberte logger** — hver handling dokumenteres
- **Guided tours** — agenten demonstrerer og brukeren følger etter

## 🧪 Eksperimenter

### Eksperiment 1: x11vnc + noVNC
```bash
# Start VNC-server
x11vnc -display :1 -forever -shared -rfbauth ~/.vnc/passwd

# Start noVNC i nettleser
# Åpne http://localhost:6080/vnc.html
```
**Pros**: Lav latency, kjent teknologi
**Cons**: Krever åpen port, sikkerhetsrisiko

### Eksperiment 2: FFmpeg webcam-stream
```bash
# Stream X11 til webm
ffmpeg -f x11grab -framerate 10 -video_size 1920x1080 \
  -i :1 -f webm -quality good -deadline realtime \
  -preset ultrafast udp://localhost:1234
```

### Eksperiment 3: Telegram video-stream
- Ta skjermbilde hvert 2. sekund
- Send som video-loop via Telegram API
- **Pros**: Ingen åpen port, kjent plattform
- **Cons**: Høyt API-forbruk, latency

## ✅ Funn så langt

| Dato | Funn | Konklusjon |
|------|------|------------|
| 2026-08-24 | cua-driver fungerer i background med XTest | Må foreground for tastetrykk på GTK/Chromium |
| 2026-08-24 | `foreground` mode fungerer for Chrome | Synlig for bruker — men stjeler fokus |
| 2026-08-24 | x11vnc + noVNC er enkel å sette opp | Beste kandidat for viewing |

## 📚 Kilder

- [cua-driver dokumentasjon](https://hermes-agent.nousresearch.com/docs)
- [x11vnc man page](https://linux.die.net/man/1/x11vnc)
- [noVNC GitHub](https://github.com/novnc/noVNC)
- [FFmpeg x11grab](https://trac.ffmpeg.org/wiki/Capture/Desktop)