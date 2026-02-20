# 🚀 Deploy Backend to Render - Step by Step

## Step 1: Prepare Firebase Credentials

1. Open your `firebase-admin-key.json` file
2. Copy the ENTIRE content (it's a JSON object)
3. Minify it to one line (remove all line breaks) - you can use: https://codebeautify.org/jsonminifier
4. Keep this ready - you'll paste it as an environment variable

## Step 2: Create Render Account

1. Go to https://render.com
2. Sign up with GitHub
3. Authorize Render to access your repositories

## Step 3: Create New Web Service

1. Click **New +** button (top right)
2. Select **Web Service**
3. Connect your repository: `chv-sneha/TenderVault`
4. Click **Connect**

## Step 4: Configure Service

Fill in these settings:

**Basic Settings:**
- **Name**: `tendervault-backend` (or any name you want)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

**Instance Type:**
- Select **Free** (or paid if you want faster performance)

## Step 5: Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add these 4 variables:

1. **DEPLOYER_MNEMONIC**
   ```
   unhappy horn like frog wait pigeon album improve fatal loop festival expose green alpha syrup width patch voice unfair swim suit arrow spend absent gaze
   ```

2. **GEMINI_API_KEY**
   ```
   AIzaSyAOyg_UlYUT1yx_yUvO1PbfyFBtmwn79Ss
   ```

3. **ALGORAND_APP_ID**
   ```
   755804596
   ```

4. **FIREBASE_CREDENTIALS**
   ```
   {"type":"service_account","project_id":"tendervault-90515","private_key_id":"...","private_key":"...","client_email":"..."}
   ```
   ⚠️ Paste your ENTIRE minified firebase-admin-key.json content here

## Step 6: Deploy

1. Click **Create Web Service**
2. Wait 2-3 minutes for deployment
3. Render will show you the URL (e.g., `https://tendervault-backend.onrender.com`)

## Step 7: Test Your Backend

Open these URLs in browser:

1. **Root**: https://your-backend-url.onrender.com/
2. **Health**: https://your-backend-url.onrender.com/api/health
3. **API Docs**: https://your-backend-url.onrender.com/docs

You should see JSON responses!

## Step 8: Update Frontend

1. Go to `frontend/.env`
2. Add this line:
   ```
   VITE_BACKEND_URL=https://your-backend-url.onrender.com
   ```

3. Commit and push to GitHub
4. Vercel will auto-redeploy your frontend

## ✅ Done!

Your backend is now live on Render!

---

## 🔧 Troubleshooting

### Build fails?
- Check Python version in `backend/runtime.txt` is `python-3.11.0`
- Make sure all environment variables are set

### Firebase errors?
- Make sure FIREBASE_CREDENTIALS is valid JSON (no line breaks)
- Check the JSON is properly escaped

### Algorand errors?
- Verify DEPLOYER_MNEMONIC is exactly 25 words
- Check ALGORAND_APP_ID is 755804596

### Service crashes?
- Check Render logs (click on your service → Logs tab)
- Look for error messages

---

## 💡 Pro Tips

1. **Free tier sleeps after 15 min** - First request takes 50 seconds to wake up
2. **Upgrade to paid** ($7/month) for always-on service
3. **Check logs** regularly to debug issues
4. **Set up health checks** in Render dashboard

---

## 🔄 Redeploy After Changes

1. Push changes to GitHub
2. Render auto-deploys from `main` branch
3. Or click **Manual Deploy** in Render dashboard
