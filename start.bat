@echo off
echo ========================================
echo   TenderVault - Starting Application
echo ========================================
echo.

echo [1/2] Starting Backend on port 8000...
start "TenderVault Backend" cmd /k "cd backend && python main.py"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend on port 8080...
start "TenderVault Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Application Started!
echo ========================================
echo.
echo Frontend: http://localhost:8080
echo Backend:  http://localhost:8000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to exit...
pause >nul
