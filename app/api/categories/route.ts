import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const categories = await prisma.category.findMany()
        return NextResponse.json(categories)

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const {name, description} = await req.json()
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
                name
            }
        })

        if(existingCategory) {
            return NextResponse.json('This category already exists!. Try something else', { status: 409})
        }

        const newCategory = await prisma.category.create({
            data: {
                name,
                description,
                userId: owner!.id
            }
        })

        return new NextResponse(`${name} is created!`, { status: 201 })
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}