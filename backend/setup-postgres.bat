@echo off
echo ========================================
echo PostgreSQL Database Setup
echo ========================================
echo.

REM Set PostgreSQL bin path
set PGBIN=C:\Program Files\PostgreSQL\17\bin
set PGPASSWORD=postgres

echo Step 1: Creating database...
"%PGBIN%\psql.exe" -U postgres -c "CREATE DATABASE bloodfornepal;"

if %ERRORLEVEL% EQU 0 (
    echo ✓ Database created successfully!
) else (
    echo ✗ Database might already exist or there's a connection issue
    echo.
    echo Trying to drop and recreate...
    "%PGBIN%\psql.exe" -U postgres -c "DROP DATABASE IF EXISTS bloodfornepal;"
    "%PGBIN%\psql.exe" -U postgres -c "CREATE DATABASE bloodfornepal;"
)

echo.
echo Step 2: Running Prisma migrations...
cd /d "%~dp0"
call npx prisma migrate dev --name init_postgresql

echo.
echo Step 3: Generating Prisma Client...
call npx prisma generate

echo.
echo Step 4: Creating admin account...
call node create-admin.js

echo.
echo ========================================
echo ✓ PostgreSQL setup complete!
echo ========================================
echo.
echo Admin credentials:
echo Email: admin@bloodfornepal.com
echo Password: Admin@123
echo.
pause
