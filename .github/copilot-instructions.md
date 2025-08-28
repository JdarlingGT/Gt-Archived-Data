# GT Explorer - GitHub Copilot Instructions

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Project Overview

GT Explorer is a unified admin dashboard for Graston Technique data management built as a monorepo with npm workspaces. It consists of a React + Vite frontend, FastAPI backend, and Python dashboard tools for data processing.

## Working Effectively

### Prerequisites
- Node.js v16 or higher (currently supports up to v20.19.4)
- Python v3.8 or higher (currently supports v3.12.3)
- PostgreSQL database (configured via Supabase)

### Bootstrap and Installation Commands

1. **Install all dependencies**:
   ```bash
   npm install --ignore-scripts
   ```
   - Takes ~30 seconds normally
   - **Note**: Prisma client generation requires network access to binaries.prisma.sh
   - **WORKAROUND**: If Prisma fails due to network restrictions, use `--ignore-scripts` flag
   - **NEVER CANCEL**: Set timeout to 180+ seconds for full installation

2. **Install Python backend dependencies**:
   ```bash
   cd apps/backend
   pip install -r requirements.txt
   ```
   - Takes ~60 seconds normally
   - **Note**: May fail due to network timeouts for pandas/numpy compilation
   - **WORKAROUND**: Install minimal dependencies: `pip install fastapi uvicorn`

### Build Commands

3. **Build frontend**:
   ```bash
   npm run build
   ```
   - **CRITICAL**: Requires `prisma generate` to run first
   - Takes ~30 seconds normally
   - **NEVER CANCEL**: Set timeout to 180+ seconds
   - **Note**: Will fail if Prisma client generation fails

4. **Alternative build without Prisma** (if network restricted):
   ```bash
   cd apps/frontend && npx vite build --mode development
   ```
   - **Note**: This bypasses Prisma generation but may cause runtime errors

### Development Servers

5. **Start frontend development server**:
   ```bash
   npm run dev
   ```
   - Runs on http://localhost:5173
   - Proxy configured for API calls to port 3001

6. **Start backend development server**:
   ```bash
   npm run dev:backend
   ```
   - Runs on http://localhost:3001 (or port specified in .env)
   - **Note**: Requires Python dependencies to be installed

7. **Start both servers** (Windows):
   ```bash
   # Use batch scripts
   ./scripts/start_frontend.bat
   ./scripts/start_backend.bat
   ```

### Database Operations

8. **Generate Prisma client**:
   ```bash
   npm run db:generate
   ```
   - **CRITICAL**: Required before building frontend
   - **NEVER CANCEL**: May take 60+ seconds on first run

9. **Push database schema**:
   ```bash
   npm run db:push
   ```
   - **Note**: Requires valid DATABASE_URL in .env

10. **Open Prisma Studio**:
    ```bash
    npm run db:studio
    ```
    - Opens database browser on http://localhost:5555

### Linting and Quality Checks

11. **Run ESLint**:
    ```bash
    npm run lint
    ```
    - Takes ~10 seconds
    - **Known Issues**: Currently has 31 linting errors (documented)
    - **Critical for CI**: Must pass before deployment

12. **Common linting errors to fix**:
    - `no-case-declarations`: Add braces around case blocks
    - `no-unused-vars`: Remove unused imports/variables
    - `no-undef`: Add proper Node.js globals configuration

## Testing and Validation

### Manual Testing Scripts (Windows)

13. **Test entire application**:
    ```bash
    ./scripts/test_application.bat
    ```
    - Tests API endpoints and frontend pages
    - **Note**: Requires both servers running

14. **Test API endpoints**:
    ```bash
    ./scripts/test_api.bat
    ```
    - Tests backend API responses
    - **Note**: Requires backend server running on port 5000

15. **Test Supabase connection**:
    ```bash
    cd apps/frontend && node test-supabase-connection.js
    ```
    - **Note**: Requires @supabase/supabase-js dependency

### Validation Scenarios

16. **MANDATORY: Always test after changes**:
    - **Frontend**: Navigate to http://localhost:5173 and verify UI loads
    - **Backend**: Test API endpoint: `curl http://localhost:3001/api/status`
    - **Database**: Verify Prisma schema sync: `npm run db:generate`
    - **Linting**: Run `npm run lint` and fix critical errors

17. **End-to-End Testing Scenarios**:
    - **User Management**: Access users page, verify data loads from Supabase
    - **Event Management**: Navigate to events, test CRUD operations
    - **Dashboard Stats**: Check dashboard API endpoints respond correctly

## Critical Configuration Files

### Environment Variables
18. **Frontend (.env.local)**:
    ```
    DATABASE_URL="postgresql://postgres:[password]@db.cjutjtjnizxdkzcbdnqe.supabase.co:5432/postgres"
    VITE_SUPABASE_URL="https://cjutjtjnizxdkzcbdnqe.supabase.co"
    VITE_SUPABASE_ANON_KEY="[anon-key]"
    PORT=3001
    ```

19. **Known Working Supabase Configuration**:
    - URL: `https://cjutjtjnizxdkzcbdnqe.supabase.co`
    - Uses Prisma ORM for database operations
    - Real-time subscriptions configured

### Build Configuration
20. **Vite Configuration** (`apps/frontend/vite.config.js`):
    - Proxy: `/api` routes to `http://localhost:3001`
    - Build output: `dist/`
    - Dev server: port 5173

21. **Prisma Configuration** (`apps/frontend/prisma/schema.prisma`):
    - Provider: PostgreSQL
    - Client output: `../src/generated/prisma`
    - Models: User, Event, Order, License, Shipment, EventRegistration

## Deployment

### Vercel Deployment
22. **Deploy to Vercel**:
    - **Option A**: Connect GitHub repo to Vercel dashboard
    - **Option B**: Use Vercel CLI: `vercel` (requires `npm i -g vercel`)
    - **Critical**: Configure environment variables in Vercel dashboard
    - **Build Command**: `npm run vercel-build` (includes Prisma generation)

23. **Vercel Environment Variables**:
    - See `ENV_VARIABLES_QUICK_REFERENCE.md` for complete list
    - **Critical**: `DATABASE_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

## Known Issues and Workarounds

### Network-Related Issues
24. **Prisma Binary Download Failures**:
    - **Symptom**: `getaddrinfo ENOTFOUND binaries.prisma.sh`
    - **Workaround**: Use `npm install --ignore-scripts`
    - **Production**: Prisma binaries must be available in deployment environment

25. **Python Package Installation Timeouts**:
    - **Symptom**: pip timeout errors for pandas/numpy
    - **Workaround**: Install minimal subset: `pip install fastapi uvicorn`
    - **Note**: Full functionality requires all dependencies in requirements.txt

### Development Issues
26. **Frontend Build Failures**:
    - **Always check**: Prisma client generation completed successfully
    - **Debug**: Run `npx prisma generate` separately first
    - **Alternative**: Use `npx vite build --mode development` to bypass

27. **Backend Server Issues**:
    - **Port conflicts**: Check if port 3001 is available
    - **Database connection**: Verify DATABASE_URL is correct
    - **Python path**: Ensure correct Python version is in PATH

## Project Structure Reference

28. **Key Directories**:
    ```
    GT Explorer/
    ├── apps/
    │   ├── frontend/           # React + Vite (port 5173)
    │   ├── backend/           # FastAPI (port 3001)
    │   └── dashboard-tools/   # Python automation scripts
    ├── data/                  # CSV files and static assets
    ├── docs/                  # Documentation (DEPLOYMENT.md, guides)
    ├── scripts/               # Windows batch scripts for development
    └── config/                # Configuration files
    ```

29. **Important Files Always Check**:
    - `package.json` - Root workspace configuration
    - `apps/frontend/package.json` - Frontend dependencies and scripts
    - `apps/frontend/prisma/schema.prisma` - Database schema
    - `apps/frontend/vite.config.js` - Build configuration
    - `apps/backend/requirements.txt` - Python dependencies
    - `.env.local` - Environment variables (create from .env.example)

## Workspace Commands Reference

30. **Root-level npm scripts**:
    - `npm run dev` → `npm run dev --workspace=frontend`
    - `npm run build` → `npm run build --workspace=frontend`
    - `npm run lint` → `npm run lint --workspace=frontend`
    - `npm run test` → `npm run test --workspaces`

## Development Workflow

31. **Standard Development Process**:
    1. Run `npm install --ignore-scripts` (if first time)
    2. Create `.env.local` from `.env.example`
    3. Run `npm run db:generate` (if Prisma available)
    4. Start backend: `npm run dev:backend`
    5. Start frontend: `npm run dev`
    6. Make changes and test
    7. Run `npm run lint` before committing
    8. Test build: `npm run build`

32. **Before Committing Changes**:
    - **ALWAYS**: Run `npm run lint` and fix errors
    - **ALWAYS**: Test build process: `npm run build`
    - **ALWAYS**: Verify frontend loads: http://localhost:5173
    - **ALWAYS**: Test API endpoints work
    - **Documentation**: Update these instructions if new steps discovered

## Timeout Requirements

33. **CRITICAL - NEVER CANCEL Operations**:
    - **npm install**: 180+ seconds (especially with Prisma)
    - **npm run build**: 180+ seconds (includes Prisma generation)
    - **pip install**: 300+ seconds (pandas compilation)
    - **Database operations**: 60+ seconds
    - **Always wait for completion** - builds may appear hung but are processing

## Emergency Procedures

34. **If Build Completely Fails**:
    1. Clear cache: `rm -rf node_modules package-lock.json`
    2. Reinstall: `npm install --ignore-scripts`
    3. Try minimal build: `cd apps/frontend && npx vite build`
    4. Skip Prisma temporarily and build static assets only

35. **If Database Connection Fails**:
    1. Check DATABASE_URL format in .env.local
    2. Test connection: `cd apps/frontend && node test-supabase-connection.js`
    3. Verify Supabase project is active
    4. Check network connectivity to cjutjtjnizxdkzcbdnqe.supabase.co