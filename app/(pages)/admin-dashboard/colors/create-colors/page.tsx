import ColorForm from "@/components/forms/ColorForm"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const CreateNewColorsPage = async () => {
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
      <ColorForm title="Create a new color"/>
    </main>
  )
}

export default CreateNewColorsPage