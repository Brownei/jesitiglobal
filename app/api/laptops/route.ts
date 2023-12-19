import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/database";
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/prisma";
import logger from "@/lib/logger";
import redisClient from "@/lib/redis";
import { verifyAuth } from "@/lib/verifyAuth";

export async function GET(req: NextRequest) {
    let results;
    try {
        const laptops = await prisma.laptop.findMany()
        results = laptops
        return NextResponse.json(results)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}


// export async function POST(req: NextRequest) {
//     const token = req.cookies.get('user')?.value
//     const verifiedToken = token && (
//         await verifyAuth(token)
//     )
//     const {name, quantity, brand, model, screenSize, RAM, price, images, storage, color} = await req.json()
    
//     if (!verifiedToken) {
//         return NextResponse.json({ message: "You must be logged in." }, { status: 401});
//     }
    
//     const owner = await prisma.user.findUnique({
//         where: {
//             email: verifiedToken.email!
//         }
//     })

//     if(owner?.role === 'CLIENT') {
//         return NextResponse.json({ message: "Only the owner/employee can create a new product!" }, { status: 401});
//     }

//     try {
//         const existingLaptop = await prisma.laptop.findUnique({
//             where: {
//                 userId: owner!.id,
//                 name: name as string
//             }
//         })

//         if(existingLaptop) {
//             return NextResponse.json({ message: "Existing laptop! Try adding another"}, {status: 409})
//         }

//         const newLaptop = await prisma.laptop.create({
//             data: {
//                 name: name as string,
//                 quantity: quantity as number,
//                 brand: brand as string,
//                 model: model as string,
//                 screenSize: screenSize as number,
//                 RAM: RAM as string,
//                 storage: storage as string,
//                 price: price as number,
//                 image: {
//                     create: images.map((image: string) => (image))
//                 },
//                 color: color as string,
//                 userId: owner!.id
//             }
//         })
//         logger.info('New laptop created!')
//         return NextResponse.json(newLaptop, {status: 201})
//     } catch (error) {
//         logger.error(error)
//         console.log(error)
//         return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
//     }
// }