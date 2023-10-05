import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const cookies = req.cookies.get('jwt')

    if(!cookies) {
        return NextResponse.json({ message: "Not logged in at all!"})
    }

    const response = NextResponse.json({message: "Logged out successfully!"})

    response.cookies.delete('jwt')

    return response
}