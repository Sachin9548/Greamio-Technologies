# Permission System - CloudBlitz CRM

## 🔒 Role-Based Access Control

### **Admin Role**
Full system access with all permissions.

**Can:**
- ✅ View all enquiries
- ✅ Create enquiries
- ✅ Edit all enquiries
- ✅ Delete all enquiries
- ✅ Assign enquiries to staff
- ✅ Manage users (create, edit, delete)
- ✅ Access user management page
- ✅ Change user roles

**Cannot:**
- ❌ Nothing - full access

---

### **Staff Role**
Team members who handle enquiries.

**Can:**
- ✅ View all enquiries
- ✅ Create enquiries
- ✅ Edit all enquiries
- ✅ Delete all enquiries
- ✅ Be assigned enquiries
- ✅ Change enquiry status

**Cannot:**
- ❌ Access user management
- ❌ Create/edit/delete users
- ❌ Change user roles

---

### **User Role**
Regular users with limited access.

**Can:**
- ✅ View their own enquiries only
- ✅ Create new enquiries
- ✅ Edit their own enquiries
- ✅ Delete their own enquiries

**Cannot:**
- ❌ View other users' enquiries
- ❌ Edit other users' enquiries
- ❌ Delete other users' enquiries
- ❌ Access user management
- ❌ Assign enquiries
- ❌ See "Manage Users" button

---

## 📋 Permission Matrix

| Action | Admin | Staff | User |
|--------|-------|-------|------|
| View all enquiries | ✅ | ✅ | ❌ |
| View own enquiries | ✅ | ✅ | ✅ |
| Create enquiry | ✅ | ✅ | ✅ |
| Edit all enquiries | ✅ | ✅ | ❌ |
| Edit own enquiries | ✅ | ✅ | ✅ |
| Delete all enquiries | ✅ | ✅ | ❌ |
| Delete own enquiries | ✅ | ✅ | ✅ |
| Assign to staff | ✅ | ✅ | ❌ |
| View users | ✅ | ❌ | ❌ |
| Create users | ✅ | ❌ | ❌ |
| Edit users | ✅ | ❌ | ❌ |
| Delete users | ✅ | ❌ | ❌ |

---

## 🎯 Use Cases

### **Scenario 1: Customer Support Team**

**Setup:**
- 1 Admin (Manager)
- 5 Staff (Support agents)
- 0 Regular users

**Workflow:**
1. Customer submits enquiry (via form/email)
2. Admin assigns to available staff
3. Staff handles enquiry
4. Staff updates status
5. Staff closes enquiry

**Result:** Efficient team collaboration

---

### **Scenario 2: Self-Service Portal**

**Setup:**
- 1 Admin (System admin)
- 2 Staff (Support team)
- 100 Users (Customers)

**Workflow:**
1. Customer registers as User
2. Customer creates enquiry
3. Admin assigns to Staff
4. Staff resolves enquiry
5. Customer can view status

**Result:** Customers track their own enquiries

---

### **Scenario 3: Internal Helpdesk**

**Setup:**
- 1 Admin (IT Manager)
- 3 Staff (IT Support)
- 50 Users (Employees)

**Workflow:**
1. Employee creates IT ticket (enquiry)
2. IT Manager assigns to technician
3. Technician resolves issue
4. Employee sees only their tickets

**Result:** Organized IT support

---

## 🔐 Security Implementation

### **Backend Protection**

**Authentication Middleware:**
```javascript
// Checks if user is logged in
authenticate(req, res, next)
```

**Authorization Middleware:**
```javascript
// Checks user role
authorize('admin', 'staff')(req, res, next)
```

**Ownership Check:**
```javascript
// Regular users can only access their own data
if (req.userRole === 'user' && enquiry.createdBy !== req.userId) {
  return res.status(403).json({ error: 'Access denied' });
}
```

### **Frontend Protection**

**Route Protection:**
```javascript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

**Conditional Rendering:**
```javascript
{user?.role === 'admin' && (
  <button>Manage Users</button>
)}
```

**Action Buttons:**
```javascript
{(user?.role === 'admin' || 
  user?.role === 'staff' || 
  enquiry.createdBy === user?.id) && (
  <button>Edit</button>
)}
```

---

## ✅ Testing Permissions

### **Test as Admin**
1. Login as admin
2. ✅ Should see all enquiries
3. ✅ Should see "Manage Users" button
4. ✅ Can edit any enquiry
5. ✅ Can delete any enquiry
6. ✅ Can access /users page

### **Test as Staff**
1. Login as staff
2. ✅ Should see all enquiries
3. ❌ Should NOT see "Manage Users" button
4. ✅ Can edit any enquiry
5. ✅ Can delete any enquiry
6. ❌ Cannot access /users page (redirected)

### **Test as User**
1. Login as regular user
2. ✅ Should see only own enquiries
3. ❌ Should NOT see "Manage Users" button
4. ✅ Can edit own enquiries
5. ❌ Cannot edit others' enquiries (no button)
6. ✅ Can delete own enquiries
7. ❌ Cannot delete others' enquiries (no button)
8. ❌ Cannot access /users page (redirected)

---

## 🚨 Error Messages

### **403 Forbidden**
```json
{
  "error": "You can only edit your own enquiries"
}
```

**When:** User tries to edit someone else's enquiry

### **403 Access Denied**
```json
{
  "error": "Access denied"
}
```

**When:** Non-admin tries to access user management

### **401 Unauthorized**
```json
{
  "error": "No token provided"
}
```

**When:** Not logged in

---

## 🎨 UI Indicators

### **Role Badge**
- Admin: Red badge
- Staff: Blue badge
- User: Gray badge

### **Action Buttons**
- View: Always visible (everyone can view)
- Edit: Only if admin/staff OR owner
- Delete: Only if admin/staff OR owner

### **Navigation**
- "Manage Users": Only visible to admin

---

## 📝 Best Practices

### **For Admins:**
1. Create staff accounts for team members
2. Assign enquiries to appropriate staff
3. Monitor team performance
4. Don't share admin credentials

### **For Staff:**
1. Handle assigned enquiries promptly
2. Update status regularly
3. Close resolved enquiries
4. Don't delete enquiries unnecessarily

### **For Users:**
1. Create clear, detailed enquiries
2. Check status regularly
3. Don't create duplicate enquiries
4. Update if situation changes

---

## 🔄 Changing User Roles

### **Via User Management (Admin Only)**
1. Go to "Manage Users"
2. Click "Edit" on user
3. Change role dropdown
4. Click "Update User"

### **Via MongoDB (Direct)**
```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "staff" } }
)
```

---

## 🎯 Summary

The permission system ensures:
- ✅ Data privacy (users see only their data)
- ✅ Role separation (clear responsibilities)
- ✅ Security (proper access control)
- ✅ Accountability (track who created what)
- ✅ Flexibility (easy to change roles)

This is a **production-ready** permission system suitable for real-world applications.
