import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookies = req.cookies.get('jwt')

    if(!cookies) {
        return new NextResponse("Unauthorized!", { status: 401 })
    }

    const response = NextResponse.json({ status: 200})

    response.cookies.delete('user')

    return response
}