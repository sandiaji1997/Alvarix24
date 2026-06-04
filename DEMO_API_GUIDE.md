# Alvarix SecureAI Demo API Key Guide

Alvarix SecureAI is a Global AI Risk & Threat Intelligence Platform. This guide helps a first customer test the Alvarix Risk API with a demo API key.

Production endpoint:

```text
https://alvarix24-production.up.railway.app
```

## Authentication

Alvarix Risk API requests use API key authentication.

Use the API key only from a trusted server-side environment. Do not expose the key in browser JavaScript, mobile apps, public repositories, screenshots, or support tickets.

## Headers

Send the API key in the `x-api-key` header.

```http
Content-Type: application/json
x-api-key: <ALVARIX_API_KEY>
```

For account-level actions, JWT bearer authentication may also be used:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Sample Request

```bash
curl -X POST https://alvarix24-production.up.railway.app/api/risk-score \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ALVARIX_API_KEY" \
  -d '{
    "user_id": "usr_demo_001",
    "context": "transaction",
    "amount": 125.50,
    "location": "ID",
    "expectedLocation": "ID",
    "device": "android",
    "velocity24h": 3,
    "vpnDetected": false,
    "proxyDetected": false
  }'
```

## Sample Response

```json
{
  "success": true,
  "requestId": "risk_01J8Y7Q4P9K2",
  "context": "transaction",
  "riskScore": 27,
  "riskLevel": "LOW",
  "confidence": 0.94,
  "threatTags": ["trusted_device", "normal_velocity"],
  "reasons": ["Known device", "Expected location", "Normal request velocity"],
  "decision": "APPROVE",
  "remainingCredits": 9842
}
```

## Error Example

```json
{
  "success": false,
  "error": "Invalid or missing API key",
  "requestId": "req_01J8Y7R2Z"
}
```

## Demo Testing Checklist

- Store the demo key in an environment variable.
- Send at least one low-risk transaction.
- Send one higher-risk transaction with `vpnDetected`, `proxyDetected`, or unusual `location`.
- Log the response fields `riskScore`, `riskLevel`, `decision`, `threatTags`, and `requestId`.
- Share only request IDs with support, never the raw API key.
