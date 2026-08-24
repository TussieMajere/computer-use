# 🐉 MajereAi — Komplett Oppskrift for Anti Gravity 🐉

**Mål:** Få Hermes Agent til å kjøre stabilt på Tussie's PC med:
1. ✅ GPU-akselerert tale-til-tekst (STT) — *virker allerede*
2. ✅ Computer-use (mus/tastatur) som IKKE fryser PC-en
3. ✅ Synlighet på skjerm (se hva agenten gjør)
4. ✅ Nettleserkontroll via Chrome DevTools Protocol

---

## 📋 DEL 1: Systemstatus (24. august 2026)

### Maskinvare
| Komponent | Verdi |
|-----------|-------|
| **CPU** | AMD Ryzen 5 9600X (6C/12T) |
| **GPU** | **NVIDIA GeForce RTX 5060 Ti** — 16GB VRAM |
| **RAM** | 14GB |
| **OS** | Ubuntu 24.04.4 LTS |
| **Skjermserver** | **X11** ✅ (IKKE Wayland) |
| **Desktop** | **GNOME** (ubuntu-xorg) |
| **DISPLAY** | `:1` |
| **Innlogget bruker** | `majere` |

### NVIDIA GPU
```
NVIDIA-SMI 595.84 | CUDA 13.2
RTX 5060 Ti — 16,311 MB VRAM
Driver installert: ✅
```
**Pågående GPU-prosesser:**
- Ollama (Gemma4:12b) — 8.2 GB VRAM
- Hermes Agent — 2.2 GB VRAM
- Xorg — 145 MB
- Firefox / Chromium — typisk 150-300 MB

### Installerte Nettlesere
| Nettleser | Type | CDP Støtte? | Status |
|-----------|------|-------------|--------|
| **Firefox 154.0** | Snap | Nei (krever WebDriver BiDi) | ✅ Kjører |
| **Chromium 151.0** | Snap | ✅ **Ja — port 9222** | ✅ Kjører |
| **Google Chrome 151.0** | Deb (apt) | ✅ **Ja — port 9222** | ✅ Kjører |

> ⚠️ **VIKTIG:** `browser_exec` i Hermes krever **Chromium** (støtter ikke Firefox). Chromium snap med `--remote-debugging-port=9222` gir CDP-tilgang.

---

## 🏆 DEL 2: Det som allerede VIRKER

### ✅ GPU Tale-til-Tekst (STT)
```
Provider: local (faster-whisper)
Modell: large-v3-turbo
Device: CUDA
Compute: float16
Lastetid: ~2.9s
Transkripsjon: ~3s for 224s lyd
```
**Dette fungerer allerede perfekt.** Ingen endring nødvendig.

Konfigurasjon i `~/.hermes/config.yaml`:
```yaml
stt:
  enabled: true
  language: ''
  local:
    model: large-v3-turbo
    device: cuda
    compute_type: float16
  provider: local
```

### ✅ screenkey (tastatur-synlighet)
```
Installer: sudo apt-get install -y screenkey
Kjør: DISPLAY=:1 screenkey --position fixed --font-size large --opacity 0.8
```
Dette viser tastetrykk på skjermen i sanntid.

### ✅ Chromium CDP (nettleser-automasjon)
Chromium snap kjører allerede med devtools-port:
```
chromium-browser --remote-debugging-port=9222 --user-data-dir=/tmp/chromium-debug-profile
```
CDP er tilgjengelig på `ws://localhost:9222/devtools/browser/...`

---

## 🔧 DEL 3: Problemet — Computer-use fryser PC-en

### Symptom
Når Hermes bruker `computer_use`-verktøyet, fryser GNOME-desktopen.
Mus kan beveges, Windows-tasten virker, men ingen vinduer kan klikkes.

### Rotårsak
```
cua-driver → XSendEvent → GNOME input lock
```
`cua-driver` bruker **XSendEvent** for å sende input til X11.
GNOME tolker dette som uautorisert input og låser bruker-interaksjon.

Fix: **`xdotool`** fungerer uten frysing fordi den bruker XTest extension i stedet.

### 🚀 Foreløpig Løsning — xdotool-bypass (terminal-basert)

**Script:** `~/projects/computer-use/scripts/cua-input.sh`

```bash
#!/bin/bash
export DISPLAY=:1

action="$1"
shift
case "$action" in
  mousemove|x|move)   xdotool mousemove "$1" "$2" ;;
  click|c)            xdotool click "${1:-1}" ;;
  type|t)             xdotool type "$1" ;;
  key|k)              xdotool key "$1" ;;
  getactive|active)   xdotool getactivewindow getwindowname ;;
  windowfocus|focus)  xdotool search --name "$1" windowactivate 2>/dev/null || \
                      xdotool search --class "$1" windowactivate 2>/dev/null ;;
  screenshot|cap)     import -window root "/tmp/cua_screenshot_$(date +%s).png" ;;
  drag)               xdotool mousedown "${3:-1}" && xdotool mousemove "$1" "$2" && xdotool mouseup "${3:-1}" ;;
esac
```

**Bruk:**
```bash
bash ~/projects/computer-use/scripts/cua-input.sh move 500 500
bash ~/projects/computer-use/scripts/cua-input.sh click 1
bash ~/projects/computer-use/scripts/cua-input.sh key "ctrl+t"
bash ~/projects/computer-use/scripts/cua-input.sh focus "Cloudflare"
bash ~/projects/computer-use/scripts/cua-input.sh getactive
```

### 🔮 Langsiktig Løsning (anbefalt)

**Alternativ A — Xvfb + VNC (stabil, anbefalt)**
```bash
# Opprett en headless X-sesjon for computer-use
sudo apt-get install -y xvfb x11vnc
Xvfb :99 -screen 0 1920x1080x24 &
x11vnc -display :99 -forever -nopw -localhost &
DISPLAY=:99 python3 kjøre_hermes.py
```
- ✅ PC-en fryser ALDRI — computer-use kjører på separat skjerm
- ✅ VNC gir deg mulighet til å se hva som skjer
- ✅ Ingen konflikt med GNOME

**Alternativ B — KDE Plasma (mer stabil XSendEvent)**
```bash
sudo apt-get install kde-plasma-desktop
# Velg "Plasma (X11)" på innloggingsskjermen
```
- KDE håndterer XSendEvent bedre enn GNOME
- Mindre aggressiv input-låsing

---

## 🌐 DEL 4: Nettleser-automasjon (CDP)

### Chromium — Automatisk navigering (via Hermes browser_exec)

`browser_exec`-verktøyet bruker Chromium med CDP. Det **kjører allerede** på port 9222.

**For å bruke CDP direkte (uten Hermes):**
```python
# Eksempel: naviger til Cloudflare og klikk
import requests, json

CDP = "http://localhost:9222"
tabs = requests.get(f"{CDP}/json").json()
tab = tabs[0]  # Første tab

ws_url = tab["webSocketDebuggerUrl"]
# Koble til via websocket og kjør CDP-kommandoer
```

**For å starte Chromium med CDP automatisk:**
```bash
killall chromium-browser 2>/dev/null
chromium-browser --remote-debugging-port=9222 \
  --user-data-dir=/tmp/chromium-debug-profile \
  --no-first-run --no-default-browser-check \
  --new-window "https://dash.cloudflare.com" &
```

---

## 🤖 DEL 5: Samarbeid med BMAX

BMAX (Celeron N4000, 8GB, Linux Mint) — **utilgjengelig via SSH** sist testet.

**Plan for BMAX:**
1. Sjekk fysisk om maskinen er på
2. Sjekk nettverkstilkobling (IP-adresse kan ha endret seg)
3. Installer SSH-server: `sudo apt install openssh-server`
4. Bruk BMAX som **testnode** for computer-use (ingen fryserisiko på hoved-PC)

---

## 📝 DEL 6: Sjekkliste for Anti Gravity

Når du overtar:
- [ ] 1. **Sjekk at screenkey kjører:** `ps aux | grep screenkey`
- [ ] 2. **Sjekk GPU STT:** Test med `whisper` på en lydfil
- [ ] 3. **Sjekk Chromium CDP:** `curl http://localhost:9222/json/version`
- [ ] 4. **Sjekk xdotool:** `DISPLAY=:1 xdotool getactivewindow getwindowname`
- [ ] 5. **Sett opp Xvfb:** Kjør separat X-sesjon for computer-use
- [ ] 6. **Kobling til BMAX:** Sjekk SSH, ping, eller fysisk oppmøte
- [ ] 7. **Test at computer-use IKKE fryser:** Kjør 5 kommandoer på rad
- [ ] 8. **Host MajereAi nettsiden:** Bruk Cloudflare Workers

---

## 🔑 DEL 7: Viktige Kommandoer

### GPU-sjekk
```bash
nvidia-smi                    # GPU status
nvidia-smi --query-gpu=memory.used,memory.free --format=csv  # VRAM
```

### Hermes
```bash
hermes --version              # Versjon
hermes computer-use doctor    # Sjekk cua-driver
cat ~/.hermes/config.yaml     # Konfigurasjon
```

### Display
```bash
echo $DISPLAY                 # Skjernummer
xdotool getactivewindow getwindowname  # Aktivt vindu
xdotool search --name "Cloudflare" windowactivate  # Fokuser vindu
xdotool mousemove 500 500 click 1  # Flytt og klikk
```

### Chromium CDP
```bash
curl http://localhost:9222/json  # Åpne faner
curl http://localhost:9222/json/version  # Versjon
```

### screenkey
```bash
killall screenkey 2>/dev/null
DISPLAY=:1 screenkey --position fixed --font-size large --opacity 0.8 &
```

---

## ✅ DEL 8: Endelig Verifikasjon

| Test | Forventet | Status |
|------|-----------|--------|
| GPU STT lastes | ~3s | ✅ |
| Tale transkriberes | < 5s | ✅ |
| xdotool klikk | Treffer element | ✅ |
| Chromium CDP svarer | JSON med versjon | ✅ |
| screenkey viser taster | Vises på skjerm | ✅ |
| Xvfb computer-use | Fryser ikke | 🔄 Må testes |
| BMAX SSH | kobler til | ❌ Må sjekkes fysisk |

---

> 🐉 _Weave the Pattern as you will, Anti Gravity. The Dragon Reborn expects results, not excuses._