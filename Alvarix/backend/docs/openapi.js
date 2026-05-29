const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Alvarix AI Risk Scoring API',
    version: '1.0.0',
    description: 'Production API for explainable AI risk and fraud scoring.'
  },
  servers: [
    {
      url: '/',
      description: 'Current deployment'
    }
  ],
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key'
      },
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: {
          200: {
            description: 'Service health response'
          }
        }
      }
    },
    '/risk-score': {
      post: {
        summary: 'Score risk for transaction, login, or API activity',
        security: [{ ApiKeyAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['user_id', 'context'],
                properties: {
                  user_id: { type: 'string' },
                  context: { type: 'string', enum: ['transaction', 'login', 'api'] },
                  amount: { type: 'number' },
                  location: { type: 'string' },
                  expectedLocation: { type: 'string' },
                  device: { type: 'string' },
                  vpnDetected: { type: 'boolean' },
                  proxyDetected: { type: 'boolean' },
                  torDetected: { type: 'boolean' },
                  blacklisted: { type: 'boolean' },
                  failedAttempts: { type: 'number' },
                  requestRate: { type: 'number' }
                  ,
                  impossibleTravel: { type: 'boolean' },
                  sessionAnomaly: { type: 'boolean' },
                  behaviorAnomaly: { type: 'boolean' }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Risk score response'
          },
          400: {
            description: 'Validation error'
          },
          401: {
            description: 'Missing or invalid API key'
          }
        }
      }
    },
    '/api/auth/register': {
      post: {
        summary: 'Register a user'
      }
    },
    '/api/auth/login': {
      post: {
        summary: 'Login and receive JWT'
      }
    },
    '/api/apikey/generate': {
      post: {
        summary: 'Generate a hashed API key',
        security: [{ BearerAuth: [] }]
      }
    },
    '/api/apikey/stats': {
      get: {
        summary: 'Per-key usage and risk statistics',
        security: [{ ApiKeyAuth: [] }]
      }
    },
    '/admin/analytics': {
      get: {
        summary: 'Admin usage, risk, and threat analytics',
        security: [{ BearerAuth: [] }]
      }
    },
    '/admin/usage': {
      get: {
        summary: 'Paginated API consumption records',
        security: [{ BearerAuth: [] }]
      }
    },
    '/admin/threats': {
      get: {
        summary: 'Threat tag aggregation',
        security: [{ BearerAuth: [] }]
      }
    },
    '/admin/users': {
      get: {
        summary: 'Paginated user analytics',
        security: [{ BearerAuth: [] }]
      }
    },
    '/admin/keys': {
      get: {
        summary: 'Paginated API key analytics',
        security: [{ BearerAuth: [] }]
      }
    },
    '/founder/revenue': {
      get: {
        summary: 'Founder revenue analytics',
        security: [{ BearerAuth: [] }]
      }
    },
    '/founder/clients': {
      get: {
        summary: 'Founder client analytics',
        security: [{ BearerAuth: [] }]
      }
    },
    '/founder/metrics': {
      get: {
        summary: 'Founder operating metrics',
        security: [{ BearerAuth: [] }]
      }
    },
    '/billing/subscription/activate': {
      post: {
        summary: 'Create or activate a subscription and invoice',
        security: [{ BearerAuth: [] }]
      }
    },
    '/billing/subscription/upgrade': {
      post: {
        summary: 'Upgrade a subscription and generate provider payment session when configured',
        security: [{ BearerAuth: [] }]
      }
    },
    '/billing/subscription/downgrade': {
      post: {
        summary: 'Downgrade a subscription and generate the corresponding invoice',
        security: [{ BearerAuth: [] }]
      }
    },
    '/billing/invoices': {
      get: {
        summary: 'List authenticated user invoices',
        security: [{ BearerAuth: [] }]
      },
      post: {
        summary: 'Generate a manual or provider-ready invoice',
        security: [{ BearerAuth: [] }]
      }
    },
    '/billing/payments/verify': {
      post: {
        summary: 'Verify Stripe or Midtrans payment status and activate paid subscriptions',
        security: [{ BearerAuth: [] }]
      }
    }
  }
}

module.exports = openapiSpec
