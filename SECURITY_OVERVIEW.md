# Alvarix SecureAI Security Overview

Alvarix SecureAI is designed as an API-first risk and threat intelligence platform for modern applications, payment flows, and account security workflows.

## API Key Authentication

Risk API calls are authenticated with the `x-api-key` header.

```http
x-api-key: <ALVARIX_API_KEY>
```

Security practices:

- Keep API keys server-side.
- Use different keys for different environments.
- Rotate keys regularly.
- Revoke unused or exposed keys.
- Never send API keys to browsers or mobile clients.

## Rate Limiting

Alvarix applies rate and quota controls to protect platform reliability and enforce plan usage.

Rate limiting can protect against:

- Accidental integration loops
- Credential abuse
- Excessive request spikes
- Plan overuse
- API abuse attempts

If a request is rate limited, clients should retry after the reset window and avoid immediate retry loops.

## Risk Scoring

The Risk API evaluates submitted context and returns risk intelligence fields such as:

- `riskScore`
- `riskLevel`
- `confidence`
- `reasons`
- `decision`
- `remainingCredits`

Risk scoring can use signals such as:

- Amount
- Location
- Device
- Request velocity
- Failed attempts
- VPN, proxy, or TOR detection
- Blacklist or chargeback indicators
- Behavioral anomalies

## Threat Classification

Threat classification turns raw signals into readable tags that help security and operations teams understand why an event may be suspicious.

Example threat tags:

- `vpn_detected`
- `proxy_detected`
- `high_velocity`
- `impossible_travel`
- `session_anomaly`
- `chargeback_history`

## Recommended Customer Controls

- Log every request ID.
- Keep final business actions under your application control.
- Use `REVIEW` for step-up verification or manual review.
- Use `BLOCK` only when your policy allows it.
- Build fallback behavior for network errors.
- Monitor request volume and remaining credits.

## Contact

Security and onboarding questions:

```text
sandiajimf@gmail.com
```
