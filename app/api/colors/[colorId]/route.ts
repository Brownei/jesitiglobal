import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";

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
            return NextResponse.json({ message: "No such color found!"}, {status: 404})
        }
        result = color
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { colorId: number } }) {
    const id = params.colorId
    const {name, value} = await req.json()
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
        const existingColor = await prisma.color.findUnique({
            where: {
                id
            }, 
        })

        if(!existingColor) {
            return NextResponse.json({ message: "No such color found."}, {status: 404})
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
        return NextResponse.json(updateColor, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { colorId: number } }) {
    const id = params.colorId
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
        const existingColor = await prisma.color.findUnique({
            where: {
                id
            }
        })
        if(!existingColor) {
            return NextResponse.json({ message: "No such color found!"}, {status: 404})
        }

        await prisma.color.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingColor.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}