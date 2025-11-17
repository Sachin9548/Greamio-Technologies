# 🚀 CI/CD Pipeline - CloudBlitz CRM

## Overview

This project uses **GitHub Actions** for Continuous Integration and Continuous Deployment (CI/CD). The pipeline automatically tests and deploys your application when code is pushed to the repository.

## 📋 Pipeline Structure

### 1. **Backend Pipeline** (`backend-deploy.yml`)
- **Triggers:** Push to `main`/`develop` branches (backend changes only)
- **Steps:**
  - ✅ Run backend tests
  - ✅ Check code quality
  - 🚀 Auto-deploy to Render.com

### 2. **Frontend Pipeline** (`frontend-deploy.yml`)
- **Triggers:** Push to `main`/`develop` branches (frontend changes only)
- **Steps:**
  - ✅ Run linting
  - ✅ Build application
  - 🚀 Auto-deploy to Vercel

### 3. **Full Stack Pipeline** (`full-stack-ci.yml`)
- **Triggers:** Push to `main` branch (any changes)
- **Steps:**
  - ✅ Test both backend and frontend
  - ✅ Build applications
  - 🚀 Deploy both applications
  - ✅ Run health checks

## 🔧 Setup Instructions

### 1. GitHub Secrets Configuration

Add these secrets to your GitHub repository:

**Go to:** `GitHub Repository → Settings → Secrets and Variables → Actions`

**Required Secrets:**
```
MONGODB_URI_TEST=mongodb+srv://your-test-db-connection
JWT_SECRET=your-super-secure-jwt-secret-key
```

### 2. Automatic Deployment Setup

**Backend (Render.com):**
- ✅ Already configured to auto-deploy from GitHub
- ✅ Deploys when `main` branch is updated
- ✅ URL: https://greamio-technologies.onrender.com

**Frontend (Vercel):**
- ✅ Already configured to auto-deploy from GitHub
- ✅ Deploys when `main` branch is updated
- ✅ URL: https://greamio-technologies.vercel.app

## 🔄 Workflow Process

### Development Workflow:
```
1. Developer pushes code to `develop` branch
   ↓
2. GitHub Actions runs tests
   ↓
3. If tests pass, code is ready for merge
   ↓
4. Create Pull Request to `main`
   ↓
5. After review, merge to `main`
   ↓
6. Auto-deployment triggers
   ↓
7. Applications are live!
```

### Branch Strategy:
- **`develop`** - Development branch (runs tests only)
- **`main`** - Production branch (runs tests + deployment)

## 📊 Pipeline Status

You can monitor pipeline status at:
- **GitHub Actions:** https://github.com/Sachin9548/Greamio-Technologies/actions

### Pipeline Badges:
Add these to your README for status visibility:

```markdown
![Backend CI/CD](https://github.com/Sachin9548/Greamio-Technologies/workflows/Backend%20CI/CD%20Pipeline/badge.svg)
![Frontend CI/CD](https://github.com/Sachin9548/Greamio-Technologies/workflows/Frontend%20CI/CD%20Pipeline/badge.svg)
```

## 🛠️ Manual Deployment

If you need to deploy manually:

**Backend:**
```bash
# Render auto-deploys from GitHub
# Or trigger manual deploy from Render dashboard
```

**Frontend:**
```bash
# Vercel auto-deploys from GitHub
# Or trigger manual deploy from Vercel dashboard
```

## 🔍 Health Checks

The pipeline includes automatic health checks:

**Backend Health Check:**
```bash
curl https://greamio-technologies.onrender.com/api/health
```

**Frontend Health Check:**
```bash
curl https://greamio-technologies.vercel.app
```

## 📝 Pipeline Configuration Files

- **`.github/workflows/backend-deploy.yml`** - Backend CI/CD
- **`.github/workflows/frontend-deploy.yml`** - Frontend CI/CD
- **`.github/workflows/full-stack-ci.yml`** - Full stack CI/CD

## 🚨 Troubleshooting

### Common Issues:

**1. Tests Failing:**
```bash
# Check test logs in GitHub Actions
# Fix failing tests before merging
```

**2. Deployment Failing:**
```bash
# Check Render/Vercel logs
# Verify environment variables
# Check build configuration
```

**3. Health Check Failing:**
```bash
# Wait for deployment to complete (can take 2-3 minutes)
# Check application logs
# Verify URLs are correct
```

## 🎯 Benefits

✅ **Automated Testing** - Catch bugs before deployment  
✅ **Consistent Deployments** - Same process every time  
✅ **Fast Feedback** - Know immediately if something breaks  
✅ **Zero Downtime** - Automatic deployments  
✅ **Quality Assurance** - Code must pass tests to deploy  

## 📈 Next Steps

**Enhancements you can add:**
- Slack/Discord notifications
- Performance testing
- Security scanning
- Database migrations
- Staging environment
- Blue-green deployments

---

**Your CI/CD pipeline is now ready! 🎉**

Every push to `main` will automatically test and deploy your application.