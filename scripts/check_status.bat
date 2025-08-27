@echo off
echo Checking application status...

echo Backend server status:
tasklist /FI "IMAGENAME eq python.exe" 2>nul | find /I /N "python.exe"
if "%ERRORLEVEL%"=="0" (
    echo Backend server is running
) else (
    echo Backend server is not running
)

echo Frontend server status:
tasklist /FI "IMAGENAME eq node.exe" 2>nul | find /I /N "node.exe"
if "%ERRORLEVEL%"=="0" (
    echo Frontend server is running
) else (
    echo Frontend server is not running
)

pause