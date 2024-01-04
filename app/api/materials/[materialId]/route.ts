import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { materialId: number } }) {
    const id = params.materialId
    let result;

    try {
        const material = await prisma.materials.findUnique({
            where: {
                id
            }
        })
        if(!material) {
            return new NextResponse("No such material found!", {status: 404})
        }
        result = material
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { materialId: number } }) {
    const id = params.materialId
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
        const existingMaterial = await prisma.materials.findUnique({
            where: {
                id
            }, 
        })

        if(!existingMaterial) {
            return new NextResponse("No such material found.", {status: 404})
        }

        await prisma.materials.update({
            where: {
                id
            }, 
            data: {
                name,
                image,
            }
        })
        logger.info('New material updated.')
        return new NextResponse(`${name} is created!`, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { materialId: number } }) {
    const id = params.materialId
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
        const existingMaterial = await prisma.materials.findUnique({
            where: {
                id
            }
        })
        if(!existingMaterial) {
            return new NextResponse("No such material found!", {status: 404})
        }

        await prisma.materials.delete({
            where: {
                id
            }
        })

        return new NextResponse(`${existingMaterial.name} is successfully deleted!`, { status: 200 })

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}