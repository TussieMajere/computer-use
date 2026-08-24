# 📺 VNC-oppsett — Se computer-use i sanntid

## Slik fungerer det

```
x11vnc (5900) ←→ noVNC proxy (6080) ←→ Nettleser (http://localhost:6080/vnc.html)
```

## Installering

```bash
sudo apt-get install -y x11vnc novnc
```

## Oppstart (X11 display :1)

```bash
# Start VNC-server (kun lokal tilgang)
x11vnc -display :1 -forever -shared -nopw -localhost -bg

# Start noVNC proxy
/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 6080
```

## Bruk

Åpne i nettleser: **http://localhost:6080/vnc.html**

Du ser da hele X11-desktopen i sanntid med ~100ms latency.

## cua-driver cursor-overlay

Når cua-driver kjører, vises en egen agent-peker med:
- Triangel-formet cursor som gli til klikk-mål
- Ring-ripple ved landing
- Farge per sesjon
- Sesjon-navn badge

## Hvis du vil se fra en annen maskin (Tailscale)

```bash
# Start VNC med åpen port
x11vnc -display :1 -forever -shared -nopw -bg

# Start noVNC på en port
/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 6080

# Fra en annen maskin på Tailscale-nettverket:
# Åpne http://<tailscale-ip>:6080/vnc.html
```

## Verifisering

```bash
ss -tlnp | grep -E '5900|6080'
# Skal vise:
# LISTEN  ... 127.0.0.1:5900 ... x11vnc
# LISTEN  ... 0.0.0.0:6080 ... websockify
```