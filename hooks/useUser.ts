"use client"
import { create } from 'zustand';
import {z} from 'zod'
import axios from 'axios';


export const UserSchema = z.object({
    createdAt: z.date().or(z.string()),
    email: z.string().email(),
    emailVerified: z.date().nullable(),
    firstName: z.string().min(5, "The name of this user needs to be more than 5 characters"),
    id: z.number(),
    image: z.string().nullable(),
    lastName: z.string().min(5, "The name of this user needs to be more than 5 characters"),
    role: z.enum(["OWNER", "EMPLOYEE", "CLIENT"]),
    updatedAt: z.date().or(z.string())
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