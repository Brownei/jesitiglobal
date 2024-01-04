"use client"
import { Graphic } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getGraphic(): Promise<Graphic[]> {
    const {data} = await axios.get('/api/graphics')
    return data
}

export const useGraphic = () => useQuery({
    queryKey: ['graphics'],
    queryFn: getGraphic,
})
