# Docker Setup Guide - CloudBlitz CRM

## 📦 What's Included

- ✅ Backend Dockerfile (Node.js)
- ✅ Frontend Dockerfile (React + Nginx)
- ✅ Docker Compose (Full stack)
- ✅ Nginx configuration
- ✅ Production-ready setup

## 🎯 For MongoDB Atlas Users (You!)

Since you're using MongoDB Atlas, you **DON'T need to install Docker** for development!

### Why?
- ✅ MongoDB is already in the cloud (Atlas)
- ✅ You can run backend/frontend locally without Docker
- ✅ Docker files are here for deployment/production use

---

## 🚀 Option 1: Run Without Docker (Recommended for You)

### Current Setup (What you're doing now):
```bash
# Terminal 1 - Backend
cd backend
node server.js

# Terminal 2 - Frontend
cd frontend
npm run dev
```

**This works perfectly with MongoDB Atlas!** ✅

---

## 🐳 Option 2: Run With Docker (Optional)

If you want to use Docker in the future:

### Prerequisites
1. Install Docker Desktop:
   - Windows: https://docs.docker.com/desktop/install/windows-install/
   - Mac: https://docs.docker.com/desktop/install/mac-install/

### Setup Steps

**1. Create .env file in root directory:**
```env
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/cloudblitz
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=production
```

**2. Build and run:**
```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**3. Access application:**
- Frontend: http://localhost
- Backend: http://localhost:5000

---

## 📋 Docker Commands Reference

### Build
```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
```

### Run
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up backend

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Stop
```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Manage
```bash
# List running containers
docker-compose ps

# Restart service
docker-compose restart backend

# Execute command in container
docker-compose exec backend sh
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│           Docker Compose                │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────┐    ┌──────────────┐ │
│  │   Frontend   │    │   Backend    │ │
│  │  (Nginx)     │───▶│  (Node.js)   │ │
│  │  Port: 80    │    │  Port: 5000  │ │
│  └──────────────┘    └──────────────┘ │
│                            │           │
└────────────────────────────┼───────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │  MongoDB Atlas  │
                    │     (Cloud)     │
                    └─────────────────┘
```

---

## 🔧 Configuration Files

### Backend Dockerfile
- Base: Node.js 20 Alpine
- Production dependencies only
- Exposes port 5000

### Frontend Dockerfile
- Multi-stage build
- Build stage: Node.js
- Production stage: Nginx
- Optimized for performance

### Nginx Configuration
- SPA routing support
- Gzip compression
- Static asset caching
- Security headers

---

## 🌐 Environment Variables

### Required for Docker:
```env
MONGODB_URI=mongodb+srv://...    # Your Atlas connection
JWT_SECRET=random-secret-key     # Change this!
PORT=5000                        # Backend port
NODE_ENV=production              # Environment
```

### Get MongoDB Atlas URI:
1. Go to MongoDB Atlas dashboard
2. Click "Connect"
3. Choose "Connect your application"
4. Copy connection string
5. Replace `<password>` with your password

---

## 🚀 Deployment Options

### Option 1: Cloud Platforms (Easiest)
- **Backend:** Render.com, Railway, Heroku
- **Frontend:** Vercel, Netlify
- **Database:** MongoDB Atlas (already set up)

### Option 2: VPS with Docker
- DigitalOcean, AWS EC2, Linode
- Install Docker on server
- Clone repo and run docker-compose

### Option 3: Container Services
- AWS ECS, Google Cloud Run
- Azure Container Instances

---

## ✅ Benefits of Docker

### For Development:
- ✅ Consistent environment
- ✅ Easy setup for new developers
- ✅ Isolated dependencies

### For Production:
- ✅ Scalable
- ✅ Easy deployment
- ✅ Portable across platforms

---

## 🎯 Your Current Status

**What you have:**
- ✅ Docker files created
- ✅ MongoDB Atlas configured
- ✅ Running locally without Docker

**What you need:**
- ❌ Docker installation (optional)
- ✅ Ready for cloud deployment

---

## 📝 Next Steps

### For You (MongoDB Atlas User):

**Option A: Keep Current Setup (Recommended)**
```bash
# Continue running locally
cd backend && node server.js
cd frontend && npm run dev
```

**Option B: Deploy to Cloud (Next)**
- Deploy backend to Render.com
- Deploy frontend to Vercel
- Use existing MongoDB Atlas

**Option C: Install Docker (Optional)**
- Install Docker Desktop
- Run: `docker-compose up -d`
- Access at http://localhost

---

## 🆘 Troubleshooting

### Docker not starting?
```bash
# Check Docker is running
docker --version

# Check services
docker-compose ps

# View logs
docker-compose logs
```

### Connection issues?
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0)
- Verify connection string in .env
- Check network connectivity

### Build errors?
```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 🎉 Summary

**For MongoDB Atlas users:**
- ✅ Docker files are ready (for future/production)
- ✅ You don't need Docker for local development
- ✅ Ready to deploy to cloud platforms

**Next:** Deploy to Render + Vercel (Story 5.2)
