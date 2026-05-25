# QCC Nexus Backend

## Local setup

1. Copy `.env.example` to `.env`.
2. Fill `MONGO_URI` in `.env` with the MongoDB Atlas database user credential.
3. Run:

```powershell
.\.tools\node\npm.cmd install
.\.tools\node\npm.cmd start
```

## Secrets

Keep real credentials only in `.env`. Do not paste MongoDB usernames, passwords, or full connection strings into frontend files, screenshots, commits, chat logs, or documentation.
