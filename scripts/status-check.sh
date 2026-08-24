#!/bin/bash
# Status-sjekk for cua-driver og Computer Use
# Kjør: bash scripts/status-check.sh

echo "=== cua-driver status ==="
if pgrep -x "cua-driver" > /dev/null; then
    echo "✅ cua-driver kjører"
    ps aux | grep "[c]ua-driver"
else
    echo "❌ cua-driver KJØRER IKKE"
fi

echo ""
echo "=== X11-status ==="
if [ -e /tmp/.X11-unix/X1 ]; then
    echo "✅ X11 (display :1) kjører"
else
    echo "❌ X11 (display :1) KJØRER IKKE"
fi

echo ""
echo "=== DISPLAY-miljø ==="
echo "DISPLAY=$DISPLAY"
echo "XAUTHORITY=$XAUTHORITY"

echo ""
echo "=== systemd tjenester ==="
systemctl --user status cua-driver 2>&1 | head -5
echo "---"
systemctl --user status hermes-gateway 2>&1 | head -5

echo ""
echo "=== Siste skjermbilder ==="
ls -lt ~/.hermes/cache/images/computer_use_*.png 2>/dev/null | head -5 || echo "Ingen skjermbilder funnet"

echo ""
echo "=== VNC (hvis installert) ==="
if pgrep -x "x11vnc" > /dev/null; then
    echo "✅ x11vnc kjører"
    ss -tlnp | grep 5900
else
    echo "ℹ️  x11vnc kjører ikke"
fi

echo ""
echo "=== noVNC (hvis installert) ==="
if pgrep -f "novnc_proxy" > /dev/null; then
    echo "✅ noVNC kjører"
    ss -tlnp | grep 6080
else
    echo "ℹ️  noVNC kjører ikke"
fi