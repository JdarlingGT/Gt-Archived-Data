# GT Explorer - Unified Admin Dashboard

**CRITICAL: Always follow these instructions first and only fallback to additional search and context gathering if the information here is incomplete or found to be in error.**

GT Explorer is a monorepo application for Graston Technique data management, built with React frontend, Python Flask backend, and Python automation tools using npm workspaces.

## Working Effectively

### Bootstrap and Install Dependencies

**NETWORK REQUIREMENT**: This application requires internet connectivity for Prisma binary downloads and Python package installation.

1. **Install Node.js dependencies**:
   ```bash
   npm install
   ```
   - Takes 2-5 minutes depending on network. NEVER CANCEL. Set timeout to 10+ minutes.
   - Downloads Prisma binaries from binaries.prisma.sh - requires network access
   - If network fails, installation will fail with "ENOTFOUND binaries.prisma.sh"

2. **Install Python dependencies**:
   ```bash
   # Backend dependencies
   cd apps/backend && pip install -r requirements.txt
   
   # Dashboard tools dependencies  
   cd apps/dashboard-tools && pip install -r requirements.txt
   ```
   - Backend: Takes 5-10 minutes. NEVER CANCEL. Set timeout to 15+ minutes.
   - Dashboard tools: Takes 1-2 minutes. NEVER CANCEL. Set timeout to 5+ minutes.
   - May fail with timeouts if pypi.org is unreachable

### Build the Application

**Frontend Build**:
```bash
npm run build
```
- Takes 3-8 minutes. NEVER CANCEL. Set timeout to 15+ minutes.
- Runs `prisma generate && vite build` - requires network for Prisma
- Outputs to `apps/frontend/dist/`
- If Prisma fails, entire build fails

**Backend Build** (Python - no build step required):
```bash
npm run build:backend
```
- Python backend runs directly from source
- No compilation step needed

### Run the Application

**Development Mode**:
```bash
# Start frontend dev server
npm run dev
# Frontend runs on http://localhost:5173

# Start backend dev server (separate terminal)
npm run dev:backend  
# Backend runs on http://localhost:5000
```

**Production Mode**:
```bash
# Start frontend production server
npm run start
# Serves built files from dist/

# Start backend production server
npm run start:backend
```

### Database Setup

**Required**: PostgreSQL database connection required for full functionality.

```bash
# Generate Prisma client
npm run db:generate
# Takes 1-2 minutes. NEVER CANCEL. Set timeout to 5+ minutes.

# Push database schema
npm run db:push

# Open Prisma Studio (optional)
npm run db:studio
```

**Environment Variables**: Copy `.env.production.example` to `.env` and configure:
- `DATABASE_URL`: PostgreSQL connection string
- `VITE_SUPABASE_URL`: Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

### Testing

**WARNING**: No test suites are currently configured in this repository.

```bash
# Attempt to run tests (will fail - no tests defined)
npm run test
# Returns "Error: no test specified" for all workspaces

# Frontend has no test script defined
npm run test --workspace=frontend

# Backend has placeholder test script that exits with error
npm run test --workspace=backend
```

**Testing Strategy**: Since no automated tests exist, rely on manual validation scenarios described below.

### Linting and Code Quality

```bash
# Run ESLint on frontend
npm run lint
# Takes 30-60 seconds. Set timeout to 2+ minutes.
# Currently shows 31 errors, 1 warning in the codebase
```

**CRITICAL**: The codebase currently has 31 ESLint errors that must be fixed before CI passes. Common issues include:
- Unused variables in API files and components
- Missing block scope declarations in switch cases
- Undefined global variables (`process`, `module`)
- React hooks dependency warnings

**ALWAYS run linting before commits** - CI will fail without proper linting.

## Validation Scenarios

### Manual Testing Required After Changes

**Frontend Changes**:
1. Start dev server: `npm run dev`
2. Navigate to http://localhost:5173
3. Test core navigation: Users, Events, Orders, Licenses sections
4. Verify data loads correctly (requires backend running)
5. Test responsive design on different screen sizes

**Backend Changes**:
1. Start backend: `npm run dev:backend`
2. Test API endpoints:
   ```bash
   curl http://localhost:5000/api/users
   curl http://localhost:5000/api/events
   curl http://localhost:5000/api/orders
   ```
3. Verify database connections work
4. Check API response formats

**Database Schema Changes**:
1. Run `npm run db:push` to apply changes
2. Verify in Prisma Studio: `npm run db:studio`
3. Test affected API endpoints
4. Run full frontend flow to ensure data displays correctly

## Known Issues and Workarounds

### Network Connectivity Issues
- **Prisma Binary Download Failures**: If binaries.prisma.sh is unreachable, installation fails
  - Workaround: Install with `--ignore-scripts` then try manual Prisma generate later
  - Alternative: Use pre-built containers or cached environments

- **Python Package Installation Timeouts**: pypi.org timeouts during pip install
  - Workaround: Use longer timeouts, retry installation
  - Alternative: Use local package mirrors or cached wheels

### Build Issues
- **Frontend build fails without Prisma**: Build script requires successful `prisma generate`
  - Workaround: Run `npx vite build` directly to skip Prisma if needed for testing
  - Fix: Ensure database connectivity and regenerate Prisma client

### Windows Script Usage
- Batch scripts in `scripts/` directory provide Windows-specific automation
- **WARNING**: Some scripts reference outdated directory structures (`graston-dashboard` instead of `apps/frontend`)
- Use `scripts/install.bat` for complete dependency installation (calls npm install on workspaces)
- Use `scripts/start.bat` to launch both frontend and backend simultaneously
- Manual verification needed: check script paths match current monorepo structure

## Project Structure Reference

```
GT Explorer/
├── apps/
│   ├── frontend/              # React + Vite + Prisma
│   │   ├── src/              # React components and pages
│   │   ├── api/              # Serverless API functions (Vercel)
│   │   ├── prisma/           # Database schema and client
│   │   └── dist/             # Build output
│   ├── backend/              # Python Flask API
│   │   ├── main.py           # Flask application entry
│   │   ├── models.py         # Database models
│   │   └── requirements.txt  # Python dependencies
│   └── dashboard-tools/      # Python automation scripts
├── data/                     # CSV files and static assets
├── docs/                     # Documentation
├── scripts/                  # Windows batch automation scripts
└── config/                   # Configuration files
```

## Workspace Commands

**Frontend (React + Vite)**:
- `npm run dev --workspace=frontend` - Dev server
- `npm run build --workspace=frontend` - Production build
- `npm run lint --workspace=frontend` - ESLint

**Backend (Python Flask)**:
- `npm run start --workspace=backend` - Start Flask server
- `npm run dev --workspace=backend` - Dev server with nodemon

**Dashboard Tools (Python)**:
- `npm run create-dashboard --workspace=dashboard-tools`
- `npm run enhance-dashboard --workspace=dashboard-tools`

## Deployment

**Vercel Deployment** (Recommended):
- Configured via `apps/frontend/vercel.json`
- Automatic deployments from main branch
- Environment variables managed via Vercel secrets (@database_url, @supabase_url, etc.)
- Serverless functions in `apps/frontend/api/`

**Local Docker** (Alternative):
```bash
# Use modern Docker Compose command (not docker-compose)
docker compose up
# Starts PostgreSQL container for local development
# Takes 2-3 minutes on first run to pull postgres:15 image. NEVER CANCEL.
```

## Common File Locations

### Frequently Modified Files
- `apps/frontend/src/App.jsx` - Main React application
- `apps/frontend/prisma/schema.prisma` - Database schema
- `apps/backend/main.py` - Flask API endpoints
- `apps/frontend/api/` - Serverless API functions

### Configuration Files
- `apps/frontend/vite.config.js` - Vite build configuration
- `apps/frontend/tailwind.config.js` - Tailwind CSS configuration  
- `apps/frontend/eslint.config.js` - ESLint rules
- `.env` - Environment variables (copy from .env.production.example)

### Build Outputs
- `apps/frontend/dist/` - Frontend production build
- `apps/frontend/src/generated/prisma/` - Generated Prisma client

## Critical Timeouts and Warnings

- **NEVER CANCEL npm install**: 10+ minute timeout required
- **NEVER CANCEL npm run build**: 15+ minute timeout required  
- **NEVER CANCEL pip install**: 15+ minute timeout for backend, 5+ for dashboard-tools
- **NEVER CANCEL npm run test**: 10+ minute timeout required
- **Database operations**: 5+ minute timeout for schema operations

## Prerequisites Verification

Before starting, verify:
- Node.js v16+ installed: `node --version` (current requirement from README)
- Python 3.8+ installed: `python3 --version` (current environment: 3.12.3)  
- Docker available: `docker --version` and `docker compose --version`
- Network access to:
  - binaries.prisma.sh (for Prisma)
  - pypi.org (for Python packages)
  - Supabase (for database)
- PostgreSQL database available (local or cloud)

## Command Validation Results

**Tested and Working**:
- ✅ `npm install` - installs successfully but requires network for Prisma
- ✅ `npm run lint` - runs ESLint, currently shows 31 errors + 1 warning
- ✅ `python3 --version` - Python 3.12.3 available
- ✅ `docker compose --version` - modern Docker Compose available

**Network-Dependent (Will Fail Without Internet)**:
- ❌ `npm run build` - fails on Prisma binary download
- ❌ `pip install -r requirements.txt` - fails on PyPI timeouts  
- ❌ `npm run db:generate` - requires Prisma binary

**Not Available**:
- ❌ `npm run test` - no test suites configured (exits with error)
- ⚠️ Windows batch scripts - reference outdated directory paths

## Summary

This is a complex monorepo requiring network connectivity for full functionality. Always use generous timeouts, never cancel long-running operations, and validate changes through complete user scenarios. Focus on the React frontend for UI changes and Flask backend for API modifications.