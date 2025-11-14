# Testing Guide - CloudBlitz Enquiry Management System

## ✅ Complete Testing Checklist

### **1. Authentication Testing**

#### Register New User
- [ ] Open http://localhost:5173/register
- [ ] Fill form with valid data
- [ ] Check: Success message appears
- [ ] Check: Redirects to login page
- [ ] Try: Register with same email (should fail)
- [ ] Try: Password less than 6 characters (should fail)
- [ ] Try: Invalid email format (should fail)

#### Login
- [ ] Open http://localhost:5173/login
- [ ] Enter correct credentials
- [ ] Check: Success message
- [ ] Check: Redirects to dashboard
- [ ] Try: Wrong password (should fail)
- [ ] Try: Non-existent email (should fail)
- [ ] Check: Token stored in localStorage

#### Logout
- [ ] Click logout button
- [ ] Check: Redirects to login
- [ ] Check: Token removed from localStorage
- [ ] Try: Access /dashboard (should redirect to login)

---

### **2. Enquiry Management Testing**

#### Create Enquiry
- [ ] Click "+ Add Enquiry" button
- [ ] Fill all fields
- [ ] Check: Success toast notification
- [ ] Check: Enquiry appears in table
- [ ] Check: Status is "new"
- [ ] Try: Submit with empty fields (should fail)
- [ ] Try: Phone with letters (should fail)
- [ ] Try: Message less than 10 chars (should fail)

#### View Enquiry
- [ ] Click "View" on any enquiry
- [ ] Check: Modal opens
- [ ] Check: All details displayed correctly
- [ ] Check: Timestamps shown
- [ ] Check: Assigned user shown (if assigned)
- [ ] Click "Close"
- [ ] Check: Modal closes

#### Edit Enquiry
- [ ] Click "Edit" on any enquiry
- [ ] Change customer name
- [ ] Change status to "in-progress"
- [ ] Assign to a staff member
- [ ] Click "Update"
- [ ] Check: Success toast
- [ ] Check: Changes reflected in table
- [ ] Check: Status badge color changed

#### Delete Enquiry
- [ ] Click "Delete" on any enquiry
- [ ] Check: Confirmation dialog appears
- [ ] Click "OK"
- [ ] Check: Success toast
- [ ] Check: Enquiry removed from table
- [ ] Check: Enquiry not in database (soft deleted)

#### Search Functionality
- [ ] Type customer name in search
- [ ] Check: Filtered results shown
- [ ] Type email in search
- [ ] Check: Correct enquiry found
- [ ] Type phone in search
- [ ] Check: Correct enquiry found
- [ ] Clear search
- [ ] Check: All enquiries shown

#### Filter by Status
- [ ] Click "All" tab
- [ ] Check: All enquiries shown
- [ ] Click "New" tab
- [ ] Check: Only new enquiries shown
- [ ] Click "In Progress" tab
- [ ] Check: Only in-progress enquiries shown
- [ ] Click "Closed" tab
- [ ] Check: Only closed enquiries shown
- [ ] Check: Tab counts are correct

---

### **3. User Management Testing (Admin Only)**

#### Access Control
- [ ] Login as non-admin user
- [ ] Check: "Manage Users" button NOT visible
- [ ] Try: Access /users directly
- [ ] Check: Redirected to dashboard
- [ ] Login as admin
- [ ] Check: "Manage Users" button visible

#### Create User
- [ ] Click "Manage Users"
- [ ] Click "+ Add User"
- [ ] Fill all fields
- [ ] Select role (staff/admin/user)
- [ ] Click "Create User"
- [ ] Check: Success toast
- [ ] Check: User appears in table
- [ ] Try: Create with existing email (should fail)
- [ ] Try: Password less than 6 chars (should fail)

#### Edit User
- [ ] Click "Edit" on any user
- [ ] Change name
- [ ] Change role
- [ ] Leave password blank
- [ ] Click "Update"
- [ ] Check: Success toast
- [ ] Check: Changes reflected
- [ ] Try: Edit with new password
- [ ] Check: Password updated

#### Delete User
- [ ] Click "Delete" on any user
- [ ] Check: Confirmation dialog
- [ ] Click "OK"
- [ ] Check: Success toast
- [ ] Check: User removed from table
- [ ] Try: Delete yourself (should be disabled)

---

### **4. Responsive Design Testing**

#### Desktop (1920x1080)
- [ ] Check: All elements visible
- [ ] Check: Tables not overflowing
- [ ] Check: Modals centered
- [ ] Check: No horizontal scroll

#### Tablet (768x1024)
- [ ] Check: Layout adjusts
- [ ] Check: Tables scrollable
- [ ] Check: Modals fit screen
- [ ] Check: Buttons accessible

#### Mobile (375x667)
- [ ] Check: Header stacks properly
- [ ] Check: Tables scroll horizontally
- [ ] Check: Modals full width
- [ ] Check: Forms usable
- [ ] Check: All buttons clickable

---

### **5. API Testing (Postman/Thunder Client)**

#### Health Check
```
GET http://localhost:5000/api/health
Expected: 200 OK, { status: 'success' }
```

#### Register
```
POST http://localhost:5000/api/auth/register
Body: {
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
Expected: 201 Created
```

#### Login
```
POST http://localhost:5000/api/auth/login
Body: {
  "email": "test@example.com",
  "password": "password123"
}
Expected: 200 OK, returns token
```

#### Get Enquiries
```
GET http://localhost:5000/api/enquiries
Headers: Authorization: Bearer YOUR_TOKEN
Expected: 200 OK, array of enquiries
```

#### Create Enquiry
```
POST http://localhost:5000/api/enquiries
Headers: Authorization: Bearer YOUR_TOKEN
Body: {
  "customerName": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "I need help with my order"
}
Expected: 201 Created
```

---

### **6. Security Testing**

#### Authentication
- [ ] Try: Access /dashboard without login
- [ ] Check: Redirected to login
- [ ] Try: Access API without token
- [ ] Check: 401 Unauthorized
- [ ] Try: Use expired token
- [ ] Check: 401 Unauthorized

#### Authorization
- [ ] Login as regular user
- [ ] Try: Access /api/users
- [ ] Check: 403 Forbidden
- [ ] Try: Delete other user's enquiry
- [ ] Check: Should work (or implement ownership check)

#### Input Validation
- [ ] Try: SQL injection in email field
- [ ] Check: Rejected
- [ ] Try: XSS script in message
- [ ] Check: Sanitized
- [ ] Try: Very long strings
- [ ] Check: Rejected (max length)

---

### **7. Performance Testing**

#### Load Testing
- [ ] Create 100 enquiries
- [ ] Check: Page loads in < 2 seconds
- [ ] Check: Search works fast
- [ ] Check: Filters work fast

#### Database
- [ ] Check: MongoDB connection stable
- [ ] Check: Queries optimized
- [ ] Check: Indexes created

---

### **8. Error Handling Testing**

#### Network Errors
- [ ] Stop backend server
- [ ] Try: Create enquiry
- [ ] Check: Error toast shown
- [ ] Check: User-friendly message

#### Validation Errors
- [ ] Submit invalid data
- [ ] Check: Clear error messages
- [ ] Check: Field highlighting

#### Server Errors
- [ ] Cause server error (wrong DB URL)
- [ ] Check: Graceful error handling
- [ ] Check: User notified

---

### **9. Browser Compatibility**

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

### **10. Data Integrity Testing**

#### Timestamps
- [ ] Create enquiry
- [ ] Check: createdAt set
- [ ] Edit enquiry
- [ ] Check: updatedAt changed
- [ ] Check: createdAt unchanged

#### Soft Delete
- [ ] Delete enquiry
- [ ] Check: isDeleted = true in DB
- [ ] Check: Not shown in UI
- [ ] Check: Can be recovered from DB

#### Relationships
- [ ] Assign enquiry to user
- [ ] Delete user
- [ ] Check: Enquiry still exists
- [ ] Check: assignedTo = null

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot connect to MongoDB"
**Solution:** 
```bash
# Start MongoDB
mongod --dbpath /path/to/data
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in .env
PORT=5001
```

### Issue: "CORS error"
**Solution:**
```javascript
// backend/server.js
app.use(cors({
  origin: 'http://localhost:5173'
}));
```

### Issue: "Token expired"
**Solution:**
- Logout and login again
- Or increase JWT expiry in auth.controller.js

---

## ✅ Final Checklist

Before considering the project complete:

- [ ] All authentication flows work
- [ ] All CRUD operations work
- [ ] Search and filters work
- [ ] User management works (admin)
- [ ] All modals are responsive
- [ ] All validations work
- [ ] Error messages are clear
- [ ] Toast notifications work
- [ ] No console errors
- [ ] No security vulnerabilities
- [ ] Code is clean and commented
- [ ] README is complete
- [ ] Environment variables documented

---

## 📊 Test Results Template

```
Date: ___________
Tester: ___________

Authentication: ✅ / ❌
Enquiry CRUD: ✅ / ❌
User Management: ✅ / ❌
Search/Filter: ✅ / ❌
Responsive Design: ✅ / ❌
Security: ✅ / ❌
Performance: ✅ / ❌

Issues Found: ___________
Status: PASS / FAIL
```
