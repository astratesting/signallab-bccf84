import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

interface MockPrediction {
  signal: 'BUY' | 'SELL' | 'HOLD'
  confidence: number
  targetPrice: number
  reasoning: string
}

const mockPredictions: Record<string, MockPrediction> = {
  AAPL: {
    signal: 'BUY',
    confidence: 87,
    targetPrice: 195.50,
    reasoning: 'Strong iPhone sales momentum, growing services revenue, and positive analyst sentiment drive bullish outlook.',
  },
  TSLA: {
    signal: 'HOLD',
    confidence: 72,
    targetPrice: 245.30,
    reasoning: 'EV market saturation concerns balanced by autonomous driving progress and energy storage growth.',
  },
  MSFT: {
    signal: 'BUY',
    confidence: 91,
    targetPrice: 420.75,
    reasoning: 'Azure cloud dominance, AI integration across product suite, and strong enterprise licensing growth.',
  },
  NVDA: {
    signal: 'BUY',
    confidence: 94,
    targetPrice: 950.20,
    reasoning: 'AI chip demand surge, data center expansion, and leading position in machine learning hardware.',
  },
  AMZN: {
    signal: 'SELL',
    confidence: 68,
    targetPrice: 165.40,
    reasoning: 'Increased competition in cloud services, margin pressure from logistics costs, and regulatory concerns.',
  },
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const { symbol } = await request.json()
  const upperSymbol = symbol.toUpperCase()

  if (!mockPredictions[upperSymbol]) {
    return NextResponse.json(
      { error: 'Invalid symbol. Available: AAPL, TSLA, MSFT, NVDA, AMZN' },
      { status: 400 }
    )
  }

  // Check daily limit for FREE users
  if (user.role === 'FREE') {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const predictionsToday = await prisma.prediction.count({
      where: {
        userId: user.id,
        createdAt: { gte: today },
      },
    })

    if (predictionsToday >= 5) {
      return NextResponse.json(
        { error: 'Daily prediction limit reached. Upgrade to Pro for unlimited predictions.' },
        { status: 403 }
      )
    }
  }

  const mockData = mockPredictions[upperSymbol]

  const prediction = await prisma.prediction.create({
    data: {
      userId: user.id,
      symbol: upperSymbol,
      signal: mockData.signal,
      confidence: mockData.confidence,
      targetPrice: mockData.targetPrice,
      reasoning: mockData.reasoning,
    },
  })

  return NextResponse.json({ prediction })
}
