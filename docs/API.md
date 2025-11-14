# 📚 CloudBlitz CRM - API Documentation

## Base URL
- **Development:** `http://localhost:5000`
- **Production:** `https://your-backend-url.onrender.com`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### 1. Register User
Create a new user account.

**Endpoint:** `POST /api/auth/register`

**Access:** Public

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Validation Rules:**
- `name`: 2-100 characters (required)
- `email`: Valid email format (required)
- `password`: Minimum 6 characters (required)
- `role`: "admin", "staff", or "user" (optional, default: "user")

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `400`: Email already registered
- `400`: Validation error (invalid email, short password, etc.)
- `500`: Server error

---

### 2. Login User
Authenticate and receive JWT token.

**Endpoint:** `POST /api/auth/login`

**Access:** Public

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

**Error Responses:**
- `401`: Invalid email or password
- `400`: Validation error
- `500`: Server error

**Token Expiry:** 7 days

---

### 3. Get Current User
Get authenticated user's information.

**Endpoint:** `GET /api/auth/me`

**Access:** Protected (requires authentication)

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401`: No token provided / Invalid token
- `404`: User not found
- `500`: Server error

---

## 📋 Enquiry Endpoints

### 4. Create Enquiry
Create a new customer enquiry.

**Endpoint:** `POST /api/enquiries`

**Access:** Protected (all authenticated users)

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "customerName": "Jane Smith",
  "email": "jane@example.com",
  "phone": "1234567890",
  "message": "I need help with my order #12345"
}
```

**Validation Rules:**
- `customerName`: 2-100 characters (required)
- `email`: Valid email format (required)
- `phone`: 10-15 digits (required)
- `message`: 10-1000 characters (required)

**Success Response (201):**
```json
{
  "message": "Enquiry created successfully",
  "enquiry": {
    "_id": "507f1f77bcf86cd799439011",
    "customerName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "message": "I need help with my order #12345",
    "status": "new",
    "assignedTo": null,
    "createdBy": "507f1f77bcf86cd799439012",
    "isDeleted": false,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation error
- `401`: Unauthorized
- `500`: Server error

---

### 5. Get All Enquiries
Retrieve enquiries with optional filters and pagination.

**Endpoint:** `GET /api/enquiries`

**Access:** Protected
- **Regular users:** See only their own enquiries
- **Admin/Staff:** See all enquiries

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional): Filter by status ("new", "in-progress", "closed")
- `search` (optional): Search by customer name, email, or phone
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

**Example Requests:**
```
GET /api/enquiries
GET /api/enquiries?status=new
GET /api/enquiries?search=john
GET /api/enquiries?status=in-progress&page=2&limit=20
```

**Success Response (200):**
```json
{
  "enquiries": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "customerName": "Jane Smith",
      "email": "jane@example.com",
      "phone": "1234567890",
      "message": "I need help with my order",
      "status": "new",
      "assignedTo": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "Support Agent",
        "email": "agent@company.com"
      },
      "createdBy": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 50,
    "pages": 2
  }
}
```

**Error Responses:**
- `401`: Unauthorized
- `500`: Server error

---

### 6. Get Single Enquiry
Get details of a specific enquiry.

**Endpoint:** `GET /api/enquiries/:id`

**Access:** Protected
- **Regular users:** Can only view their own enquiries
- **Admin/Staff:** Can view all enquiries

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "enquiry": {
    "_id": "507f1f77bcf86cd799439011",
    "customerName": "Jane Smith",
    "email": "jane@example.com",
    "phone": "1234567890",
    "message": "I need help with my order",
    "status": "new",
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Support Agent",
      "email": "agent@company.com"
    },
    "createdBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `401`: Unauthorized
- `403`: You can only view your own enquiries
- `404`: Enquiry not found
- `500`: Server error

---

### 7. Update Enquiry
Update an existing enquiry.

**Endpoint:** `PUT /api/enquiries/:id`

**Access:** Protected
- **Regular users:** Can only update their own enquiries
- **Admin/Staff:** Can update all enquiries

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "customerName": "Jane Smith Updated",
  "email": "jane.new@example.com",
  "phone": "9876543210",
  "message": "Updated message",
  "status": "in-progress",
  "assignedTo": "507f1f77bcf86cd799439013"
}
```

**All fields are optional** - only send fields you want to update.

**Success Response (200):**
```json
{
  "message": "Enquiry updated successfully",
  "enquiry": {
    "_id": "507f1f77bcf86cd799439011",
    "customerName": "Jane Smith Updated",
    "email": "jane.new@example.com",
    "phone": "9876543210",
    "message": "Updated message",
    "status": "in-progress",
    "assignedTo": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "Support Agent",
      "email": "agent@company.com"
    },
    "createdBy": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation error
- `401`: Unauthorized
- `403`: You can only edit your own enquiries
- `404`: Enquiry not found
- `500`: Server error

---

### 8. Delete Enquiry (Soft Delete)
Soft delete an enquiry (sets isDeleted to true).

**Endpoint:** `DELETE /api/enquiries/:id`

**Access:** Protected
- **Regular users:** Can only delete their own enquiries
- **Admin/Staff:** Can delete all enquiries

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "message": "Enquiry deleted successfully"
}
```

**Error Responses:**
- `401`: Unauthorized
- `403`: You can only delete your own enquiries
- `404`: Enquiry not found
- `500`: Server error

**Note:** This is a soft delete - data is not permanently removed from database.

---

## 👥 User Management Endpoints (Admin Only)

### 9. Get All Users
Retrieve all users in the system.

**Endpoint:** `GET /api/users`

**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Success Response (200):**
```json
{
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin",
      "createdAt": "2025-01-14T09:00:00.000Z",
      "updatedAt": "2025-01-14T09:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `401`: Unauthorized
- `403`: Access denied (not admin)
- `500`: Server error

---

### 10. Create User
Create a new user (admin only).

**Endpoint:** `POST /api/users`

**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "New Staff Member",
  "email": "staff@example.com",
  "password": "password123",
  "role": "staff"
}
```

**Success Response (201):**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "507f1f77bcf86cd799439014",
    "name": "New Staff Member",
    "email": "staff@example.com",
    "role": "staff"
  }
}
```

**Error Responses:**
- `400`: Email already registered / Validation error
- `401`: Unauthorized
- `403`: Access denied (not admin)
- `500`: Server error

---

### 11. Update User
Update user details (admin only).

**Endpoint:** `PUT /api/users/:id`

**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "role": "admin",
  "password": "newpassword123"
}
```

**All fields are optional.** Password is only updated if provided.

**Success Response (200):**
```json
{
  "message": "User updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Updated Name",
    "email": "newemail@example.com",
    "role": "admin",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T12:00:00.000Z"
  }
}
```

**Error Responses:**
- `400`: Validation error
- `401`: Unauthorized
- `403`: Access denied (not admin)
- `404`: User not found
- `500`: Server error

---

### 12. Delete User
Permanently delete a user (admin only).

**Endpoint:** `DELETE /api/users/:id`

**Access:** Admin only

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Success Response (200):**
```json
{
  "message": "User deleted successfully"
}
```

**Error Responses:**
- `401`: Unauthorized
- `403`: Access denied (not admin)
- `404`: User not found
- `500`: Server error

**Note:** This is a permanent delete.

---

## 🏥 Health Check

### 13. Health Check
Check if the server is running.

**Endpoint:** `GET /api/health`

**Access:** Public

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Server is healthy",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

---

## 🔒 Permission Matrix

| Endpoint | Public | User | Staff | Admin |
|----------|--------|------|-------|-------|
| POST /auth/register | ✅ | ✅ | ✅ | ✅ |
| POST /auth/login | ✅ | ✅ | ✅ | ✅ |
| GET /auth/me | ❌ | ✅ | ✅ | ✅ |
| POST /enquiries | ❌ | ✅ | ✅ | ✅ |
| GET /enquiries | ❌ | ✅ (own) | ✅ (all) | ✅ (all) |
| GET /enquiries/:id | ❌ | ✅ (own) | ✅ (all) | ✅ (all) |
| PUT /enquiries/:id | ❌ | ✅ (own) | ✅ (all) | ✅ (all) |
| DELETE /enquiries/:id | ❌ | ✅ (own) | ✅ (all) | ✅ (all) |
| GET /users | ❌ | ❌ | ❌ | ✅ |
| POST /users | ❌ | ❌ | ❌ | ✅ |
| PUT /users/:id | ❌ | ❌ | ❌ | ✅ |
| DELETE /users/:id | ❌ | ❌ | ❌ | ✅ |
| GET /health | ✅ | ✅ | ✅ | ✅ |

---

## 📊 Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🧪 Testing with Postman

### Setup:
1. Import this collection
2. Set base URL variable: `{{baseUrl}}` = `http://localhost:5000`
3. Set token variable after login: `{{token}}`

### Example Workflow:
1. **Register:** POST /auth/register
2. **Login:** POST /auth/login → Save token
3. **Create Enquiry:** POST /enquiries (with token)
4. **Get Enquiries:** GET /enquiries (with token)
5. **Update Enquiry:** PUT /enquiries/:id (with token)

---

## 🔐 Security Notes

1. **JWT Tokens:** Expire after 7 days
2. **Passwords:** Hashed with bcrypt (10 rounds)
3. **CORS:** Configured for frontend domain
4. **Rate Limiting:** Not implemented (add if needed)
5. **Input Validation:** Zod validation on all inputs

---

## 📝 Error Response Format

All errors follow this format:

```json
{
  "error": "Error message here"
}
```

Examples:
```json
{
  "error": "Invalid email or password"
}
```

```json
{
  "error": "You can only edit your own enquiries"
}
```

---

## 🚀 Quick Start

### 1. Get Token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### 2. Use Token:
```bash
curl -X GET http://localhost:5000/api/enquiries \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📞 Support

For API issues or questions:
- Check error messages
- Verify token is valid
- Check permission levels
- Review validation rules

---

**Last Updated:** January 2025
**API Version:** 1.0.0
