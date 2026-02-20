# 🚀 Quick Start Guide - Run TenderVault Locally

## Step 1: Start Backend (Terminal 1)

```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```

Backend will run on: **http://localhost:8000**

Check health: http://localhost:8000/api/health

---

## Step 2: Start Frontend (Terminal 2)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: **http://localhost:8080**

---

## ✅ Your Project is Now Running!

- Frontend: http://localhost:8080
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## 🌐 Deploy Backend to Render (Optional)

### Option 1: Deploy via Render Dashboard

1. Go to https://render.com and sign in
2. Click **New +** → **Web Service**
3. Connect your GitHub repo: `chv-sneha/TenderVault`
4. Configure:
   - **Name**: `tendervault-backend`
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   DEPLOYER_MNEMONIC=your_25_word_mnemonic
   GEMINI_API_KEY=AIzaSyAOyg_UlYUT1yx_yUvO1PbfyFBtmwn79Ss
   ALGORAND_APP_ID=755804596
   FIREBASE_PROJECT_ID=tendervault-90515
   ```

6. Upload `firebase-admin-key.json` as a secret file

7. Click **Create Web Service**

8. Copy your backend URL (e.g., `https://tendervault-backend.onrender.com`)

9. Update frontend `.env`:
   ```
   VITE_BACKEND_URL=https://tendervault-backend.onrender.com
   ```

10. Redeploy frontend on Vercel

---

## 🌐 Deploy Backend to Railway (Faster Alternative)

1. Go to https://railway.app and sign in
2. Click **New Project** → **Deploy from GitHub repo**
3. Select `chv-sneha/TenderVault`
4. Add environment variables (same as above)
5. Set root directory to `backend`
6. Railway will auto-deploy
7. Copy the generated URL and update frontend

---

## 🌐 Deploy Backend to Vercel (Easiest)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. From backend directory:
   ```bash
   cd backend
   vercel
   ```

3. Follow prompts:
   - Link to existing project? **N**
   - Project name: **tendervault-backend**
   - Directory: **./backend**

4. Add environment variables:
   ```bash
   vercel env add DEPLOYER_MNEMONIC
   vercel env add GEMINI_API_KEY
   vercel env add ALGORAND_APP_ID
   vercel env add FIREBASE_PROJECT_ID
   ```

5. Deploy:
   ```bash
   vercel --prod
   ```

6. Copy the URL and update frontend `.env`

---

## 🔧 Troubleshooting

### Backend won't start?
- Check Python version: `python --version` (need 3.11+)
- Install dependencies: `pip install -r requirements.txt`
- Check `.env` file exists in backend folder

### Frontend can't connect to backend?
- Make sure backend is running on port 8000
- Check `frontend/src/services/api.js` has correct URL
- Clear browser cache

### Firebase errors?
- Make sure `firebase-admin-key.json` is in backend folder
- Check Firebase project ID in `.env`

### Algorand errors?
- Check your mnemonic is correct (25 words)
- Make sure you have testnet ALGO (get from dispenser)
- Verify APP_ID is correct: 755804596

---

## 📝 Current Configuration

✅ Backend: Configured for localhost:8000
✅ Frontend: Configured for localhost:8000
✅ Firebase: tendervault-90515
✅ Algorand App ID: 755804596
✅ Gemini API: Configured

---

## 🎯 Next Steps

1. Test locally first
2. Choose deployment platform (Render/Railway/Vercel)
3. Deploy backend
4. Update frontend with new backend URL
5. Redeploy frontend on Vercel
