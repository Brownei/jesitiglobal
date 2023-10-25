"use client"
import { User } from "@/hooks/useUser"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

async function getCurrentUser(): Promise<User> {
  const {data} = await axios.get('/api/auth/user')
  return data
}

export const useUser = () => useQuery({
  queryKey: ['user'],
  queryFn: getCurrentUser,
})