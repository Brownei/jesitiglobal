import NextAuth, { Awaitable, NextAuthOptions } from 'next-auth'
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import {compare} from 'bcrypt-ts';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

function getGoogleCredentials() {
    const clientId= process.env.GOOGLE_CLIENT_ID
    const clientSecret= process.env.GOOGLE_CLIENT_SECRET 

    if(!clientId || clientId?.length === 0) {
        throw new Error('No clientID for provider')
    }

    if(!clientSecret || clientSecret?.length === 0) {
        throw new Error('No clientSecret for provider')
    }
    return {clientId, clientSecret}
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: getGoogleCredentials().clientId,
            clientSecret: getGoogleCredentials().clientSecret
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {

                const validatedCredentials = z.object({
                    email: z.string().email("Put in a valid email address"),
                    password: z.string().min(8, "Your password should be up to 8 characters")
                }).safeParse(credentials)

                if(validatedCredentials.success) {
                    const {email, password} = validatedCredentials.data

                    const user = await prisma.user.findUnique({
                        where: {
                            email
                        }
                    })

                    if(!user) return null;

                    const isPasswordCorrect = await compare(password, user.password!)

                    if(!isPasswordCorrect) {
                        return null
                    }

                    return {
                        id: `${user.id}`,
                        name: user.firstName,
                        image: user.image,
                        email: user.email
                    }
                }

                return null
            }
        })
    ],

    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/login',
    },
}