import LaminationForm from '@/components/forms/LaminationForm'
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const CreateNewLaminationsPage = async () => {
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

  
  return (
    <main>
      <LaminationForm title="Create a new lamination"/>
    </main>
  )
}

export default CreateNewLaminationsPage