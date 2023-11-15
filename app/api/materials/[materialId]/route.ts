import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";

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
            return NextResponse.json({ message: "No such material found!"}, {status: 404})
        }
        result = material
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { materialId: number } }) {
    const id = params.materialId
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
        const existingMaterial = await prisma.materials.findUnique({
            where: {
                id
            }, 
        })

        if(!existingMaterial) {
            return NextResponse.json({ message: "No such material found."}, {status: 404})
        }

        const updateMaterial = await prisma.materials.update({
            where: {
                id
            }, 
            data: {
                name,
                image,
            }
        })
        logger.info('New material updated.')
        return NextResponse.json(updateMaterial, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { materialId: number } }) {
    const id = params.materialId
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
        const existingMaterial = await prisma.materials.findUnique({
            where: {
                id
            }
        })
        if(!existingMaterial) {
            return NextResponse.json({ message: "No such material found!"}, {status: 404})
        }

        await prisma.materials.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingMaterial.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}