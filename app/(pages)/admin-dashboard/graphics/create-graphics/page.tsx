import GraphicForm from "@/components/forms/GraphicForm"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const CreateNewProductPage = async () => {
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
      <GraphicForm title="Create a new graphic"/>
    </main>
  )
}

export default CreateNewProductPage