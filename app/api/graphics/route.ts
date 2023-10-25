import { NextRequest, NextResponse } from "next/server";
import { MessageResponse } from "@/interfaces/MessageResponse";
import { connectToDB } from "@/lib/database";
import { getServerSession } from "next-auth/next"
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import logger from "@/lib/logger";
import redisClient from "@/lib/redis";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    let results;
    try {
        const graphics = await prisma.graphic.findMany()
        results = graphics
        return NextResponse.json(results)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}


export async function POST(req: NextRequest) {
    const token = req.cookies.get('user')?.value
    const {name, quantity, description, thickness, corners, materials, price, image, sizes, colors, laminations, categoryId} = await req.json()
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

    if(owner?.role === 'EMPLOYEE' || owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner can create a new product!" }, { status: 401});
    }

    try {
        const existingGraphic = await prisma.graphic.findUnique({
            where: {
                userId: owner!.id,
                name: name as string
            }
        })

        if(existingGraphic) {
            return NextResponse.json({ message: "Existing graphic! Try adding another"}, {status: 409})
        }

        const newGraphics = await prisma.graphic.create({
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
        return NextResponse.json(newGraphics, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}