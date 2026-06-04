const docsBannerHtml = `
  <section class="alvarix-docs-banner" aria-label="Alvarix SecureAI API documentation header">
    <div class="alvarix-docs-banner-inner">
      <img class="alvarix-docs-logo" src="/public/logo.png" alt="Alvarix SecureAI logo" onerror="this.remove()">
      <div class="alvarix-docs-kicker">ALVARIX SECUREAI</div>
      <h1>Alvarix Risk API Documentation</h1>
      <p>Global AI Risk &amp; Threat Intelligence Platform</p>
      <div class="alvarix-docs-pills" aria-label="Platform capabilities">
        <span>AI Risk Scoring</span>
        <span>Fraud Detection</span>
        <span>Behavior Analytics</span>
        <span>Payment Intelligence</span>
      </div>
      <a class="alvarix-docs-url" href="https://alvarix24-production.up.railway.app">https://alvarix24-production.up.railway.app</a>
    </div>
  </section>
`

const docsFooterHtml = `
  <footer class="alvarix-docs-footer">
    <strong>Powered by Alvarix SecureAI</strong>
    <span>Global AI Risk &amp; Threat Intelligence Platform</span>
  </footer>
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
      --alvarix-bg: #05070d;
      --alvarix-panel: #0d1420;
      --alvarix-panel-strong: #111b2a;
      --alvarix-line: #253146;
      --alvarix-text: #f5f7fb;
      --alvarix-muted: #9aa8bc;
      --alvarix-cyan: #39d6d8;
      --alvarix-green: #71e3a2;
      --alvarix-amber: #f4c76b;
    }

    html,
    body {
      background:
        linear-gradient(180deg, rgba(17, 27, 42, 0.72), rgba(5, 7, 13, 0.98)),
        repeating-linear-gradient(90deg, rgba(57, 214, 216, 0.045) 0, rgba(57, 214, 216, 0.045) 1px, transparent 1px, transparent 92px),
        var(--alvarix-bg) !important;
      color: var(--alvarix-text) !important;
    }

    body {
      margin: 0 !important;
    }

    .swagger-ui {
      color: var(--alvarix-text);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    .swagger-ui .topbar {
      display: none;
    }

    .alvarix-docs-banner {
      background:
        linear-gradient(135deg, rgba(57, 214, 216, 0.18), rgba(113, 227, 162, 0.08)),
        #05070d;
      border-bottom: 1px solid var(--alvarix-line);
      color: var(--alvarix-text);
      padding: 42px 24px 36px;
      text-align: center;
    }

    .alvarix-docs-banner-inner {
      max-width: 1120px;
      margin: 0 auto;
    }

    .alvarix-docs-logo {
      display: block;
      width: 82px;
      height: 82px;
      margin: 0 auto 18px;
      object-fit: contain;
    }

    .alvarix-docs-kicker {
      color: var(--alvarix-green);
      font-size: 13px;
      font-weight: 900;
      letter-spacing: 0;
      margin-bottom: 10px;
    }

    .alvarix-docs-banner h1 {
      margin: 0;
      color: var(--alvarix-text);
      font-size: clamp(34px, 5vw, 58px);
      line-height: 1.02;
      letter-spacing: 0;
    }

    .alvarix-docs-banner p {
      margin: 14px auto 0;
      color: #c4d0e1;
      font-size: 18px;
      max-width: 760px;
    }

    .alvarix-docs-pills {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 20px;
    }

    .alvarix-docs-pills span {
      border: 1px solid rgba(57, 214, 216, 0.38);
      color: var(--alvarix-green);
      background: rgba(13, 20, 32, 0.68);
      font-size: 12px;
      font-weight: 900;
      padding: 8px 11px;
      text-transform: uppercase;
    }

    .alvarix-docs-url {
      display: inline-flex;
      margin-top: 20px;
      color: var(--alvarix-cyan);
      font-size: 14px;
      font-weight: 800;
      text-decoration: none;
    }

    .swagger-ui .wrapper {
      max-width: 1180px;
      padding-left: 24px;
      padding-right: 24px;
    }

    .swagger-ui .info {
      margin: 36px 0 26px;
    }

    .swagger-ui .info .title,
    .swagger-ui .info hgroup.main h2,
    .swagger-ui .opblock-tag,
    .swagger-ui section.models h4 {
      color: var(--alvarix-text) !important;
      letter-spacing: 0;
    }

    .swagger-ui .info .title small {
      background: var(--alvarix-cyan) !important;
      color: #031015 !important;
      border-radius: 0 !important;
    }

    .swagger-ui .info .description,
    .swagger-ui .info li,
    .swagger-ui .info p,
    .swagger-ui .renderedMarkdown,
    .swagger-ui .renderedMarkdown p {
      color: var(--alvarix-muted) !important;
    }

    .swagger-ui .scheme-container,
    .swagger-ui .opblock,
    .swagger-ui section.models {
      background: rgba(13, 20, 32, 0.92) !important;
      border: 1px solid var(--alvarix-line) !important;
      box-shadow: none !important;
    }

    .swagger-ui .scheme-container {
      margin: 0 0 24px;
      padding: 20px 24px;
    }

    .swagger-ui .opblock {
      border-radius: 0 !important;
      overflow: hidden;
    }

    .swagger-ui .opblock .opblock-summary {
      border-color: var(--alvarix-line) !important;
    }

    .swagger-ui .opblock-tag {
      border-bottom-color: var(--alvarix-line) !important;
      font-size: 24px !important;
    }

    .swagger-ui table thead tr td,
    .swagger-ui table thead tr th,
    .swagger-ui .parameters-col_name,
    .swagger-ui .parameters-col_description,
    .swagger-ui .response-col_status,
    .swagger-ui .response-col_description,
    .swagger-ui .model-title,
    .swagger-ui .model,
    .swagger-ui label,
    .swagger-ui .tab li,
    .swagger-ui .copy-to-clipboard {
      color: var(--alvarix-text) !important;
    }

    .swagger-ui input,
    .swagger-ui textarea,
    .swagger-ui select {
      background: #05070d !important;
      border-color: var(--alvarix-line) !important;
      color: var(--alvarix-text) !important;
    }

    .swagger-ui .btn.authorize,
    .swagger-ui .btn {
      border-color: var(--alvarix-cyan) !important;
      color: var(--alvarix-cyan) !important;
      border-radius: 0 !important;
      box-shadow: none !important;
    }

    .swagger-ui .btn.execute {
      background: var(--alvarix-cyan) !important;
      color: #031015 !important;
      border-color: var(--alvarix-cyan) !important;
    }

    .alvarix-docs-footer {
      border-top: 1px solid var(--alvarix-line);
      color: var(--alvarix-muted);
      display: flex;
      flex-wrap: wrap;
      gap: 10px 18px;
      justify-content: center;
      padding: 28px 24px 36px;
      text-align: center;
    }

    .alvarix-docs-footer strong {
      color: var(--alvarix-text);
    }

    @media (max-width: 720px) {
      .alvarix-docs-banner {
        padding-top: 32px;
      }

      .alvarix-docs-logo {
        width: 66px;
        height: 66px;
      }
    }
  `
}

function buildBrandedSwaggerHtml(openapiSpec, swaggerUi) {
  const generatedHtml = swaggerUi.generateHTML(openapiSpec, swaggerUiOptions)
  return generatedHtml
    .replace(/<title>.*?<\/title>/i, '<title>Alvarix Risk API Documentation</title>')
    .replace('<body>', '<body>' + docsBannerHtml)
    .replace('</body>', docsFooterHtml + '</body>')
}

module.exports = {
  buildBrandedSwaggerHtml,
  swaggerUiOptions
}
