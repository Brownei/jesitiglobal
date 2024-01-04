"use server"
import { Graphics, Laminations, Materials, Categories, Laptops, Corners } from "@/interfaces/interface"
import { SubmitHandler } from "react-hook-form"

export const createNewGraphic: SubmitHandler<Graphics> = async (data) => {
    console.log(data)
}

export const createNewCorner: SubmitHandler<Corners> = async (data) => {
    console.log(data)
}

export const createNewLamination: SubmitHandler<Laminations> = async (data) => {
    console.log(data)
}

export const createNewLaptop: SubmitHandler<Laptops> = async (data) => {
    console.log(data)
}

export const createNewMaterial: SubmitHandler<Materials> = async (data) => {
    console.log(data)
}

// export async function authenticate(prevState: string | undefined, formData: FormData) {
//     try {
//         await signIn('credentials', formData)
//     } catch (error) {
//         if(error instanceof AuthError) {
//             switch (error.type) {
//                 case 'CredentialsSignin': 
//                     return 'Invalid  credentials';
//                 default:
//                     return 'Something went wrong'
//             }
//         }

//         throw error
//     }
// }