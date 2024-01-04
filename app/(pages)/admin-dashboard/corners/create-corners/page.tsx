import CornerForm from '@/components/forms/CornerForm'
import React from 'react'
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const CreateNewCornersPage = async () => {
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
      <CornerForm title="Create a new corner"/>
    </main>
  )
}

export default CreateNewCornersPage