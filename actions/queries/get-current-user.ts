import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { prisma } from "@/lib/prisma";
import { userSchema } from "@/interfaces/interface";

export default async function getOwnerSession() {
  try {
    const session = await getServerSession();


    if (!session) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user!.email as string,
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

    if (!currentUser) {
      return null;
    }

    const validatedOwner = userSchema.safeParse(currentUser)

    if(!validatedOwner.success) {
      return null
    }

    return {
      ...validatedOwner.data
    };
  } catch (error: unknown) {
    console.log(error)
    return null;
  }
}