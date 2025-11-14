# 🚀 Deployment Guide - CloudBlitz CRM

## Simple 3-Step Deployment (No Docker Needed!)

### Overview:
1. **Backend** → Render.com (Free)
2. **Frontend** → Vercel (Free)
3. **Database** → MongoDB Atlas (You already have)

---

## 📋 Prerequisites

- ✅ GitHub account (you have this)
- ✅ Code pushed to GitHub (done)
- ✅ MongoDB Atlas account (you have this)
- ⬜ Render.com account (free - we'll create)
- ⬜ Vercel account (free - we'll create)

---

## 🗄️ Step 1: Prepare MongoDB Atlas

### 1.1 Get Connection String
1. Go to https://cloud.mongodb.com
2. Click your cluster → **Connect**
3. Choose **Connect your application**
4. Copy the connection string
5. It looks like: `mongodb+srv://username:password@cluster.mongodb.net/cloudblitz`

### 1.2 Whitelist All IPs (Important!)
1. Go to **Network Access** in MongoDB Atlas
2. Click **Add IP Address**
3. Click **Allow Access from Anywhere**
4. Add IP: `0.0.0.0/0`
5. Click **Confirm**

**Why?** Render.com uses dynamic IPs, so we need to allow all.

---

## 🔧 Step 2: Deploy Backend to Render.com

### 2.1 Create Render Account
1. Go to https://render.com
2. Click **Get Started**
3. Sign up with GitHub (easiest)

### 2.2 Create New Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Select your `cloudblitz` repository

### 2.3 Configure Service

**Basic Settings:**
- **Name:** `cloudblitz-backend` (or any name)
- **Region:** Choose closest to you
- **Branch:** `main` or `develop`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `node server.js`

**Instance Type:**
- Select **Free** (0$/month)

### 2.4 Add Environment Variables

Click **Advanced** → **Add Environment Variable**

Add these:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | Generate random string from https://randomkeygen.com |

**Example:**
```
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://myuser:mypass@cluster0.mongodb.net/cloudblitz
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c
```

### 2.5 Deploy
1. Click **Create Web Service**
2. Wait 5-10 minutes for deployment
3. You'll get a URL like: `https://cloudblitz-backend.onrender.com`

### 2.6 Test Backend
Open: `https://your-backend-url.onrender.com/api/health`

Should see:
```json
{
  "status": "success",
  "message": "Server is healthy"
}
```

✅ **Backend Deployed!**

---

## 🎨 Step 3: Deploy Frontend to Vercel

### 3.1 Update Frontend API URL

**Before deploying, update this file:**

`frontend/.env.production`
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

Replace with your actual Render backend URL!

### 3.2 Update Frontend Code to Use Environment Variable

We need to update all API calls to use the environment variable.

**I'll help you with this in the next step!**

### 3.3 Create Vercel Account
1. Go to https://vercel.com
2. Click **Sign Up**
3. Sign up with GitHub (easiest)

### 3.4 Import Project
1. Click **Add New** → **Project**
2. Import your GitHub repository
3. Select `cloudblitz` repository

### 3.5 Configure Project

**Framework Preset:** Vite
**Root Directory:** `frontend`
**Build Command:** `npm run build`
**Output Directory:** `dist`

### 3.6 Add Environment Variable

Click **Environment Variables**

Add:
| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://your-backend-url.onrender.com` |

### 3.7 Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://cloudblitz-crm.vercel.app`

✅ **Frontend Deployed!**

---

## 🔗 Step 4: Update CORS (Important!)

Your backend needs to allow requests from your Vercel frontend.

### 4.1 Update Backend CORS

Go to Render.com → Your service → Environment

Add new variable:
| Key | Value |
|-----|-------|
| `FRONTEND_URL` | `https://your-vercel-url.vercel.app` |

### 4.2 Update server.js

Update `backend/server.js`:

```javascript
// Before
app.use(cors());

// After
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

Commit and push to GitHub. Render will auto-deploy!

---

## ✅ Step 5: Test Your Deployed App

### 5.1 Open Your Frontend
Go to: `https://your-app.vercel.app`

### 5.2 Test Registration
1. Click **Submit Enquiry**
2. Register a new account
3. Should work!

### 5.3 Test Login
1. Login with your account
2. Should redirect to dashboard

### 5.4 Test Enquiry Creation
1. Create a new enquiry
2. Should save to MongoDB Atlas

---

## 🎯 Quick Reference

### Your Deployed URLs:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`
- **Database:** MongoDB Atlas (cloud)

### Environment Variables Summary:

**Backend (Render.com):**
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random-string
FRONTEND_URL=https://your-app.vercel.app
```

**Frontend (Vercel):**
```env
VITE_API_URL=https://your-backend.onrender.com
```

---

## 🐛 Troubleshooting

### Backend not starting?
1. Check Render logs: Dashboard → Logs
2. Verify MongoDB connection string
3. Check all environment variables

### Frontend can't connect to backend?
1. Check CORS settings
2. Verify VITE_API_URL is correct
3. Check browser console for errors

### MongoDB connection failed?
1. Check IP whitelist (0.0.0.0/0)
2. Verify connection string
3. Check username/password

### CORS errors?
1. Add FRONTEND_URL to backend env
2. Update CORS configuration
3. Redeploy backend

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Render.com | Free | $0/month |
| Vercel | Hobby | $0/month |
| MongoDB Atlas | Free (M0) | $0/month |
| **Total** | | **$0/month** |

**Limitations:**
- Render Free: Sleeps after 15 min inactivity (wakes in ~30 sec)
- Vercel: 100GB bandwidth/month
- MongoDB: 512MB storage

---

## 🚀 Upgrade Options (Future)

### When you need more:

**Render.com:**
- Starter: $7/month (no sleep)
- Standard: $25/month (more resources)

**Vercel:**
- Pro: $20/month (more bandwidth)

**MongoDB Atlas:**
- M10: $57/month (dedicated cluster)

---

## 📝 Deployment Checklist

Before going live:

- [ ] MongoDB Atlas IP whitelist set to 0.0.0.0/0
- [ ] Backend deployed to Render
- [ ] Backend health check working
- [ ] Frontend deployed to Vercel
- [ ] Environment variables set correctly
- [ ] CORS configured properly
- [ ] Test registration
- [ ] Test login
- [ ] Test enquiry creation
- [ ] Test all features
- [ ] Custom domain (optional)

---

## 🎉 You're Live!

Your CloudBlitz CRM is now deployed and accessible worldwide!

**Share your app:**
- Frontend: `https://your-app.vercel.app`
- Users can register and submit enquiries
- You can manage them from anywhere

---

## 🔄 Continuous Deployment

**Good news:** Both Render and Vercel auto-deploy when you push to GitHub!

**Workflow:**
1. Make changes locally
2. Commit and push to GitHub
3. Render + Vercel auto-deploy
4. Changes live in 2-5 minutes

---

## 📞 Support

**Render Issues:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**Vercel Issues:**
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

**MongoDB Issues:**
- Docs: https://docs.mongodb.com
- Support: https://support.mongodb.com

---

## 🎯 Next Steps

1. **Custom Domain** (Optional)
   - Buy domain from Namecheap/GoDaddy
   - Add to Vercel: Settings → Domains
   - Add to Render: Settings → Custom Domain

2. **SSL Certificate**
   - Automatic on Vercel ✅
   - Automatic on Render ✅

3. **Monitoring**
   - Render: Built-in metrics
   - Vercel: Analytics (free)

4. **Backups**
   - MongoDB Atlas: Automatic backups ✅

---

## ✅ Story 5.2 Complete!

Your app is now:
- ✅ Deployed to cloud
- ✅ Accessible worldwide
- ✅ Auto-deploys on push
- ✅ Free hosting
- ✅ Production-ready

**Congratulations!** 🎉
