"use client"

import { Categories, Users } from "@/interfaces/interface";
// import { User } from "@prisma/client";
import { ChangeEvent, FC, useCallback, useState, useMemo, useEffect, SyntheticEvent } from "react"
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

type CategoryFormProps = {
    title: string;
    initialData?: Categories;
    currentUser: any
}

const CategoryForm: FC<CategoryFormProps> = ({title, initialData, currentUser}) => {
    const [onLoading, setOnLoading] = useState(false)
    const [name, setName] = useState(initialData ? initialData.name : '')
    const [description, setDescription] = useState(initialData ? initialData.description : '')
    const pathname = usePathname()
    const router = useRouter()
    const search = useSearchParams()!
    const query = useMemo(() => new URLSearchParams(search), [search])

    function resetValues() {
        setName('')
        setDescription('')
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            query.set(name, value)

            return query.toString()
        },
        [query]
    )

    function onChange(e: ChangeEvent<HTMLInputElement>, indication: string) {
        if(indication === 'name') {
            const name = e.target.value
            router.push(pathname + '?' + createQueryString('name', name))
            setName(name)
        }

        if(indication === 'description') {
            const description = e.target.value
            router.push(pathname + '?' + createQueryString('description', description))
            setDescription(description)
        }

    }

    
    useEffect(() => {
        function saveToQuery() {
            const name = query.get('name') as string
            const description = query.get('description') as string
            const hasNameQuery = query.has('name')
            const hasDescriptionQuery = query.has('description')

            if(hasNameQuery && name.length > 0) {
                setName(name)
            } 

            if(hasDescriptionQuery && description.length > 0) {
                setDescription(description)
            } 
        }
        
        saveToQuery()
    }, [pathname, query, router])

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setOnLoading(true)

        try {
            const response = await axios.post('/api/categories', {
                name,
                description,
                userId: currentUser?.id
            })
            if(response.status !== 200) {
                toast.error('Something happened!')
            }

            setOnLoading(false)
            toast.success(`${name} is created successfully!`)
            window.location.assign('/admin-dashboard/categories')
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError) {
                toast.error(error.response?.data)
            }
        } finally {
            setOnLoading(false)
        }
    }


  return (
    <main>
        <div>
            <div className="flex flex-row-reverse justify-between items-center">
                <Button 
                variant='outline'
                onClick={() => router.push('/admin-dashboard/categories')}
                className='text-sm flex gap-1 font-ProMedium w-fit'>
                    <ArrowLeftIcon/>
                    Back
                </Button>
                <h1 className="text-[2rem] font-HelveticaBold">{title}</h1>
            </div>
            <div className="border-b border-black mt-2 mx-2" />


            <div className="mt-5 mb-10">
                <div className="border p-4 rounded-lg w-full mb-[100px]">
                    <form onSubmit={onSubmit} className="space-y-4 mt-4">
                        <div className="flex flex-col space-y-3">
                            <Label className="text-md font-ProBold">Name</Label>
                            <Input className="w-[70%]" value={name} onChange={(e) => onChange(e, 'name')} placeholder="Name of your category..." autoComplete="false"/>
                        </div>

                        <div>
                            <Label className="text-md font-ProBold">Value</Label>
                            <Input className="w-[70%]" value={description} onChange={(e) => onChange(e, 'description')} placeholder="Talk more about what they display..." autoComplete="false"/>
                        </div>

                        <div className="flex mt-5 justify-end items-center gap-3">
                            <Button type="button" onClick={resetValues} className="text-center w-fit hover:text-[#061439] duration-300 font-bold" variant='outline'>
                                Cancel
                            </Button>
                            <Button className="text-center w-fit hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold">
                                {onLoading ? 'Creating...' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
  )
}

export default CategoryForm