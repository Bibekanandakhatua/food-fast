# FoodFast (MERN)

FoodFast is a full-stack food ordering app with:
- Customer app (`frontend`)
- Admin app (`admin`)
- API server (`backend`)

## Monorepo Structure
- `backend`: Express + MongoDB + JWT + Stripe
- `frontend`: React + Vite (customer)
- `admin`: React + Vite (admin)

## Local Setup

### 1) Install dependencies
```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

### 2) Configure env files
Copy examples:
- `backend/.env.example` -> `backend/.env`
- `frontend/.env.example` -> `frontend/.env`
- `admin/.env.example` -> `admin/.env`

Minimum backend env:
- `MONGO_URL`
- `JWT_SECRET`
- `SALT`
- `STRIPE_SECRET_KEY`
- `FRONTEND_URL`
- `CORS_ORIGINS`

Frontend/Admin env:
- `VITE_API_URL=http://localhost:4000`

### 3) Seed demo data (optional)
```bash
cd backend
npm run seed:data
```

### 4) Run apps
Terminal 1:
```bash
cd backend
npm run server
```

Terminal 2:
```bash
cd frontend
npm run dev
```

Terminal 3:
```bash
cd admin
npm run dev
```

## Production Build Checks
```bash
cd frontend && npm run lint && npm run build
cd ../admin && npm run lint && npm run build
cd ../backend && node --check server.js
```

## Deploy on Render
This repo includes `render.yaml` for one-click Blueprint deploy.

### Steps
1. Push repository to GitHub.
2. In Render, choose **New +** -> **Blueprint**.
3. Select this repo and apply `render.yaml`.
4. Set missing secret env vars in Render:
   - Backend: `MONGO_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`, `FRONTEND_URL`, `CORS_ORIGINS`
   - Frontend/Admin: `VITE_API_URL` (backend URL)
5. Redeploy services.

### Health endpoint
Backend health check:
- `GET /api/health`

## Notes
- Uploaded files are stored in `backend/uploads` (ephemeral on many hosts). Use cloud storage (S3/Cloudinary) for durable production media.
- Keep `.env` files out of git (already covered in `.gitignore`).
