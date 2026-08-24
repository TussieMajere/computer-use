# Full System Audit — MajereAi PC

**Dato:** 24. august 2026
**Utført av:** MajereAi
**Mål:** Full kontroll over PC via computer-use, GPU-transkripsjon, stabil automasjon

---

## 1. HARDWARE

| Komponent | Detaljer |
|-----------|----------|
| **CPU** | AMD Ryzen 5 9600X — 6 kjerner / 12 tråder |
| **GPU** | NVIDIA GeForce RTX 5060 Ti — 16GB VRAM |
| **RAM** | 14GB totalt (~6.4GB ledig) |
| **Disk** | NVMe/SSD (Ubuntu 24.04.4 LTS) |
| **Skjermkort** | NVIDIA RTX 5060 Ti + AMD Radeon (igpu) |

### GPU-status
```
NVIDIA-SMI 595.84  |  CUDA 13.2
VRAM:  11,126MiB / 16,311MiB  (68% brukt)
Temp:  48°C  |  Strøm:  26W / 180W
```

### GPU-prosesser
| Prosess | VRAM | Formål |
|---------|------|--------|
| Ollama (llama-server) | 8,224 MiB | Gemma4:12b modell |
| Hermes (Python) | 2,252 MiB | Agent |
| Xorg | 145 MiB | Skjerm |
| Firefox | 165 MiB | Nettleser |
| Telegram | 6 MiB | Melding |
| Gnome Shell | 24 MiB | Desktop |

---

## 2. OPERATIVSYSTEM

| Egenskap | Verdi |
|----------|-------|
| **OS** | Ubuntu 24.04.4 LTS |
| **Kernel** | 7.0.0-30-generic |
| **Skjermserver** | **X11** (IKKE Wayland ✅) |
| **Desktop** | GNOME (ubuntu-xorg session) |
| **DISPLAY** | `:1` |
| **XAUTHORITY** | `/run/user/1000/gdm/Xauthority` |

**Viktig:** X11 er kritisk for computer-use. Wayland støttes ikke.

---

## 3. HERMES AGENT — INSTALLASJON

| Komponent | Status |
|-----------|--------|
| **Versjon** | Hermes Agent v0.20.4 |
| **Install-metode** | git |
| **Python** | 3.11.16 |
| **Banesti** | `/home/majere/.local/bin/hermes` |
| **Config** | `/home/majere/.hermes/config.yaml` |

### computer-use (cua-driver)
```
cua-driver 0.21.0 — ✅ KØRER OG ER SUNN
✅ binary_version: cua-driver 0.21.0
✅ platform_supported: Ubuntu 24.04.4 LTS
✅ session_active: MCP session is active.
✅ ax_capability: X11 / AT-SPI fungerer
✅ screen_capture_capability: X11 skjermfangst fungerer
```

### STT (Speech-to-Text)
| Komponent | Status |
|-----------|--------|
| **Provider** | local (faster-whisper) |
| **Modell** | large-v3-turbo |
| **Device** | CUDA ✅ |
| **Compute type** | float16 |
| **Lastetid** | ~2.9s |
| **Transkripsjon** | ~3s for 224s lyd ✅ |

✅ **GPU-transkripsjon fungerer og er rask!**

---

## 4. OLLAMA

| Komponent | Status |
|-----------|--------|
| **Versjon** | 0.32.15 |
| **Service** | ✅ Aktiv (systemd) |
| **GPU** | ✅ Bruker NVIDIA (8224 MB VRAM) |
| **Innstillinger** | Flash attention på, context shift på |

### Installerte modeller
| Modell | Størrelse | Format |
|--------|-----------|--------|
| gemma4:12b-uncensored | 7.5 GB | Q4_K_M |
| nomic-embed-text | 274 MB | BERT embedding |

---

## 5. PROBLEM: COMPUTER-USE HENGER PC-EN

### Symptom
> "Når du begynner å bruke computer-use, så henger PC-en seg. Jeg kan bevege rundt på musa, trykke på Windows-knappen og logge av, men jeg kan ikke gjøre noe annet."

### Rotårsaksanalyse

1. **DISPLAY=:1** — cua-driver bruker `:1`, men hovedsessionen er på `:1`. Når cua-driver tar skjermbilder eller sender input via XSendEvent, kan det låse GNOME-shell.

2. **XSendEvent** — cua-driver bruker XSendEvent for input. Dette omgås Waylands sikkerhet, men på X11 kan det forstyrre GNOME's input-håndtering.

3. **GNOME Lockdown** — GNOME kan tolke XSendEvent-signaler som uautoriserte og låse bruker-input.

4. **cua-driver 0.21.0 + background mode** — Background mode prøver å ikke stjele fokus, men på X11 kan det føre til konflikter med GNOME.

### Mulige løsninger

| Løsning | Beskrivelse | Risiko |
|---------|-------------|--------|
| **Bytt til foreground mode** | Force raise window — mer stabilt | Tar fokus |
| **Bruk :0 i stedet for :1** | Start en ny X-session | Kan konflikte |
| **Bytt til KDE** | KDE håndterer XSendEvent bedre enn GNOME | Stor endring |
| **Xvfb + VNC** | Kjør computer-use på en headless skjerm | Krever VNC-klient |
| **Switch to Weston** | Minimal Wayland compositor | Mister X11-fordeler |

---

## 6. NESTE STEG

### Kort sikt (nå)
1. ✅ Full system-audit komplett
2. Debug hvorfor computer-use fryser
3. Test foreground mode som workaround
4. Installer screenkey + mouse tracer for synlighet

### Mellomlang sikt
1. Kontakt BMAX for samarbeid
2. Optimaliser GPU-bruk (mindre VRAM til Ollama)
3. Sett opp skikkelig test-pipeline

### Synlighet (vis hva jeg gjør)
- `screenkey` — viser tastetrykk på skjermen
- `key-mon` — alternativ tastaturviser
- Egne scripts i `~/projects/computer-use/scripts/`

---

## 7. SAMARBEID MED BMAX

BMAX (Celeron N4000, 8GB, Linux Mint) kan brukes som:
- **Testmaskin** for computer-use uten å påvirke hoved-PC
- **Backup** for Ollama-tjenester
- **Utviklingsnode** for nye løsninger

**Status:** SSH til BMAX er ustabil — må sjekkes fysisk.