# 🖥️ Computer Use — Synlig Samarbeid

> *"Jeg vil se musa bevege seg og tastetrykk. Jeg vil lære hvordan du gjør ting."* – Tussie

## 🎯 Mål

Gjøre **Computer Use** (cua-driver) synlig, lærbart og samarbeidsvennlig:

- ✅ **Sanntids-visualisering** — se musepeker, tastetrykk og skjermaktivitet i sanntid
- ✅ **Observasjons-læring** — Tussie ser hvordan agenten jobber i GCP, AWS, Cloudflare, etc.
- ✅ **Samarbeid** — Tussie hjelper med BankID, innlogginger, 2FA — agenten gjør resten
- ✅ **Dokumentasjon** — hver økt logges og forklares

## 🏗️ Prosjektstruktur

```
computer-use/
├── README.md              ← Denne fila
├── RESEARCH.md            ← Forskningslogg og funn
├── ROADMAP.md             ← Milepæler og fremdrift
├── docs/
│   ├── architecture.md    ← Hvordan cua-driver fungerer i dag
│   ├── streaming.md       ← Hvordan streame desktop til bruker
│   ├── recording.md       ← Hvordan spille inn/avspille økter
│   └── collaboration.md   ← Hvordan dele kontroll med bruker
├── plans/
│   ├── visual-feedback.md ← Plan: synlig mus/tastetrykk
│   ├── streaming-ui.md    ← Plan: webgrensesnitt for viewing
│   └── voice-coaching.md  ← Plan: stemme-styrt samarbeid
├── scripts/
│   ├── demo-recorder.sh   ← Ta opp en computer-use økt
│   └── status-check.sh    ← Sjekk cua-driver status
└── .github/workflows/
    └── auto-research.yml  ← Automatisk forskningsjobb
```

## 🔥 Hvorfor dette prosjektet?

Computer Use (cua-driver) er kraftig — men **usynlig**. Agenten klikker, skriver og navigerer mens brukeren bare ser resultatet. Dette prosjektet fikser det:

1. **Gjennomsiktighet** — brukeren ser ALT agenten gjør
2. **Læring** — brukeren lærer av å SE hvordan skytjenester administreres
3. **Samarbeid** — brukeren tar BankID/innlogging, agenten gjør resten

## 🚀 Kom i gang

```bash
# Klon repoet
git clone https://github.com/TussieMajere/computer-use.git
cd computer-use

# Sjekk cua-driver status
bash scripts/status-check.sh

# Start en demo-økt med opptak
bash scripts/demo-recorder.sh
```

## 👑 Eier

**Tussie MajereAi** — *Dragon Reborn*

---

*"Vi vever mønsteret sammen — synlig for alle."*