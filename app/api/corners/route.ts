import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const corners = await prisma.corners.findMany()

        return NextResponse.json(corners)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const {name, image} = await req.json()
    const verifiedToken = await getServerSession(authOptions)
    
    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
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
        const existingCorner = await prisma.corners.findFirst({
            where: {
                name
            }
        })

        if(existingCorner) {
            return new NextResponse('This corner already exists!', { status: 409 })
        }

        await prisma.corners.create({
            data: {
                name,
                image,
            }
        })

        return new NextResponse(`${name} is created!`, { status: 201 })
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}