const portalHeaderHtml = `
  <header class="alvarix-portal-nav">
    <a class="alvarix-portal-brand" href="https://alvarix24-production.up.railway.app">
      <img src="/public/logo.png" alt="Alvarix SecureAI logo" onerror="this.remove()">
      <span>Alvarix SecureAI</span>
    </a>
    <nav aria-label="Developer portal navigation">
      <a href="#quick-start">Quick Start</a>
      <a href="#products">Products</a>
      <a href="#use-cases">Use Cases</a>
      <a href="#api-reference">API Reference</a>
      <a href="#trust">Status</a>
    </nav>
  </header>

  <main class="alvarix-portal">
    <section class="alvarix-hero" id="top">
      <div class="alvarix-hero-copy">
        <div class="alvarix-kicker">ALVARIX SECUREAI</div>
        <h1>Global AI Risk &amp; Threat Intelligence Platform</h1>
        <p>Protect applications, payments, accounts, wallets, QRIS, cards and APIs with explainable AI risk scoring.</p>
        <div class="alvarix-actions">
          <a href="https://alvarix24-production.up.railway.app/contact/" class="alvarix-button primary">Get API Access</a>
          <a href="#quick-start" class="alvarix-button">Quick Start</a>
          <a href="#api-reference" class="alvarix-button">API Reference</a>
        </div>
      </div>
      <aside class="alvarix-version-card" aria-label="API version summary">
        <div class="alvarix-logo-row">
          <img src="/public/logo.png" alt="Alvarix company logo" onerror="this.remove()">
          <div class="alvarix-product-mark">Risk API</div>
        </div>
        <dl>
          <div><dt>Product</dt><dd>Alvarix Risk API</dd></div>
          <div><dt>API Version</dt><dd>v1.0.0</dd></div>
          <div><dt>OpenAPI</dt><dd>3.1.0</dd></div>
          <div><dt>Endpoint</dt><dd>Production</dd></div>
        </dl>
      </aside>
    </section>

    <section class="alvarix-section alvarix-quick-start" id="quick-start">
      <div class="alvarix-section-heading">
        <span>Quick Start</span>
        <h2>Start scoring risk in three steps.</h2>
        <p>Create an account, generate an API key, and call the Risk API from your backend.</p>
      </div>
      <div class="alvarix-steps">
        <article><b>STEP 1</b><h3>Create account</h3><p>Register and sign in to receive a JWT for account actions.</p></article>
        <article><b>STEP 2</b><h3>Generate API key</h3><p>Create a live API key for secure server-to-server requests.</p></article>
        <article><b>STEP 3</b><h3>Call Risk API</h3><p>Send transaction, login, or API context for explainable scoring.</p></article>
      </div>
      <div class="alvarix-code-grid">
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>cURL</span><button type="button" data-copy-target="curl-example">Copy</button></div>
          <pre><code id="curl-example">curl -X POST https://alvarix24-production.up.railway.app/api/risk-score \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: $ALVARIX_API_KEY" \\
  -d '{
    "user_id": "usr_123",
    "context": "transaction",
    "amount": 125.50,
    "location": "ID",
    "device": "android"
  }'</code></pre>
        </article>
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>Node.js</span><button type="button" data-copy-target="node-example">Copy</button></div>
          <pre><code id="node-example">const response = await fetch('https://alvarix24-production.up.railway.app/api/risk-score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ALVARIX_API_KEY
  },
  body: JSON.stringify({
    user_id: 'usr_123',
    context: 'transaction',
    amount: 125.50,
    location: 'ID',
    device: 'android'
  })
})

const risk = await response.json()</code></pre>
        </article>
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>Python</span><button type="button" data-copy-target="python-example">Copy</button></div>
          <pre><code id="python-example">import os
import requests

response = requests.post(
    "https://alvarix24-production.up.railway.app/api/risk-score",
    headers={
        "Content-Type": "application/json",
        "x-api-key": os.environ["ALVARIX_API_KEY"]
    },
    json={
        "user_id": "usr_123",
        "context": "transaction",
        "amount": 125.50,
        "location": "ID",
        "device": "android"
    }
)

risk = response.json()</code></pre>
        </article>
      </div>
    </section>

    <section class="alvarix-section" id="products">
      <div class="alvarix-section-heading">
        <span>Product Overview</span>
        <h2>Risk intelligence primitives for modern digital businesses.</h2>
      </div>
      <div class="alvarix-card-grid six">
        <article><i>AI</i><h3>AI Risk Scoring</h3><p>Explainable scores, risk levels, reasons, and decisions for sensitive events.</p></article>
        <article><i>FD</i><h3>Fraud Detection</h3><p>Detect velocity abuse, suspicious payloads, proxies, TOR, VPNs, and blacklists.</p></article>
        <article><i>BA</i><h3>Behavior Analytics</h3><p>Spot anomalous sessions, device behavior, and impossible travel signals.</p></article>
        <article><i>PI</i><h3>Payment Intelligence</h3><p>Assess cards, wallets, QRIS, transfers, marketplace, and subscription patterns.</p></article>
        <article><i>DE</i><h3>Decision Engine</h3><p>Support approve, review, or block outcomes using risk and policy context.</p></article>
        <article><i>TI</i><h3>Threat Intelligence</h3><p>Convert event signals into threat tags and readable operational context.</p></article>
      </div>
    </section>

    <section class="alvarix-section" id="use-cases">
      <div class="alvarix-section-heading">
        <span>Use Cases</span>
        <h2>Protect customer journeys without slowing down trusted users.</h2>
      </div>
      <div class="alvarix-card-grid five">
        <article><i>PP</i><h3>Payment Protection</h3><p>Score high-value, unusual, or cross-border payment attempts before approval.</p></article>
        <article><i>AS</i><h3>Account Security</h3><p>Detect suspicious logins, new devices, impossible travel, and session anomalies.</p></article>
        <article><i>FP</i><h3>Fraud Prevention</h3><p>Identify bad actors with blacklists, chargeback history, velocity, and device signals.</p></article>
        <article><i>AA</i><h3>API Abuse Detection</h3><p>Monitor abusive request rates, error spikes, and suspicious API payloads.</p></article>
        <article><i>MR</i><h3>Merchant Risk Monitoring</h3><p>Track merchant behavior and payment patterns across risk tiers and channels.</p></article>
      </div>
    </section>

    <section class="alvarix-section alvarix-trust" id="trust">
      <div class="alvarix-section-heading">
        <span>Status &amp; Trust</span>
        <h2>Production-ready API documentation.</h2>
      </div>
      <div class="alvarix-status-grid">
        <div><span>API Version</span><strong>1.0.0</strong></div>
        <div><span>OpenAPI Version</span><strong>3.1.0</strong></div>
        <div><span>Deployment Status</span><strong>Live</strong></div>
        <div><span>Environment</span><strong>Production</strong></div>
        <div><span>Production Endpoint</span><strong>alvarix24-production.up.railway.app</strong></div>
        <div><span>Security</span><strong>JWT + API Key</strong></div>
        <div><span>Availability</span><strong>Railway Production</strong></div>
      </div>
    </section>

    <section class="alvarix-section alvarix-reference" id="api-reference">
      <div class="alvarix-section-heading">
        <span>API Reference</span>
        <h2>Explore endpoints, schemas, and authorization.</h2>
        <p>Use the Authorize button below with your JWT or API key to test protected endpoints.</p>
      </div>
    </section>
  </main>
`

const portalFooterHtml = `
  <footer class="alvarix-portal-footer">
    <div>
      <strong>Alvarix SecureAI</strong>
      <span>Global AI Risk &amp; Threat Intelligence Platform</span>
    </div>
    <nav aria-label="Footer links">
      <a href="https://alvarix24-production.up.railway.app">Website</a>
      <a href="https://alvarix24-production.up.railway.app/docs">Documentation</a>
      <a href="mailto:sandiajimf@gmail.com">Support</a>
      <a href="mailto:sandiajimf@gmail.com">Contact</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms of Service</a>
      <a href="#">Refund Policy</a>
      <a href="#">GitHub (future)</a>
    </nav>
  </footer>
  <script>
    (function () {
      document.documentElement.style.scrollBehavior = 'smooth';

      function copyText(id, button) {
        var code = document.getElementById(id);
        if (!code) return;
        navigator.clipboard.writeText(code.innerText).then(function () {
          var original = button.innerText;
          button.innerText = 'Copied';
          setTimeout(function () { button.innerText = original; }, 1400);
        }).catch(function () {
          button.innerText = 'Select text';
        });
      }

      document.querySelectorAll('[data-copy-target]').forEach(function (button) {
        button.addEventListener('click', function () {
          copyText(button.getAttribute('data-copy-target'), button);
        });
      });
    })();
  </script>
`

const swaggerUiOptions = {
  customSiteTitle: 'Alvarix Risk API Documentation',
  swaggerOptions: {
    docExpansion: 'list',
    defaultModelsExpandDepth: 1,
    displayRequestDuration: true,
    deepLinking: true,
    persistAuthorization: true
  },
  customCss: `
    :root {
      --alv-bg: #050816;
      --alv-bg-2: #08111f;
      --alv-panel: rgba(12, 20, 35, 0.78);
      --alv-panel-solid: #0d1728;
      --alv-line: rgba(118, 151, 190, 0.22);
      --alv-line-strong: rgba(69, 170, 255, 0.45);
      --alv-text: #f7fbff;
      --alv-muted: #9db0c8;
      --alv-blue: #39a7ff;
      --alv-blue-2: #6fe5ff;
      --alv-green: #6ff2b2;
      --alv-purple: #a6a5ff;
      --alv-max: 1180px;
    }

    html,
    body {
      background:
        radial-gradient(circle at 12% 0%, rgba(57, 167, 255, 0.14), transparent 28%),
        linear-gradient(180deg, #050816 0%, #08111f 52%, #050816 100%) !important;
      color: var(--alv-text) !important;
      margin: 0 !important;
    }

    body,
    .swagger-ui {
      font-family: Inter, Manrope, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    }

    a {
      color: inherit;
    }

    .swagger-ui .topbar {
      display: none;
    }

    .alvarix-portal-nav {
      position: sticky;
      top: 0;
      z-index: 30;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      padding: 14px max(22px, calc((100vw - var(--alv-max)) / 2));
      border-bottom: 1px solid var(--alv-line);
      background: rgba(5, 8, 22, 0.88);
      backdrop-filter: blur(18px);
    }

    .alvarix-portal-brand,
    .alvarix-portal-nav nav,
    .alvarix-actions,
    .alvarix-logo-row,
    .alvarix-portal-footer,
    .alvarix-portal-footer nav {
      display: flex;
      align-items: center;
    }

    .alvarix-portal-brand {
      gap: 10px;
      color: var(--alv-text);
      font-weight: 900;
      text-decoration: none;
      white-space: nowrap;
    }

    .alvarix-portal-brand img {
      width: 34px;
      height: 34px;
      object-fit: contain;
    }

    .alvarix-portal-nav nav {
      gap: 18px;
      flex-wrap: wrap;
    }

    .alvarix-portal-nav nav a,
    .alvarix-portal-footer nav a {
      color: var(--alv-muted);
      font-size: 14px;
      font-weight: 750;
      text-decoration: none;
    }

    .alvarix-portal-nav nav a:hover,
    .alvarix-portal-footer nav a:hover {
      color: var(--alv-blue-2);
    }

    .alvarix-portal {
      max-width: var(--alv-max);
      margin: 0 auto;
      padding: 34px 22px 16px;
    }

    .alvarix-hero {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 360px;
      gap: 24px;
      align-items: stretch;
      padding: 24px 0 18px;
    }

    .alvarix-hero-copy,
    .alvarix-version-card,
    .alvarix-code-card,
    .alvarix-card-grid article,
    .alvarix-status-grid div {
      border: 1px solid var(--alv-line);
      background:
        linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025)),
        var(--alv-panel);
      box-shadow: 0 24px 80px rgba(0, 0, 0, 0.22);
      backdrop-filter: blur(18px);
    }

    .alvarix-hero-copy {
      padding: 30px;
    }

    .alvarix-kicker,
    .alvarix-section-heading span {
      color: var(--alv-green);
      font-size: 12px;
      font-weight: 950;
      letter-spacing: 0;
      text-transform: uppercase;
    }

    .alvarix-hero h1,
    .alvarix-section-heading h2 {
      color: var(--alv-text);
      letter-spacing: 0;
      line-height: 1.05;
      margin: 8px 0 0;
    }

    .alvarix-hero h1 {
      max-width: 780px;
      font-size: clamp(34px, 5vw, 54px);
    }

    .alvarix-hero p,
    .alvarix-section-heading p,
    .alvarix-card-grid p,
    .alvarix-steps p,
    .alvarix-version-card dt,
    .alvarix-status-grid span {
      color: var(--alv-muted);
    }

    .alvarix-hero p {
      max-width: 760px;
      margin: 14px 0 0;
      font-size: 18px;
    }

    .alvarix-actions {
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 22px;
    }

    .alvarix-button {
      min-height: 42px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--alv-line-strong);
      color: var(--alv-text);
      padding: 0 14px;
      text-decoration: none;
      font-size: 14px;
      font-weight: 900;
    }

    .alvarix-button.primary {
      background: var(--alv-blue);
      color: #03101d;
      border-color: var(--alv-blue);
    }

    .alvarix-version-card {
      padding: 22px;
    }

    .alvarix-logo-row {
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 18px;
    }

    .alvarix-logo-row img {
      width: 62px;
      height: 62px;
      object-fit: contain;
    }

    .alvarix-product-mark {
      border: 1px solid var(--alv-line-strong);
      color: var(--alv-blue-2);
      font-weight: 950;
      padding: 8px 10px;
      text-transform: uppercase;
      font-size: 12px;
    }

    .alvarix-version-card dl {
      display: grid;
      gap: 11px;
      margin: 0;
    }

    .alvarix-version-card div {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 14px;
      border-top: 1px solid var(--alv-line);
      padding-top: 11px;
    }

    .alvarix-version-card dt,
    .alvarix-version-card dd {
      margin: 0;
      font-size: 14px;
    }

    .alvarix-version-card dd {
      color: var(--alv-text);
      font-weight: 850;
      text-align: right;
    }

    .alvarix-section {
      padding: 34px 0 12px;
      scroll-margin-top: 86px;
    }

    .alvarix-section-heading {
      max-width: 820px;
      margin-bottom: 18px;
    }

    .alvarix-section-heading h2 {
      font-size: clamp(26px, 4vw, 40px);
    }

    .alvarix-section-heading p {
      margin: 10px 0 0;
      font-size: 16px;
    }

    .alvarix-steps,
    .alvarix-code-grid,
    .alvarix-card-grid,
    .alvarix-status-grid {
      display: grid;
      gap: 14px;
    }

    .alvarix-steps {
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 14px;
    }

    .alvarix-steps article {
      border-left: 2px solid var(--alv-blue);
      background: rgba(13, 23, 40, 0.62);
      padding: 18px;
    }

    .alvarix-steps b {
      color: var(--alv-blue-2);
      font-size: 12px;
    }

    .alvarix-steps h3,
    .alvarix-card-grid h3,
    .alvarix-code-head span {
      color: var(--alv-text);
      margin: 7px 0 5px;
    }

    .alvarix-code-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .alvarix-code-card {
      overflow: hidden;
    }

    .alvarix-code-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--alv-line);
      padding: 12px 14px;
      background: rgba(5, 8, 22, 0.7);
    }

    .alvarix-code-head button {
      border: 1px solid var(--alv-line-strong);
      background: transparent;
      color: var(--alv-blue-2);
      cursor: pointer;
      font-weight: 850;
      padding: 6px 9px;
    }

    .alvarix-code-card pre {
      margin: 0;
      min-height: 360px;
      max-height: 430px;
      overflow: auto;
      padding: 16px;
      background: #030712;
      color: #d8e7ff;
      font-size: 12px;
      line-height: 1.55;
    }

    .alvarix-code-card code {
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    }

    .alvarix-card-grid.six {
      grid-template-columns: repeat(3, 1fr);
    }

    .alvarix-card-grid.five {
      grid-template-columns: repeat(5, 1fr);
    }

    .alvarix-card-grid article {
      padding: 20px;
    }

    .alvarix-card-grid i {
      display: inline-grid;
      place-items: center;
      width: 36px;
      height: 36px;
      border: 1px solid var(--alv-line-strong);
      color: var(--alv-blue-2);
      font-style: normal;
      font-weight: 950;
      font-size: 12px;
      margin-bottom: 10px;
    }

    .alvarix-card-grid h3 {
      font-size: 18px;
    }

    .alvarix-card-grid p {
      margin: 0;
      font-size: 14px;
    }

    .alvarix-status-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .alvarix-status-grid div {
      padding: 18px;
    }

    .alvarix-status-grid span,
    .alvarix-status-grid strong {
      display: block;
    }

    .alvarix-status-grid strong {
      color: var(--alv-text);
      margin-top: 5px;
      word-break: break-word;
    }

    .alvarix-reference {
      padding-bottom: 0;
    }

    #swagger-ui {
      max-width: var(--alv-max);
      margin: 0 auto;
      padding: 0 22px 36px;
    }

    .swagger-ui {
      color: var(--alv-text);
    }

    .swagger-ui .wrapper {
      max-width: var(--alv-max);
      padding: 0;
    }

    .swagger-ui .info {
      display: none;
    }

    .swagger-ui .scheme-container,
    .swagger-ui .opblock,
    .swagger-ui section.models {
      background: rgba(12, 20, 35, 0.9) !important;
      border: 1px solid var(--alv-line) !important;
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    .swagger-ui .scheme-container {
      margin: 0 0 20px;
      padding: 18px 20px;
    }

    .swagger-ui .opblock-tag,
    .swagger-ui section.models h4,
    .swagger-ui .model-title,
    .swagger-ui .model,
    .swagger-ui table thead tr td,
    .swagger-ui table thead tr th,
    .swagger-ui .parameters-col_name,
    .swagger-ui .parameters-col_description,
    .swagger-ui .response-col_status,
    .swagger-ui .response-col_description,
    .swagger-ui label,
    .swagger-ui .tab li {
      color: var(--alv-text) !important;
      letter-spacing: 0 !important;
    }

    .swagger-ui .opblock-tag {
      border-bottom-color: var(--alv-line) !important;
      font-size: 22px !important;
    }

    .swagger-ui .renderedMarkdown,
    .swagger-ui .renderedMarkdown p,
    .swagger-ui .opblock-description-wrapper p,
    .swagger-ui .response-col_description__inner div {
      color: var(--alv-muted) !important;
    }

    .swagger-ui input,
    .swagger-ui textarea,
    .swagger-ui select {
      background: #050816 !important;
      border-color: var(--alv-line) !important;
      color: var(--alv-text) !important;
    }

    .swagger-ui .btn.authorize,
    .swagger-ui .btn {
      border-color: var(--alv-blue) !important;
      color: var(--alv-blue-2) !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    .swagger-ui .btn.execute {
      background: var(--alv-blue) !important;
      color: #03101d !important;
    }

    .alvarix-portal-footer {
      justify-content: space-between;
      gap: 18px;
      max-width: var(--alv-max);
      margin: 0 auto;
      border-top: 1px solid var(--alv-line);
      color: var(--alv-muted);
      padding: 26px 22px 38px;
    }

    .alvarix-portal-footer div {
      display: grid;
      gap: 3px;
    }

    .alvarix-portal-footer strong {
      color: var(--alv-text);
    }

    .alvarix-portal-footer nav {
      gap: 12px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }

    @media (max-width: 1040px) {
      .alvarix-hero,
      .alvarix-code-grid {
        grid-template-columns: 1fr;
      }

      .alvarix-card-grid.five {
        grid-template-columns: repeat(2, 1fr);
      }

      .alvarix-code-card pre {
        min-height: auto;
      }
    }

    @media (max-width: 820px) {
      .alvarix-portal-nav {
        align-items: flex-start;
        flex-direction: column;
      }

      .alvarix-steps,
      .alvarix-card-grid.six,
      .alvarix-card-grid.five,
      .alvarix-status-grid {
        grid-template-columns: 1fr;
      }

      .alvarix-portal-footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .alvarix-portal-footer nav {
        justify-content: flex-start;
      }
    }

    @media (max-width: 560px) {
      .alvarix-portal,
      #swagger-ui {
        padding-left: 16px;
        padding-right: 16px;
      }

      .alvarix-hero-copy,
      .alvarix-version-card {
        padding: 20px;
      }

      .alvarix-version-card div {
        grid-template-columns: 1fr;
      }

      .alvarix-version-card dd {
        text-align: left;
      }
    }
  `
}

function buildBrandedSwaggerHtml(openapiSpec, swaggerUi) {
  const generatedHtml = swaggerUi.generateHTML(openapiSpec, swaggerUiOptions)
  return generatedHtml
    .replace(/<title>.*?<\/title>/i, '<title>Alvarix Risk API Documentation</title>')
    .replace('<body>', '<body>' + portalHeaderHtml)
    .replace('</body>', portalFooterHtml + '</body>')
}

module.exports = {
  buildBrandedSwaggerHtml,
  swaggerUiOptions
}
