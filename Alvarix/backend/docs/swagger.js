const portalHeaderHtml = `
  <header class="alvarix-portal-nav">
    <a class="alvarix-portal-brand" href="https://alvarix24-production.up.railway.app">
      <img src="/public/logo.png" alt="Alvarix SecureAI logo" onerror="this.remove()">
      <span>Alvarix SecureAI</span>
    </a>
    <nav aria-label="Developer portal navigation">
      <a href="#quick-start">Quick Start</a>
      <a href="#sdk-examples">Examples</a>
      <a href="#api-keys">API Keys</a>
      <a href="#pricing">Pricing</a>
      <a href="#security">Security</a>
      <a href="#api-reference">API Reference</a>
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
        <h2>Start scoring risk in four steps.</h2>
        <p>Register, sign in, obtain an API key, and call <code>/api/risk-score</code> from a trusted backend.</p>
      </div>
      <div class="alvarix-steps">
        <article><b>STEP 1</b><h3>Register Account</h3><p>Create an Alvarix account for your organization or integration team.</p></article>
        <article><b>STEP 2</b><h3>Login</h3><p>Authenticate to receive a JWT for account, billing, and key management.</p></article>
        <article><b>STEP 3</b><h3>Obtain API Key</h3><p>Create an API key and store it securely in your server environment.</p></article>
        <article><b>STEP 4</b><h3>Call /risk-score</h3><p>Send transaction, login, or API context for explainable risk scoring.</p></article>
      </div>
      <div class="alvarix-request-response">
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>Request Body</span><button type="button" data-copy-target="risk-request-example">Copy</button></div>
          <pre><code id="risk-request-example">{
  "user_id": "usr_123",
  "context": "transaction",
  "amount": 125.50,
  "location": "ID",
  "expectedLocation": "ID",
  "device": "android",
  "ip": "203.0.113.10",
  "metadata": {
    "payment_method": "card",
    "merchant_id": "mrc_456"
  }
}</code></pre>
        </article>
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>Response Body</span><button type="button" data-copy-target="risk-response-example">Copy</button></div>
          <pre><code id="risk-response-example">{
  "success": true,
  "requestId": "risk_01J8Y7Q4P9K2",
  "context": "transaction",
  "riskScore": 27,
  "riskLevel": "LOW",
  "confidence": 0.94,
  "threatTags": ["trusted_device", "normal_velocity"],
  "reasons": ["Known device", "Expected location"],
  "decision": "APPROVE",
  "remainingCredits": 9842
}</code></pre>
        </article>
      </div>
    </section>

    <section class="alvarix-section" id="sdk-examples">
      <div class="alvarix-section-heading">
        <span>Multi-Language Examples</span>
        <h2>Drop-in calls for common backend stacks.</h2>
        <p>Use these examples from server-side code. Never expose production API keys in browsers, mobile apps, or public repositories.</p>
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
          <div class="alvarix-code-head"><span>Node.js Axios</span><button type="button" data-copy-target="axios-example">Copy</button></div>
          <pre><code id="axios-example">import axios from 'axios'

const { data: risk } = await axios.post(
  'https://alvarix24-production.up.railway.app/api/risk-score',
  {
    user_id: 'usr_123',
    context: 'transaction',
    amount: 125.50,
    location: 'ID',
    device: 'android'
  },
  {
    headers: {
      'x-api-key': process.env.ALVARIX_API_KEY
    }
  }
)</code></pre>
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
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>PHP</span><button type="button" data-copy-target="php-example">Copy</button></div>
          <pre><code id="php-example">$payload = [
  "user_id" =&gt; "usr_123",
  "context" =&gt; "transaction",
  "amount" =&gt; 125.50,
  "location" =&gt; "ID",
  "device" =&gt; "android"
];

$ch = curl_init("https://alvarix24-production.up.railway.app/api/risk-score");
curl_setopt_array($ch, [
  CURLOPT_POST =&gt; true,
  CURLOPT_HTTPHEADER =&gt; [
    "Content-Type: application/json",
    "x-api-key: " . getenv("ALVARIX_API_KEY")
  ],
  CURLOPT_POSTFIELDS =&gt; json_encode($payload),
  CURLOPT_RETURNTRANSFER =&gt; true
]);

$risk = json_decode(curl_exec($ch), true);</code></pre>
        </article>
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>Go</span><button type="button" data-copy-target="go-example">Copy</button></div>
          <pre><code id="go-example">package main

import (
  "bytes"
  "net/http"
  "os"
)

func main() {
  body := []byte("{\\"user_id\\":\\"usr_123\\",\\"context\\":\\"transaction\\",\\"amount\\":125.50,\\"location\\":\\"ID\\",\\"device\\":\\"android\\"}")

  req, _ := http.NewRequest(
    "POST",
    "https://alvarix24-production.up.railway.app/api/risk-score",
    bytes.NewBuffer(body),
  )
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("x-api-key", os.Getenv("ALVARIX_API_KEY"))

  http.DefaultClient.Do(req)
}</code></pre>
        </article>
      </div>
    </section>

    <section class="alvarix-section" id="api-keys">
      <div class="alvarix-section-heading">
        <span>API Key Guide</span>
        <h2>Authenticate server-to-server requests with scoped API keys.</h2>
        <p>JWTs are used for account sessions. API keys are used for production Risk API calls from trusted infrastructure.</p>
      </div>
      <div class="alvarix-guide-grid">
        <article><h3>How API Keys Work</h3><p>Create keys after login, store them as secrets, and pass them with each Risk API request.</p></article>
        <article><h3>Authentication Flow</h3><p>Register account, login for JWT, generate an API key, then send <code>x-api-key</code> to protected scoring endpoints.</p></article>
        <article><h3>Security Best Practices</h3><p>Rotate keys regularly, revoke unused keys, separate environments, and never ship keys to client-side apps.</p></article>
      </div>
      <div class="alvarix-request-response">
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>Header Example</span><button type="button" data-copy-target="header-example">Copy</button></div>
          <pre><code id="header-example">Authorization: Bearer &lt;account_jwt&gt;
x-api-key: &lt;alvarix_api_key&gt;
Content-Type: application/json</code></pre>
        </article>
        <article class="alvarix-code-card">
          <div class="alvarix-code-head"><span>Error Example</span><button type="button" data-copy-target="auth-error-example">Copy</button></div>
          <pre><code id="auth-error-example">{
  "success": false,
  "error": "Invalid or missing API key",
  "code": "API_KEY_REQUIRED"
}</code></pre>
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

    <section class="alvarix-section" id="pricing">
      <div class="alvarix-section-heading">
        <span>Pricing</span>
        <h2>Plans for validation, launch, and enterprise scale.</h2>
        <p>Start with a free plan, upgrade as request volume and operational requirements grow.</p>
      </div>
      <div class="alvarix-pricing-grid">
        <article><span>Free</span><h3>1,000 requests</h3><p>Developer testing, onboarding, and early integration validation.</p><b>Upgrade to Basic when traffic becomes recurring.</b></article>
        <article><span>Basic</span><h3>10,000 requests</h3><p>Small production apps, internal tools, and pilot customers.</p><b>Upgrade to Pro for higher volume and analytics.</b></article>
        <article><span>Pro</span><h3>50,000 requests</h3><p>Growing SaaS, fintech, marketplaces, and payment workflows.</p><b>Upgrade to Enterprise for custom limits and support.</b></article>
        <article><span>Enterprise</span><h3>Custom limits</h3><p>High-volume platforms, regulated teams, custom security review, and priority support.</p><b>Contact sales for tailored onboarding.</b></article>
      </div>
    </section>

    <section class="alvarix-section" id="security">
      <div class="alvarix-section-heading">
        <span>Trust &amp; Security</span>
        <h2>Enterprise security capabilities built for risk-sensitive products.</h2>
      </div>
      <div class="alvarix-card-grid six">
        <article><i>JWT</i><h3>JWT Authentication</h3><p>Secure account sessions for dashboard, billing, and administrative workflows.</p></article>
        <article><i>KEY</i><h3>API Key Security</h3><p>Dedicated server-to-server credentials for production scoring requests.</p></article>
        <article><i>RSE</i><h3>Risk Scoring Engine</h3><p>Explainable scores, decisions, confidence, reasons, and remaining credit visibility.</p></article>
        <article><i>FRD</i><h3>Fraud Detection</h3><p>Signals for suspicious velocity, devices, location, payment behavior, and abuse patterns.</p></article>
        <article><i>BA</i><h3>Behavior Analytics</h3><p>Session, device, account, and payment behavior indicators for adaptive decisioning.</p></article>
        <article><i>TI</i><h3>Threat Intelligence</h3><p>Readable threat tags and operational context for review, block, or approve decisions.</p></article>
      </div>
    </section>

    <section class="alvarix-section alvarix-trust" id="status">
      <div class="alvarix-section-heading">
        <span>API Status</span>
        <h2>Live production API details.</h2>
      </div>
      <div class="alvarix-status-grid">
        <div><span>API Version</span><strong>1.0.0</strong></div>
        <div><span>OpenAPI Version</span><strong>3.1.0</strong></div>
        <div><span>Deployment Status</span><strong>Live</strong></div>
        <div><span>Environment</span><strong>Production</strong></div>
        <div><span>Production Endpoint</span><strong>alvarix24-production.up.railway.app</strong></div>
        <div><span>Security</span><strong>JWT + API Key</strong></div>
        <div><span>Railway Deployment</span><strong>Railway Production</strong></div>
      </div>
    </section>

    <section class="alvarix-section" id="errors">
      <div class="alvarix-section-heading">
        <span>Error Reference</span>
        <h2>Common API responses and how to resolve them.</h2>
      </div>
      <div class="alvarix-table-wrap">
        <table class="alvarix-error-table">
          <thead><tr><th>Status</th><th>Meaning</th><th>Common Cause</th><th>Resolution</th></tr></thead>
          <tbody>
            <tr><td>400</td><td>Bad Request</td><td>Malformed JSON or missing required fields.</td><td>Validate payload shape and required properties before sending.</td></tr>
            <tr><td>401</td><td>Unauthorized</td><td>Missing JWT or API key.</td><td>Send the correct <code>Authorization</code> or <code>x-api-key</code> header.</td></tr>
            <tr><td>403</td><td>Forbidden</td><td>Credential lacks permission for the requested resource.</td><td>Use an authorized account, role, or active API key.</td></tr>
            <tr><td>404</td><td>Not Found</td><td>Endpoint or resource does not exist.</td><td>Confirm the URL, route prefix, and resource identifier.</td></tr>
            <tr><td>429</td><td>Rate Limited</td><td>Plan limit or route limit exceeded.</td><td>Retry after the reset window or upgrade your plan.</td></tr>
            <tr><td>500</td><td>Server Error</td><td>Unexpected platform-side issue.</td><td>Retry safely, record the request ID, and contact support.</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="alvarix-section" id="changelog">
      <div class="alvarix-section-heading">
        <span>Changelog</span>
        <h2>Developer portal release timeline.</h2>
      </div>
      <div class="alvarix-timeline">
        <article><b>v1.0</b><h3>Risk API Launch</h3><p>Initial production Risk API with AI-powered scoring and API key authentication.</p></article>
        <article><b>v1.1</b><h3>Swagger Branding</h3><p>Branded OpenAPI documentation, custom title, logo support, and grouped endpoints.</p></article>
        <article><b>v1.2</b><h3>Enterprise Developer Portal</h3><p>Expanded quick start, SDK examples, API key guide, pricing, error reference, and trust sections.</p></article>
      </div>
    </section>

    <section class="alvarix-section" id="support">
      <div class="alvarix-section-heading">
        <span>Contact &amp; Support</span>
        <h2>Get help launching with Alvarix SecureAI.</h2>
      </div>
      <div class="alvarix-support-grid">
        <a href="https://alvarix24-production.up.railway.app/docs"><span>Documentation</span><strong>Read the API docs</strong></a>
        <a href="mailto:sandiajimf@gmail.com"><span>Contact Sales</span><strong>Discuss enterprise access</strong></a>
        <a href="mailto:sandiajimf@gmail.com"><span>Support Email</span><strong>sandiajimf@gmail.com</strong></a>
        <a href="https://alvarix24-production.up.railway.app"><span>Website</span><strong>alvarix24-production.up.railway.app</strong></a>
      </div>
    </section>

    <section class="alvarix-section alvarix-reference" id="api-reference">
      <div class="alvarix-section-heading">
        <span>API Reference</span>
        <h2>Explore endpoints, schemas, and authorization.</h2>
        <p>Use the Authorize button below with your JWT or API key to test protected endpoints.</p>
      </div>
      <div class="alvarix-swagger-loader" id="swagger-loader">
        <div>
          <strong>Interactive OpenAPI Reference</strong>
          <span>Load the full Swagger UI when you are ready to inspect endpoints, schemas, and authorization.</span>
        </div>
        <button type="button" id="alvarix-load-swagger">Load API Reference</button>
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
      <a href="/privacy/">Privacy Policy</a>
      <a href="/terms/">Terms of Service</a>
      <a href="/refund/">Refund Policy</a>
      <a href="/acceptable-use/">Acceptable Use</a>
      <a href="mailto:sandiajimf@gmail.com">Contact</a>
      <a href="#">GitHub (future)</a>
    </nav>
  </footer>
  <script src="/public/portal.js" defer></script>
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
    .alvarix-status-grid div,
    .alvarix-guide-grid article,
    .alvarix-pricing-grid article,
    .alvarix-timeline article,
    .alvarix-support-grid a,
    .alvarix-table-wrap,
    .alvarix-swagger-loader {
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
    .alvarix-guide-grid p,
    .alvarix-pricing-grid p,
    .alvarix-timeline p,
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

    .alvarix-section-heading code,
    .alvarix-error-table code {
      color: var(--alv-blue-2);
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      font-size: 0.92em;
    }

    .alvarix-steps,
    .alvarix-code-grid,
    .alvarix-card-grid,
    .alvarix-status-grid,
    .alvarix-request-response,
    .alvarix-guide-grid,
    .alvarix-pricing-grid,
    .alvarix-timeline,
    .alvarix-support-grid {
      display: grid;
      gap: 14px;
    }

    .alvarix-steps {
      grid-template-columns: repeat(4, 1fr);
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

    .alvarix-request-response {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin-bottom: 14px;
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

    .alvarix-guide-grid {
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 14px;
    }

    .alvarix-guide-grid article,
    .alvarix-pricing-grid article,
    .alvarix-timeline article,
    .alvarix-support-grid a {
      padding: 20px;
    }

    .alvarix-guide-grid h3,
    .alvarix-pricing-grid h3,
    .alvarix-timeline h3 {
      color: var(--alv-text);
      margin: 7px 0 6px;
      font-size: 18px;
    }

    .alvarix-guide-grid p,
    .alvarix-pricing-grid p,
    .alvarix-timeline p {
      margin: 0;
      font-size: 14px;
      line-height: 1.55;
    }

    .alvarix-guide-grid code {
      color: var(--alv-blue-2);
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
    }

    .alvarix-pricing-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .alvarix-pricing-grid span,
    .alvarix-timeline b {
      color: var(--alv-green);
      font-size: 12px;
      font-weight: 950;
      text-transform: uppercase;
    }

    .alvarix-pricing-grid b {
      display: block;
      color: var(--alv-blue-2);
      font-size: 13px;
      margin-top: 14px;
      line-height: 1.45;
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

    .alvarix-swagger-loader {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      padding: 18px;
      margin-top: 18px;
    }

    .alvarix-swagger-loader div {
      display: grid;
      gap: 5px;
    }

    .alvarix-swagger-loader strong {
      color: var(--alv-text);
      font-size: 17px;
    }

    .alvarix-swagger-loader span {
      color: var(--alv-muted);
      font-size: 14px;
    }

    .alvarix-swagger-loader button {
      min-height: 42px;
      border: 1px solid var(--alv-blue);
      background: var(--alv-blue);
      color: #03101d;
      cursor: pointer;
      font-weight: 950;
      padding: 0 14px;
      white-space: nowrap;
    }

    .alvarix-table-wrap {
      overflow-x: auto;
    }

    .alvarix-error-table {
      width: 100%;
      border-collapse: collapse;
      min-width: 760px;
    }

    .alvarix-error-table th,
    .alvarix-error-table td {
      border-bottom: 1px solid var(--alv-line);
      color: var(--alv-muted);
      font-size: 14px;
      line-height: 1.45;
      padding: 14px;
      text-align: left;
      vertical-align: top;
    }

    .alvarix-error-table th,
    .alvarix-error-table td:first-child {
      color: var(--alv-text);
      font-weight: 900;
    }

    .alvarix-timeline {
      grid-template-columns: repeat(3, 1fr);
    }

    .alvarix-timeline article {
      border-left: 2px solid var(--alv-blue);
    }

    .alvarix-support-grid {
      grid-template-columns: repeat(4, 1fr);
    }

    .alvarix-support-grid a {
      color: var(--alv-text);
      text-decoration: none;
    }

    .alvarix-support-grid span,
    .alvarix-support-grid strong {
      display: block;
    }

    .alvarix-support-grid span {
      color: var(--alv-muted);
      font-size: 13px;
      margin-bottom: 7px;
    }

    .alvarix-support-grid strong {
      color: var(--alv-blue-2);
      font-size: 14px;
      overflow-wrap: anywhere;
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
      .alvarix-code-grid,
      .alvarix-request-response {
        grid-template-columns: 1fr;
      }

      .alvarix-card-grid.five,
      .alvarix-pricing-grid,
      .alvarix-support-grid {
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
      .alvarix-status-grid,
      .alvarix-guide-grid,
      .alvarix-pricing-grid,
      .alvarix-timeline,
      .alvarix-support-grid {
        grid-template-columns: 1fr;
      }

      .alvarix-portal-footer {
        align-items: flex-start;
        flex-direction: column;
      }

      .alvarix-swagger-loader {
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
    .replace('<meta charset="UTF-8">', '<meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <meta name="description" content="Alvarix Risk API developer portal for AI risk scoring, fraud detection, behavior analytics, payment intelligence, and decision support.">')
    .replace(/<link rel="stylesheet" type="text\/css" href="\.\/swagger-ui\.css" >\s*/i, '')
    .replace(/<link rel="icon"[^>]+favicon-32x32\.png[^>]+>\s*/i, '')
    .replace(/<link rel="icon"[^>]+favicon-16x16\.png[^>]+>\s*/i, '')
    .replace(/<script src="\.\/swagger-ui-bundle\.js">\s*<\/script>\s*/i, '')
    .replace(/<script src="\.\/swagger-ui-standalone-preset\.js">\s*<\/script>\s*/i, '')
    .replace(/<script src="\.\/swagger-ui-init\.js">\s*<\/script>\s*/i, '')
    .replace('<body>', '<body>' + portalHeaderHtml)
    .replace('</body>', portalFooterHtml + '</body>')
}

module.exports = {
  buildBrandedSwaggerHtml,
  swaggerUiOptions
}
