import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";

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
            return NextResponse.json({ message: "No such corner found!"}, {status: 404})
        }
        result = corner
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { cornerId: number } }) {
    const id = params.cornerId
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
        const existingCorner = await prisma.corners.findUnique({
            where: {
                id
            }, 
        })

        if(!existingCorner) {
            return NextResponse.json({ message: "No such corner found."}, {status: 404})
        }

        const updateCorner = await prisma.corners.update({
            where: {
                id
            }, 
            data: {
                name,
                image,
            }
        })
        logger.info('New corner updated.')
        return NextResponse.json(updateCorner, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { cornerId: number } }) {
    const id = params.cornerId
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
        const existingcorner = await prisma.corners.findUnique({
            where: {
                id
            }
        })
        if(!existingcorner) {
            return NextResponse.json({ message: "No such corner found!"}, {status: 404})
        }

        await prisma.corners.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingcorner.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}