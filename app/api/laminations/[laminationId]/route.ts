import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { laminationId: number } }) {
    const id = params.laminationId
    let result;

    try {
        const lamination = await prisma.lamination.findUnique({
            where: {
                id
            }
        })
        if(!lamination) {
            return new NextResponse("No such lamination found!", {status: 404})
        }
        result = lamination
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { laminationId: number } }) {
    const id = params.laminationId
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
        const existingLamination = await prisma.lamination.findUnique({
            where: {
                id
            }, 
        })

        if(!existingLamination) {
            return new NextResponse("No such lamination found.", {status: 404})
        }

        await prisma.lamination.update({
            where: {
                id
            }, 
            data: {
                name,
                image,
            }
        })
        logger.info('New lamination updated.')
        return new NextResponse(`${name} is updated!`, {status: 200})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { laminationId: number } }) {
    const id = params.laminationId
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
        const existingLamination = await prisma.lamination.findUnique({
            where: {
                id
            }
        })
        if(!existingLamination) {
            return new NextResponse("No such lamination found!", {status: 404})
        }

        await prisma.lamination.delete({
            where: {
                id
            }
        })

        return new NextResponse(`${existingLamination.name} is successfully deleted!`, { status: 200 })

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}