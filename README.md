# Graston Dashboard Integration

This project integrates the RDS Archived Data with the Graston Dashboard application.

## Components

1. **Backend Service** (`backend/server.py`):
   - Provides API endpoints to access data from CSV and Excel files
   - Runs on `http://localhost:5000` by default
   - Requires Python 3.7+ and Flask

2. **React Frontend** (`graston-dashboard/`):
   - Displays data from the backend API in tables
   - Includes pages for Users, Businesses, and Events
   - Requires Node.js and npm

3. **Dashboard Generator** (`generate_dashboard.py`):
   - Creates an Excel dashboard from CSV files in the Table Data folder
   - Generates `Graston_Technique_Dashboard.xlsx`
   - Requires Python 3.7+ and pandas

## Setup and Usage

### 1. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Install Frontend Dependencies
```bash
cd graston-dashboard
npm install
```

### 3. Generate Dashboard (Optional)
If you need to create or update the Excel dashboard:
```bash
pip install -r generate_dashboard_requirements.txt
python generate_dashboard.py
```

### 4. Run the Backend
```bash
cd backend
python server.py
```

### 5. Run the Frontend
```bash
cd graston-dashboard
npm start
```

### 6. Access the Application
Open your browser and go to `http://localhost:3000`

## File Structure

- `backend/`: Backend service with Flask API
- `graston-dashboard/`: React frontend application
- `Table Data/`: Contains CSV files with data
- `generate_dashboard.py`: Script to create Excel dashboard
- `README.md`: This file

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/sheets`: List available sheets in the main dashboard
- `GET /api/sheet_data?sheet_name=`: Get data from a specific sheet
- `GET /api/csv_data?file_name=`: Get data from a specific CSV file

## Data Flow

1. CSV files in `Table Data/` folder are processed by `generate_dashboard.py`
2. The backend API serves data from these files
3. The React frontend fetches data from the API and displays it in tables

## Troubleshooting

- Make sure the backend is running before starting the frontend
- Check console logs for error messages
- Ensure all dependencies are installed
- Verify file paths are correct in the configuration
