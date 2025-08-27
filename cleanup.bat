@echo off
echo Cleaning up application...

echo Stopping application servers...
taskkill /IM python.exe /F
taskkill /IM node.exe /F

echo Removing temporary files...
del /Q /S *.tmp
del /Q /S *.log

echo Cleanup completed.
pause