import CategoryForm from "@/components/forms/CategoryForm"
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import EmptyState from "@/components/EmptyState";
import { redirect } from "next/navigation";

const CreateNewCategoriesPage = async () => {
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
      <CategoryForm currentUser={currentUser!} title='Create a new category'/>
    </main>
  )
}

export default CreateNewCategoriesPage