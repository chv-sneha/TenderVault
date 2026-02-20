@echo off
echo ========================================
echo   TenderVault - Quick Fix Script
echo ========================================
echo.

echo [1/2] Getting Firebase credentials for Render...
cd backend
python get_firebase_env.py
echo.
echo.

echo [2/2] Adding test data to Firebase...
python add_test_data.py
echo.
echo.

echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. Copy the Firebase JSON from above
echo 2. Go to: https://dashboard.render.com
echo 3. Click: tendervault-jdoj
echo 4. Go to: Environment tab
echo 5. Add variable: FIREBASE_CREDENTIALS
echo 6. Paste the JSON
echo 7. Click Save
echo 8. Wait 2 minutes for redeploy
echo.
echo 9. Then push frontend changes:
echo    git add .
echo    git commit -m "All tasks completed"
echo    git push
echo.
echo ========================================
echo.
pause
