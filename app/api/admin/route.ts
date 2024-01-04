import logger from "@/lib/logger";
import { prisma } from "@/lib/prisma";
import { verifyAuth } from "@/lib/verifyAuth";
import { NextRequest, NextResponse } from "next/server";


//  GIVING AND REMOVING ACCESS TO AND FROM AN EMPLOYEE
export async function PATCH(req: NextRequest, res: NextResponse) {
    const { id, email, hasBeenAccessed } = await req.json()
    const token = req.cookies.get('jwt')!.value

    if(!token) {
        logger.info('Unauthorized!')
        return new NextResponse('Unauthorized!', { status: 401 })
    }

    const verifiedUser = await verifyAuth(token)

    const owner = await prisma.user.findUnique({
        where: {
            id: verifiedUser.id,
            email: verifiedUser.email,
            firstName: verifiedUser.firstName,
            lastName: verifiedUser.lastName,
            role: verifiedUser.role
        }
    })

    if(!owner) {
        logger.info('Unauthorized!')
        return new NextResponse('Unauthorized!', { status: 401 })
    } else if (owner.role !== 'OWNER') {
        logger.info('Unauthorized!')
        return new NextResponse('Unauthorized!', { status: 401 })
    }

    const employee = await prisma.user.findUnique({
        where: {
            id,
            email,
            hasAccess: false,
            role: 'EMPLOYEE'
        }
    })

    if(!employee) {
        logger.info('You are not an employee!')
        return new NextResponse('You are not an employee!', { status: 401 })
    } else if(employee.hasAccess === true) {
        logger.info('You already have access!')
        return new NextResponse('You already have access!', { status: 409 })
    }


    if(hasBeenAccessed === true) {
        await prisma.user.update({
            where: {
                id,
                email,
                hasAccess: true,
                role: 'EMPLOYEE'
            }, 
            data: {
                hasAccess: false
            }
        })

        logger.info(`${employee.firstName} has his access revoked!`)
        return new NextResponse(`${employee.firstName} has his access revoked!`, {status: 201})
    }

    await prisma.user.update({
        where: {
            id,
            email,
            hasAccess: false,
            role: 'EMPLOYEE'
        }, 
        data: {
            hasAccess: true
        }
    })

    logger.info(`${employee.firstName} has access now!`)
    return new NextResponse(`${employee.firstName} has access now!`, {status: 201})
}