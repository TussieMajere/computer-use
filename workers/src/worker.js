// ai-uncensored.store — MajereAi Worker
// Funksjoner: landing page, guide-seksjon, passordbeskyttet fildeling

const PASSWORD = "majere5055";
const REALM = "MajereAi Files";

// 📚 Innhold for guider
const GUIDES = [
  {
    slug: "anti-gravity",
    title: "🐉 Komplett Oppskrift for Anti Gravity",
    date: "2026-08-24",
    desc: "Slik setter du opp Hermes Agent med GPU-STT og computer-use"
  },
  {
    slug: "system-audit",
    title: "🔍 Full System Audit",
    date: "2026-08-24",
    desc: "Detaljert rapport over maskinvare, drivere og GPU"
  }
];

// 🔒 Filer (beskyttet seksjon)
const FILES = [
  { name: "GUIDE_FOR_ANTI_GRAVITY.md", size: "9KB", cat: "Guider" },
  { name: "SYSTEM_AUDIT.md", size: "12KB", cat: "System" },
  { name: "RESEARCH.md", size: "6KB", cat: "Forskning" },
  { name: "CHANGELOG.md", size: "4KB", cat: "Utvikling" }
];

function html(body) {
  return `<!DOCTYPE html>
<html lang="no">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>MajereAi — ai-uncensored.store</title>
<style>
:root{--bg:#0a0a0f;--card:#14141f;--accent:#8b5cf6;--text:#e2e8f0;--muted:#64748b}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--bg);color:var(--text);font-family:system-ui,-apple-system,sans-serif;line-height:1.6;min-height:100vh}
.container{max-width:960px;margin:0 auto;padding:2rem}
header{text-align:center;padding:4rem 0 2rem}
header h1{font-size:2.5rem;background:linear-gradient(135deg,var(--accent),#ec4899);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
header p{color:var(--muted);margin-top:.5rem}
nav{display:flex;gap:1rem;justify-content:center;margin:2rem 0;flex-wrap:wrap}
nav a{background:var(--card);color:var(--text);padding:.75rem 1.5rem;border-radius:12px;text-decoration:none;border:1px solid #1e1e2e;transition:all .2s}
nav a:hover{border-color:var(--accent);transform:translateY(-2px)}
.card{background:var(--card);border-radius:16px;padding:1.5rem;margin:1rem 0;border:1px solid #1e1e2e}
.card h2{color:var(--accent);margin-bottom:.75rem}
.card p{color:var(--muted)}
.fl{list-style:none}
.fl li{padding:.75rem;border-bottom:1px solid #1e1e2e;display:flex;justify-content:space-between;align-items:center}
.fl li:last-child{border:none}
.fl a{color:var(--accent);text-decoration:none}
.badge{background:var(--accent);color:#fff;padding:.25rem .75rem;border-radius:999px;font-size:.8rem}
footer{text-align:center;color:var(--muted);padding:3rem 0;font-size:.9rem}
.lf{max-width:400px;margin:2rem auto}
.lf input{width:100%;padding:.75rem;margin:.5rem 0;border-radius:8px;border:1px solid #1e1e2e;background:var(--bg);color:var(--text);font-size:1rem}
.lf button{width:100%;padding:.75rem;background:var(--accent);color:#fff;border:none;border-radius:8px;font-size:1rem;cursor:pointer}
.err{color:#ef4444;text-align:center}
code{background:#1e1e2e;padding:.2rem .4rem;border-radius:4px;font-size:.9em}
pre{background:#0a0a0f;padding:1rem;border-radius:8px;overflow-x:auto;font-size:.9rem;margin:.5rem 0}
@media(max-width:600px){header h1{font-size:1.8rem}}
</style>
</head>
<body>
<div class="container">
<header>
<h1>🐉 MajereAi</h1>
<p>Uncensored AI. Freedom to explore.</p>
</header>
<nav>
<a href="/">🏠 Hjem</a>
<a href="/guides">📚 Guider</a>
<a href="/files">🔒 Filer</a>
</nav>
${body}
<footer><p>ai-uncensored.store — MajereAi × Cloudflare Workers</p></footer>
</div>
</body>
</html>`;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    // === LANDING ===
    if (path === "/" || path === "") {
      return new Response(html(`
<div class="card">
  <h2>🚀 Velkommen</h2>
  <p>Dette er MajereAi sin plattform for uncensored AI-utvikling. Her finner du guider, verktøy og ressurser.</p>
</div>
<div class="card">
  <h2>📚 Siste guider</h2>
  <ul class="fl">
    ${GUIDES.map(g => `
    <li>
      <div>
        <a href="/guides/${g.slug}"><strong>${g.title}</strong></a>
        <br><small style="color:var(--muted)">${g.desc}</small>
      </div>
      <span class="badge">${g.date}</span>
    </li>`).join("")}
  </ul>
</div>
<div class="card">
  <h2>🔒 Sikker fildeling</h2>
  <p>Passordbeskyttet fildeling. <a href="/files" style="color:var(--accent)">Gå til filer →</a></p>
</div>
`), { headers: { "Content-Type": "text/html;charset=utf-8" } });
    }

    // === GUIDES ===
    if (path === "/guides" || path === "/guides/") {
      return new Response(html(`
<h2 style="margin:1rem 0">📚 Guider</h2>
<div class="card">
  <ul class="fl">
    ${GUIDES.map(g => `
    <li>
      <div>
        <strong style="color:var(--accent)">${g.title}</strong>
        <br><small style="color:var(--muted)">${g.desc}</small>
      </div>
      <span class="badge">${g.date}</span>
    </li>`).join("")}
  </ul>
</div>
`), { headers: { "Content-Type": "text/html;charset=utf-8" } });
    }

    // Anti Gravity guide - full content
    if (path === "/guides/anti-gravity") {
      return new Response(html(`<h2>🐉 Komplett Oppskrift for Anti Gravity</h2>
<div class="card">
<h2>🎯 Mål</h2>
<p>Få Hermes Agent til å kjøre stabilt med GPU-akselerert tale-til-tekst (STT), computer-use og full X11-kontroll.</p>

<h2 style="margin-top:1rem">✅ Status</h2>
<ul class="fl">
  <li><strong>GPU STT</strong> <span class="badge">OK</span></li>
  <li><strong>Computer-use</strong> <span class="badge">OK</span></li>
  <li><strong>Screenkey visuell feedback</strong> <span class="badge">OK</span></li>
  <li><strong>Hermes Agent</strong> <span class="badge">OK</span></li>
  <li><strong>Ollama</strong> <span class="badge">OK</span></li>
  <li><strong>Cloudflare hosting</strong> <span class="badge">OK</span></li>
</ul>

<h2 style="margin-top:1rem">🔧 Systemkrav</h2>
<pre>- OS: Linux Mint (Xfce)
- GPU: NVIDIA RTX 5060 Ti (CUDA 12.x)
- RAM: 16GB+
- Disk: 256GB+
- Python 3.11
- Node.js 26.x
- Wrangler 4.x
- Chromium (snap) for browser-use</pre>

<h2 style="margin-top:1rem">📦 Installasjonstrinn</h2>
<pre># 1. Basispakker
sudo apt update && sudo apt install -y python3-pip python3-venv nodejs npm git curl

# 2. Hermes Agent
npx hermes-agent init
cd hermes-agent && npx hermes-agent dev

# 3. CUDA/GPU for STT
pip install faster-whisper --upgrade
# Verifiser: python3 -c "import torch; print(torch.cuda.is_available())"

# 4. Skjermoppsett for computer-use
export DISPLAY=:1
screenkey &
</pre>

<h2 style="margin-top:1rem">🐛 Kjente problemer</h2>
<ul>
<li><strong>cua-driver fryser:</strong> Løsning: bruk foreground mode eller xdotool via terminal</li>
<li><strong>Firefox snap blokkerer browser_exec:</strong> Løsning: bruk Chromium (snap)</li>
</ul>

<hr style="margin:2rem 0;border-color:#1e1e2e">
<p>Se <a href="https://github.com/TussieMajere/computer-use" style="color:var(--accent)">github.com/TussieMajere/computer-use</a> for full dokumentasjon.</p>
</div>`), { headers: { "Content-Type": "text/html;charset=utf-8" } });
    }

    // === FILES (passordbeskytet) ===
    if (path.startsWith("/files")) {
      // Sjekk Basic Auth
      const auth = request.headers.get("Authorization");
      
      // Vi login-side
      if (path === "/files" || path === "/files/") {
        if (auth) {
          const decoded = atob(auth.split(" ")[1] || "");
          const pass = decoded.split(":")[1] || "";
          if (pass !== PASSWORD) {
            return new Response(html(`<h2 class="err">🔒 Feil passord</h2>
<form class="lf" method="POST" action="/files">
<input type="password" name="password" placeholder="Passord" required>
<button>🔓 Åpne</button>
</form>`), {
              status: 401,
              headers: { "Content-Type": "text/html;charset=utf-8", "WWW-Authenticate": 'Basic realm="' + REALM + '"' }
            });
          }
        } else if (request.method === "POST") {
          const fd = await request.formData();
          const pass = fd.get("password");
          if (pass === PASSWORD) {
            const cred = btoa("majere:" + pass);
            return new Response(null, {
              status: 302,
              headers: { "Location": "/files", "Set-Cookie": "auth=" + cred + ";Path=/;Max-Age=86400" }
            });
          }
          return new Response(html(`<h2 class="err">🔒 Feil passord</h2><form class="lf" method="POST" action="/files"><input type="password" name="password" placeholder="Passord" required><button>🔓 Åpne</button></form>`), {
            headers: { "Content-Type": "text/html;charset=utf-8" }
          });
        }
        
        if (!auth && !request.headers.get("Cookie")?.includes("auth=")) {
          return new Response(html(`<h2>🔒 Passordbeskyttet fildeling</h2><p style="color:var(--muted);margin:1rem 0">Skriv inn passord:</p>
<form class="lf" method="POST" action="/files">
<input type="password" name="password" placeholder="Passord" required>
<button>🔓 Åpne</button>
</form>`), {
            headers: { "Content-Type": "text/html;charset=utf-8" }
          });
        }

        // Autentisert - vis filer
        let cookieAuth = request.headers.get("Cookie") || "";
        let isAuth = auth || cookieAuth.includes("auth=");
        
        return new Response(html(`
<h2>📂 Filer (beskyttet)</h2>
<div class="card">
  <ul class="fl">
    ${FILES.map(f => `
    <li>
      <span>📄 ${f.name}</span>
      <span style="color:var(--muted);font-size:.9rem">${f.size}</span>
    </li>`).join("")}
  </ul>
</div>
<div class="card">
  <h3>📤 Midlertidig fildeling</h3>
  <p style="color:var(--muted)">Kontakt MajereAi på Telegram for å laste opp filer.</p>
</div>
`), { headers: { "Content-Type": "text/html;charset=utf-8" } });
      }
    }

    // === API ===
    if (path === "/api/status") {
      return new Response(JSON.stringify({
        status: "ok", guides: GUIDES.length, files: FILES.length, version: "1.0.0"
      }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } });
    }

    // 404
    return new Response(html(`
<h2>404 — Ikke funnet</h2>
<p style="color:var(--muted);margin:1rem 0">Siden finnes ikke.</p>
<a href="/" style="color:var(--accent)">← Hjem</a>
`), { status: 404, headers: { "Content-Type": "text/html;charset=utf-8" } });
  }
};