@echo off
echo Starting backend server...
start cmd /k python backend/server.py

echo Waiting for backend to start...
timeout /t 5 /nobreak >nul

echo Starting frontend development server...
cd graston-dashboard
start cmd /k npm start

echo Application started successfully!
echo Open your browser and go to http://localhost:3000
pause