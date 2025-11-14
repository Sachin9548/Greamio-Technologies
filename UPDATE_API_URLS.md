# Update API URLs for Deployment

## Quick Fix: Replace All API URLs

You need to replace `http://localhost:5000` with the environment variable in all files.

### Files to Update:

1. `frontend/src/components/AddEnquiryModal.jsx`
2. `frontend/src/components/AddUserModal.jsx`
3. `frontend/src/components/EditEnquiryModal.jsx`
4. `frontend/src/components/EditUserModal.jsx`
5. `frontend/src/pages/EnquiryDashboard.jsx`
6. `frontend/src/pages/Login.jsx`
7. `frontend/src/pages/Register.jsx`
8. `frontend/src/pages/UserManagement.jsx`

### How to Update:

**Step 1:** Add this import at the top of each file:
```javascript
import API_URL from '../config/api';
```

**Step 2:** Replace all instances of:
```javascript
'http://localhost:5000/api/...'
```

With:
```javascript
`${API_URL}/api/...`
```

### Example:

**Before:**
```javascript
const response = await fetch('http://localhost:5000/api/enquiries', {
```

**After:**
```javascript
import API_URL from '../config/api';

const response = await fetch(`${API_URL}/api/enquiries`, {
```

---

## Automated Fix (Easier Way)

I'll update all files for you automatically!

Just tell me and I'll do it in one go.
