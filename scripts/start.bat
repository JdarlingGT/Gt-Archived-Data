@echo off
echo Starting GT Explorer Application...
echo.
echo Starting Frontend...
start "Frontend" npm run dev
timeout /t 5 /nobreak >nul
echo Starting Backend...
start "Backend" npm run dev:backend
echo.
echo GT Explorer Application started successfully!
echo Frontend: http://localhost:5173
echo Backend: http://localhost:5000