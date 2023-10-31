"use client"
import { create } from 'zustand';
import {z} from 'zod'


export const UserSchema = z.object({
    id: z.number(),
    firstName: z.string().min(5, "The name of this user needs to be more than 5 characters"),
    lastName: z.string().min(5, "The name of this user needs to be more than 5 characters"),
    email: z.string().email(),
    image: z.string().nullable(),
    role: z.enum(["OWNER", "EMPLOYEE", "CLIENT"]),
})

export type User = z.infer<typeof UserSchema>


type State = {
    currentUser: User | null;
}

type Action = {
    onChange: (user: User) => void;
    onRemove: () => void
}

export const useUserStore = create<State & Action>((set) => ({
    currentUser: null,
    onChange: (user) => {
        set({currentUser: user})
    },
    onRemove: () => {
        set({currentUser: null})
    }
}))