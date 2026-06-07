import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const watchlist = await prisma.watchlist.findMany({
    where: { userId: user.id },
    orderBy: { addedAt: 'desc' },
  })

  return NextResponse.json({ watchlist })
}

export async function POST(request: Request) {
  const session = await auth()

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

  // Check watchlist limit
  const watchlistCount = await prisma.watchlist.count({
    where: { userId: user.id },
  })

  const limit = user.role === 'FREE' ? 3 : user.role === 'PRO' ? 20 : 100

  if (watchlistCount >= limit) {
    return NextResponse.json(
      { error: `Watchlist limit reached (${limit} stocks). Upgrade to add more.` },
      { status: 403 }
    )
  }

  try {
    const item = await prisma.watchlist.create({
      data: {
        userId: user.id,
        symbol: upperSymbol,
      },
    })

    return NextResponse.json({ item })
  } catch (error) {
    if (String(error).includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Stock already in watchlist' },
        { status: 400 }
      )
    }
    throw error
  }
}
