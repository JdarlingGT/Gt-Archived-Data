@echo off
echo Creating application backup...

echo Stopping application servers...
taskkill /IM python.exe /F
taskkill /IM node.exe /F

echo Waiting for processes to terminate...
timeout /t 3 /nobreak >nul

echo Creating backup directory...
set BACKUP_DIR=backup_%date:~-4%%date:~-7%%date:~-10%_%time:~0,2%%time:~3,2%
mkdir %BACKUP_DIR%

echo Copying files to backup directory...
xcopy /E /I /Y backend %BACKUP_DIR%\backend\
xcopy /E /I /Y graston-dashboard %BACKUP_DIR%\graston-dashboard\
xcopy /E /I /Y Table\ Data %BACKUP_DIR%\Table\ Data\
copy /Y *.py %BACKUP_DIR%\
copy /Y *.bat %BACKUP_DIR%\
copy /Y *.md %BACKUP_DIR%\
copy /Y *.xlsx %BACKUP_DIR%\
copy /Y *.json %BACKUP_DIR%\
copy /Y *.csv %BACKUP_DIR%\
copy /Y *.txt %BACKUP_DIR%\
copy /Y *.log %BACKUP_DIR%\
copy /Y *.tmp %BACKUP_DIR%\
copy /Y *.gitignore %BACKUP_DIR%\
copy /Y *.requirements %BACKUP_DIR%\
copy /Y *.package %BACKUP_DIR%\
copy /Y *.lock %BACKUP_DIR%\
copy /Y *.config %BACKUP_DIR%\
copy /Y *.env %BACKUP_DIR%\
copy /Y *.yml %BACKUP_DIR%\
copy /Y *.yaml %BACKUP_DIR%\
copy /Y *.xml %BACKUP_DIR%\
copy /Y *.ini %BACKUP_DIR%\
copy /Y *.conf %BACKUP_DIR%\
copy /Y *.properties %BACKUP_DIR%\
copy /Y *.settings %BACKUP_DIR%\
copy /Y *.preferences %BACKUP_DIR%\
copy /Y *.cache %BACKUP_DIR%\
copy /Y *.backup %BACKUP_DIR%\
copy /Y *.old %BACKUP_DIR%\
copy /Y *.bak %BACKUP_DIR%\
copy /Y *.save %BACKUP_DIR%\
echo Backup completed: %BACKUP_DIR%
pause