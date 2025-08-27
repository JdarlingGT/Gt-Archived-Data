@echo off
echo Installing Python dependencies for backend...
pip install -r backend/requirements.txt

echo Installing Python dependencies for dashboard generator...
pip install -r generate_dashboard_requirements.txt

echo Installing Node.js dependencies for frontend...
cd graston-dashboard
npm install

echo All dependencies installed successfully!
pause