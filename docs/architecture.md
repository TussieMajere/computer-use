# 🏗️ Arkitektur — Hvordan cua-driver fungerer i dag

## Dagens arkitektur

```
Bruker (Telegram) ←→ Hermes Agent ←→ cua-driver ←→ X11/Wayland Desktop
                          ↑
                   Tools: computer_use
```

**cua-driver** (Computer Use Agent-driver):
- Tar skjermbilder via X11/XTest
- Sender muse- og tastaturhendelser via XTest
- Leser Accessibility Tree (AT-SPI)
- Kjører i **background mode** som default

## Background vs Foreground

| Modus | Beskrivelse | Synlig? |
|-------|-------------|---------|
| `background` | Input sendes direkte til XTest — stjeler ikke fokus | Nei ❌ |
| `foreground` | Vinduet frontes, input sendes, vinduet returneres | Ja, men stjeler fokus ⚠️ |

## Hvorfor er det usynlig?

1. **XTest** sender hendelser direkte til X-serveren — musepekeren flytter seg, men brukeren ser ikke agentens "cursor"
2. **Background mode** flytter ikke vinduet til front — brukeren ser ikke hva som skjer
3. **cua-driver** har en egen markør (overlay), men den vises KUN i skjermbildene agenten tar — ikke i sanntid

## Løsningskandidater

Se [streaming.md](./streaming.md) og [visual-feedback.md](../plans/visual-feedback.md)