const STRIPE_API_BASE = 'https://api.stripe.com/v1'

function hasStripeConfig() {
  return Boolean(process.env.STRIPE_SECRET_KEY)
}

function stripeHeaders() {
  if (!hasStripeConfig()) {
    const err = new Error('Stripe credentials are not configured')
    err.status = 503
    throw err
  }

  return {
    Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

async function stripeRequest(path, body) {
  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: 'POST',
    headers: stripeHeaders(),
    body: new URLSearchParams(body)
  })
  const data = await response.json()

  if (!response.ok) {
    const err = new Error(data.error ? data.error.message : 'Stripe request failed')
    err.status = response.status
    err.providerResponse = data
    throw err
  }

  return data
}

async function createCheckoutSession({ user, invoice, successUrl, cancelUrl }) {
  return stripeRequest('/checkout/sessions', {
    mode: 'payment',
    customer_email: user.email,
    success_url: successUrl || process.env.STRIPE_SUCCESS_URL,
    cancel_url: cancelUrl || process.env.STRIPE_CANCEL_URL,
    'line_items[0][price_data][currency]': String(invoice.currency || 'IDR').toLowerCase(),
    'line_items[0][price_data][product_data][name]': `Alvarix ${invoice.plan} plan`,
    'line_items[0][price_data][unit_amount]': Math.round(invoice.total),
    'line_items[0][quantity]': 1,
    'metadata[invoiceId]': String(invoice._id),
    'metadata[userId]': String(user._id)
  })
}

async function retrieveCheckoutSession(sessionId) {
  if (!hasStripeConfig()) {
    const err = new Error('Stripe credentials are not configured')
    err.status = 503
    throw err
  }

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions/${sessionId}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`
    }
  })
  const data = await response.json()

  if (!response.ok) {
    const err = new Error(data.error ? data.error.message : 'Stripe verification failed')
    err.status = response.status
    err.providerResponse = data
    throw err
  }

  return data
}

module.exports = {
  hasStripeConfig,
  createCheckoutSession,
  retrieveCheckoutSession
}
