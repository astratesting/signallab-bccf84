# Signal Lab - AI Stock Predictor SaaS

A production-ready AI-powered stock prediction platform built with Next.js 15, NextAuth.js v5, Prisma, and FastAPI.

## Features

- **Landing Page**: Dark analytical theme with ink black/indigo/cyan palette, Space Grotesk + JetBrains Mono fonts, beam motif
- **Authentication**: NextAuth.js v5 with credentials provider (signup/signin)
- **Dashboard**: AI stock predictions with buy/sell/hold signals, confidence scores, watchlist management
- **Mock AI Engine**: Generates predictions for AAPL, TSLA, MSFT, NVDA, AMZN
- **Pricing Page**: Three-tier subscription model
- **Backend API**: FastAPI with RESTful endpoints for stocks, predictions, and watchlist

## Tech Stack

### Frontend
- Next.js 15 with App Router
- TypeScript
- Tailwind CSS with custom theme
- NextAuth.js v5 for authentication
- Prisma with SQLite (dev) / PostgreSQL (prod)
- Framer Motion for animations
- Lucide React for icons

### Backend
- FastAPI (Python 3.11+)
- Mock AI prediction engine
- CORS-enabled for frontend integration

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- npm or yarn

### 1. Clone and Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
pip install -r requirements.txt
```

### 2. Environment Setup

Frontend (`.env.local`):
```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

Backend (if needed):
```
PORT=8000
CORS_ORIGINS=["http://localhost:3000"]
```

### 3. Database Setup

```bash
cd frontend
npx prisma generate
npx prisma db push
```

### 4. Run the Application

Terminal 1 - Frontend:
```bash
cd frontend
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
python3 main.py
```

### 5. Access the Application

- **Landing Page**: http://localhost:3000
- **Sign Up**: http://localhost:3000/auth/signup
- **Sign In**: http://localhost:3000/auth/signin
- **Dashboard**: http://localhost:3000/dashboard (requires auth)
- **Pricing**: http://localhost:3000/pricing
- **Backend API Docs**: http://localhost:8000/docs

## Project Structure

```
signallab-bccf84/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx              # Landing page
│   │   │   ├── layout.tsx           # Root layout with fonts
│   │   │   ├── globals.css          # Global styles + theme
│   │   │   ├── auth/
│   │   │   │   ├── signin/          # Sign in page
│   │   │   │   └── signup/          # Sign up page
│   │   │   ├── dashboard/           # Dashboard with predictions
│   │   │   ├── pricing/             # Pricing page
│   │   │   └── api/
│   │   │       ├── auth/            # NextAuth routes
│   │   │       ├── predictions/      # Prediction API routes
│   │   │       └── watchlist/       # Watchlist API routes
│   │   ├── components/
│   │   │   ├── DashboardClient.tsx  # Dashboard component
│   │   │   ├── Header.tsx           # Navigation header
│   │   │   ├── PredictionCard.tsx   # Prediction display
│   │   │   └── prisma/             # Database client
│   │   ├── lib/
│   │   │   ├── auth.ts              # NextAuth config
│   │   │   └── prisma.ts           # Prisma client
│   │   └── types/
│   │       └── user.ts              # TypeScript types
│   ├── prisma/
│   │   └── schema.prisma            # Database schema
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── tsconfig.json
├── backend/
│   ├── main.py                      # FastAPI application
│   └── requirements.txt             # Python dependencies
└── README.md
```

## API Endpoints

### Backend (FastAPI - port 8000)

- `GET /` - API status
- `GET /api/stocks` - List all stocks with current prices
- `GET /api/predictions` - Get all predictions
- `GET /api/predictions/{symbol}` - Get prediction for specific stock
- `POST /api/watchlist/add` - Add stock to watchlist
- `GET /api/watchlist` - Get user's watchlist
- `GET /health` - Health check

### Frontend (Next.js API Routes - port 3000)

- `POST /api/auth/[...nextauth]` - NextAuth authentication
- `POST /api/auth/register` - User registration
- `GET /api/predictions` - Get predictions (server-side)
- `POST /api/predictions/generate` - Generate new predictions
- `GET /api/watchlist` - Get watchlist
- `POST /api/watchlist` - Add to watchlist
- `DELETE /api/watchlist/[symbol]` - Remove from watchlist

## Authentication

Uses NextAuth.js v5 with:
- Credentials provider (email/password)
- JWT strategy for session management
- Prisma adapter for database persistence
- Protected routes with middleware

## Database Schema

- **User**: id, name, email, password (hashed), createdAt, updatedAt
- **Account**: OAuth accounts linked to users
- **Session**: Active user sessions
- **Prediction**: Stock predictions with signals and confidence
- **Watchlist**: User's watched stocks

## Mock AI Prediction Engine

Generates realistic predictions for:
- **AAPL** (Apple Inc.)
- **TSLA** (Tesla Inc.)
- **MSFT** (Microsoft Corp.)
- **NVDA** (NVIDIA Corp.)
- **AMZN** (Amazon.com Inc.)

Prediction includes:
- Signal: BUY, SELL, or HOLD
- Confidence score: 0.65 - 0.95
- Target price with time horizon
- Reasoning based on technical indicators

## Build and Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Deploy to Vercel
```bash
vercel deploy
```

### Deploy to Railway/Render
- Connect GitHub repository
- Set environment variables
- Deploy with `npm run start`

## Environment Variables

### Frontend
- `DATABASE_URL` - PostgreSQL connection string (or SQLite for dev)
- `NEXTAUTH_SECRET` - Secret for JWT signing (generate with `openssl rand -base64 32`)
- `NEXTAUTH_URL` - Base URL of the application

### Backend
- `PORT` - Backend port (default: 8000)
- `CORS_ORIGINS` - Allowed CORS origins

## Testing the Application

1. **Sign Up**: Create a new account at `/auth/signup`
2. **Sign In**: Log in at `/auth/signin`
3. **View Dashboard**: See AI predictions at `/dashboard`
4. **Manage Watchlist**: Add/remove stocks from watchlist
5. **View Pricing**: Check subscription plans at `/pricing`

## License

MIT License

## Support

For issues and feature requests, please open an issue on the GitHub repository.
