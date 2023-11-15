import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const sizes = await prisma.size.findMany()

        return NextResponse.json(sizes)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const {name, value} = await req.json()
    const token = req.cookies.get('user')?.value
    const verifiedToken = token && (
        await verifyAuth(token)
    )
    
    if (!verifiedToken) {
        return NextResponse.json({ message: "You must be logged in." }, { status: 401});
    }
    
    const owner = await prisma.user.findUnique({
        where: {
            email: verifiedToken.email as string
        }
    })

    if(owner?.role === 'EMPLOYEE' || owner?.role === 'CLIENT') {
        return NextResponse.json({ message: "Only the owner can create a new product!" }, { status: 401});
    }

    try {
        const existingSize = await prisma.size.findFirst({
            where: {
                name
            }
        })

        if(existingSize) {
            return NextResponse.json({message: 'This size already exists!. Try something else'})
        }

        const newSize = await prisma.size.create({
            data: {
                name,
                value,
            }
        })

        return NextResponse.json(newSize)
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}