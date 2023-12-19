"use client"
import { Colors } from "@/interfaces/interface"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Color = {
    name: string;
    hex: string;
}

type ColorList = {
    colors: Color[]
}

async function getColorsByName(): Promise<ColorList> {
  const { data } = await axios.get('https://api.color.pizza/v1/')
  return data
}

export const useColorsByName = () => useQuery({
  queryKey: ['colors'],
  queryFn: getColorsByName
})