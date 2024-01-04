"use client"
import { Corners } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getCorners(): Promise<Corners[]> {
    const {data} = await axios.get('/api/corners')
    return data
}

export const useCorners = () => useQuery({
    queryKey: ['corners'],
    queryFn: getCorners,
})
