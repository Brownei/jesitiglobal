import redisClient from "@/lib/redis";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET(req: NextApiRequest, { params }: { params: { graphicId: string } }) {
    const id = params.graphicId
    const redisKey = `graphic-${id}`
    let result;

    try {
        if(redisClient) {
            logger.info('Cache Hit!');
            const cachedResults = await redisClient.get(redisKey);
            
            if(cachedResults) {
                result = JSON.parse(cachedResults);
            } 
        }

        logger.info('Cache Miss!');
        await connectToDB()
        const graphic = await prisma.graphic.findUnique({
            where: {
                id
            }
        })

        if(!graphic) {
            return NextResponse.json({ message: "No such graphic found!"}, {status: 404})
        }
        result = graphic

        if(redisClient) {
            logger.info('Graphics are cached!');
            await redisClient.set(redisKey, JSON.stringify(result),  "EX", 60 * 60 * 2);
        }

        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextApiRequest, { params }: { params: { graphicId: string } }) {
    await connectToDB()
    const session = await getServerSession(authOptions)
    const id = params.graphicId
    const {name, quantity, description, thickness, cornerId, materialId, price, image, size, color, laminationId, categoryId} = req.body

    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(owner?.role === 'EMPLOYEE' || owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner can create a new product!" }, { status: 401});
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
            return NextResponse.json({ message: "No such graphic found!"}, {status: 404})
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
                cornerId: cornerId.map((corner: string) => (corner)),
                material: materialId.map((material: string) => (material)),
                price,
                image: image.map((i: string) => (i)),
                size: size.map((s: string) => (s)),
                color,
                lamination: laminationId.map((lamination: string) => (lamination)),
                categoryId,
                userId: owner!.id
            }
        })
        logger.info('New graphics created!')
        return NextResponse.json(updateGraphic, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextApiRequest, { params }: { params: { graphicId: string } }) {
    await connectToDB()
    const session = await getServerSession(authOptions)
    const id = params.graphicId

    if (!session) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: session.user.email!
        }
    })

    if(owner?.role === 'EMPLOYEE' || owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner can create a new product!" }, { status: 401});
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
            return NextResponse.json({ message: "No such graphic found!"}, {status: 404})
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