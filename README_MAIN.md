# 🚀 CloudBlitz CRM - Enquiry Management System

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://greamio-technologies.vercel.app)
[![Backend API](https://img.shields.io/badge/API-live-blue)](https://greamio-technologies.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
![Backend CI/CD](https://github.com/Sachin9548/Greamio-Technologies/workflows/Backend%20CI/CD%20Pipeline/badge.svg)
![Frontend CI/CD](https://github.com/Sachin9548/Greamio-Technologies/workflows/Frontend%20CI/CD%20Pipeline/badge.svg)

> A professional, production-ready CRM system for managing customer enquiries with role-based access control.

## 🌐 Live Application

- **Frontend:** https://greamio-technologies.vercel.app
- **Backend API:** https://greamio-technologies.onrender.com
- **API Health:** https://greamio-technologies.onrender.com/api/health
- **GitHub Actions:** https://github.com/Sachin9548/Greamio-Technologies/actions

---

## ✨ Features

- 🔐 **Authentication** - JWT-based with role management
- 📋 **Enquiry Management** - Full CRUD with search & filters
- 👥 **User Management** - Admin panel for user control
- 🎨 **Professional UI** - Modern design with Tailwind CSS
- 🔒 **Security** - Role-based permissions & data protection
- ⚡ **Performance** - Fast with database indexing & pagination
- 📱 **Responsive** - Works on all devices
- 🐳 **Docker Ready** - Containerized deployment
- 🚀 **CI/CD** - Automated testing & deployment

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Sachin9548/Greamio-Technologies.git
cd Greamio-Technologies

# Backend setup
cd backend
npm install
# Create .env file with your MongoDB URI and JWT secret
node server.js

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev
```

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
JWT_SECRET=your_secret_key
NODE_ENV=development
```

**Frontend (.env.development):**
```env
VITE_API_URL=http://localhost:5000
```

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [API Documentation](docs/API.md) | Complete API reference |
| [Deployment Guide](docs/DEPLOYMENT.md) | How to deploy |
| [System Architecture](docs/ARCHITECTURE.md) | Technical architecture |
| [Testing Guide](docs/TESTING.md) | Testing instructions |
| [CI/CD Pipeline](docs/CI-CD.md) | Automated deployment setup |

---

## 🏗️ Tech Stack

**Frontend:** React 18 + Vite + Tailwind CSS  
**Backend:** Node.js + Express + MongoDB  
**Database:** MongoDB Atlas  
**Hosting:** Vercel (Frontend) + Render (Backend)  
**CI/CD:** GitHub Actions

---

## 🔐 User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full system access, user management |
| **Staff** | View & manage all enquiries |
| **User** | View & manage own enquiries only |

---

## 🎯 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user
```

### Enquiries
```
POST   /api/enquiries        - Create enquiry
GET    /api/enquiries        - Get all (with filters)
GET    /api/enquiries/:id    - Get single
PUT    /api/enquiries/:id    - Update
DELETE /api/enquiries/:id    - Delete (soft)
```

### Users (Admin Only)
```
GET    /api/users            - Get all users
POST   /api/users            - Create user
PUT    /api/users/:id        - Update user
DELETE /api/users/:id        - Delete user
```

**Full API Docs:** [docs/API.md](docs/API.md)

---

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Run with coverage
npm test -- --coverage
```

---

## 🐳 Docker Deployment

```bash
# Build and run
docker-compose up -d

# Access
Frontend: http://localhost
Backend: http://localhost:5000
```

---

## 📊 Project Structure

```
cloudblitz/
├── backend/              # Node.js + Express API
│   ├── controllers/      # Business logic
│   ├── models/           # Database schemas
│   ├── routes/           # API routes
│   ├── middlewares/      # Auth & validation
│   └── __tests__/        # Test files
├── frontend/             # React + Vite app
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # State management
│   │   └── routes/       # Route configuration
│   └── public/           # Static assets
├── docs/                 # Documentation
├── .github/workflows/    # CI/CD pipeline
└── docker-compose.yml    # Docker configuration
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file.

---

## 🆘 Support

- **Issues:** [GitHub Issues](https://github.com/Sachin9548/Greamio-Technologies/issues)
- **Documentation:** Check `docs/` folder
- **Email:** support@cloudblitz.com

---

## 🎉 Acknowledgments

Built with modern technologies and AI-first development approach.

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** January 2025
