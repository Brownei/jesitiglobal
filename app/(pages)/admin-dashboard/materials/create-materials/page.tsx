import MaterialForm from "@/components/forms/MaterialForm"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const CreateNewMaterialsPage = async () => {
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
      <MaterialForm title="Create a new material"/>
    </main>
  )
}

export default CreateNewMaterialsPage