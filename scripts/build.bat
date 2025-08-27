@echo off
echo Building GT Explorer Application...
echo.
echo Building frontend...
npm run build
echo.
echo Building backend...
npm run build:backend
echo.
echo Application built successfully!