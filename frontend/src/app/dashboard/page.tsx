export const dynamic = 'force-dynamic'

import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import DashboardClient from '@/components/DashboardClient'
import { UserWithRelations } from '@/types/user'

export default async function DashboardPage() {
  const session = await auth()

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

  return <DashboardClient user={user as unknown as UserWithRelations} />
}
