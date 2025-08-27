@echo off
echo Stopping application servers...
taskkill /IM python.exe /F
taskkill /IM node.exe /F

echo Application servers stopped successfully!
pause