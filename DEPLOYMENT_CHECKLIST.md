# ✅ Backend Deployment Checklist

## Before Deploying to Render

### 1. Get Firebase Credentials Ready
```bash
cd backend
python prepare_firebase_for_render.py
```
This will output a single-line JSON - **COPY IT!**

### 2. Test Backend Locally First
```bash
cd backend
python main.py
```
Open: http://localhost:8000/api/health

Should show:
- ✅ Algorand connected
- ✅ Gemini configured  
- ✅ Firebase configured

---

## Deploy to Render

### Step 1: Go to Render
https://render.com → Sign in with GitHub

### Step 2: Create Web Service
- Click **New +** → **Web Service**
- Connect repo: `chv-sneha/TenderVault`
- Root Directory: `backend`
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 3: Add Environment Variables

| Variable | Value |
|----------|-------|
| DEPLOYER_MNEMONIC | `unhappy horn like frog wait pigeon album improve fatal loop festival expose green alpha syrup width patch voice unfair swim suit arrow spend absent gaze` |
| GEMINI_API_KEY | `AIzaSyAOyg_UlYUT1yx_yUvO1PbfyFBtmwn79Ss` |
| ALGORAND_APP_ID | `755804596` |
| FIREBASE_CREDENTIALS | Paste the minified JSON from step 1 |

### Step 4: Deploy
Click **Create Web Service** → Wait 2-3 minutes

### Step 5: Get Your URL
Copy the URL (e.g., `https://tendervault-backend-xyz.onrender.com`)

---

## Update Frontend

### Step 1: Update .env
```bash
cd frontend
```

Edit `.env` file:
```
VITE_BACKEND_URL=https://your-render-url.onrender.com
```

### Step 2: Test Locally
```bash
npm run dev
```
Try creating a tender - should work!

### Step 3: Deploy to Vercel
```bash
git add .
git commit -m "Update backend URL"
git push
```
Vercel will auto-deploy

---

## ✅ Verification

Test these URLs:

1. **Backend Health**: https://your-render-url.onrender.com/api/health
2. **Backend Docs**: https://your-render-url.onrender.com/docs
3. **Frontend**: https://tender-vault.vercel.app

---

## 🔧 If Something Breaks

### Backend won't start?
1. Check Render logs (Dashboard → Your Service → Logs)
2. Verify all 4 environment variables are set
3. Check FIREBASE_CREDENTIALS is valid JSON

### Frontend can't connect?
1. Check VITE_BACKEND_URL in frontend/.env
2. Make sure backend is running (check Render dashboard)
3. Check browser console for CORS errors

### Firebase errors?
1. Run `python prepare_firebase_for_render.py` again
2. Copy the output EXACTLY (no extra spaces)
3. Update FIREBASE_CREDENTIALS in Render

### Algorand errors?
1. Check mnemonic is exactly 25 words
2. Verify APP_ID is 755804596
3. Check deployer account has ALGO (use testnet dispenser)

---

## 📝 Current Status

- ✅ Backend code fixed for Render deployment
- ✅ Firebase works with environment variable
- ✅ Frontend configured for localhost (change after deploy)
- ✅ All environment variables documented
- ✅ Helper scripts created

## 🎯 Next Steps

1. Run `python backend/prepare_firebase_for_render.py`
2. Follow RENDER_DEPLOY.md guide
3. Deploy to Render
4. Update frontend .env with new URL
5. Push to GitHub
6. Done! 🎉
