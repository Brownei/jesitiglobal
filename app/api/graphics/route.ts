import { NextRequest, NextResponse } from "next/server";
import { Graphics } from "@/interfaces/interfaces";
import { MessageResponse } from "@/interfaces/MessageResponse";
import { connectToDB } from "@/lib/database";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import logger from "@/lib/logger";
import redisClient from "@/lib/redis";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const redisKey = 'graphics'
    let results;

    try {
        if(redisClient) {
            logger.info('Cache Hit!');
            const cachedResults = await redisClient.get(redisKey);
            
            if(cachedResults) {
                results = JSON.parse(cachedResults);
            } 
        }

        logger.info('Cache Miss!');
        await connectToDB()
        const graphics = await prisma.graphic.findMany()
        results = graphics

        if(redisClient) {
            logger.info('Graphics are cached!');
            await redisClient.set(redisKey, JSON.stringify(results),  "EX", 60 * 60 * 2);
        }

        return NextResponse.json(results)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}


export async function POST(req: NextApiRequest, res: NextApiResponse) {
    await connectToDB()
    const session = await getServerSession(authOptions)
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
        return NextResponse.json(newGraphics, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}