import logger from "../../../../lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { verifyAuth } from "../../../../lib/verifyAuth";


export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { categoryId: number } }) {
    const id = params.categoryId

    try {
        const category = await prisma.category.findUnique({
            where: {
                id
            }
        })
        if(!category) {
            return NextResponse.json({ message: "No such category found!"}, {status: 404})
        }

        return NextResponse.json(category)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { categoryId: number } }) {
    const id = params.categoryId
    const {name, description} = await req.json()
    const token = req.cookies.get('user')?.value
    const verifiedToken = token && (
        await verifyAuth(token)
    )

    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.email as string
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner/employee can update." }, { status: 401});
    }

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                userId: owner!.id,
                id
            }
        })

        if(!existingCategory) {
            return NextResponse.json({ message: "No such category found."}, {status: 404})
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
        return NextResponse.json(updateCategory, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { categoryId: number } }) {
    const id = params.categoryId
    const token = req.cookies.get('user')?.value
    const verifiedToken = token && (
        await verifyAuth(token)
    )

    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.email as string
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner/employee can delete." }, { status: 401});
    }

    try {
        const existingCategory = await prisma.category.findUnique({
            where: {
                userId: owner!.id,
                id
            }
        })
        if(!existingCategory) {
            return NextResponse.json({ message: "No such Category found!"}, {status: 404})
        }

        await prisma.category.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingCategory.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}