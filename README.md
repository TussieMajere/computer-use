# 🖥️ Computer Use — Synlig Samarbeid

> *"Jeg vil se musa bevege seg og tastetrykk. Jeg vil lære hvordan du gjør ting."* – Tussie

## 🎯 Mål

Gjøre **Computer Use** (cua-driver) synlig, lærbart og samarbeidsvennlig:

- ✅ **Sanntids-visualisering** — x11vnc + noVNC på localhost:6080
- ✅ **Observasjons-læring** — Tussie ser hvordan agenten jobber
- ✅ **Samarbeid** — Tussie hjelper med BankID/2FA, agenten gjør resten
- ✅ **cua-xdotool skill** — Bypass når cua-driver fryser GNOME
- 🚧 **ai-uncensored.store** — Worker klar, venter på gyldig API-token

## 🏗️ Prosjektstruktur

```
computer-use/
├── README.md                 ← Denne fila
├── RESEARCH.md               ← Forskningslogg og funn
├── ROADMAP.md                ← Milepæler og fremdrift
├── SYSTEM_AUDIT.md           ← Full system-audit (24.08.2026)
├── docs/
│   ├── architecture.md       ← Hvordan cua-driver fungerer
│   ├── streaming.md          ← Streaming-løsninger
│   ├── vnc-setup.md          ← 🔥 NY: VNC-oppsett guide
│   └── recording.md          ← Hvordan spille inn økter
├── scripts/
│   ├── cua-input.sh          ← xdotool-bypass for frosne GUI
│   ├── demo-recorder.sh      ← FFmpeg-opptak av økter
│   ├── status-check.sh       ← Sjekk cua-driver/X11/VNC-status
│   └── deploy-worker.sh      ← 🔥 NY: Deploy Worker (når token er klart)
├── skills/
│   └── cua-xdotool.md        ← 🔥 NY: Hermes-skill dokumentasjon
├── workers/
│   ├── src/worker.js         ← Cloudflare Worker for ai-uncensored.store
│   └── wrangler.jsonc        ← Wrangler-konfigurasjon
└── .github/workflows/
    └── auto-research.yml     ← Automatisk forskningsjobb
```

## ✅ Status (24. august 2026)

| Hva | Status | Detaljer |
|-----|--------|----------|
| **RTX 5060 Ti** | ✅ | CUDA 13.2, driver 595.84, 16GB VRAM |
| **Hermes Agent** | ✅ | v0.20.4, X11 :1 |
| **cua-driver** | ✅ | v0.21.0, MCP session active |
| **GPU STT** | ✅ | faster-whisper large-v3-turbo på CUDA |
| **Chromium CDP** | ✅ | Chrome 151.0, port 9222 |
| **xdotool-bypass** | ✅ | cua-input.sh fungerer uten freeze |
| **cua-xdotool skill** | ✅ | Laget og installert i Hermes |
| **x11vnc + noVNC** | ✅ | localhost:5900 → :6080 |
| **Demo recorder** | ✅ | FFmpeg-opptak til MP4 |
| **Cloudflare Worker** | 🚧 | Src klar, venter på API-token |
| **ai-uncensored.store** | 🚧 | DNS peker til Cloudflare, mangler token |
| **BMAX samarbeid** | 🚧 | Reachable via Tailscale, trenger SSH-passord |

## 🔥 Kom i gang

```bash
# 1. Sjekk systemstatus
bash scripts/status-check.sh

# 2. Se desktop i nettleser (VNC)
# Åpne http://localhost:6080/vnc.html

# 3. Bruk xdotool når cua-driver fryser
bash scripts/cua-input.sh move 500 500
bash scripts/cua-input.sh click 1
bash scripts/cua-input.sh type "Hello World"

# 4. Ta opp en demo-økt
bash scripts/demo-recorder.sh 30

# 5. Deploy Worker (når du har token)
CLOUDFLARE_API_TOKEN=<token> bash scripts/deploy-worker.sh
```

## 🧠 Hermes-skill

`cua-xdotool` er installert som et Hermes-skill. Når cua-driver fryser GNOME, kan agenten automatisk falle tilbake på xdotool.

## 👑 Eier

**Tussie MajereAi** — *Dragon Reborn*

---

*"Vi vever mønsteret sammen — synlig for alle."*