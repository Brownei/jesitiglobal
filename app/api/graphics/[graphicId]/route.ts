import redisClient from "@/lib/redis";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import { connectToDB } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextApiRequest, { params }: { params: { graphicId: number } }) {
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
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { graphicId: number } }) {
    const id = params.graphicId
    const {name, quantity, description, thickness, corners, materials, price, image, sizes, colors, laminations, categoryId} = await req.json()
    const token = req.cookies.get('user')?.value
    const verifiedToken = token && (
        await verifyAuth(token)
    )

    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.email!
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner/employee can update a product." }, { status: 401});
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
            return NextResponse.json({ message: "No such graphic found."}, {status: 404})
        }

        const updateGraphic = await prisma.graphic.update({
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
        return NextResponse.json(updateGraphic, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextRequest, { params }: { params: { graphicId: number } }) {
    const id = params.graphicId
    const token = req.cookies.get('user')?.value
    const verifiedToken = token && (
        await verifyAuth(token)
    )

    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.email!
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner/employee can delete a product." }, { status: 401});
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
            return NextResponse.json({ message: "No such graphic found!"}, {status: 404})
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

        return NextResponse.json({ message: `${existingGraphic.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}