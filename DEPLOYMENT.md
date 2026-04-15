# Rent Lessly - Production Deployment Guide

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Browser                           │
└─────────────────────────┬───────────────────────────────────────┘
                          │ HTTP/HTTPS
          ┌───────────────┴───────────────┐
          │                               │
    ┌─────▼────────┐          ┌──────────▼──────────┐
    │ Cloudflare   │          │   Railway Backend   │
    │ Pages (CDN)  │          │  (Node.js Express)  │
    │              │          │                     │
    │ Next.js App  │◄────────►│  /api/* routes      │
    │ (OpenNext)   │ REST     │                     │
    └──────────────┘          └─┬────────────────┬──┘
                                 │                │
                          ┌──────▼─┐          ┌──▼──────────┐
                          │PostgreSQL        │ Cloudflare R2│
                          │Database          │ (File Storage)
                          └──────────────────┴──────────────┘
```

## Frontend Deployment (Cloudflare Pages + OpenNext)

### What is OpenNext?
OpenNext is a builder for Next.js that enables deployment on non-Vercel platforms by converting the App Router to a standard Node.js/Express-compatible format.

### Deployment Steps:

1. **Build with OpenNext**
   ```bash
   # Install OpenNext globally
   npm i -g open-next

   # Build project
   cd apps/web
   pnpm run build
   open-next build

   # Output: .open-next/ folder
   ```

2. **Deploy to Cloudflare Pages**
   ```bash
   # Connect your Git repo to Cloudflare Pages
   # In Cloudflare Dashboard:
   # - New Projects > Connect Git
   # - Select repository
   # - Framework: None (custom)
   # - Build command: open-next build
   # - Build output directory: .open-next/
   # - Set environment variables (NEXT_PUBLIC_API_URL, etc.)
   ```

3. **Environment Variables in Cloudflare**
   - `NEXT_PUBLIC_API_URL`: https://api.rentlessly.app
   - `NEXT_PUBLIC_APP_URL`: https://rentlessly.app

### Optimization Tips:
- Enable Caching: Cloudflare Pages caches static assets by default
- Custom Domain: Point your domain DNS to Cloudflare
- Minification: Enabled by default
- Auto HTTPS: Automatic SSL certificate

---

## Backend Deployment (Railway)

### Deployment Steps:

1. **Create Railway Account & Project**
   - Go to railway.app
   - Create new project
   - Select "Deploy from GitHub"

2. **Connect Repository**
   ```bash
   # Railway will auto-detect pnpm workspace
   # Configure build and runtime settings
   ```

3. **Railway Configuration (railway.json)**
   ```json
   {
     "build": {
       "builder": "nixpacks",
       "buildCommand": "pnpm run build",
       "watchPatterns": ["apps/api/**/*"]
     },
     "deploy": {
       "restartPolicyType": "on_failure",
       "restartPolicyMaxRetries": 5,
       "numReplicas": 1,
       "startCommand": "node dist/index.js"
     }
   }
   ```

4. **Set Environment Variables**
   - Go to Railway project settings
   - Add environment variables:
     ```
     DATABASE_URL=postgresql://...
     FRONTEND_URL=https://rentlessly.app
     ACCESS_TOKEN_SECRET=generate_strong_secret
     REFRESH_TOKEN_SECRET=generate_strong_secret
     TWILIO_ACCOUNT_SID=...
     TWILIO_AUTH_TOKEN=...
     R2_ACCESS_KEY_ID=...
     R2_SECRET_ACCESS_KEY=...
     ```

5. **PostgreSQL Database**
   - Add PostgreSQL service in Railway
   - Railway auto-generates DATABASE_URL
   - Run migrations:
     ```bash
     pnpm run prisma:migrate
     ```

### Health Checks
Railway automatically creates health checks. Ensure `/health` endpoint works.

---

## Database Migrations in Production

```bash
# After deployment:
railway shell

# Generate Prisma client
pnpm run prisma:generate

# Run pending migrations
pnpm run prisma:migrate

# View database
pnpm run prisma:studio
```

---

## Cloudflare R2 Configuration

1. Create R2 bucket in Cloudflare
2. Generate API token
3. Get endpoint: `https://xxxxx.r2.cloudflarestorage.com`
4. Add to environment variables in both Railway and Cloudflare Pages

---

## Monitoring & Logs

### Railway Logs
```bash
# View live logs
railway logs --tail

# Export logs
railway logs > logs.txt
```

### Cloudflare Pages Analytics
- View in Cloudflare Dashboard
- Monitor traffic, errors, performance

### Error Tracking
- Set up Sentry for error monitoring
- Configure in both frontend and backend

---

## Scaling Strategy

### Current Setup (Single Instance)
- 1 Railway Dyno for API
- 1 PostgreSQL database on Railway
- CDN: Cloudflare Pages

### Scale to Multiple Instances
```bash
# In Railway dashboard:
# 1. Set numReplicas: 3
# 2. Configure load balancer (Railway handles this)
# 3. Setup connection pooling in Prisma
```

### Database Connection Pooling
```
# prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  
  # Add for pooling
  schemas  = ["public"]
}

# Use PgBouncer or Prisma Client with connection pooling:
DATABASE_URL="postgresql://user:pass@host/db?schema=public&pgbouncer=true"
```

---

## Security Checklist

- [ ] Enable 2FA on all service accounts
- [ ] Rotate API keys regularly
- [ ] Use strong JWT secrets (min 32 chars)
- [ ] Enable HTTPS everywhere
- [ ] Set CORS properly (only your domain)
- [ ] Rate limiting enabled on API
- [ ] Database backups automated
- [ ] Environment variables never in git
- [ ] Helmet.js enabled for security headers
- [ ] OWASP compliance check

---

## Performance Optimization

### Frontend
- Image optimization: Cloudflare auto-compresses WebP
- Code splitting: Next.js App Router does this
- Caching: Set-Cookie headers, localStorage for auth
- CDN: Cloudflare Pages CDN global distribution

### Backend
- Database query optimization: Index frequently searched fields
- Caching: Redis (optional for session/OTP storage)
- API response compression: gzip enabled
- Connection pooling: PgBouncer for PostgreSQL
- Rate limiting: Express rate-limit middleware

### Monitoring
- Setup uptime monitoring: Pingdom, UptimeRobot
- Error tracking: Sentry
- Performance monitoring: New Relic, DataDog

---

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm run lint
      - run: pnpm run build
```

Railway auto-deploys on push to main (if connected to GitHub).

---

## Troubleshooting

### Port Already in Use
```bash
lsof -i :5000
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check DATABASE_URL
echo $DATABASE_URL

# Test connection
psql $DATABASE_URL -c "SELECT 1;"
```

### Build Failures
```bash
# Clear .turbo cache
pnpm clean
rm -rf .turbo

# Rebuild
pnpm install
pnpm run build
```

### Cold Start Issues
- Railway deployments may take 30-60s initially
- Configure background jobs properly to avoid timeouts
---

## Cost Estimation

| Service | Free Tier | Production |
|---------|-----------|-----------|
| Cloudflare Pages | Unlimited | $20/mo or usage-based |
| Railway | Free tier exists | $10-50/mo per app |
| Railway DB | Included | Included |
| Cloudflare R2 | 10GB free | $0.35/GB stored |
| Twilio SMS | $0.0075 per SMS | Pay as you go |

---

## Disaster Recovery

1. **Database Backups**: Railway auto-backups (keep 7 days)
2. **Code Backups**: GitHub is your backup
3. **File Backups**: R2 has versioning enabled
4. **Recovery Plan**:
   - Restore DB from Railway backup
   - Redeploy from latest GitHub commit
   - Clear Cloudflare cache
