import getOwnerSession from '@/actions/queries/get-current-user';
import AdminDashboardPage from '@/components/admin-dashboard/AdminDashboardPage';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Overview = async () => {
  const session = await getServerSession()
  const currentUser = await prisma.user.findUnique({
    where: {
        email: session?.user?.email as string,
    }, 
    select: {
        email: true,
        firstName: true,
        hasAccess: true,
        lastName: true,
        id: true,
        role: true,
        image: true
    }
});

  if(!currentUser) {
    redirect('/login')
}

  return (
    <main>
      <AdminDashboardPage owner={currentUser}/>
    </main>
  )
}

export default Overview;