import logger from "../../../../lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { categoryId: number } }) {
    const id = params.categoryId

    try {
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        })
        if(!category) {
            return new NextResponse("No such category found!", {status: 404})
        }

        return NextResponse.json(category)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { categoryId: number } }) {
    const id = params.categoryId
    const {name, description} = await req.json()
    const verifiedToken = await getServerSession(authOptions)

    if (!verifiedToken) {
        return new NextResponse("Unauthorized!", { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.user?.email as string
        }
    })

    if(owner?.role === 'CLIENT') {
        return new NextResponse("Unauthorized!", { status: 401});
    } else if (owner?.role === 'EMPLOYEE' && owner.hasAccess === false) {
        return new NextResponse("Unauthorized!", { status: 401});
    }

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                userId: owner!.id,
                id
            }
        })

        if(!existingCategory) {
            return new NextResponse("No such category found.", {status: 404})
        }

        const updateCategory = await prisma.category.update({
            where: {
                id
            }, 
            data: {
                name,
                description,
                userId: owner!.id
            }
        })
        logger.info('New category created.')
        return new NextResponse(`${name} is created!`, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal Server Error", {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { categoryId: number } }) {
    const id = params.categoryId
    const verifiedToken = await getServerSession(authOptions)

    if (!verifiedToken) {
        return new NextResponse("You must be logged in.", { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.user?.email as string
        }
    })

    if(owner?.role === 'CLIENT') {
        return new NextResponse("Unauthorized!", { status: 401});
    } else if (owner?.role === 'EMPLOYEE' && owner.hasAccess === false) {
        return new NextResponse("Unauthorized!", { status: 401});
    }

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                userId: owner!.id,
                id
            }
        })
        if(!existingCategory) {
            return new NextResponse("No such category found!", {status: 404})
        }

        await prisma.category.delete({
            where: {
                id
            }
        })

        return new NextResponse(`${existingCategory.name} is successfully deleted!`, { status: 200})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}