import redisClient from "@/lib/redis";
import { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import { connectToDB } from "@/lib/database";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/authOptions";

export async function GET(req: NextApiRequest, { params }: { params: { laptopId: string } }) {
    const id = params.laptopId
    const redisKey = `laptops-${id}`
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
        const laptop = await prisma.laptop.findUnique({
            where: {
                id
            }
        })

        if(!laptop) {
            return NextResponse.json({ message: "No such laptop found!"}, {status: 404})
        }
        result = laptop

        if(redisClient) {
            logger.info('Laptops are cached!');
            await redisClient.set(redisKey, JSON.stringify(result),  "EX", 60 * 60 * 2);
        }

        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextApiRequest, { params }: { params: { laptopId: string } }) {
    await connectToDB()
    const session = await getServerSession(authOptions)
    const id = params.laptopId
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
                id
            }
        })

        if(!existingLaptop) {
            return NextResponse.json({ message: "No such graphic found!"}, {status: 404})
        }

        const updateLaptop = await prisma.laptop.update({
            where: {
                id
            }, 
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
        return NextResponse.json(updateLaptop, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }

}


export async function DELETE(req: NextApiRequest, { params }: { params: { laptopId: string } }) {
    await connectToDB()
    const session = await getServerSession(authOptions)
    const id = params.laptopId

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
                id
            }
        })
        if(!existingLaptop) {
            return NextResponse.json({ message: "No such laptop found!"}, {status: 404})
        }

        await prisma.laptop.delete({
            where: {
                id
            }
        })

        return NextResponse.json({ message: `${existingLaptop.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}