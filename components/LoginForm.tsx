"use client"
import Link from "next/link"
import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useUserStore, useLoadingStore } from "@/hooks/useUser"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { signIn } from 'next-auth/react'
import { userSchema } from "@/interfaces/interface"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router = useRouter()
    const { Loading, onLoading, notLoading } = useLoadingStore()
    const { onChange, currentUser } = useUserStore()
    const loginDataSchema = z.object({
        email: z.string().email("Put in a valid email address"),
        password: z.string().min(8, "Your password should be up to 8 characters")
    })
    type loginData = z.infer<typeof loginDataSchema>
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<loginData>({
        resolver: zodResolver(loginDataSchema)
    })

    async function login(data: loginData) {
        onLoading()
        try {
            const user = await signIn('credentials', {
                redirect: false,
                email: data.email,
                password: data.password
            })

            if(user?.status !== 200) {
                router.refresh()
            }
            
            window.location.assign('/admin-dashboard/overview')
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
            notLoading()
        } finally {
            notLoading()
        }
    }

    return (
        <main>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register an account</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit(login)} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                            <div className="mt-2">
                                <Input id="email" type="email" className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('email')}/>
                                {errors.email && (
                                    <p className="text-red-500">{`${errors.email.message}`}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="text-sm">
                                    <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Input id="password" type="password" className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" {...register('password', )}/>
                                {errors.password && (
                                    <p className="text-red-500">{`${errors.password.message}`}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <Button aria-disabled={Loading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500">
                                {Loading ? 'Logging in....' : 'Log In'}
                            </Button>
                        </div>
                    </form>

                    {currentUser && (
                        <div>
                            Current User: {currentUser.firstName}
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}

export default LoginForm