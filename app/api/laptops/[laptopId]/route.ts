import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest, { params }: { params: { laptopId: number } }) {
    const id = params.laptopId
    let result;
    try {

        const laptop = await prisma.laptop.findUnique({
            where: {
                id
            }
        })

        if(!laptop) {
            logger.info('No such laptop found!')
            return new NextResponse('No such laptop found!', {status: 404})
        }
        result = laptop
        return NextResponse.json(result)
        
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse('Internal server error', {status: 500})
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { laptopId: number } }) {
    const verifiedToken = await getServerSession(authOptions)
    
    const id = params.laptopId
    const {name, quantity, brand, model, screenSize, RAM, price, images, storage, color} = await req.json()

    if (!verifiedToken) {
        logger.info('Unauthorized')
        return new NextResponse('Unauthorized', { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            firstName: verifiedToken.user?.name,
            email: verifiedToken.user?.email!
        }
    })

    if(owner?.role === 'CLIENT') {
        logger.info('Only the owner/employee can update a laptop!')
        return new NextResponse('Only the owner/employee can update a laptop!', { status: 401});
    }

    try {
        const existingLaptop = await prisma.laptop.findUnique({
            where: {
                userId: owner!.id,
                id
            }
        })

        if(!existingLaptop) {
            logger.info('No such laptop found!')
            return new NextResponse('No such laptop found!', {status: 404})
        }

        await prisma.laptop.update({
            where: {
                id: existingLaptop.id
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
                image: {
                    create: images.map((image: string) => (image))
                },
                color: color as string,
                userId: owner!.id
            }
        })
        logger.info(`${existingLaptop.name} is updated!`)
        return new NextResponse(`${existingLaptop.name} is updated!`, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse('Internal server error', {status: 500})
    }

}


export async function DELETE(req: NextRequest, { params }: { params: { laptopId: number } }) {
    const verifiedToken = await getServerSession(authOptions)
    const id = params.laptopId

    if (!verifiedToken) {
        return new NextResponse("You must be logged in.", { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.user?.email as string
        }
    })

    if(owner?.role === 'CLIENT') {
        logger.info('Unauthorized!')
        return new NextResponse('Unauthorized!', { status: 401});
    }

    try {
        const existingLaptop = await prisma.laptop.findUnique({
            where: {
                userId: owner!.id,
                id
            }, include: {
                image: true
            }
        })
        if(!existingLaptop) {
            logger.info("No such laptop found!")
            return new NextResponse("No such laptop found!", {status: 404})
        }

        for(const image of existingLaptop.image){
            await prisma.image.delete({
                where: {
                    id: image.id
                }
            })
        }

        await prisma.laptop.delete({
            where: {
                id
            }
        })

        logger.info(`${existingLaptop.name} is successfully deleted!`)
        return new NextResponse(`${existingLaptop.name} is successfully deleted!`, { status: 200})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse('Internal server error', {status: 500})
    }
}