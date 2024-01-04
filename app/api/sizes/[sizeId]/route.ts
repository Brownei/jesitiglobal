import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

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
        const existingSize = await prisma.size.findUnique({
            where: {
                id
            }, 
        })

        if(!existingSize) {
            return new NextResponse("No such size found.", {status: 404})
        }

        await prisma.size.update({
            where: {
                id
            }, 
            data: {
                name,
                value,
            }
        })
        logger.info('New size updated.')
        return new NextResponse(`${existingSize.name} is updated!`, {status: 200})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { sizeId: number } }) {
    const id = params.sizeId
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
        const existingSize = await prisma.size.findUnique({
            where: {
                id
            }
        })
        if(!existingSize) {
            return new NextResponse("No such size found!", {status: 404})
        }

        await prisma.size.delete({
            where: {
                id
            }
        })

        return new NextResponse(`${existingSize.name} is successfully deleted!`, { status: 200 })

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}