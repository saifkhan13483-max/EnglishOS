# Uptime Monitoring

## Health Endpoint

EnglishOS exposes a `/health` endpoint that checks both process liveliness and database connectivity:

```
GET /health
```

**Response (healthy):**
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-04-06T10:00:00.000Z"
}
```

**Response (degraded):**
```json
{
  "status": "ok",
  "database": "error",
  "timestamp": "2026-04-06T10:00:00.000Z"
}
```

## UptimeRobot Setup (Free Tier)

1. Create a free account at [uptimerobot.com](https://uptimerobot.com).
2. Click **Add New Monitor**.
3. Configure:
   - **Monitor Type:** HTTP(s)
   - **Friendly Name:** EnglishOS API
   - **URL:** `https://your-app.replit.app/health`
   - **Monitoring Interval:** 5 minutes
4. Under **Alert Contacts**, add your email address.
5. Under **Advanced Settings > Keyword Monitoring**, set:
   - **Keyword:** `"status":"ok"`
   - **Alert When:** Keyword Not Exists
6. Save the monitor.

This will send email alerts within 5 minutes of any downtime.

## Manual Health Check

Ping the endpoint manually:

```bash
curl https://your-app.replit.app/health
```

## Database Monitoring

If `database: "error"` appears in the health response, run:

```bash
pnpm --filter server exec prisma db pull
```

And check the server logs for `[DB Connection Error]` entries from pino.

## Log-Based Alerting

All server errors are logged via pino with structured JSON fields. Key log patterns to monitor:

| Pattern                      | Severity | Action Required                 |
|------------------------------|----------|---------------------------------|
| `[process] Unhandled promise` | CRITICAL | Restart server; check DB        |
| `[process] Uncaught exception`| CRITICAL | Restart server; review stack    |
| `[DB Connection Error]`       | HIGH     | Check DATABASE_URL; verify pool |
| `[OpenAI Error]`              | MEDIUM   | Check OPENAI_API_KEY; retry     |
| `[scheduler] Failed to send` | LOW      | Check RESEND_API_KEY            |

## Replit-Specific Notes

- The app runs in production mode via `pnpm build && node server/dist/server.js`.
- If the Replit container restarts, the workflow auto-restarts the server.
- `prisma migrate deploy` runs automatically on every server start.
- Downtime during cold starts (container spin-up) is typically under 30 seconds.
