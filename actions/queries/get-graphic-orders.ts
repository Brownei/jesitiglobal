"use client"
import { GraphicOrder } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getGraphicOrders(): Promise<GraphicOrder[]> {
    const {data} = await axios.get('/api/graphic-orders')
    return data
}

export const useGraphicOrders = () => useQuery({
    queryKey: ['graphic-orders'],
    queryFn: getGraphicOrders,
})
