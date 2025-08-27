@echo off
echo Updating application...

echo Stopping application servers...
taskkill /IM python.exe /F
taskkill /IM node.exe /F

echo Waiting for processes to terminate...
timeout /t 3 /nobreak >nul

echo Installing dependencies...
pip install -r backend/requirements.txt
pip install -r generate_dashboard_requirements.txt
cd graston-dashboard
npm install

echo Updating dashboard...
python generate_dashboard.py

echo Application updated successfully!
pause