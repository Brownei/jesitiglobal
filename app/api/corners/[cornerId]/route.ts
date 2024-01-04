import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { cornerId: number } }) {
    const id = params.cornerId
    let result;

    try {
        const corner = await prisma.corners.findUnique({
            where: {
                id
            }
        })

        if(!corner) {
            return new NextResponse("No such corner found!", {status: 404})
        }

        result = corner
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { cornerId: number } }) {
    const id = params.cornerId
    const {name, image} = await req.json()
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
        const existingCorner = await prisma.corners.findUnique({
            where: {
                id
            }, 
        })

        if(!existingCorner) {
            return new NextResponse("No such corner found.", {status: 404})
        }

        await prisma.corners.update({
            where: {
                id
            }, 
            data: {
                name,
                image,
            }
        })
        logger.info('New corner updated.')
        return new NextResponse(`${name} is created!`, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { cornerId: number } }) {
    const id = params.cornerId
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
        const existingcorner = await prisma.corners.findUnique({
            where: {
                id
            }
        })
        if(!existingcorner) {
            return new NextResponse("No corner found!", { status: 404});
        }

        await prisma.corners.delete({
            where: {
                id
            }
        })

        return new NextResponse(`${existingcorner.name} is successfully deleted!`, { status: 200})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}