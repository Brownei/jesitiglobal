import redisClient from "@/lib/redis";
import logger from "@/lib/logger";
import { connectToDB } from "@/lib/database";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";

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
            return NextResponse.json({ message: "No such laptop found!"}, {status: 404})
        }
        result = laptop
        return NextResponse.json(result)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function PATCH(req: NextRequest, { params }: { params: { laptopId: number } }) {
    const token = req.cookies.get('user')?.value
    const verifiedToken = token && (
        await verifyAuth(token)
    )
    const id = params.laptopId
    const {name, quantity, brand, model, screenSize, RAM, price, images, storage, color} = await req.json()

    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.email!
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner/employee can update a product!" }, { status: 401});
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
                image: {
                    create: images.map((image: string) => (image))
                },
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


export async function DELETE(req: NextRequest, { params }: { params: { laptopId: number } }) {
    const token = req.cookies.get('user')?.value
    const verifiedToken = token && (
        await verifyAuth(token)
    )
    const id = params.laptopId

    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.email!
        }
    })

    if(owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner/employee can delete a product!" }, { status: 401});
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
            return NextResponse.json({ message: "No such laptop found!"}, {status: 404})
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

        return NextResponse.json({ message: `${existingLaptop.name} is successfully deleted!`})

    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}