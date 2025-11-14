# 🚀 GitHub Actions CI/CD Setup Guide

## 📋 Overview

This guide explains how to set up and use the GitHub Actions CI/CD pipeline for CloudBlitz CRM.

---

## 🎯 What the Pipeline Does

### Automated Tasks
1. ✅ **Run Tests** - Backend tests with Jest
2. ✅ **Code Quality** - ESLint checks
3. ✅ **Security Scan** - Vulnerability scanning
4. ✅ **Build Check** - Ensure code builds successfully
5. ✅ **Auto Deploy** - Deploy to Render & Vercel
6. ✅ **Health Check** - Verify deployment success

### Triggers
- **Push to main** - Full pipeline + deployment
- **Push to develop** - Tests only (no deployment)
- **Pull Request** - Tests and checks

---

## 🔧 Setup Instructions

### Step 1: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Actions** → **General**
3. Under "Actions permissions", select:
   - ✅ Allow all actions and reusable workflows
4. Click **Save**

### Step 2: Add GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions**

Click **New repository secret** and add these:

#### Required Secrets:

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `MONGODB_URI_TEST` | `mongodb+srv://...` | Test database connection |
| `JWT_SECRET` | `your-secret-key` | JWT secret for tests |
| `VITE_API_URL` | `https://your-backend.onrender.com` | Backend URL |

#### How to Add Secrets:
```
1. Click "New repository secret"
2. Name: MONGODB_URI_TEST
3. Value: mongodb+srv://username:password@cluster.mongodb.net/cloudblitz-test
4. Click "Add secret"
5. Repeat for other secrets
```

### Step 3: Verify Workflow File

The workflow file is already created at:
```
.github/workflows/ci-cd.yml
```

Check it exists:
```bash
ls -la .github/workflows/
```

### Step 4: Push to GitHub

```bash
git add .github/workflows/ci-cd.yml
git commit -m "feat: Add GitHub Actions CI/CD pipeline"
git push origin main
```

---

## 📊 Pipeline Stages

### Stage 1: Backend Tests
```yaml
Jobs:
- Install dependencies
- Run linting
- Run tests
- Generate coverage report
- Upload coverage

Runs on: Ubuntu Latest
Node versions: 18.x, 20.x
```

### Stage 2: Frontend Tests
```yaml
Jobs:
- Install dependencies
- Run linting
- Build application
- Upload build artifacts

Runs on: Ubuntu Latest
Node versions: 18.x, 20.x
```

### Stage 3: Security Scan
```yaml
Jobs:
- Scan for vulnerabilities
- Check dependencies
- Upload security report

Tool: Trivy Scanner
```

### Stage 4: Code Quality
```yaml
Jobs:
- Run ESLint (backend)
- Run ESLint (frontend)
- Check code standards

Tool: ESLint
```

### Stage 5: Deploy (main branch only)
```yaml
Jobs:
- Deploy backend to Render
- Deploy frontend to Vercel
- Trigger webhooks

Condition: Only on push to main
```

### Stage 6: Health Check
```yaml
Jobs:
- Wait for deployment (60s)
- Check backend health
- Check frontend availability

Runs after: Deployment
```

---

## 🎬 How to Use

### Automatic Deployment

**Push to main branch:**
```bash
git checkout main
git add .
git commit -m "feat: Add new feature"
git push origin main
```

**What happens:**
1. ✅ Tests run automatically
2. ✅ Security scan runs
3. ✅ Code quality check
4. ✅ If all pass → Deploy
5. ✅ Health check runs
6. ✅ Notification sent

### Development Workflow

**Push to develop branch:**
```bash
git checkout develop
git add .
git commit -m "feat: Work in progress"
git push origin develop
```

**What happens:**
1. ✅ Tests run
2. ✅ Security scan
3. ✅ Code quality check
4. ❌ No deployment

### Pull Request Workflow

**Create PR:**
```bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: Add new feature"
git push origin feature/new-feature
# Create PR on GitHub
```

**What happens:**
1. ✅ Tests run on PR
2. ✅ Security scan
3. ✅ Code quality check
4. ✅ Status shown on PR
5. ❌ No deployment

---

## 📈 Viewing Results

### GitHub Actions Tab

1. Go to your repository
2. Click **Actions** tab
3. See all workflow runs

### Workflow Status

**Green ✅** - All checks passed
**Red ❌** - Some checks failed
**Yellow 🟡** - In progress

### View Logs

1. Click on workflow run
2. Click on job name
3. Expand steps to see logs

---

## 🔍 Monitoring

### Check Pipeline Status

**Badge in README:**
```markdown
![CI/CD](https://github.com/Sachin9548/Greamio-Technologies/workflows/CloudBlitz%20CRM%20-%20CI%2FCD%20Pipeline/badge.svg)
```

### Email Notifications

GitHub sends emails for:
- ❌ Failed workflows
- ✅ Fixed workflows (after failure)

### Slack Integration (Optional)

Add Slack webhook to get notifications:
```yaml
- name: Notify Slack
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🐛 Troubleshooting

### Tests Failing

**Check logs:**
1. Go to Actions tab
2. Click failed workflow
3. Click "Backend Tests" or "Frontend Tests"
4. Read error messages

**Common issues:**
- Missing dependencies
- Environment variables not set
- Database connection failed

**Fix:**
```bash
# Run tests locally first
cd backend
npm test

cd frontend
npm run build
```

### Deployment Failing

**Check:**
1. Render.com dashboard
2. Vercel dashboard
3. GitHub Actions logs

**Common issues:**
- Environment variables missing
- Build errors
- Connection timeout

### Security Scan Failing

**Check:**
1. View security report
2. Update vulnerable packages
3. Run locally:
```bash
npm audit
npm audit fix
```

---

## ⚙️ Customization

### Change Node Version

Edit `.github/workflows/ci-cd.yml`:
```yaml
strategy:
  matrix:
    node-version: [18.x, 20.x, 22.x]  # Add more versions
```

### Add More Tests

Edit workflow:
```yaml
- name: Run integration tests
  run: npm run test:integration
```

### Add Deployment Notifications

Add to workflow:
```yaml
- name: Send email
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: Deployment Successful
    body: CloudBlitz CRM deployed successfully!
    to: admin@example.com
```

---

## 📊 Pipeline Performance

### Typical Run Times

| Stage | Duration |
|-------|----------|
| Backend Tests | 2-3 minutes |
| Frontend Tests | 1-2 minutes |
| Security Scan | 1-2 minutes |
| Code Quality | 1 minute |
| Deployment | 3-5 minutes |
| Health Check | 1 minute |
| **Total** | **9-14 minutes** |

### Optimization Tips

1. **Cache dependencies:**
```yaml
- uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

2. **Run jobs in parallel:**
```yaml
jobs:
  test-backend:
    # runs in parallel
  test-frontend:
    # runs in parallel
```

3. **Skip unnecessary steps:**
```yaml
- name: Skip on docs changes
  if: "!contains(github.event.head_commit.message, '[skip ci]')"
```

---

## 🎯 Best Practices

### Commit Messages

Use conventional commits:
```bash
feat: Add new feature
fix: Fix bug
docs: Update documentation
test: Add tests
chore: Update dependencies
```

### Branch Protection

Enable on main branch:
1. Settings → Branches
2. Add rule for `main`
3. Require status checks to pass
4. Require pull request reviews

### Environment Separation

Use different secrets for:
- Development
- Staging
- Production

---

## 📝 Checklist

### Initial Setup
- [ ] GitHub Actions enabled
- [ ] Secrets added
- [ ] Workflow file committed
- [ ] First workflow run successful

### Regular Maintenance
- [ ] Check workflow runs weekly
- [ ] Update dependencies monthly
- [ ] Review security scans
- [ ] Monitor deployment success rate

### Before Production
- [ ] All tests passing
- [ ] Security scan clean
- [ ] Health checks working
- [ ] Notifications configured

---

## 🆘 Support

### GitHub Actions Documentation
- https://docs.github.com/en/actions

### Common Issues
- Check [ISSUES_FIXED.md](ISSUES_FIXED.md)
- Search GitHub Actions community

### Get Help
- GitHub Issues: Create issue with `ci/cd` label
- GitHub Discussions: Ask in community

---

## 🎉 Success Indicators

Your CI/CD is working when:
- ✅ Green checkmarks on commits
- ✅ Automatic deployments working
- ✅ Tests running on every push
- ✅ Security scans passing
- ✅ Health checks successful

---

**Version:** 1.0.0  
**Last Updated:** January 2025  
**Status:** Production Ready ✅
