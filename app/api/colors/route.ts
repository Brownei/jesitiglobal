import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const colors = await prisma.color.findMany()
        return NextResponse.json(colors, { status: 200 })

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const {name, value} = await req.json()
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
        const existingColor = await prisma.color.findFirst({
            where: {
                name
            }
        })

        if(existingColor) {
            return new NextResponse('This color already exists!', { status: 409 })
        }

        await prisma.color.create({
            data: {
                name,
                value,
            }
        })

        return new NextResponse(`${name} is created!`, { status: 200 })
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}