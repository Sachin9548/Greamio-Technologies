# 🚀 CI/CD Setup Guide

## Quick Setup Instructions

### 1. Configure GitHub Secrets

**Go to your GitHub repository:**
```
https://github.com/Sachin9548/Greamio-Technologies/settings/secrets/actions
```

**Add these secrets:**

| Secret Name | Value | Description |
|-------------|-------|-------------|
| `MONGODB_URI_TEST` | `mongodb+srv://...` | Test database connection |
| `JWT_SECRET` | `your-secure-secret` | JWT signing secret |

### 2. Generate Strong JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

### 3. Test Database Setup

For testing, you can either:
- Use the same MongoDB Atlas database
- Create a separate test database
- Use MongoDB Memory Server (recommended for CI)

### 4. Verify Setup

After adding secrets, push any change to trigger the pipeline:

```bash
git add .
git commit -m "Setup CI/CD pipeline"
git push origin main
```

### 5. Monitor Pipeline

Check the pipeline status at:
```
https://github.com/Sachin9548/Greamio-Technologies/actions
```

## 🎉 That's it!

Your CI/CD pipeline is now configured and will automatically:
- ✅ Run tests on every push
- ✅ Deploy to production on main branch
- ✅ Provide deployment status
- ✅ Run health checks

## 🔧 Advanced Configuration

### Environment-specific Deployments

You can add staging environments by:
1. Creating a `staging` branch
2. Setting up staging deployments
3. Configuring environment-specific secrets

### Notifications

Add Slack/Discord notifications by adding webhook secrets and updating the workflow files.

### Security Scanning

Add security scanning steps to the pipeline for enhanced security.