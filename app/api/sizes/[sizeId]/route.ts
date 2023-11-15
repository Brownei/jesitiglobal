import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { sizeId: number } }) {
    const id = params.sizeId
    let result;

    try {
        const size = await prisma.size.findUnique({
            where: {
                id
            }
        })
        if(!size) {
            return NextResponse.json({ message: "No such size found!"}, {status: 404})
        }
        result = size
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { sizeId: number } }) {
    const id = params.sizeId
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
        const existingSize = await prisma.size.findUnique({
            where: {
                id
            }, 
        })

        if(!existingSize) {
            return NextResponse.json({ message: "No such size found."}, {status: 404})
        }

        const updateSize = await prisma.size.update({
            where: {
                id
            }, 
            data: {
                name,
                value,
            }
        })
        logger.info('New size updated.')
        return NextResponse.json(updateSize, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { sizeId: number } }) {
    const id = params.sizeId
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
        const existingSize = await prisma.size.findUnique({
            where: {
                id
            }
        })
        if(!existingSize) {
            return NextResponse.json({ message: "No such size found!"}, {status: 404})
        }

        await prisma.size.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingSize.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}