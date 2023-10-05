import { verifyAuth } from "@/lib/verifyAuth"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('user')?.value

    const verifiedToken = token && (
        await verifyAuth(token)
    )

    if(req.nextUrl.pathname.startsWith('/') && !verifiedToken) {
        return
    }

    if(req.url.includes("/") && verifiedToken) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if(!verifiedToken) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = { matcher: ["/dashboard"] }