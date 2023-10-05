"use client"
import { create } from 'zustand';
import {z} from 'zod'

export const UserSchema = z.object({
    id: z.string(),
    firstName: z.string().min(5, "The name of this user needs to be more than 5 characters"),
    lastName: z.string().min(5, "The name of this user needs to be more than 5 characters"),
    emailVerified: z.date(),
    email: z.string().email(),
    image: z.string(),
    role: z.enum(["OWNER", "EMPLOYEE", "CLIENT"]),
    createdAt: z.date(),
    updatedAt: z.date()
})

export type User = z.infer<typeof UserSchema>

type CurrentUserState = {
    currentUser: User | null
}

type CurrentUserAction = {
    onChange: (user: User) => void
    onRemove: () => void
}

export const useCurrentUsereStore = create<CurrentUserState & CurrentUserAction>((set) => ({
    currentUser: null,
    onChange: (user) => {
        set({currentUser: user})
    },
    onRemove: () => {
        set({currentUser: null})
    }
}))