"use client"
import { Lamination } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getLamination(): Promise<Lamination[]> {
    const {data} = await axios.get('/api/laminations')
    return data
}

export const useLamination = () => useQuery({
    queryKey: ['laminations'],
    queryFn: getLamination,
})
