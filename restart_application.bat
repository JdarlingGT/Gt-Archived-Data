@echo off
echo Stopping application servers...
taskkill /IM python.exe /F
taskkill /IM node.exe /F

echo Waiting for processes to terminate...
timeout /t 3 /nobreak >nul

echo Starting backend server...
start cmd /k python backend/server.py

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting frontend development server...
cd graston-dashboard
start cmd /k npm start

echo Application restarted successfully!
pause