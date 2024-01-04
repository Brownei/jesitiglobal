import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function GET(req: NextRequest, res: NextResponse, { params }: { params: { graphicId: number } }) {
    const id = params.graphicId
    let result;

    try {
        const graphic = await prisma.graphic.findUnique({
            where: {
                id
            }
        })
        if(!graphic) {
            return NextResponse.json({ message: "No such graphic found!"}, {status: 404})
        }
        result = graphic
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}

export async function PATCH(req: NextRequest, res: NextResponse, { params }: { params: { graphicId: number } }) {
    const id = params.graphicId
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
                id
            }, 
            include: {
                corners: true,
                lamination: true,
                material: true,
            }
        })

        if(!existingGraphic) {
            return new NextResponse("No such graphic found.", {status: 404})
        }

        await prisma.graphic.update({
            where: {
                id
            }, 
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
        logger.info('New graphics created.')
        return new NextResponse(`${name} is created!`, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }

}


export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: { graphicId: number } }) {
    const id = params.graphicId
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
                id
            }, include: {
                image: true
            }
        })
        if(!existingGraphic) {
            return new NextResponse("No such graphic found.", {status: 404})
        }

        for(const image of existingGraphic.image) {
            await prisma.image.delete({
                where: {
                    id: image.id 
                }
            })
        }

        await prisma.graphic.delete({
            where: {
                id
            }
        })

        return new NextResponse(`${existingGraphic.name} is successfully deleted!`, { status: 200 })

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse("Internal server error", {status: 500})
    }
}