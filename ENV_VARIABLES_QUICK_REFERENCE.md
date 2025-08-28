# Environment Variables Quick Reference

## 📋 Required Environment Variables

This project uses **Vite** as the frontend framework, so environment variables for client-side code must be prefixed with `VITE_`.

### Core Environment Variables (Required)

| Variable Name | Purpose | Scope | Notes |
|---------------|---------|-------|-------|
| `DATABASE_URL` | PostgreSQL connection string | Server-side | 🔒 Sensitive |
| `DIRECT_URL` | Direct PostgreSQL connection (for migrations) | Server-side | 🔒 Sensitive |
| `VITE_SUPABASE_URL` | Supabase project URL | Client-side | Public |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Client-side | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Server-side | 🔒 Sensitive |
| `SUPABASE_JWT_SECRET` | JWT secret for token verification | Server-side | 🔒 Sensitive |
| `CORS_ORIGIN` | Allowed CORS origins | Server-side | Production URL |
| `SESSION_SECRET` | Session encryption secret | Server-side | 🔒 Sensitive |

## 🔧 Setup Instructions

### For Local Development

1. Copy `apps/frontend/.env.example` to `apps/frontend/.env.local`
2. Fill in the required values:

```bash
# Database (get from Supabase project settings)
DATABASE_URL="postgresql://postgres:[your-password]@db.[project-ref].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[your-password]@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

# Supabase (get from Supabase project settings → API)
VITE_SUPABASE_URL="https://[project-ref].supabase.co"
VITE_SUPABASE_ANON_KEY="[your-anon-key]"
SUPABASE_SERVICE_ROLE_KEY="[your-service-role-key]"
SUPABASE_JWT_SECRET="[your-jwt-secret]"

# Application
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
SESSION_SECRET="[generate-a-random-string]"
```

### For Vercel Deployment

1. **Environment Variables vs Secrets**: 
   - Use Environment Variables in Vercel dashboard for most cases
   - Only use Secrets if you need to reference them with `@secret-name` in vercel.json
   - **We recommend using Environment Variables directly** to avoid missing secret errors

2. **Add via Vercel Dashboard**:
   - Go to Project → Settings → Environment Variables
   - Add each variable with appropriate scope (Preview, Production, or both)
   - Use the exact variable names from the table above

3. **Add via Vercel CLI** (alternative):
```bash
cd apps/frontend
vercel env add DATABASE_URL production
vercel env add VITE_SUPABASE_URL production
# ... add other variables as needed
```

4. **Important**: Set scope correctly
   - **Production**: For live deployments
   - **Preview**: For PR/branch deployments
   - **Development**: Usually not needed (use .env.local instead)

## ⚠️ Common Issues & Solutions

### Missing Secret Error
```
Environment Variable "DATABASE_URL" references Secret "database_url", which does not exist.
```

**Solution**: Don't use `@secret` references in vercel.json. Instead:
1. Add environment variables directly in Vercel dashboard
2. Use our minimal vercel.json without env references
3. Vercel will automatically provide env vars to your functions

### Case Sensitivity
- Always use UPPERCASE variable names as shown in the table above
- Avoid lowercase duplicates (e.g., don't use both `database_url` and `DATABASE_URL`)

### Scope Issues
- Ensure environment variables are scoped to both Preview and Production if you want them in PR deployments
- After adding/changing env vars, trigger a redeploy

## 🏥 Post-deploy Health Check

After deployment, verify your environment variables are correctly configured:

```bash
curl https://your-app.vercel.app/api/health
```

This endpoint returns the presence status of required environment variables without exposing their values:

```json
{
  "status": "ok",
  "timestamp": "2025-01-27T10:30:00.000Z",
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

## 🔒 Security Notes

- **🔴 NEVER COMMIT**: Sensitive variables should never be in source control
  - `DATABASE_URL`, `DIRECT_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_JWT_SECRET`
  - `SESSION_SECRET`

- **🟢 CLIENT-SAFE**: These are exposed to the browser (by design)
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## 📚 Additional Resources

- [Vercel Environment Variables Documentation](https://vercel.com/docs/projects/environment-variables)
- [Vite Environment Variables Documentation](https://vitejs.dev/guide/env-and-mode.html)
- [Supabase Environment Variables Guide](https://supabase.com/docs/guides/getting-started/local-development#environment-variables)

---
**Last Updated**: 2025-01-27
**Project**: GT Relational Explorer