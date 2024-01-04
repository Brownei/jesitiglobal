import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest} from "next/server";
import logger from "@/lib/logger";
import { hashSync } from "bcrypt-ts";
import { verifyAuth } from "@/lib/verifyAuth";
import { Roles } from "@prisma/client";

export async function GET(req: NextRequest, res: NextResponse) {
    const token = req.cookies.get('jwt')?.value as string

    try {

        const verifiedToken = await verifyAuth(token)

        if (!verifiedToken) {
            logger.info('Unauthorized!')
            return new NextResponse('Unauthorized!', { status: 401});
        }

        const user = await prisma.user.findUnique({
            where: {
                id: verifiedToken.id
            }
        });

        if (!user) {
            logger.info('No user found!')
            return new NextResponse('No user found!', { status: 404});
        } else if (user.role !== 'OWNER') {
            logger.info('Unauthorized!')
            return new NextResponse('Unauthorized!', { status: 401});
        }

        const allEmployees = await prisma.user.findMany({
            where: {
                role: 'EMPLOYEE'
            }, 
            select: {
                firstName: true,
                lastName: true,
                id: true,
                email: true,
                image: true,
                role: true
            }
        })

        logger.info('All employees are present!')
        return NextResponse.json(allEmployees, { status: 200});

    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse('Internal server error!', { status: 500});
    }
}

export async function POST(req: NextRequest) {
    const {firstName, lastName, email, password: pass} = await req.json()

    try {
        if(!pass) {
            return new NextResponse('Password is missing!', {status: 404})
        }

        if(!firstName || !lastName) {
            return NextResponse.json('Name is missing!', {status: 404})
        }

        if(!email) {
            return NextResponse.json('Email is missing!', {status: 404})
        }
        
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(existingUser) {
            return new NextResponse('You are already a user.', {status: 409})
        }

        
        const hashedPassword = hashSync(pass, 10)

        if(email.endsWith('@gmail.com')) {
            await prisma.user.create({
                data: {
                    firstName: firstName as string,
                    lastName: lastName as string,
                    email: email as string,
                    password: hashedPassword as string,
                    role: 'OWNER',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1pWf8Ay0uX9KIaHFF5NGMy5kbzQseWezyKfmqNsMsX5_WIAfWn6GMm_o_KXdi5XIwcQ&usqp=CAU',
                    hasAccess: true
                }
            })
        } else if (email.endsWith('@cloud.com')) {
            await prisma.user.create({
                data: {
                    firstName: firstName as string,
                    lastName: lastName as string,
                    email: email as string,
                    password: hashedPassword as string,
                    role: 'EMPLOYEE',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1pWf8Ay0uX9KIaHFF5NGMy5kbzQseWezyKfmqNsMsX5_WIAfWn6GMm_o_KXdi5XIwcQ&usqp=CAU',
                    hasAccess: false
                }
            })
        }
    
        await prisma.user.create({
            data: {
                firstName: firstName as string,
                lastName: lastName as string,
                email: email as string,
                password: hashedPassword as string,
                role: 'CLIENT',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1pWf8Ay0uX9KIaHFF5NGMy5kbzQseWezyKfmqNsMsX5_WIAfWn6GMm_o_KXdi5XIwcQ&usqp=CAU',
                hasAccess: false
            }
        })

        logger.info('User created!')
        return new NextResponse('User created!', {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return new NextResponse('Internal server error', {status: 500})
    }
}