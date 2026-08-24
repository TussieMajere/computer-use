# 🗺️ ROADMAP — Computer Use Synlighet

> **Revurdering**: cua-driver v0.20+ har innebygd **cursor-overlay** som løser hovedproblemet (synlig agent-peker).
> Se RESEARCH.md for detaljer. Denne roadmapen er oppdatert for å reflektere den nye virkeligheten.

## ✅ Fase 1: Synlighet — ALLEREDE LØST AV CUA-DRIVER
- [x] ~~x11vnc + noVNC oppsett → Tussie ser desktop i nettleser~~ → Løst av cua-driver cursor-overlay
- [x] ~~Auto-start VNC ved Hermes-oppstart~~ → cua-driver `serve` har innebygd daemon
- [ ] Telegramsamtale med "Nå kan du se hva jeg gjør"
- [ ] Bekreft at cua-driver cursor-overlay fungerer på denne maskinen (Linux X11)
- [ ] Test `hermes computer-use doctor` for å verifisere stack

## 📅 Fase 2: VNC + Cursor Fusion (Uke 1-2)
- [ ] Sett opp x11vnc + noVNC for ekstern viewing (når Tussie ikke er på samme desktop)
- [ ] Sørg for at agent-cursoren er synlig i VNC-strømmen (cursor-overlay + x11vnc)
- [ ] Alternativ: Bruk TigerVNC 1.16 w0vncserver for Wayland-kompatibilitet
- [ ] Auto-start av cua-driver daemon ved Hermes-oppstart (systemd user service)
- [ ] Test at cursor-overlay fungerer med background mode

## 📅 Fase 3: Samarbeid (Uke 2-3)
- [ ] Pause/resume-knapp for agenten ved 2FA/login (vent-på-bruker modus)
- [ ] Deling av skjermbilder i sanntid via Telegram (skjermbilde + cursor-overlay)
- [ ] Tussie kan peke og si "klikk der" — agenten ser markører
- [ ] Utforsk Hermes Bot Mode for multi-agent samarbeid

## 📅 Fase 4: Opptak og Læring (Uke 3-4)
- [ ] Automatisk video-opptak av alle økter (ffmpeg + cursor-overlay synlig)
- [ ] Transkripsjon av handlinger (hva agenten gjorde, hvor den klikket)
- [ ] "Guided tour"-modus — agenten demonstrerer og Tussie følger

## 📅 Fase 5: Cloud Dashboard (Uke 4+)
- [ ] GCP dashboard synlig og forståelig
- [ ] AWS, Cloudflare, Namecheap — samme behandling
- [ ] Fullt samarbeid — Tussie ser, lærer, hjelper

## 📈 Milepæler

| # | Hva | Når | Status |
|---|-----|-----|--------|
| 1 | cua-driver cursor-overlay bekreftet fungerende | Uke 1 | 🕐 |
| 2 | `hermes computer-use doctor` ✅ | Uke 1 | 🕐 |
| 3 | VNC + cursor-overlay synlig i stream | Uke 1-2 | 🕐 |
| 4 | Telegram med skjermbilder og agent-peker | Uke 2 | 🕐 |
| 5 | Pause/resume ved 2FA | Uke 2-3 | 🕐 |
| 6 | Video-opptak av økter | Uke 3 | 🕐 |
| 7 | Tussie kan interagere med agenten via chat | Uke 3-4 | 🕐 |
| 8 | Cloud dashboard synlig | Uke 4+ | 🕐 |

## 🔗 Relevante ressurser

- [cua-driver cursor-overlay personalisering](https://cua.ai/docs/how-to-guides/driver/personalize-cursor)
- [Inside Linux computer-use (AT-SPI, XTEST, cursor)](https://cua.ai/blog/inside-linux-computer-use)
- [Hermes Agent Computer Use Docs](https://hermes-agent.nousresearch.com/docs/user-guide/features/computer-use)
- [TigerVNC 1.16 (Wayland støtte)](https://github.com/TigerVNC/tigervnc/releases)
- [cua-driver PyPI (Python wrapper)](https://pypi.org/project/cua-driver/)