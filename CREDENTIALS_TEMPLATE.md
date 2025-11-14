# 🔑 CloudBlitz CRM - Credentials & Access

## 📋 Deployment Information

### Project URLs
```
Frontend URL: https://greamio-technologies-iw5cq2t9i.vercel.app
Backend URL:  https://greamio-technologies.onrender.com
GitHub Repo:  https://github.com/Sachin9548/Greamio-Technologies
```

---

## 👤 Admin Credentials

### Primary Admin Account
```
Email:    _____________________@___________.com
Password: _____________________________
Role:     admin
Created:  ___/___/2025
```

### How to Create Admin:
1. Register via frontend
2. Login to MongoDB Atlas
3. Run command:
```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

---

## 🗄️ Database Access

### MongoDB Atlas
```
Cluster URL:  https://cloud.mongodb.com
Cluster Name: _____________________
Database:     cloudblitz
Username:     _____________________
Password:     _____________________
Connection:   mongodb+srv://_______________
```

### Access Steps:
1. Go to https://cloud.mongodb.com
2. Login with your account
3. Select cluster
4. Click "Connect" → "Connect your application"
5. Copy connection string

---

## ☁️ Backend Server (Render.com)

### Service Information
```
Service Name: cloudblitz-backend
Service URL:  https://greamio-technologies.onrender.com
Dashboard:    https://dashboard.render.com
Plan:         Free (or Starter/Standard)
Region:       _____________________
```

### Environment Variables
```
PORT:         5000
NODE_ENV:     production
MONGODB_URI:  mongodb+srv://_______________
JWT_SECRET:   _____________________________
```

### Access:
1. Go to https://dashboard.render.com
2. Login with GitHub
3. Select "cloudblitz-backend" service
4. View logs, metrics, settings

---

## 🎨 Frontend (Vercel)

### Project Information
```
Project Name: cloudblitz-frontend
Project URL:  https://greamio-technologies-iw5cq2t9i.vercel.app
Dashboard:    https://vercel.com/dashboard
Plan:         Hobby (Free)
```

### Environment Variables
```
VITE_API_URL: https://greamio-technologies.onrender.com
```

### Access:
1. Go to https://vercel.com/dashboard
2. Login with GitHub
3. Select "cloudblitz-frontend" project
4. View deployments, analytics, settings

---

## 🧪 Test Accounts

### Admin Account
```
Email:    Admin@example.com
Password: Admin@123
Role:     admin
Access:   Full system access, user management
```

### Staff Account
```
Email:    Staff@example.com
Password: Staff@123
Role:     staff
Access:   View & manage all enquiries
```

### Regular User Accounts
```
User 1:
Email:    john@example.com
Password: password123
Role:     user
Access:   Own enquiries only

User 2:
Email:    user@example.com
Password: User@123
Role:     user
Access:   Own enquiries only
```

---

## 🔐 API Keys & Secrets

### JWT Secret
```
JWT_SECRET: _____________________________
Expiry:     7 days
Algorithm:  HS256
```

### MongoDB Credentials
```
Username: _____________________
Password: _____________________________
```

---

## 📊 Monitoring & Logs

### Backend Logs (Render)
```
URL: https://dashboard.render.com/web/[service-id]/logs
Access: Real-time logs
Retention: 7 days (Free plan)
```

### Frontend Analytics (Vercel)
```
URL: https://vercel.com/[username]/[project]/analytics
Metrics: Page views, visitors, performance
```

### Database Monitoring (MongoDB Atlas)
```
URL: https://cloud.mongodb.com/[org]/[project]/metrics
Metrics: Connections, operations, storage
```

---

## 🔄 Continuous Deployment

### Auto-Deploy Triggers
```
GitHub Branch: main
Backend:       Auto-deploys on push to main
Frontend:      Auto-deploys on push to main
Build Time:    2-5 minutes
```

### Manual Deploy
```
Backend:  Render Dashboard → Manual Deploy
Frontend: Vercel Dashboard → Redeploy
```

---

## 🛠️ SSH/Server Access

### Render.com (No SSH Access)
```
Note: Render free tier doesn't provide SSH access
Access: Via dashboard only
Logs: Available in dashboard
Shell: Not available on free tier
```

### Alternative Access
```
Method: Render Dashboard
URL:    https://dashboard.render.com
Access: View logs, restart service, update env vars
```

---

## 📞 Support Contacts

### Technical Support
```
GitHub Issues: https://github.com/Sachin9548/Greamio-Technologies/issues
Email:         _____________________@___________.com
Phone:         _____________________
```

### Service Providers
```
Render Support:  https://render.com/support
Vercel Support:  https://vercel.com/support
MongoDB Support: https://support.mongodb.com
```

---

## 🔒 Security Notes

### Important Reminders
- ⚠️ Never commit .env files to GitHub
- ⚠️ Change default passwords immediately
- ⚠️ Use strong passwords (16+ characters)
- ⚠️ Enable 2FA on all accounts
- ⚠️ Rotate JWT secret every 90 days
- ⚠️ Monitor access logs regularly
- ⚠️ Keep dependencies updated

### Password Requirements
```
Minimum Length: 6 characters (increase to 12+ for production)
Complexity:     Mix of letters, numbers, symbols
Expiry:         Change every 90 days
Storage:        Never store in plain text
```

---

## 📝 Change Log

### Credential Changes
```
Date: ___/___/2025
Changed: _____________________
Reason:  _____________________
Updated By: _____________________

Date: ___/___/2025
Changed: _____________________
Reason:  _____________________
Updated By: _____________________
```

---

## ✅ Access Verification Checklist

- [ ] Frontend URL accessible
- [ ] Backend URL accessible
- [ ] API health check working
- [ ] Admin login successful
- [ ] Database connection working
- [ ] Can create enquiry
- [ ] Can view enquiries
- [ ] Can edit enquiry
- [ ] Can delete enquiry
- [ ] User management accessible (admin)
- [ ] All permissions working correctly
- [ ] Email notifications (if configured)
- [ ] Logs accessible
- [ ] Monitoring working

---

## 🎯 Quick Access Links

### Production
- Frontend: https://greamio-technologies-iw5cq2t9i.vercel.app
- Backend API: https://greamio-technologies.onrender.com/api/health
- Admin Panel: https://greamio-technologies-iw5cq2t9i.vercel.app/users

### Development
- Local Frontend: http://localhost:5173
- Local Backend: http://localhost:5000
- API Docs: http://localhost:5000/api/health

### Dashboards
- Render: https://dashboard.render.com
- Vercel: https://vercel.com/dashboard
- MongoDB: https://cloud.mongodb.com

### Repository
- GitHub: https://github.com/Sachin9548/Greamio-Technologies
- Issues: https://github.com/Sachin9548/Greamio-Technologies/issues

---

**Last Updated:** ___/___/2025  
**Updated By:** _____________________  
**Version:** 1.0.0  

**⚠️ CONFIDENTIAL - Do not share publicly**
