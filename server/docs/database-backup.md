# EnglishOS — Database Backup Process

**v1.0 — Manual Process**
Automation is planned for v1.1 via a scheduled cron job.

---

## Overview

Replit provisions a PostgreSQL database accessible via the `DATABASE_URL` secret.
All connection details (host, port, user, password, database name) are available as
individual secrets: `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`.

---

## Manual Backup (pg_dump)

Run this command from your local machine or any environment with `pg_dump` installed
and access to the Replit database credentials.

```bash
pg_dump \
  --host=$PGHOST \
  --port=$PGPORT \
  --username=$PGUSER \
  --dbname=$PGDATABASE \
  --no-password \
  --format=custom \
  --file="englishos_backup_$(date +%Y%m%d_%H%M%S).dump"
```

Set `PGPASSWORD` in the environment before running:

```bash
export PGPASSWORD="<value from Replit secrets>"
```

### Restore from a backup

```bash
pg_restore \
  --host=$PGHOST \
  --port=$PGPORT \
  --username=$PGUSER \
  --dbname=$PGDATABASE \
  --no-password \
  --clean \
  englishos_backup_YYYYMMDD_HHMMSS.dump
```

---

## What to Back Up and When

| Data | Frequency | Priority |
|---|---|---|
| `Learner` records | Daily | Critical |
| `SRQueueItem` (SR state per learner) | Daily | Critical |
| `MissionSession` + `FeynmanResponse` | Daily | High |
| `ContentItem` (curriculum) | On schema change only | Medium — re-seedable |
| `LeaderboardEntry` + `Upvote` | Weekly | Medium |
| `Badge` | Weekly | Low |

---

## Recommended Schedule (v1.0 — Manual)

1. Export a full dump before every deployment.
2. Export a daily dump of learner data during active beta period.
3. Store dumps in a secure location (encrypted cloud storage, not in this repo).

---

## v1.1 Automation Plan

- Add a `schedulerService` cron job that runs `pg_dump` nightly at 3:00 AM PKT.
- Upload the dump to an S3-compatible bucket (or Replit Object Storage when available).
- Retain the last 30 daily snapshots; purge older ones automatically.
- Send a Resend email alert if the backup cron fails.

---

## Re-seeding Curriculum Content

If `ContentItem` records are lost, re-run the seed script:

```bash
pnpm --filter server prisma db seed
```

This is safe to run multiple times — it deletes Level 1 content and re-inserts it
cleanly. It does not touch any learner data.
