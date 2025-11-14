# CloudBlitz Backend

Node.js + Express backend for CloudBlitz CRM.

## Folder Structure

```
backend/
├── controllers/    # Business logic
├── models/         # Database schemas
├── routes/         # API routes
├── middlewares/    # Custom middleware
├── server.js       # Main server file
└── .env            # Environment variables
```

## Installation

```bash
npm install
```

## Environment Variables

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cloudblitz
JWT_SECRET=your-secret-key
```

## Run Server

```bash
node server.js
```

## API Endpoints

- `GET /api/health` - Health check
