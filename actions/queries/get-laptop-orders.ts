"use client"
import { LaptopOrder } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getLaptopOrders(): Promise<LaptopOrder[]> {
    const {data} = await axios.get('/api/laptop-orders')
    return data
}

export const useLaptopOrders = () => useQuery({
    queryKey: ['laptop-orders'],
    queryFn: getLaptopOrders,
})
