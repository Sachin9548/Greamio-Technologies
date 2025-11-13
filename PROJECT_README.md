# CloudBlitz Enquiry Management System

A full-stack CRM application for managing customer enquiries with role-based access control.

## Project Structure

```
cloudblitz/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
├── README.md          # Project specifications
├── PROJECT_README.md  # This file
├── LICENSE            # MIT License
└── .gitignore         # Git ignore rules
```

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Zod (validation)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- Git

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd cloudblitz
```

2. Setup Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file
npm start
```

3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

## Branching Strategy (Gitflow)

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Hotfix branches
- `release/*` - Release branches

### Workflow
1. Create feature branch from `develop`
2. Work on feature
3. Create PR to merge into `develop`
4. Test on `develop`
5. Create release branch for production
6. Merge to `main` and tag version

## Development Guidelines

This is an AI-first project. Use AI tools for:
- Code scaffolding
- Refactoring
- Documentation
- Testing
- Code reviews

## License

MIT License - see LICENSE file for details
