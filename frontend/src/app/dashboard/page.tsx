export const dynamic = 'force-dynamic'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/DashboardClient'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      predictions: {
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
      watchlist: {
        orderBy: { addedAt: 'desc' },
      },
    },
  })

  if (!user) {
    redirect('/auth/signin')
  }

  return <DashboardClient user={user} />
}
