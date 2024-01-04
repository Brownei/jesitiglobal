"use client"
import { Materials } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getMaterial(): Promise<Materials[]> {
    const {data} = await axios.get('/api/materials')
    return data
}

export const useMaterial = () => useQuery({
    queryKey: ['materials'],
    queryFn: getMaterial,
})
