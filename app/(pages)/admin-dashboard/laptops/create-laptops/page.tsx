import LaptopForm from "@/components/forms/LaptopForm"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const CreateNewLaptopsPage = async () => {
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
        <LaptopForm title="Create a new laptop"/>
    </main>
  )
}

export default CreateNewLaptopsPage