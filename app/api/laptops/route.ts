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
    const redisKey = 'laptops'
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
        const laptops = await prisma.laptop.findMany()
        results = laptops

        if(redisClient) {
            logger.info('Laptops are cached!');
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
    const {name, quantity, brand, model, screenSize, RAM, price, image, storage, color} = req.body
    
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
        const existingLaptop = await prisma.laptop.findUnique({
            where: {
                userId: owner!.id,
                name: name as string
            }
        })

        if(existingLaptop) {
            return NextResponse.json({ message: "Existing laptop! Try adding another"}, {status: 409})
        }

        const newLaptop = await prisma.laptop.create({
            data: {
                name: name as string,
                quantity: quantity as number,
                brand: brand as string,
                model: model as string,
                screenSize: screenSize as number,
                RAM: RAM as string,
                storage: storage as string,
                price: price as number,
                image: image.map((i: string) => (i)),
                color: color as string,
                userId: owner!.id
            }
        })
        logger.info('New laptop created!')
        return NextResponse.json(newLaptop, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}