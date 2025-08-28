# Environment Variables Quick Reference

## 🔑 Vercel Secrets (All Encrypted)

| Variable Name | Vercel Secret | Value | Environment |
|---------------|---------------|-------|-------------|
| `database_url` | `@database_url` | `postgresql://postgres:hAxDkIcKqJccj7ep@db.cjutjtjnizxdkzcbdnqe.supabase.co:5432/postgres` | Production |
| `direct_url` | `@direct_url` | `postgresql://postgres:hAxDkIcKqJccj7ep@aws-1-us-east-2.pooler.supabase.com:5432/postgres` | Production |
| `supabase_url` | `@supabase_url` | `https://cjutjtjnizxdkzcbdnqe.supabase.co` | Production |
| `supabase_anon_key` | `@supabase_anon_key` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production |
| `supabase_service_role_key` | `@supabase_service_role_key` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production 🔒 |
| `supabase_jwt_secret` | `@supabase_jwt_secret` | `11OBnu0QS9ItLQ11iQSxgHXSqYBAp775...` | Production 🔒 |
| `cors_origin` | `@cors_origin` | `https://frontend-jds-projects-2a86e64e.vercel.app` | Production |
| `session_secret` | `@session_secret` | `prj_lkwdQHv8yfCKjM2JnPLu3ErbS8O0` | Production 🔒 |
| `next_public_supabase_url` | `@next_public_supabase_url` | `https://cjutjtjnizxdkzcbdnqe.supabase.co` | Production |
| `next_public_supabase_anon_key` | `@next_public_supabase_anon_key` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production |

## 📋 Environment Variable Mapping

### For Vercel Deployment (vercel.json):
```json
{
  "env": {
    "DATABASE_URL": "@database_url",
    "DIRECT_URL": "@direct_url",
    "NODE_ENV": "production",
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase_service_role_key",
    "SUPABASE_JWT_SECRET": "@supabase_jwt_secret",
    "CORS_ORIGIN": "@cors_origin",
    "SESSION_SECRET": "@session_secret",
    "NEXT_PUBLIC_SUPABASE_URL": "@next_public_supabase_url",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY": "@next_public_supabase_anon_key"
  }
}
```

### For Local Development (.env):
```bash
# Database
DATABASE_URL="postgresql://postgres:hAxDkIcKqJccj7ep@db.cjutjtjnizxdkzcbdnqe.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:hAxDkIcKqJccj7ep@aws-1-us-east-2.pooler.supabase.com:5432/postgres"

# Supabase
VITE_SUPABASE_URL="https://cjutjtjnizxdkzcbdnqe.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdXRqdGpuaXp4ZGt6Y2JkbnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMjIwODYsImV4cCI6MjA3MTg5ODA4Nn0.0n2MUMNEjIHUX4Y3okzABZX9-KOfUJ4oYFy7Bhjl5EM"
SUPABASE_SERVICE_ROLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdXRqdGpuaXp4ZGt6Y2JkbnFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjMyMjA4NiwiZXhwIjoyMDcxODk4MDg2fQ.D9AOKZ6RtGLCCrKk0jVSUpdqW0jh-DpCCqgTg2C2TvM"
SUPABASE_JWT_SECRET="11OBnu0QS9ItLQ11iQSxgHXSqYBAp775vaMj95b+Vkokgh2eDh90odAi11zgIF85Za0V1Sa0MHKd/9fmzltiAA=="

# Application
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
SESSION_SECRET="prj_lkwdQHv8yfCKjM2JnPLu3ErbS8O0"

# Next.js Public (if using Next.js)
NEXT_PUBLIC_SUPABASE_URL="https://cjutjtjnizxdkzcbdnqe.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqdXRqdGpuaXp4ZGt6Y2JkbnFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMjIwODYsImV4cCI6MjA3MTg5ODA4Nn0.0n2MUMNEjIHUX4Y3okzABZX9-KOfUJ4oYFy7Bhjl5EM"
```

## 🔒 Security Notes

- **🔴 SENSITIVE**: Never commit these to repository:
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `SUPABASE_JWT_SECRET`
  - `SESSION_SECRET`

- **🟢 PUBLIC**: Safe for client-side code:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## 🚀 Quick Setup Commands

### Add to Vercel (if needed):
```bash
cd apps/frontend
vercel env add database_url production
vercel env add supabase_url production
# ... add other variables as needed
```

### View Current Vercel Environment Variables:
```bash
cd apps/frontend
vercel env ls
```

## 📞 Support

If you need to update any of these values:
1. Update the Vercel secret using the CLI
2. Or update directly in the Vercel dashboard
3. Redeploy your application

---
**Last Updated**: 2025-08-28
**Project**: GT Relational Explorer
**Environment**: Production (Supabase)