import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { connectToDB } from "@/lib/database";
import logger from "@/lib/logger";
import { hashSync } from "bcrypt-ts";
import { verifyAuth } from "@/lib/verifyAuth";
import { User } from "@/hooks/useUser";

// export async function GET(req: NextRequest) {
//     const token = req.cookies.get('user')?.value
//     try {
//     const verifiedToken = token && (
//       await verifyAuth(token)
//     )

//     if (!verifiedToken) {
//         return NextResponse.json({ message: "You must be logged in." }, { status: 401});
//     }

//     const user = await prisma.user.findUnique({
//         where: {
//             id: verifiedToken.id
//         }
//     });

//     if (user) {
//       return NextResponse.json<User>({ 
//         id: user.id,
//         firstName: user.firstName as string,
//         lastName: user.lastName as string,
//         emailVerified: user.emailVerified,
//         email: user.email as string,
//         image: user.image as string,
//         role: user.role,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//        });
//     } else {
//         return NextResponse.json({ error: 'Invalid token' }, {status: 401});
//     }
//   } catch (error) {
//     logger.error(error)
//     console.log(error)
//     return NextResponse.json({ error: 'Invalid token' }, {status: 401});
//   }
// }

export async function POST(req: NextRequest) {
    const {firstName, lastName, email, password: pass} = await req.json()

    try {
        await connectToDB()

        if(!pass) {
            return NextResponse.json({ message: 'Password is missing!'}, {status: 404})
        }

        if(!firstName || !lastName) {
            return NextResponse.json({ message: 'Name is missing!'}, {status: 404})
        }

        if(!email) {
            return NextResponse.json({ message: 'Email is missing!'}, {status: 404})
        }
        
        const existingUser = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(existingUser) {
            return NextResponse.json({ message: 'You are already a user. Try and login!'}, {status: 409})
        }
    
        const hashedPassword = hashSync(pass, 10)
    
        const newUser = await prisma.user.create({
            data: {
                firstName: firstName as string,
                lastName: lastName as string,
                email: email as string,
                password: hashedPassword as string,
                role: email.includes('@gmail.com') ? 'OWNER' : 'CLIENT'
            }
        })

        logger.info('User created!')
        return NextResponse.json(newUser, {status: 201})
    } catch (error) {
        logger.error(error)
        console.log(error)
        return NextResponse.json({ message: "Internal Server Error" }, {status: 500})
    }
}