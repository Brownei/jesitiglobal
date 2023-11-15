import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";

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
            return NextResponse.json({ message: "No such lamination found!"}, {status: 404})
        }
        result = lamination
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { laminationId: number } }) {
    const id = params.laminationId
    const {name, image} = await req.json()
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
        const existingLamination = await prisma.lamination.findUnique({
            where: {
                id
            }, 
        })

        if(!existingLamination) {
            return NextResponse.json({ message: "No such lamination found."}, {status: 404})
        }

        const updateLamination = await prisma.lamination.update({
            where: {
                id
            }, 
            data: {
                name,
                image,
            }
        })
        logger.info('New lamination updated.')
        return NextResponse.json(updateLamination, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { laminationId: number } }) {
    const id = params.laminationId
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
        const existingLamination = await prisma.lamination.findUnique({
            where: {
                id
            }
        })
        if(!existingLamination) {
            return NextResponse.json({ message: "No such lamination found!"}, {status: 404})
        }

        await prisma.lamination.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingLamination.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}