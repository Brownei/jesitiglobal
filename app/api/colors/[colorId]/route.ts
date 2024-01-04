import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { colorId: number } }) {
    const id = params.colorId
    let result;

    try {
        const color = await prisma.color.findUnique({
            where: {
                id
            }
        })
        if(!color) {
            return new NextResponse("No such color found!", {status: 404})
        }
        result = color

        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal Server Error", {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { colorId: number } }) {
    const id = params.colorId
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
        const existingColor = await prisma.color.findUnique({
            where: {
                id
            }, 
        })

        if(!existingColor) {
            return new NextResponse("No such color found.", {status: 404})
        }

        const updateColor = await prisma.color.update({
            where: {
                id
            }, 
            data: {
                name,
                value,
            }
        })
        logger.info('New color updated.')
        return new NextResponse(`${existingColor.name} is updated!`, {status: 200})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { colorId: number } }) {
    const id = params.colorId
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
        const existingColor = await prisma.color.findUnique({
            where: {
                id
            }
        })
        if(!existingColor) {
            return new NextResponse("No such color found!", {status: 404})
        }

        await prisma.color.delete({
            where: {
                id
            }
        })

        return new NextResponse(`${existingColor.name} is successfully deleted!`, { status: 200 })

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}