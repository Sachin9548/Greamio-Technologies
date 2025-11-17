# 🚀 CloudBlitz CRM - Quick Start Guide

## 🌐 Live Application

**Frontend:** https://greamio-technologies.vercel.app  
**Backend API:** https://greamio-technologies.onrender.com

---

## 👤 Test Accounts

### 🔴 Admin Account (Full Access)
```
Email:    Admin@example.com
Password: Admin@123
```
**Can do:**
- ✅ View all enquiries
- ✅ Edit all enquiries
- ✅ Delete all enquiries
- ✅ Manage users
- ✅ Assign enquiries to staff

---

### 🔵 Staff Account (Enquiry Management)
```
Email:    Staff@example.com
Password: Staff@123
```
**Can do:**
- ✅ View all enquiries
- ✅ Edit all enquiries
- ✅ Delete all enquiries
- ❌ Cannot manage users

---

### 🟢 Regular User Accounts (Own Enquiries Only)

**User 1:**
```
Email:    john@example.com
Password: password123
```

**User 2:**
```
Email:    user@example.com
Password: User@123
```

**Can do:**
- ✅ View own enquiries only
- ✅ Create enquiries
- ✅ Edit own enquiries
- ✅ Delete own enquiries
- ❌ Cannot view others' enquiries
- ❌ Cannot manage users

---

## 🧪 How to Test

### 1. Test as Admin
1. Go to: https://greamio-technologies.vercel.app
2. Click "Track My Enquiry" (Login)
3. Login with: `Admin@example.com` / `Admin@123`
4. ✅ You should see all enquiries
5. ✅ Click "👥 Manage Users" - should work
6. ✅ Try editing any enquiry - should work

### 2. Test as Staff
1. Logout (click Logout button)
2. Login with: `Staff@example.com` / `Staff@123`
3. ✅ You should see all enquiries
4. ❌ "Manage Users" button should NOT appear
5. ✅ Try editing any enquiry - should work

### 3. Test as Regular User
1. Logout
2. Login with: `john@example.com` / `password123`
3. ✅ You should see ONLY your own enquiries
4. ❌ Cannot see other users' enquiries
5. ❌ "Manage Users" button should NOT appear
6. ✅ Can create new enquiry
7. ✅ Can edit your own enquiry

### 4. Test Registration
1. Logout
2. Click "Submit Enquiry" (Register)
3. Create new account
4. ✅ Should redirect to dashboard
5. ✅ Should see empty enquiry list
6. ✅ Can create first enquiry

---

## 🎯 Features to Test

### ✅ Authentication
- [x] Login with valid credentials
- [x] Login with wrong password (should fail)
- [x] Register new account
- [x] Logout

### ✅ Enquiry Management
- [x] Create new enquiry
- [x] View enquiry details
- [x] Edit enquiry
- [x] Delete enquiry
- [x] Search enquiries
- [x] Filter by status (All, New, In Progress, Closed)

### ✅ User Management (Admin Only)
- [x] View all users
- [x] Create new user
- [x] Edit user
- [x] Delete user
- [x] Assign roles

### ✅ Permissions
- [x] Admin can see all enquiries
- [x] Staff can see all enquiries
- [x] Regular user sees only own enquiries
- [x] Admin can access user management
- [x] Staff cannot access user management
- [x] Regular user cannot access user management

---

## 🔗 Quick Links

### For Testing
- **Login:** https://greamio-technologies.vercel.app/login
- **Register:** https://greamio-technologies.vercel.app/register
- **Dashboard:** https://greamio-technologies.vercel.app/dashboard
- **User Management:** https://greamio-technologies.vercel.app/users

### API Testing
- **Health Check:** https://greamio-technologies.onrender.com/api/health
- **API Base:** https://greamio-technologies.onrender.com/api

---

## 📱 Mobile Testing

Test on different devices:
- 📱 Mobile (375px)
- 📱 Tablet (768px)
- 💻 Desktop (1920px)

All features should work on all screen sizes!

---

## 🐛 Known Behaviors

### Backend Sleep (Render Free Tier)
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds to wake up
- Subsequent requests are fast

**If you see slow loading:**
1. Wait 30 seconds
2. Refresh page
3. Should work normally

---

## 💡 Tips

1. **Use Admin account** to see full features
2. **Create test enquiries** to see dashboard in action
3. **Try all filters** (All, New, In Progress, Closed)
4. **Test search** by typing customer name
5. **Assign enquiries** to staff members (as admin)

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/Sachin9548/Greamio-Technologies/issues)
- **Documentation:** Check `docs/` folder
- **API Docs:** [docs/API.md](docs/API.md)

---

**Happy Testing! 🎉**
