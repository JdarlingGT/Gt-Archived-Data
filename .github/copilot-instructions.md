# GT Archived Data Repository

GT Archived Data is a comprehensive data management system for Graston Technique data including a React frontend, Python backend API, and dashboard generation tools. The repository contains archived healthcare practitioner data with 657,350+ records across multiple CSV files and Excel dashboards.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Prerequisites and Environment Setup
- Node.js v20.19.4+ (confirmed working)
- npm v10.8.2+ (confirmed working) 
- Python 3.12.3+ (confirmed working)
- **CRITICAL NETWORK LIMITATION**: Prisma binary downloads and PyPI package installations FAIL due to network restrictions

### Bootstrap and Installation
**NEVER CANCEL - Installation commands may take 10+ minutes due to network timeouts:**
```bash
# Install root dependencies - TIMEOUT: Set 300+ seconds
npm install

# Navigate to specific workspace for frontend
cd apps/frontend 
npm install  # Uses workspace configuration
```

### Build Process
**CRITICAL BUILD LIMITATIONS:**
- **Prisma builds FAIL** due to network restrictions preventing binary downloads
- **Python package installations FAIL** for the same reason
- **Frontend builds FAIL** due to missing TailwindCSS dependencies

Current build status:
```bash
# Frontend build - FAILS with Prisma dependency
npm run build  # Fails at "prisma generate" step

# Vite alone works but needs TailwindCSS
npx vite --version  # Works: vite/4.5.14
```

### Running Applications

#### Frontend Development (PARTIAL)
```bash
cd apps/frontend
# FAILS due to TailwindCSS dependency but Vite server starts
npx vite --host 0.0.0.0  # Port 5173, fails on PostCSS/Tailwind
```

#### Backend API (Python FastAPI) - CANNOT RUN
```bash
cd apps/backend
# FAILS - Cannot install dependencies due to network restrictions
pip install -r requirements.txt  # Network timeout errors
python main.py  # Cannot run without dependencies
```

#### Dashboard Tools (Python) - CANNOT RUN  
```bash
cd apps/dashboard-tools
# FAILS - Cannot install pandas, openpyxl due to network restrictions
pip install -r requirements.txt  # Network timeout errors
python generate_dashboard.py  # Cannot run without dependencies
```

## Data Structure and Files

### Data Directory (ACCESSIBLE - 657K+ records)
The `data/` directory contains substantial CSV files and Excel dashboards:
- **users.csv**: 81,951 healthcare practitioners
- **addresses.csv**: 156,895 address records  
- **businesses.csv**: 32,694 business entities
- **events.csv**: 5,294 training events
- **event_registrations.csv**: 49,344 registrations
- **orders.csv**: 48,766 order records
- **licenses.csv**: 25,455 license records
- Excel dashboards: `Graston_Technique_Dashboard.xlsx` (30MB), `Graston_Technique_Dashboard_v2.xlsx`

Sample data viewing (WORKS):
```bash
# View data structure
head -3 data/users.csv
wc -l data/*.csv  # Count records in all CSV files
ls -la data/      # List all data files with sizes
```

### Project Structure
```
GT Archived Data/
├── apps/
│   ├── frontend/          # React + Vite + Prisma frontend (BUILD FAILS)
│   ├── backend/           # Python FastAPI backend (CANNOT RUN) 
│   └── dashboard-tools/   # Python Excel generation tools (CANNOT RUN)
├── data/                  # CSV files and Excel dashboards (ACCESSIBLE)
├── docs/                  # Documentation and user guides
├── scripts/               # Windows batch automation scripts
└── config/                # Configuration files
```

## Development Limitations and Workarounds

### Network Connectivity Issues
**ALL external package downloads FAIL** including:
- Prisma binary downloads from binaries.prisma.sh
- Python packages from PyPI (pandas, fastapi, etc.)
- Some npm packages may fail

### What Works for Development
```bash
# Data exploration and analysis
head -n 10 data/users.csv
grep -i "email" data/users.csv | head -5
wc -l data/*.csv

# Basic Node.js operations  
node --version  # v20.19.4
npm --version   # v10.8.2
npx vite --version  # vite/4.5.14

# File structure exploration
find . -name "*.md" -type f
ls -la apps/frontend/src/
```

### What Does NOT Work
- Building frontend applications (Prisma dependency)
- Running Python backend (cannot install FastAPI/SQLAlchemy)
- Installing dashboard tools (cannot install pandas/openpyxl)
- Database operations (Prisma client generation fails)

## Scripts and Automation

### Windows Batch Scripts (REFERENCE ONLY)
Located in `scripts/` directory - designed for Windows environments:
- `install.bat`: Install all dependencies
- `build.bat`: Build frontend and backend
- `start.bat`: Start both frontend and backend servers
- `test_application.bat`: Test API endpoints and frontend
- `check_status.bat`: Check if servers are running

**DO NOT RUN** these scripts in Linux environment - they use Windows-specific commands.

## Testing and Validation

### Manual Validation Scenarios
Since automated testing is limited due to network restrictions:

1. **Data Integrity Validation**:
   ```bash
   # Verify CSV structure
   head -1 data/users.csv | tr ',' '\n' | nl  # Count columns
   
   # Check for data consistency
   grep -c "@" data/users.csv  # Count email addresses
   ```

2. **File Structure Verification**:
   ```bash
   # Verify all expected files exist
   ls -la apps/frontend/src/components/
   ls -la apps/backend/
   ls -la docs/
   ```

### Testing Limitations
- **NO automated test suite can run** due to dependency installation failures
- **NO build verification** possible due to Prisma/TailwindCSS issues
- **NO API testing** possible due to backend dependency failures

## Common Tasks and Troubleshooting

### Repository Navigation
```bash
# Key directories
cd apps/frontend    # React application source
cd apps/backend     # Python API source  
cd data/           # CSV data files
cd docs/           # Documentation
cd scripts/        # Windows automation scripts
```

### Documentation References
- `README.md`: Project overview and setup instructions
- `docs/README.md`: Integration documentation
- `docs/DEPLOYMENT.md`: Vercel deployment guide
- `ENV_VARIABLES_QUICK_REFERENCE.md`: Environment variable configuration

### Expected Timeouts and Performance
Since network operations fail, provide generous timeouts:
- **npm install**: Set timeout to 300+ seconds (often fails anyway)
- **pip install**: Set timeout to 300+ seconds (fails due to network)
- **Data operations**: Fast, files are local
- **File exploration**: Immediate

## Environment Variables

Required for full operation (from `ENV_VARIABLES_QUICK_REFERENCE.md`):
```bash
# Database (Supabase)
DATABASE_URL="postgresql://postgres:hAxDkIcKqJccj7ep@db.cjutjtjnizxdkzcbdnqe.supabase.co:5432/postgres"
VITE_SUPABASE_URL="https://cjutjtjnizxdkzcbdnqe.supabase.co"
VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIs..."
```

**NOTE**: Environment setup cannot be fully tested due to network restrictions.

## Critical Warnings

- **NEVER CANCEL network operations** - they will fail due to network restrictions, not timeouts
- **DO NOT expect builds to succeed** - Prisma and TailwindCSS dependencies cannot be installed
- **Focus on data analysis and file structure work** - these are the only reliable operations
- **Always reference the data/ directory** for actual functionality testing
- **Use Windows batch scripts only as reference** - they won't run in Linux environment

## Development Strategy

Given the network limitations, focus development on:
1. **Data analysis and CSV manipulation** using built-in tools
2. **Documentation and configuration file updates** 
3. **File structure and code analysis** without building
4. **Environment variable and configuration management**

Avoid attempting to:
1. Build or run applications
2. Install external dependencies
3. Test database connectivity
4. Validate API endpoints