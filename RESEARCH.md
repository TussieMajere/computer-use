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
- ✅ **cua-driver cursor-overlay** — innebygd synlig agent-peker (LØSNING FUNGERER!)

**Eksisterende løsninger**:
- `x11vnc` + `noVNC` → web-VNC, ~100ms latency
- `ffmpeg -f x11grab` → videoopptak/screencast
- `cua-driver` tar allerede skjermbilder (capture-screenshot)
- ✅ `cua-driver` har **cursor-overlay** med synlig agent-peker (se Funn)

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

### Eksperiment 4: cua-driver cursor-overlay
```bash
# cua-driver har innebygd agent-cursor som vises som overlay
# Aktiveres automatisk når cua-driver kjører
cua-driver start_session '{"session":"demo"}'
cua-driver set_agent_cursor_enabled '{"session":"demo","enabled":true}'
```

## ✅ Funn så langt

| Dato | Funn | Konklusjon |
|------|------|------------|
| 2026-08-24 | cua-driver fungerer i background med XTest | Må foreground for tastetrykk på GTK/Chromium |
| 2026-08-24 | `foreground` mode fungerer for Chrome | Synlig for bruker — men stjeler fokus |
| 2026-08-24 | x11vnc + noVNC er enkel å sette opp | Beste kandidat for viewing |
| **2026-08-24** | **cua-driver cursor-overlay crate** | **Innebygd synlig agent-peker på Linux X11 — triangulær glidende peker med ring-ripple. Dette LØSER hovedproblemet!** |
| **2026-08-24** | **Hermes Agent v0.20.x integrerer cua-driver** | **`hermes computer-use doctor`, permissions (standard/bounded/unrestricted), Bot Mode** |
| **2026-08-24** | **Hermes Agent Bot Mode (August 2026)** | **Multi-agent samarbeid — hver bot har egen profil, minne, ferdigheter** |
| **2026-08-24** | **cua-driver multi-cursor støtte** | **Flere agenter kan kjøre samtidig med hver sin synlige cursor** |
| **2026-08-24** | **TigerVNC 1.16 (Jan 2026)** | **w0vncserver for Wayland desktop sharing — alternativ til x11vnc** |
| **2026-08-24** | **Computer-Use 2.0 (Cua, Juli 2026)** | **Skift fra foreground-isolert til background multi-agent arkitektur** |
| **2026-08-24** | **x11vnc 0.9.17 (Mai 2025)** | **Multi-touch, flere museknapper, OpenBSD støtte** |
| **2026-08-24** | **Codex Background Computer Use (April 2026)** | **OpenAI lanserte background CU — egen cursor, multi-agent, SkyLight APIs** |

## 🔍 Detaljerte Funn

### 1. cua-driver Agent Cursor Overlay (KRITISK — LØSNINGEN)

cua-driver har et `cursor-overlay` crate (Rust) som tegner en synlig agent-peker på Linux X11:

- **Triangel-peker** som Bezier-gli til hvert klikk-mål
- **Ring-ripple** ved landing
- **Idle-hide** etter ~1.5 sekunder
- **Farge per sesjon** — hvit outline med matchende glow
- **Sessions-navn badge** — følger cursoren
- **Leverings- og mål chips** — viser "background"/"foreground" og "ax"/"pixel"/"browser"/"desktop"
- **Multi-cursor** — separate agenter får separate visuelle cursorer med egen `cursor_id`
- **Personliggjørbar** — dotLottie temaer (egendefinerte cursorer!)
- **Slå av/på** — `cua-driver set_agent_cursor_enabled`
- **Animasjoner** — idle, observe, click, drag, scroll, text, key, navigate, app, transfer, record, system

**Status**: Shipped på Linux X11 og XWayland. Wayland preview.
**Kilde**: https://cua.ai/blog/inside-linux-computer-use | https://cua.ai/docs/how-to-guides/driver/personalize-cursor

### 2. Hermes Agent v0.20.x (August 2026)

- **Cua Driver 0.20 runtime contracts** — Hermes bruker cua-driver som standard computer-use backend
- **`hermes computer-use doctor`** — diagnosesjekk for hele stacken
- **Permission modes**: `standard` (default), `bounded` (capability manifest), `unrestricted` (YOLO)
- **Existing browser profile** — agent kan bruke allerede pålogget Chrome/Edge
- **Bot Mode** — multi-agent samarbeid med isolerte profiler
- **Cron jobs** for planlagte oppgaver
- **Kilde**: Hermes Agent v0.20.3-0.20.5, August 2026

### 3. Inside Linux: AT-SPI + XTEST + Agent Cursor (Juni 2026)

cua-driver Linux backend detaljer:
- **AT-SPI 2 over D-Bus** for accessibility tree
- **XTEST** for input-syntese (XSendEvent fallback)
- **Painted agent cursor** — separat fra fysisk peker
- **X11 og XWayland** støttet, Wayland i preview
- **Focus-free tekst-input** for GTK3/4, Qt5, Tk (per-toolkit spesialtilfeller)
- **Chromium accessibility switch** — aktiverer AT-SPI tree via `org.a11y.Status`
- **Kilde**: https://cua.ai/blog/inside-linux-computer-use

### 4. TigerVNC 1.16 (Januar 2026)

- **w0vncserver** — ny server for Wayland desktop sharing
- Forbedret keyboard-håndtering
- **Sikkerhetsfix**: x0vncserver autentiseringsproblem
- **Kilde**: https://github.com/TigerVNC/tigervnc/releases

### 5. Computer-Use 2.0 (Cua, Juli 2026)

- Skift fra "one agent, one foreground desktop" til **background multi-agent**
- Desktop er et **verktøy i agentens verktøykasse**, ikke hele loopen
- Cua Driver, Cua-Bench, Cua Fleets som tre lag
- **Multi-cursor, multi-session** arkitektur
- **Kilde**: https://cua.ai/blog/computer-use-2-ai-engineer-worlds-fair

## 🎯 Revurdering av Prosjektretning

Basert på funnene er hovedproblemet — **usynlig agent-peker** — allerede løst av cua-driver's cursor-overlay. Prosjektet bør fokusere på:

1. **Integrasjon**: Få cua-driver cursor-overlay til å fungere med Hermes Agent på denne maskinen
2. **Forbedring av VNC-visning**: Kombiner cursor-overlay med x11vnc/TigerVNC slik at VNC-seeren også ser agent-cursoren
3. **Samarbeidsflyt**: Bygg pause/resume, Telegram-integrasjon og logging oppå eksisterende løsning
4. **Dokumentasjon**: Skriv norsk-dokumentasjon for oppsett av synlig computer-use

## 📚 Kilder

- [cua-driver dokumentasjon](https://hermes-agent.nousresearch.com/docs)
- [x11vnc man page](https://linux.die.net/man/1/x11vnc)
- [noVNC GitHub](https://github.com/novnc/noVNC)
- [FFmpeg x11grab](https://trac.ffmpeg.org/wiki/Capture/Desktop)
- [cua-driver cursor-overlay (Rust)](https://github.com/trycua/cua/tree/main/libs/cua-driver/rust)
- [Inside Linux computer-use — Cua Blog](https://cua.ai/blog/inside-linux-computer-use)
- [Inside Windows computer-use — Cua Blog](https://cua.ai/blog/inside-windows-computer-use)
- [Personliggjør agent-cursoren — Cua Docs](https://cua.ai/docs/how-to-guides/driver/personalize-cursor)
- [Computer-Use 2.0 — Cua Blog](https://cua.ai/blog/computer-use-2-ai-engineer-worlds-fair)
- [Hermes Agent Changelog v0.20.x](https://releasebot.io/updates/nousresearch/hermes-agent)
- [Hermes Agent Computer Use Docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/computer-use)
- [TigerVNC 1.16 Release Notes](https://github.com/TigerVNC/tigervnc/releases)
- [Hermes Bot Mode — MarkTechPost](https://www.marktechpost.com/2026/08/17/nous-research-hermes-bot-mode/)
- [Codex Background Computer Use](https://www.buildmvpfast.com/blog/openai-codex-background-computer-use-desktop-agent-2026)