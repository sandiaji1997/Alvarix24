# Alvarix SecureAI Customer Onboarding

This guide helps a first external customer move from signup to production usage.

## Onboarding Flow

```text
Sign Up -> Get API Key -> Test Endpoint -> Upgrade Plan -> Production Usage
```

## 1. Sign Up

Start by requesting API access through the Alvarix SecureAI website:

```text
https://alvarix24-production.up.railway.app/contact
```

Customer information to prepare:

- Company name
- Technical contact email
- Expected monthly request volume
- Primary use case: payments, account security, API abuse, fraud prevention, or merchant risk
- Target environment: sandbox, staging, or production

## 2. Get API Key

After onboarding, store the API key securely.

Recommended storage:

- Server environment variable
- Secret manager
- CI/CD secret store

Do not store keys in:

- Frontend code
- Mobile apps
- Git repositories
- Shared documents

## 3. Test Endpoint

Send a first request to:

```text
POST /api/risk-score
```

Start with low-risk test data, then try higher-risk signals such as:

- Unusual location
- High `velocity24h`
- `vpnDetected: true`
- `proxyDetected: true`
- `failedAttempts` greater than normal

## 4. Upgrade Plan

Move from Free to a paid plan when request volume or customer workflows become recurring.

Current public plans:

- Free: 1,000 requests/month
- Basic: 10,000 requests/month
- Pro: 50,000 requests/month
- Enterprise: custom request volume

## 5. Production Usage

Before going live:

- Use a production API key.
- Log `requestId` for support and incident review.
- Monitor `riskScore`, `riskLevel`, `decision`, and `threatTags`.
- Decide how your app handles `APPROVE`, `REVIEW`, and `BLOCK`.
- Add fallback behavior for API errors or rate limits.
- Rotate keys on a regular security schedule.

## Customer Success Checklist

- API key created and stored securely
- First request completed
- Decision handling mapped to business workflow
- Request IDs included in logs
- Usage owner assigned
- Upgrade path confirmed
