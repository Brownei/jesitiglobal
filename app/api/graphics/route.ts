import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import logger from "@/lib/logger";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";


export async function GET(req: NextRequest, res: NextResponse) {
    let results;
    try {
        const graphics = await prisma.graphic.findMany()
        results = graphics
        return NextResponse.json(results)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}


export async function POST(req: NextRequest, res: NextResponse) {
    const {name, quantity, description, thickness, corners, materials, price, image, sizes, colors, laminations, categoryId} = await req.json()
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
        const existingGraphic = await prisma.graphic.findUnique({
            where: {
                userId: owner!.id,
                name: name as string
            }
        })

        if(existingGraphic) {
            return new NextResponse("Existing graphic!", {status: 409})
        }

        await prisma.graphic.create({
            data: {
                name: name as string,
                description: description as string,
                quantity: quantity as number,
                thickness: thickness as number,
                material: {
                    create: materials.map((material: string) => (material)),
                },
                corners: {
                    create: corners.map((corner: string) => (corner))
                },
                price,
                image: image.map((i: string) => (i)),
                size: {
                    create: sizes.map((s: string) => (s))
                },
                color: {
                    create: colors.map((color: string) => (color))
                },
                lamination: {
                    create: laminations.map((lamination: string) => (lamination)),
                },
                categoryId,
                userId: owner!.id
            }
        })

        logger.info('New graphics created!')
        return new NextResponse(`${name} is created!`, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}