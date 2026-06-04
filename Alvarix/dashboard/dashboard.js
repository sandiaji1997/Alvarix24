const mockDashboard = {
  metrics: {
    totalRequests: 48230,
    riskDecisions: 31780,
    threatEvents: 1264,
    creditsRemaining: 51770
  },
  apiKeys: [
    { name: 'Production Risk API', status: 'Active', createdDate: '2026-05-14' },
    { name: 'Staging Integration', status: 'Active', createdDate: '2026-05-21' },
    { name: 'Legacy Sandbox Key', status: 'Revoked', createdDate: '2026-04-02' }
  ],
  requestsPerDay: [
    { label: 'Mon', value: 5200 },
    { label: 'Tue', value: 6800 },
    { label: 'Wed', value: 7350 },
    { label: 'Thu', value: 8100 },
    { label: 'Fri', value: 7900 },
    { label: 'Sat', value: 4320 },
    { label: 'Sun', value: 3610 }
  ],
  riskLevels: [
    { label: 'Low', value: 58, color: '#71e3a2' },
    { label: 'Medium', value: 27, color: '#f4c76b' },
    { label: 'High', value: 12, color: '#f17272' },
    { label: 'Critical', value: 3, color: '#a78bfa' }
  ],
  decisions: [
    { label: 'Approve', value: 66, color: '#39d6d8' },
    { label: 'Review', value: 24, color: '#f4c76b' },
    { label: 'Block', value: 10, color: '#f17272' }
  ],
  billing: {
    plan: 'Pro',
    usage: '48,230 / 50,000 requests',
    nextBillingDate: '2026-07-01'
  },
  account: {
    companyName: 'Alvarix Customer Workspace',
    contactEmail: 'sandiajimf@gmail.com',
    environment: 'Production'
  }
}

function formatNumber(value) {
  return Number(value).toLocaleString()
}

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((node) => {
    node.textContent = value
  })
}

function renderMetrics() {
  Object.entries(mockDashboard.metrics).forEach(([key, value]) => {
    setText(`[data-metric="${key}"]`, formatNumber(value))
  })
}

function renderApiKeys() {
  const body = document.querySelector('[data-api-keys]')
  body.innerHTML = mockDashboard.apiKeys.map((key) => `
    <tr>
      <td>${key.name}</td>
      <td><span class="badge ${key.status.toLowerCase()}">${key.status}</span></td>
      <td>${key.createdDate}</td>
    </tr>
  `).join('')
}

function renderBarChart() {
  const node = document.querySelector('[data-chart="requests"]')
  const max = Math.max(...mockDashboard.requestsPerDay.map((row) => row.value))
  node.innerHTML = mockDashboard.requestsPerDay.map((row) => `
    <div class="bar-row">
      <span>${row.label}</span>
      <span class="bar-track"><span class="bar-fill" style="width:${(row.value / max) * 100}%"></span></span>
      <b>${formatNumber(row.value)}</b>
    </div>
  `).join('')
}

function renderDonut(selector, rows) {
  const node = document.querySelector(`[data-donut="${selector}"]`)
  const legend = document.querySelector(`[data-legend="${selector}"]`)
  let start = 0
  const gradient = rows.map((row) => {
    const end = start + row.value
    const slice = `${row.color} ${start}% ${end}%`
    start = end
    return slice
  }).join(', ')

  node.style.background = `conic-gradient(${gradient})`
  node.innerHTML = `<strong>${rows.reduce((sum, row) => sum + row.value, 0)}%</strong>`
  legend.innerHTML = rows.map((row) => `
    <span><i style="background:${row.color}"></i>${row.label} ${row.value}%</span>
  `).join('')
}

function renderBilling() {
  setText('[data-billing="plan"]', mockDashboard.billing.plan)
  setText('[data-billing="usage"]', mockDashboard.billing.usage)
  setText('[data-billing="nextBillingDate"]', mockDashboard.billing.nextBillingDate)
}

function renderAccount() {
  setText('[data-account="companyName"]', mockDashboard.account.companyName)
  setText('[data-account="contactEmail"]', mockDashboard.account.contactEmail)
  setText('[data-account="environment"]', mockDashboard.account.environment)
}

renderMetrics()
renderApiKeys()
renderBarChart()
renderDonut('risk', mockDashboard.riskLevels)
renderDonut('decision', mockDashboard.decisions)
renderBilling()
renderAccount()
