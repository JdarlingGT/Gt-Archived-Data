# GT Explorer

A unified admin dashboard for Graston Technique data management.

## Project Structure

```
GT Explorer/
├── apps/
│   ├── frontend/              # React + Vite frontend application
│   ├── backend/               # Flask backend API
│   └── dashboard-tools/       # Python scripts and automation tools
├── data/                      # Data files and static assets
├── docs/                      # Documentation
├── config/                    # Configuration files
├── scripts/                   # Utility scripts
└── package.json               # Root package.json with workspaces
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd gt-explorer
   ```

2. Install dependencies:
   ```bash
   npm run install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run start
   ```

2. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## Available Scripts

- `npm run dev` - Start frontend development server
- `npm run dev:backend` - Start backend development server
- `npm run build` - Build the frontend application
- `npm run build:backend` - Build the backend application
- `npm run start` - Start the production server
- `npm run test` - Run all tests
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Workspaces

This project uses npm workspaces to manage multiple packages:

- `frontend` - React application
- `backend` - Flask API
- `dashboard-tools` - Python automation scripts

## Documentation

See the `docs/` directory for detailed documentation:
- [User Guide](docs/Graston_Dashboard_User_Guide.md)
- [Enhancement Guide](docs/Graston_Dashboard_Enhancement_Guide.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## Data

Data files are stored in the `data/` directory:
- CSV files with various data types
- Excel spreadsheets with dashboard data
- Static assets and backups

## Configuration

Configuration files are stored in the `config/` directory:
- Environment variables
- Tailwind CSS configuration
- Vite configuration
- ESLint configuration
- PostCSS configuration

## Scripts

Utility scripts are stored in the `scripts/` directory:
- Installation scripts
- Development scripts
- Testing scripts
- Deployment scripts