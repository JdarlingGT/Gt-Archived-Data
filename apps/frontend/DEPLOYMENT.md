# Vercel Deployment Guide for GT Relational Explorer

This guide will help you deploy the GT Relational Explorer to Vercel with serverless functions.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **PostgreSQL Database**: Set up a PostgreSQL database (recommended: Railway, PlanetScale, or AWS RDS)
3. **Node.js**: Version 18 or higher

## Step 1: Environment Variables

1. Copy `.env.example` to `.env.local` (for local development)
2. In Vercel dashboard, add these environment variables from your Supabase project:

```bash
DATABASE_URL="postgresql://postgres:[password]@db.cjutjtjnizxdkzcbdnqe.supabase.co:5432/postgres"
NODE_ENV="production"
CORS_ORIGIN="https://your-app-name.vercel.app"

# Supabase Configuration
VITE_SUPABASE_URL="https://cjutjtjnizxdkzcbdnqe.supabase.co"
VITE_SUPABASE_ANON_KEY="sb_publishable_USNcBRV1V1LQAQTPaacXDw_kLK5doJW"
SUPABASE_SERVICE_ROLE_KEY="sb_secret_C_0XXMe1iRjhGi7GUvNx6g_-1CEYEzJ"
SUPABASE_JWT_SECRET="your-jwt-secret-here"
```

**Note:** Get these values from your Supabase project dashboard under Settings > Environment Variables.

## Step 2: Database Setup

Run these commands locally to set up your database:

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Optional: Seed with sample data
npx prisma db seed
```

## Step 3: Deploy to Vercel

### Option A: Deploy via GitHub (Recommended)

1. Push your code to GitHub
2. Connect your GitHub repo to Vercel
3. Vercel will automatically detect the configuration from `vercel.json`
4. Add environment variables in Vercel dashboard
5. Deploy!

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in project directory
3. Follow the prompts
4. Add environment variables: `vercel env add`

## Step 4: Post-Deployment

1. **Database Migrations**: After first deployment, run:
   ```bash
   vercel env pull .env.local
   npx prisma db push
   ```

2. **Test API Endpoints**:
   - `https://your-app.vercel.app/api/users`
   - `https://your-app.vercel.app/api/events`
   - `https://your-app.vercel.app/api/dashboard/stats`

## Project Structure for Vercel

```
gt-relational-explorer/
├── api/                    # Serverless functions
│   ├── users/
│   │   ├── index.js       # GET /api/users, POST /api/users
│   │   └── [id].js        # GET/PUT/DELETE /api/users/[id]
│   ├── events/
│   ├── orders/
│   ├── licenses/
│   └── dashboard/
├── src/                   # React frontend
├── dist/                  # Build output
├── vercel.json           # Vercel configuration
├── vite.config.js        # Vite configuration
└── package.json
```

## API Routes

The following serverless functions are available:

- **Users**: `/api/users`, `/api/users/[id]`
- **Events**: `/api/events`, `/api/events/[id]`
- **Orders**: `/api/orders`, `/api/orders/[id]`
- **Licenses**: `/api/licenses`, `/api/licenses/[id]`
- **Dashboard**: `/api/dashboard/stats`
- **Audit Logs**: `/api/audit-logs`

## Common Issues & Solutions

### 1. Prisma Client Issues
If you see "Cannot find module '@prisma/client'":
```bash
npx prisma generate
```

### 2. Database Connection
Ensure your `DATABASE_URL` includes `?schema=public` for PostgreSQL.

### 3. CORS Issues
Make sure `CORS_ORIGIN` matches your Vercel app URL exactly.

### 4. Build Failures
Check that all dependencies are in `package.json` (not just devDependencies).

## Performance Optimization

1. **Cold Starts**: Serverless functions may have cold starts. Consider using Vercel Pro for faster cold starts.
2. **Database Connections**: Prisma handles connection pooling automatically.
3. **Caching**: Add appropriate cache headers to API responses for better performance.

## Monitoring

1. **Vercel Analytics**: Enable in project settings
2. **Function Logs**: Available in Vercel dashboard
3. **Error Tracking**: Consider adding Sentry or similar service

## Security

1. Use environment variables for all secrets
2. Implement proper authentication/authorization
3. Add rate limiting to API endpoints
4. Use HTTPS only (Vercel provides this by default)