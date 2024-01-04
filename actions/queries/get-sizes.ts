"use client"
import { Size } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getSize(): Promise<Size[]> {
    const {data} = await axios.get('/api/sizes')
    return data
}

export const useSize = () => useQuery({
    queryKey: ['sizes'],
    queryFn: getSize,
})
