# Signal Lab - AI Stock Predictor SaaS

A modern AI-powered stock prediction platform built with Next.js 15, featuring real-time trading signals, confidence scoring, and watchlist management.

## Features

### 🎯 Core Features
- **AI Stock Predictions**: Get BUY/SELL/HOLD signals with confidence scores for major stocks (AAPL, MSFT, TSLA, NVDA, AMZN)
- **Real-time Watchlist**: Track your favorite stocks with live updates
- **Prediction History**: View past predictions and track accuracy
- **Performance Analytics**: Monitor prediction accuracy and portfolio performance

### 🔐 Authentication & Authorization
- NextAuth.js v5 with credentials provider
- Secure password hashing with bcryptjs
- Protected dashboard routes with server-side session validation
- User roles: FREE, PRO, ENTERPRISE

### 💳 Subscription Tiers
- **Free**: 5 predictions/day, 3 watchlist stocks
- **Pro** ($29/mo): Unlimited predictions, 20 watchlist stocks, accuracy tracking
- **Enterprise** ($99/mo): API access, custom models, priority support

### 🎨 Design
- Dark analytical theme with ink black/indigo/cyan palette
- Space Grotesk + JetBrains Mono typography
- Beam motif with animated radial gradients
- Fully responsive design with Framer Motion animations

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Auth**: NextAuth.js v5
- **Database ORM**: Prisma
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **API**: Python FastAPI
- **Database**: PostgreSQL
- **ORM**: Prisma (Node.js)

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd signallab-bccf84
```

2. **Install frontend dependencies**
```bash
cd frontend
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your database URL and NextAuth secret
```

4. **Set up the database**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Install backend dependencies**
```bash
cd ../backend
pip install fastapi uvicorn pydantic
```

6. **Run the development servers**

Frontend (Terminal 1):
```bash
cd frontend
npm run dev
```

Backend (Terminal 2):
```bash
cd backend
uvicorn main:app --reload
```

7. **Open the application**
Navigate to `http://localhost:3000`

## Project Structure

```
signallab-bccf84/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   ├── auth/
│   │   │   │   │   ├── [...nextauth]/route.ts
│   │   │   │   │   └── register/route.ts
│   │   │   │   ├── predictions/
│   │   │   │   │   ├── route.ts
│   │   │   │   │   └── generate/route.ts
│   │   │   │   └── watchlist/
│   │   │   │       ├── route.ts
│   │   │   │       └── [symbol]/route.ts
│   │   │   ├── auth/
│   │   │   │   ├── signin/page.tsx
│   │   │   │   └── signup/page.tsx
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   ├── page.tsx (landing)
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   └── DashboardClient.tsx
│   │   ├── lib/
│   │   │   ├── auth.ts
│   │   │   └── prisma.ts
│   │   └── types/
│   │       └── user.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
├── backend/
│   └── main.py
└── README.md
```

## API Endpoints

### Frontend API Routes (Next.js)
- `POST /api/auth/register` - User registration
- `GET /api/auth/[...nextauth]` - NextAuth handler
- `GET /api/predictions` - Get user predictions
- `POST /api/predictions/generate` - Generate new prediction
- `GET /api/watchlist` - Get user watchlist
- `POST /api/watchlist` - Add to watchlist
- `DELETE /api/watchlist/[symbol]` - Remove from watchlist

### Backend API (FastAPI)
- `GET /` - API info
- `GET /health` - Health check
- `POST /api/predict` - Generate prediction
- `GET /api/predict/{symbol}` - Get prediction for symbol
- `GET /api/symbols` - List supported symbols
- `GET /api/historical/{symbol}` - Get historical predictions

## Environment Variables

### Frontend (.env)
```
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL="postgresql://user:password@localhost:5432/signallab"
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Frontend (Vercel)
1. Push to GitHub
2. Import project to Vercel
3. Set environment variables
4. Deploy

### Backend (Railway/Render)
1. Create new Python service
2. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Deploy

### Database (Supabase/Neon)
1. Create PostgreSQL database
2. Run Prisma migrations
3. Update DATABASE_URL

## License

MIT License - see LICENSE file for details

## Support

For support, email support@signallab.com or visit our pricing page to upgrade your plan.
