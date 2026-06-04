const schemas = {
  Error: {
    type: 'object',
    required: ['success', 'error'],
    properties: {
      success: { type: 'boolean', const: false },
      error: { type: 'string' },
      details: {
        type: 'array',
        items: { type: 'string' }
      },
      requestId: { type: 'string' }
    },
    examples: [
      { success: false, error: 'Validation failed', details: ['amount must be a number'] }
    ]
  },
  SuccessMessage: {
    type: 'object',
    required: ['success', 'message'],
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' }
    }
  },
  HealthResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      status: { type: 'string', enum: ['ok', 'degraded'] },
      service: { type: 'string' },
      database: { type: 'string', enum: ['connected', 'disconnected'] },
      uptime: { type: 'number' },
      timestamp: { type: 'string', format: 'date-time' },
      requestId: { type: 'string' }
    }
  },
  PlatformMetadataResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      name: { type: 'string' },
      status: { type: 'string' },
      version: { type: 'string' },
      docs: { type: 'string' },
      health: { type: 'string' },
      endpoints: {
        type: 'object',
        additionalProperties: { type: 'string' }
      }
    }
  },
  RegisterRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 8 }
    },
    examples: [{ email: 'customer@alvarix.ai', password: 'ChangeMe123!' }]
  },
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    },
    examples: [{ email: 'customer@alvarix.ai', password: 'ChangeMe123!' }]
  },
  LoginResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      token: { type: 'string' }
    }
  },
  ApiKeyGenerateRequest: {
    type: 'object',
    properties: {
      plan: { type: 'string', enum: ['free', 'basic', 'pro', 'enterprise'], default: 'free' },
      type: { type: 'string', default: 'live' }
    },
    examples: [{ plan: 'pro', type: 'live' }]
  },
  ApiKeyGenerateResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      message: { type: 'string' },
      apiKey: { type: 'string', description: 'Raw API key returned once at creation time.' },
      plan: { type: 'string' },
      credits: { type: 'number' }
    }
  },
  ApiKeyStatsResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      plan: { type: 'string' },
      remainingCredits: { type: 'number' },
      monthlyQuota: { type: 'number' },
      used: { type: 'number' },
      lastUsedAt: { type: ['string', 'null'], format: 'date-time' },
      dailyUsage: { type: 'array', items: { $ref: '#/components/schemas/DailyUsage' } },
      riskLevels: { type: 'array', items: { $ref: '#/components/schemas/AggregateCount' } },
      topThreats: { type: 'array', items: { $ref: '#/components/schemas/AggregateCount' } }
    }
  },
  RiskScoreRequest: {
    type: 'object',
    required: ['user_id', 'context'],
    properties: {
      user_id: { type: 'string' },
      context: { type: 'string', enum: ['transaction', 'login', 'api'] },
      amount: { type: 'number' },
      location: { type: 'string' },
      expectedLocation: { type: 'string' },
      device: { type: 'string' },
      velocity24h: { type: 'number' },
      failedAttempts: { type: 'number' },
      requestRate: { type: 'number' },
      errorRate: { type: 'number' },
      vpnDetected: { type: 'boolean' },
      proxyDetected: { type: 'boolean' },
      torDetected: { type: 'boolean' },
      blacklisted: { type: 'boolean' },
      impossibleTravel: { type: 'boolean' },
      sessionAnomaly: { type: 'boolean' },
      behaviorAnomaly: { type: 'boolean' },
      chargebackHistory: { type: 'boolean' }
    },
    examples: [{
      user_id: 'usr_123',
      context: 'transaction',
      amount: 125.5,
      location: 'ID',
      expectedLocation: 'ID',
      device: 'android',
      velocity24h: 4,
      vpnDetected: false
    }]
  },
  RiskScoreResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      requestId: { type: 'string' },
      context: { type: 'string' },
      riskScore: { type: 'number' },
      riskLevel: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
      confidence: { type: 'number' },
      threatTags: { type: 'array', items: { type: 'string' } },
      reasons: { type: 'array', items: { type: 'string' } },
      decision: { type: 'string', enum: ['APPROVE', 'REVIEW', 'BLOCK'] },
      remainingCredits: { type: 'number' },
      usage: { $ref: '#/components/schemas/UsageSummary' }
    }
  },
  TransactionRequest: {
    type: 'object',
    required: ['userId', 'amount', 'type'],
    properties: {
      userId: { type: 'string' },
      amount: { type: 'number', exclusiveMinimum: 0 },
      type: { type: 'string', enum: ['payment', 'transfer', 'purchase', 'withdrawal', 'deposit', 'refund'] },
      status: { type: 'string' }
    },
    examples: [{ userId: 'usr_123', amount: 99.95, type: 'payment', status: 'pending' }]
  },
  Transaction: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      userId: { type: 'string' },
      apikey: { type: 'string' },
      amount: { type: 'number' },
      type: { type: 'string' },
      status: { type: 'string' },
      location: { type: 'string' },
      device: { type: 'string' },
      context: { type: 'string' },
      riskScore: { type: 'number' },
      riskLevel: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' }
    }
  },
  TransactionCreateResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      risk: { type: 'object' },
      data: { $ref: '#/components/schemas/Transaction' }
    }
  },
  TransactionListResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: { type: 'array', items: { $ref: '#/components/schemas/Transaction' } }
    }
  },
  PaymentIntelligenceRequest: {
    type: 'object',
    required: ['user_id', 'amount', 'paymentMethod'],
    properties: {
      user_id: { type: 'string' },
      amount: { type: 'number' },
      paymentMethod: { type: 'string', enum: ['card', 'wallet', 'qr', 'bank_transfer', 'crypto', 'other'] },
      channel: { type: 'string', enum: ['ecommerce', 'pos', 'p2p', 'subscription', 'marketplace', 'other'] },
      currency: { type: 'string', default: 'USD' },
      location: { type: 'string' },
      expectedLocation: { type: 'string' },
      device: { type: 'string' },
      merchantId: { type: 'string' },
      walletProvider: { type: 'string' },
      cardCountry: { type: 'string' },
      qrProvider: { type: 'string' },
      velocity24h: { type: 'number' },
      failedAttempts: { type: 'number' },
      vpnDetected: { type: 'boolean' },
      proxyDetected: { type: 'boolean' },
      torDetected: { type: 'boolean' },
      blacklisted: { type: 'boolean' },
      behaviorAnomaly: { type: 'boolean' },
      chargebackHistory: { type: 'boolean' }
    },
    examples: [{
      user_id: 'usr_123',
      amount: 250,
      paymentMethod: 'card',
      channel: 'ecommerce',
      currency: 'USD',
      location: 'ID',
      cardCountry: 'SG'
    }]
  },
  PaymentIntelligenceResponse: {
    allOf: [
      { $ref: '#/components/schemas/RiskScoreResponse' },
      {
        type: 'object',
        properties: {
          paymentMethod: { type: 'string' },
          channel: { type: 'string' },
          currency: { type: 'string' },
          paymentSignals: { type: 'array', items: { $ref: '#/components/schemas/Signal' } }
        }
      }
    ]
  },
  PaymentDecisionRequest: {
    allOf: [
      { $ref: '#/components/schemas/PaymentIntelligenceRequest' },
      {
        type: 'object',
        properties: {
          policy: {
            type: 'object',
            properties: {
              blockThreshold: { type: 'number', default: 90 },
              reviewThreshold: { type: 'number', default: 70 },
              hardBlockTags: { type: 'array', items: { type: 'string' } }
            }
          }
        }
      }
    ],
    examples: [{
      user_id: 'usr_123',
      amount: 250,
      paymentMethod: 'wallet',
      channel: 'marketplace',
      policy: { blockThreshold: 92, reviewThreshold: 72, hardBlockTags: ['BLACKLIST', 'TOR'] }
    }]
  },
  PaymentDecisionResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      requestId: { type: 'string' },
      context: { type: 'string' },
      decision: { type: 'string', enum: ['APPROVE', 'REVIEW', 'BLOCK'] },
      decisionReason: { type: 'string' },
      riskScore: { type: 'number' },
      riskLevel: { type: 'string' },
      confidence: { type: 'number' },
      threatTags: { type: 'array', items: { type: 'string' } },
      reasons: { type: 'array', items: { type: 'string' } },
      paymentSignals: { type: 'array', items: { $ref: '#/components/schemas/Signal' } },
      paymentMethod: { type: 'string' },
      channel: { type: 'string' },
      currency: { type: 'string' },
      policy: { type: 'object' },
      remainingCredits: { type: 'number' },
      usage: { $ref: '#/components/schemas/UsageSummary' }
    }
  },
  Signal: {
    type: 'object',
    properties: {
      type: { type: 'string' },
      severity: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
      message: { type: 'string' }
    }
  },
  UsageSummary: {
    type: 'object',
    properties: {
      remainingCredits: { type: 'number' },
      used: { type: 'number' },
      monthlyQuota: { type: 'number' }
    },
    additionalProperties: true
  },
  DailyUsage: {
    type: 'object',
    properties: {
      _id: { type: 'string', format: 'date' },
      requests: { type: 'number' },
      avgRiskScore: { type: 'number' }
    }
  },
  AggregateCount: {
    type: 'object',
    properties: {
      _id: { type: 'string' },
      count: { type: 'number' },
      avgRiskScore: { type: 'number' },
      latestSeenAt: { type: 'string', format: 'date-time' }
    }
  },
  DashboardStatsResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      stats: {
        type: 'object',
        properties: {
          total_transactions: { type: 'number' },
          total_api_logs: { type: 'number' },
          total_api_keys: { type: 'number' },
          risk_distribution: {
            type: 'object',
            properties: {
              HIGH: { type: 'number' },
              MEDIUM: { type: 'number' },
              LOW: { type: 'number' }
            }
          }
        }
      }
    }
  },
  MonitoringDashboardResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      data: {
        type: 'object',
        properties: {
          credits: { type: 'number' },
          usage: { type: 'number' },
          plan: { type: 'string' },
          summary: { type: 'object' },
          recent_transactions: { type: 'array', items: { $ref: '#/components/schemas/Transaction' } }
        }
      }
    }
  },
  CustomerSubscriptionRequest: {
    type: 'object',
    required: ['plan'],
    properties: {
      plan: { type: 'string', enum: ['free', 'basic', 'pro', 'enterprise'] },
      provider: { type: 'string', enum: ['manual', 'stripe', 'midtrans'], default: 'manual' },
      billingMode: { type: 'string', enum: ['subscription', 'usage_based', 'hybrid'], default: 'subscription' }
    },
    examples: [{ plan: 'pro', provider: 'manual', billingMode: 'subscription' }]
  },
  BillingSubscriptionRequest: {
    allOf: [
      { $ref: '#/components/schemas/CustomerSubscriptionRequest' },
      {
        type: 'object',
        properties: {
          successUrl: { type: 'string', format: 'uri' },
          cancelUrl: { type: 'string', format: 'uri' }
        }
      }
    ]
  },
  InvoiceRequest: {
    type: 'object',
    required: ['plan'],
    properties: {
      plan: { type: 'string', enum: ['free', 'basic', 'pro', 'enterprise'] },
      provider: { type: 'string', enum: ['manual', 'stripe', 'midtrans'], default: 'manual' },
      usageAmount: { type: 'number', default: 0 }
    },
    examples: [{ plan: 'basic', provider: 'manual', usageAmount: 0 }]
  },
  PaymentVerifyRequest: {
    type: 'object',
    required: ['provider', 'reference'],
    properties: {
      provider: { type: 'string', enum: ['stripe', 'midtrans'] },
      reference: { type: 'string' }
    },
    examples: [{ provider: 'stripe', reference: 'in_123' }]
  },
  WebhookResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      processed: { type: 'boolean' },
      eventType: { type: 'string' }
    }
  },
  PaginatedResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      page: { type: 'number' },
      limit: { type: 'number' },
      total: { type: 'number' },
      items: { type: 'array', items: { type: 'object' } }
    }
  },
  AdminAnalyticsResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      usageByDay: { type: 'array', items: { $ref: '#/components/schemas/DailyUsage' } },
      riskDistribution: { type: 'array', items: { $ref: '#/components/schemas/AggregateCount' } },
      topThreats: { type: 'array', items: { $ref: '#/components/schemas/AggregateCount' } }
    }
  },
  FounderMetricsResponse: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      clients: { type: 'number' },
      freeUsers: { type: 'number' },
      basicUsers: { type: 'number' },
      proUsers: { type: 'number' },
      enterpriseUsers: { type: 'number' },
      activeSubscriptions: { type: 'number' },
      usageThisMonth: { type: 'number' },
      paidRevenue: { type: 'object' },
      estimatedMRR: { type: 'number' },
      estimatedInfraCost: { type: 'number' },
      estimatedProfit: { type: 'number' }
    }
  }
}

const responses = {
  BadRequest: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
  Unauthorized: { description: 'Missing or invalid authentication credentials', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
  Forbidden: { description: 'Authenticated principal is not authorized or quota is exhausted', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
  NotFound: { description: 'Resource or route not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
  Conflict: { description: 'Resource conflict', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
  TooManyRequests: { description: 'Global or plan rate limit exceeded', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
  ServerError: { description: 'Internal server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
}

const jsonBody = (schemaRef) => ({
  required: true,
  content: {
    'application/json': {
      schema: { $ref: schemaRef }
    }
  }
})

const jsonResponse = (description, schemaRef) => ({
  description,
  content: {
    'application/json': {
      schema: { $ref: schemaRef }
    }
  }
})

const securedResponses = (successRef) => ({
  200: jsonResponse('Successful response', successRef),
  400: responses.BadRequest,
  401: responses.Unauthorized,
  403: responses.Forbidden,
  429: responses.TooManyRequests,
  500: responses.ServerError
})

const openapiSpec = {
  openapi: '3.1.0',
  info: {
    title: 'Alvarix Risk API',
    version: '1.0.0',
    summary: 'Global AI Risk & Threat Intelligence Platform',
    description: 'Global AI Risk & Threat Intelligence Platform\n\nAlvarix Risk API provides:\n\n• AI Risk Scoring\n• Fraud Detection\n• Behavior Analytics\n• Payment Intelligence\n• Decision Support\n\nfor modern applications and digital businesses.',
    contact: {
      name: 'Alvarix SecureAI',
      url: 'https://alvarix24-production.up.railway.app',
      email: 'sandiajimf@gmail.com'
    },
    license: {
      name: 'Commercial License'
    }
  },
  servers: [
    {
      url: '/',
      description: 'Current deployment'
    }
  ],
  tags: [
    { name: 'Authentication', description: 'Registration and JWT login endpoints.' },
    { name: 'Risk Scoring', description: 'AI-powered risk scoring, transaction, payment intelligence, and decision support endpoints.' },
    { name: 'API Keys', description: 'API key generation, revocation, metering, and usage statistics.' },
    { name: 'Billing', description: 'Subscription, invoice, payment verification, and provider webhook endpoints.' },
    { name: 'Founder', description: 'Founder revenue and business intelligence endpoints.' },
    { name: 'Admin', description: 'Admin-only operational analytics and protected dashboard endpoints.' },
    { name: 'Monitoring', description: 'Service health, OpenAPI, and API-key scoped monitoring endpoints.' }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT returned by POST /api/auth/login.'
      },
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: 'Raw API key returned by POST /api/apikey/generate.'
      }
    },
    schemas,
    responses,
    parameters: {
      Page: { name: 'page', in: 'query', schema: { type: 'integer', minimum: 1, default: 1 } },
      Limit: { name: 'limit', in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 25 } },
      From: { name: 'from', in: 'query', schema: { type: 'string', format: 'date-time' } },
      To: { name: 'to', in: 'query', schema: { type: 'string', format: 'date-time' } },
      Plan: { name: 'plan', in: 'query', schema: { type: 'string', enum: ['free', 'basic', 'pro', 'enterprise'] } },
      RiskLevel: { name: 'riskLevel', in: 'query', schema: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] } },
      Context: { name: 'context', in: 'query', schema: { type: 'string', enum: ['transaction', 'login', 'api', 'payment_intelligence'] } },
      KeyStatus: { name: 'status', in: 'query', schema: { type: 'string', enum: ['active', 'paused', 'revoked'] } }
    }
  },
  paths: {
    '/': {
      get: {
        tags: ['Platform'],
        summary: 'Service metadata',
        responses: {
          200: jsonResponse('Service metadata', '#/components/schemas/PlatformMetadataResponse')
        }
      }
    },
    '/health': {
      get: {
        tags: ['Platform'],
        summary: 'Health check',
        responses: {
          200: jsonResponse('Service is healthy', '#/components/schemas/HealthResponse'),
          503: jsonResponse('Service is degraded', '#/components/schemas/HealthResponse')
        }
      }
    },
    '/openapi.json': {
      get: {
        tags: ['Platform'],
        summary: 'OpenAPI document',
        responses: {
          200: { description: 'OpenAPI 3.1 document' }
        }
      }
    },
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a user',
        requestBody: jsonBody('#/components/schemas/RegisterRequest'),
        responses: {
          201: jsonResponse('User registered', '#/components/schemas/SuccessMessage'),
          400: responses.BadRequest,
          409: responses.Conflict,
          500: responses.ServerError
        }
      }
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login and receive JWT',
        requestBody: jsonBody('#/components/schemas/LoginRequest'),
        responses: {
          200: jsonResponse('Login success', '#/components/schemas/LoginResponse'),
          400: responses.BadRequest,
          401: responses.Unauthorized,
          500: responses.ServerError
        }
      }
    },
    '/api/apikey/generate': {
      post: {
        tags: ['API Keys'],
        summary: 'Generate a hashed API key',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: false,
          content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiKeyGenerateRequest' } } }
        },
        responses: {
          201: jsonResponse('API key generated', '#/components/schemas/ApiKeyGenerateResponse'),
          400: responses.BadRequest,
          401: responses.Unauthorized,
          500: responses.ServerError
        }
      }
    },
    '/api/apikey/stats': {
      get: {
        tags: ['API Keys'],
        summary: 'Per-key usage and risk statistics',
        security: [{ ApiKeyAuth: [] }],
        responses: securedResponses('#/components/schemas/ApiKeyStatsResponse')
      }
    },
    '/api/apikey/{id}/revoke': {
      post: {
        tags: ['API Keys'],
        summary: 'Revoke an API key',
        security: [{ BearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'string' } }
        ],
        responses: {
          200: { description: 'API key revoked', content: { 'application/json': { schema: { type: 'object' } } } },
          401: responses.Unauthorized,
          404: responses.NotFound,
          500: responses.ServerError
        }
      }
    },
    '/risk-score': {
      post: {
        tags: ['Risk API'],
        summary: 'Score risk for transaction, login, or API activity',
        description: 'Backward-compatible root mount for Alvarix Risk API v1.',
        security: [{ ApiKeyAuth: [] }],
        requestBody: jsonBody('#/components/schemas/RiskScoreRequest'),
        responses: securedResponses('#/components/schemas/RiskScoreResponse')
      }
    },
    '/api/risk-score': {
      post: {
        tags: ['Risk API'],
        summary: 'Score risk for transaction, login, or API activity',
        description: 'Canonical /api mount for Alvarix Risk API v1.',
        security: [{ ApiKeyAuth: [] }],
        requestBody: jsonBody('#/components/schemas/RiskScoreRequest'),
        responses: securedResponses('#/components/schemas/RiskScoreResponse')
      }
    },
    '/api/transactions': {
      get: {
        tags: ['Transactions'],
        summary: 'List transactions',
        security: [{ ApiKeyAuth: [] }, { BearerAuth: [] }],
        responses: securedResponses('#/components/schemas/TransactionListResponse')
      },
      post: {
        tags: ['Transactions'],
        summary: 'Create transaction and score risk',
        security: [{ ApiKeyAuth: [] }],
        requestBody: jsonBody('#/components/schemas/TransactionRequest'),
        responses: securedResponses('#/components/schemas/TransactionCreateResponse')
      }
    },
    '/api/monitoring/dashboard': {
      get: {
        tags: ['Monitoring'],
        summary: 'API-key scoped dashboard',
        security: [{ ApiKeyAuth: [] }],
        responses: securedResponses('#/components/schemas/MonitoringDashboardResponse')
      }
    },
    '/api/dashboard/stats': {
      get: {
        tags: ['Dashboard'],
        summary: 'Global dashboard statistics',
        description: 'Admin/founder-only operational dashboard statistics.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: jsonResponse('Dashboard statistics', '#/components/schemas/DashboardStatsResponse'),
          401: responses.Unauthorized,
          403: responses.Forbidden,
          500: responses.ServerError
        }
      }
    },
    '/api/dashboard/transactions': {
      get: {
        tags: ['Dashboard'],
        summary: 'Recent transactions for global dashboard',
        description: 'Admin/founder-only recent transactions.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: jsonResponse('Recent transactions', '#/components/schemas/TransactionListResponse'),
          401: responses.Unauthorized,
          403: responses.Forbidden,
          500: responses.ServerError
        }
      }
    },
    '/api/dashboard/logs': {
      get: {
        tags: ['Dashboard'],
        summary: 'Recent API logs for global dashboard',
        description: 'Admin/founder-only recent API logs.',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Recent API logs', content: { 'application/json': { schema: { type: 'object' } } } },
          401: responses.Unauthorized,
          403: responses.Forbidden,
          500: responses.ServerError
        }
      }
    },
    '/customer/dashboard': customerGet('Customer dashboard'),
    '/customer/profile': customerGet('Customer profile'),
    '/customer/api-keys': customerGet('Customer API keys'),
    '/customer/usage': customerGet('Customer usage analytics'),
    '/customer/subscription': customerGet('Customer subscription'),
    '/customer/invoices': customerGet('Customer invoices'),
    '/customer/subscription/upgrade': {
      post: {
        tags: ['Customer'],
        summary: 'Upgrade customer subscription',
        security: [{ BearerAuth: [] }],
        requestBody: jsonBody('#/components/schemas/CustomerSubscriptionRequest'),
        responses: {
          201: { description: 'Subscription upgraded', content: { 'application/json': { schema: { type: 'object' } } } },
          400: responses.BadRequest,
          401: responses.Unauthorized,
          500: responses.ServerError
        }
      }
    },
    '/customer/subscription/cancel': {
      post: {
        tags: ['Customer'],
        summary: 'Cancel customer subscription',
        security: [{ BearerAuth: [] }],
        responses: {
          200: { description: 'Subscription cancelled', content: { 'application/json': { schema: { type: 'object' } } } },
          401: responses.Unauthorized,
          404: responses.NotFound,
          500: responses.ServerError
        }
      }
    },
    '/billing/webhooks/stripe': webhookPath('Stripe billing webhook'),
    '/billing/webhooks/midtrans': webhookPath('Midtrans billing webhook'),
    '/billing/subscription/activate': billingSubscriptionPath('Create or activate subscription'),
    '/billing/subscription/upgrade': billingSubscriptionPath('Upgrade subscription'),
    '/billing/subscription/downgrade': billingSubscriptionPath('Downgrade subscription'),
    '/billing/invoices': {
      get: {
        tags: ['Billing'],
        summary: 'List authenticated user invoices',
        security: [{ BearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Page' }, { $ref: '#/components/parameters/Limit' }],
        responses: securedResponses('#/components/schemas/PaginatedResponse')
      },
      post: {
        tags: ['Billing'],
        summary: 'Generate an invoice',
        security: [{ BearerAuth: [] }],
        requestBody: jsonBody('#/components/schemas/InvoiceRequest'),
        responses: {
          201: { description: 'Invoice generated', content: { 'application/json': { schema: { type: 'object' } } } },
          400: responses.BadRequest,
          401: responses.Unauthorized,
          500: responses.ServerError
        }
      }
    },
    '/billing/payments/verify': {
      post: {
        tags: ['Billing'],
        summary: 'Verify Stripe or Midtrans payment status',
        security: [{ BearerAuth: [] }],
        requestBody: jsonBody('#/components/schemas/PaymentVerifyRequest'),
        responses: {
          200: { description: 'Payment verification result', content: { 'application/json': { schema: { type: 'object' } } } },
          400: responses.BadRequest,
          401: responses.Unauthorized,
          403: responses.Forbidden,
          404: responses.NotFound,
          500: responses.ServerError
        }
      }
    },
    '/admin/analytics': adminGet('Admin usage, risk, and threat analytics', '#/components/schemas/AdminAnalyticsResponse'),
    '/admin/usage': adminList('Paginated API consumption records', [{ $ref: '#/components/parameters/Plan' }, { $ref: '#/components/parameters/Context' }, { $ref: '#/components/parameters/RiskLevel' }]),
    '/admin/threats': adminGet('Threat tag aggregation', '#/components/schemas/PaginatedResponse'),
    '/admin/users': adminList('Paginated user analytics'),
    '/admin/keys': adminList('Paginated API key analytics', [{ $ref: '#/components/parameters/Plan' }, { $ref: '#/components/parameters/KeyStatus' }]),
    '/admin/risk': adminGet('Admin risk distribution summary', '#/components/schemas/PaginatedResponse'),
    '/founder/revenue': founderGet('Founder revenue analytics'),
    '/founder/clients': founderGet('Founder client analytics'),
    '/founder/metrics': founderGet('Founder operating metrics'),
    '/api/v2/payment-intelligence': {
      post: {
        tags: ['Payment Intelligence v2'],
        summary: 'Score payment intelligence risk',
        security: [{ ApiKeyAuth: [] }],
        requestBody: jsonBody('#/components/schemas/PaymentIntelligenceRequest'),
        responses: securedResponses('#/components/schemas/PaymentIntelligenceResponse')
      }
    },
    '/api/v3/payment-decision': {
      post: {
        tags: ['Decision Engine v3'],
        summary: 'Return payment decision from risk and policy',
        security: [{ ApiKeyAuth: [] }],
        requestBody: jsonBody('#/components/schemas/PaymentDecisionRequest'),
        responses: securedResponses('#/components/schemas/PaymentDecisionResponse')
      }
    }
  }
}

function customerGet(summary) {
  return {
    get: {
      tags: ['Customer'],
      summary,
      security: [{ BearerAuth: [] }],
      responses: {
        200: { description: 'Successful response', content: { 'application/json': { schema: { type: 'object' } } } },
        401: responses.Unauthorized,
        500: responses.ServerError
      }
    }
  }
}

function webhookPath(summary) {
  return {
    post: {
      tags: ['Billing'],
      summary,
      description: 'Provider webhook endpoint. Stripe signature is passed in stripe-signature; Midtrans uses the JSON payload.',
      requestBody: {
        required: false,
        content: {
          'application/json': { schema: { type: 'object' } }
        }
      },
      responses: {
        200: jsonResponse('Webhook processed', '#/components/schemas/WebhookResponse'),
        500: responses.ServerError
      }
    }
  }
}

function billingSubscriptionPath(summary) {
  return {
    post: {
      tags: ['Billing'],
      summary,
      security: [{ BearerAuth: [] }],
      requestBody: jsonBody('#/components/schemas/BillingSubscriptionRequest'),
      responses: {
        201: { description: 'Subscription changed', content: { 'application/json': { schema: { type: 'object' } } } },
        400: responses.BadRequest,
        401: responses.Unauthorized,
        500: responses.ServerError
      }
    }
  }
}

function adminGet(summary, schemaRef) {
  return {
    get: {
      tags: ['Admin'],
      summary,
      security: [{ BearerAuth: [] }],
      parameters: [{ $ref: '#/components/parameters/From' }, { $ref: '#/components/parameters/To' }],
      responses: securedResponses(schemaRef)
    }
  }
}

function adminList(summary, extraParameters = []) {
  return {
    get: {
      tags: ['Admin'],
      summary,
      security: [{ BearerAuth: [] }],
      parameters: [
        { $ref: '#/components/parameters/Page' },
        { $ref: '#/components/parameters/Limit' },
        ...extraParameters
      ],
      responses: securedResponses('#/components/schemas/PaginatedResponse')
    }
  }
}

function founderGet(summary) {
  return {
    get: {
      tags: ['Founder'],
      summary,
      security: [{ BearerAuth: [] }],
      responses: securedResponses('#/components/schemas/FounderMetricsResponse')
    }
  }
}

function applyEnterpriseTags(spec) {
  const tagMap = {
    Platform: 'Monitoring',
    Auth: 'Authentication',
    'Risk API': 'Risk Scoring',
    Transactions: 'Risk Scoring',
    Dashboard: 'Admin',
    Customer: 'Monitoring',
    'Payment Intelligence v2': 'Risk Scoring',
    'Decision Engine v3': 'Risk Scoring'
  }

  for (const pathItem of Object.values(spec.paths)) {
    for (const method of ['get', 'post', 'put', 'patch', 'delete']) {
      if (!pathItem[method] || !Array.isArray(pathItem[method].tags)) continue

      pathItem[method].tags = pathItem[method].tags.map((tag) => tagMap[tag] || tag)
    }
  }
}

applyEnterpriseTags(openapiSpec)

module.exports = openapiSpec
