"use client"
import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import axios, { AxiosError } from 'axios'
import {toast} from 'sonner'
import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod';
import { useRouter } from 'next/navigation'
import {SubmitHandler, useForm} from 'react-hook-form'
import Image from 'next/image'
import Link from 'next/link'

const RegisterForm = () => {
    const { push } = useRouter()
    const signUpSchema = z.object({
        firstName: z.string().min(1, "First name should be more than a character").max(30, "First name should be less than 30 characters"),
        lastName: z.string().min(1, "Last name should be more than a character").max(30, "Last name should be less than 30 characters"),
        email: z.string().email(),
        password: z.string().min(8, "Password should be up to 8 characters"),
        confirmPassword: z.string()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password must match!",
        path: ['confirmPassword']
    })

    type SignUpData = z.infer<typeof signUpSchema>

    const {
        register, 
        handleSubmit, 
        formState: {errors, isSubmitting},
        reset
    } = useForm<SignUpData>({
        resolver: zodResolver(signUpSchema)
    })

    async function Submit(data: SignUpData) {        
        try {
            const response = await axios.post('/api/auth/user', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            })

            if(!response.data) {
                console.log('error')
            }

            toast.success('User Created')
            reset()
            push('/')
        } catch (error) {
            toast.error('Could not create user!')
            console.log(error)
            if(error instanceof AxiosError) {
                toast.error(error.response?.data.message)
            }
        }
    }

  return (
    <main>
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register an account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit(Submit)} className="space-y-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                        <div className="mt-2">
                            <input id="firstName" type="text" className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('firstName')}/>
                            {errors.firstName && (
                                <p className="text-red-500">{`${errors.firstName.message}`}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                        <div className="mt-2">
                            <input id="lastName" type="text" className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('lastName')} />
                            {errors.lastName && (
                                <p className="text-red-500">{`${errors.lastName.message}`}</p>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" type="email" className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('email')} />
                            {errors.email && (
                                <p className="text-red-500">{`${errors.email.message}`}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input id="password" type="password" className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('password')} />
                            {errors.password && (
                                <p className="text-red-500">{`${errors.password.message}`}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                        <div className="mt-2">
                            <input id="confirmPassword" type="password" className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('confirmPassword')} />
                            {errors.confirmPassword && (
                                <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <button disabled={isSubmitting} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500">Register</button>
                    </div>
                </form>
            </div>
        </div>
    </main>
  )
}

export default RegisterForm