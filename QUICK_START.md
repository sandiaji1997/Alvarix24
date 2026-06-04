# Alvarix SecureAI Quick Start

Use this guide to make your first Alvarix Risk API request.

## 1. Create API Key

After account setup, generate or request an API key for your workspace.

Store it as an environment variable:

```bash
export ALVARIX_API_KEY="your_api_key_here"
```

On Windows PowerShell:

```powershell
$env:ALVARIX_API_KEY="your_api_key_here"
```

## 2. Send First Request

```bash
curl -X POST https://alvarix24-production.up.railway.app/api/risk-score \
  -H "Content-Type: application/json" \
  -H "x-api-key: $ALVARIX_API_KEY" \
  -d '{
    "user_id": "usr_123",
    "context": "transaction",
    "amount": 199.99,
    "location": "SG",
    "expectedLocation": "SG",
    "device": "ios",
    "velocity24h": 2
  }'
```

## 3. Understand Risk Score

The `riskScore` is a numeric signal that helps rank the likelihood of suspicious activity.

Typical interpretation:

| Score | Level | Meaning |
| --- | --- | --- |
| 0-39 | LOW | Normal or trusted activity |
| 40-69 | MEDIUM | Needs monitoring or additional context |
| 70-89 | HIGH | Should be reviewed or challenged |
| 90-100 | CRITICAL | Strong block or escalation candidate |

The response may also include:

- `riskLevel`: readable score band
- `confidence`: model confidence for the assessment
- `reasons`: explainable risk factors
- `threatTags`: classified signals such as velocity, VPN, proxy, or anomaly indicators

## 4. Understand Decisions

Alvarix can return decision guidance:

| Decision | Recommended Action |
| --- | --- |
| APPROVE | Continue the user journey |
| REVIEW | Add step-up verification or manual review |
| BLOCK | Stop the action or escalate internally |

Treat decisions as risk intelligence inputs. Your business rules, compliance obligations, and customer experience policies should determine the final action.
