# Vercel Deployment Guide for GT Relational Explorer

This guide will help you deploy the GT Relational Explorer to Vercel with serverless functions.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Supabase Project**: Set up a Supabase project with PostgreSQL database
3. **Node.js**: Version 18 or higher

## Step 1: Environment Variables

### Required Environment Variables

The frontend uses **Vite**, so client-side environment variables must be prefixed with `VITE_`. 

| Variable | Purpose | Required For |
|----------|---------|--------------|
| `DATABASE_URL` | PostgreSQL connection | API routes (Prisma) |
| `DIRECT_URL` | Direct PostgreSQL connection | Migrations |
| `VITE_SUPABASE_URL` | Supabase project URL | Frontend |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Frontend |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase operations | API routes |
| `SUPABASE_JWT_SECRET` | JWT verification | API routes |
| `CORS_ORIGIN` | CORS configuration | API routes |
| `SESSION_SECRET` | Session encryption | API routes |

### Setup in Vercel

1. **Via Vercel Dashboard** (Recommended):
   - Go to Project → Settings → Environment Variables
   - Add each variable with scope set to **both Preview and Production**
   - Get values from your Supabase project dashboard (Settings → API)

2. **Via CLI** (Alternative):
   ```bash
   cd apps/frontend
   vercel env add DATABASE_URL
   vercel env add VITE_SUPABASE_URL
   # ... add each variable
   ```

### Example Values

```bash
# Database (from Supabase Settings → Database)
DATABASE_URL="postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

# Supabase (from Supabase Settings → API)
VITE_SUPABASE_URL="https://[project-ref].supabase.co"
VITE_SUPABASE_ANON_KEY="[your-anon-key]"
SUPABASE_SERVICE_ROLE_KEY="[your-service-role-key]"
SUPABASE_JWT_SECRET="[your-jwt-secret]"

# Application
CORS_ORIGIN="https://your-app-name.vercel.app"
SESSION_SECRET="[generate-random-string]"
```

**Important**: 
- Use your actual Vercel app URL for `CORS_ORIGIN`
- Generate a random string for `SESSION_SECRET`
- Ensure scope is set correctly (Preview + Production)

## Step 2: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect the configuration from `vercel.json`
4. Add environment variables in Vercel dashboard (Step 1)
5. Deploy!

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `apps/frontend` directory
3. Follow the prompts
4. Add environment variables via dashboard or CLI

## Step 3: Post-Deployment Verification

### 1. Health Check

After deployment, verify your environment variables:

```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "envPresent": {
    "DATABASE_URL": true,
    "VITE_SUPABASE_URL": true,
    "VITE_SUPABASE_ANON_KEY": true,
    "CORS_ORIGIN": true,
    "SESSION_SECRET": true,
    "SUPABASE_JWT_SECRET": true,
    "DIRECT_URL": true
  },
  "summary": {
    "present": 7,
    "total": 7,
    "allPresent": true
  }
}
```

If any variables show `false`, add them in Vercel dashboard and redeploy.

### 2. Test API Endpoints

- `https://your-app.vercel.app/api/health` (environment check)
- `https://your-app.vercel.app/api/users` (if database is configured)
- `https://your-app.vercel.app/api/events`

### 3. Database Setup (if needed)

For initial database setup:
```bash
# Pull environment variables locally
vercel env pull .env.local

# Generate Prisma client and push schema
npx prisma generate
npx prisma db push

# Optional: Seed with sample data
npx prisma db seed
```

## Project Structure

```
apps/frontend/
├── api/                    # Serverless functions
│   ├── health/            # Environment health check
│   ├── users/             # User CRUD operations
│   ├── events/            # Event management
│   ├── orders/            # Order processing
│   ├── licenses/          # License management
│   └── dashboard/         # Analytics endpoints
├── src/                   # React frontend (Vite)
├── dist/                  # Build output
├── vercel.json           # Vercel configuration
├── vite.config.js        # Vite configuration
└── package.json
```

## Common Issues & Solutions

### 1. Missing Secret Error
```
Environment Variable "DATABASE_URL" references Secret "database_url", which does not exist.
```

**Solution**: Use Environment Variables (not Secrets) in Vercel dashboard. Our `vercel.json` is configured to avoid this issue.

### 2. Environment Variable Scope
Variables not available in Preview deployments.

**Solution**: Set scope to both "Preview" and "Production" when adding variables.

### 3. CORS Issues
Frontend can't connect to API routes.

**Solution**: Ensure `CORS_ORIGIN` exactly matches your Vercel app URL.

### 4. Prisma Client Issues
```
Cannot find module '@prisma/client'
```

**Solution**: Ensure Prisma generates correctly during build:
```bash
npx prisma generate
```

### 5. Build Failures
Build fails with dependency errors.

**Solution**: Ensure all dependencies are in `dependencies` (not `devDependencies`) in `package.json`.

## Performance Optimization

1. **Cold Starts**: Serverless functions may have cold starts. Consider Vercel Pro for faster performance.
2. **Database Connections**: Prisma handles connection pooling automatically.
3. **Caching**: Add appropriate cache headers to API responses.

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Function Logs**: Available in Vercel dashboard under Functions tab
3. **Health Monitoring**: Bookmark your `/api/health` endpoint for quick checks

## Security

1. **Environment Variables**: All secrets are stored securely in Vercel
2. **HTTPS**: Automatic with Vercel
3. **CORS**: Configured per environment
4. **Client vs Server**: Only `VITE_*` variables are exposed to the browser

---

**Need Help?** Check the `/api/health` endpoint first to verify your environment configuration, then review the Vercel Function Logs for detailed error information.