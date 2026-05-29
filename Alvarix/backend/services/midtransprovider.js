const MIDTRANS_BASE = process.env.MIDTRANS_IS_PRODUCTION === 'true'
  ? 'https://app.midtrans.com'
  : 'https://app.sandbox.midtrans.com'

function hasMidtransConfig() {
  return Boolean(process.env.MIDTRANS_SERVER_KEY)
}

function authHeader() {
  if (!hasMidtransConfig()) {
    const err = new Error('Midtrans credentials are not configured')
    err.status = 503
    throw err
  }

  return `Basic ${Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64')}`
}

async function createSnapTransaction({ user, invoice }) {
  const response = await fetch(`${MIDTRANS_BASE}/snap/v1/transactions`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      transaction_details: {
        order_id: invoice.invoiceNumber,
        gross_amount: invoice.total
      },
      customer_details: {
        email: user.email
      },
      item_details: [
        {
          id: `alvarix-${invoice.plan}`,
          price: invoice.total,
          quantity: 1,
          name: `Alvarix ${invoice.plan} plan`
        }
      ]
    })
  })
  const data = await response.json()

  if (!response.ok) {
    const err = new Error(data.status_message || 'Midtrans transaction failed')
    err.status = response.status
    err.providerResponse = data
    throw err
  }

  return data
}

async function verifyTransaction(orderId) {
  const response = await fetch(`${MIDTRANS_BASE}/v2/${orderId}/status`, {
    headers: {
      Authorization: authHeader(),
      Accept: 'application/json'
    }
  })
  const data = await response.json()

  if (!response.ok) {
    const err = new Error(data.status_message || 'Midtrans verification failed')
    err.status = response.status
    err.providerResponse = data
    throw err
  }

  return data
}

module.exports = {
  hasMidtransConfig,
  createSnapTransaction,
  verifyTransaction
}
