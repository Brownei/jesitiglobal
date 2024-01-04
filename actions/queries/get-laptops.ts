"use client"
import { Laptop } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getLaptop(): Promise<Laptop[]> {
    const {data} = await axios.get('/api/laptops')
    return data
}

export const useLaptop = () => useQuery({
    queryKey: ['laptops'],
    queryFn: getLaptop,
})
