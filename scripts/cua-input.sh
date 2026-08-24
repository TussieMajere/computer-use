#!/bin/bash
# cua-input.sh — Bypass for cua-driver freeze issue
# Bruker xdotool direkte i stedet for cua-driver XSendEvent
# DISPLAY=:1 er hardkodet for denne maskinen

export DISPLAY=:1

action="$1"
shift

case "$action" in
  mousemove|x|move)
    xdotool mousemove "$1" "$2"
    ;;
  click|c)
    xdotool click "${1:-1}"
    ;;
  type|t)
    xdotool type "$1"
    ;;
  key|k)
    xdotool key "$1"
    ;;
  getactive|active)
    xdotool getactivewindow getwindowname
    ;;
  windowfocus|focus)
    # Finn vindu basert på tittel
    xdotool search --name "$1" windowactivate 2>/dev/null || \
    xdotool search --class "$1" windowactivate 2>/dev/null
    ;;
  screenshot|cap)
    import -window root "/tmp/cua_screenshot_$(date +%s).png"
    echo "Screenshot: /tmp/cua_screenshot_*.png"
    ;;
  drag)
    xdotool mousedown "${3:-1}"
    xdotool mousemove "$1" "$2"
    xdotool mouseup "${3:-1}"
    ;;
  scroll)
    xdotool click "${2:-5}"  # 5=scroll down, 4=scroll up
    ;;
  *)
    echo "Usage: $0 {mousemove|click|type|key|getactive|windowfocus|screenshot|drag|scroll} [args]"
    exit 1
    ;;
esac