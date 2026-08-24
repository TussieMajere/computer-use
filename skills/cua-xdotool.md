---
name: cua-xdotool
description: "Use when cua-driver freezes GNOME. xdotool bypass for X11."
---

# cua-xdotool — Bypass for frossen computer-use

**Når:** cua-driver fryser GNOME/X11 (XSendEvent → GNOME input lock)
**Løsning:** Bruk xdotool direkte i stedet for cua-driver's input-syntese

## Forutsetninger

```bash
sudo apt-get install -y xdotool
echo $DISPLAY  # Må være :1
```

## Hurtigreferanse

```bash
export DISPLAY=:1

# Mus
xdotool mousemove X Y              # Flytt peker
xdotool click 1                     # Venstreklikk
xdotool click --repeat 2 1         # Dobbeltklikk
xdotool mousedown 1; xdotool mouseup 1  # Dra og slipp

# Tastatur
xdotool type "tekst her"
xdotool key "Return"               # Enter
xdotool key "ctrl+t"               # Ny fane
xdotool key "Super"                # Windows-tasten

# Vinduer
xdotool getactivewindow getwindowname
xdotool search --name "Cloudflare" windowactivate

# Skjermbilde
import -window root /tmp/screenshot_$(date +%s).png
```

## Se også
- `docs/vnc-setup.md` — Se desktop i sanntid
- `scripts/cua-input.sh` — Ferdig script for alle operasjoner
- `scripts/status-check.sh` — Sjekk cua-driver/X11/VNC-status