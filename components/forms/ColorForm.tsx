"use client"
import { FC, useState, useEffect, ChangeEvent, useCallback, useMemo, SyntheticEvent } from "react";
import { Colors, Users } from "@/interfaces/interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useColorsByName } from "@/hooks/useColorsByName";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

type ColorFormProps = {
    title: string;
    initialData?: Colors;
    currentUser?: Users
}

type Color = {
    name: string;
    hex: string;
}

const ColorForm: FC<ColorFormProps> = ({initialData, title, currentUser}) => {
    const { data, isFetching } = useColorsByName()
    const [onLoading, setOnLoading] = useState(false)
    const [color, setColor] = useState(initialData ? initialData.name : '')
    const [valueColor, setValueColor] = useState(initialData ? initialData.value : '')
    const pathname = usePathname()
    const router = useRouter()
    const search = useSearchParams()!
    const query = useMemo(() => new URLSearchParams(search), [search])

    function resetValues() {
        setColor('')
        setValueColor('')
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            query.set(name, value)

            return query.toString()
        },
        [query]
    )

    function handleChange() {
        const selectedColor: Color | undefined = data?.colors.find((c: Color) => c.name.toLowerCase() === color.toLowerCase())
        console.log(selectedColor?.hex)
        if(selectedColor) {
            setValueColor(selectedColor.hex)
        } else {
            setValueColor('No Color Value')
        }
    }

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        const text = e.target.value

        router.push(pathname + '?' + createQueryString('color', text))
        setColor(text)
    }

    
    useEffect(() => {
        function saveToQuery() {
            const color = query.get('color') as string
            const hasColorQuery = query.has('color')

            if(hasColorQuery && color.length > 0) {
                setColor(color)
            } else {
                router.push(pathname)
            }
        }
        
        saveToQuery()
    }, [pathname, query, router])

    async function onSubmit(e: SyntheticEvent) {
        e.preventDefault()
        setOnLoading(true)

        try {
            const response = await axios.post('/api/colors', {
                name: color,
                value: valueColor,
            })
            if(response.status !== 200) {
                toast.error('Something happened!')
            }

            setOnLoading(false)
            toast.success(`${color} is created successfully!`)
            window.location.assign('/admin-dashboard/colors')
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
                onClick={() => router.back()}
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
                            <div className="flex gap-4 items-center">
                                <Input className="w-[70%]" value={color} onChange={(e) => onChange(e)} placeholder="Red, Blue, Green and so on" autoComplete="false"/>
                                <Button type="button" onClick={handleChange} size='sm' className="text-center w-fit hover:bg-[#96FDFF] hover:text-[#061439] duration-100">
                                    {isFetching ? 'Finding color....' : 'Find Color'}
                                </Button>
                            </div>
                        </div>

                        <div>
                            <Label className="text-md font-ProBold">Value</Label>
                            <div className="flex gap-4 items-center">
                                <Input disabled className="w-[70%]" value={valueColor} placeholder="Value..." autoComplete="false"/>
                                <div className="border rounded-full w-5 h-5" style={{backgroundColor: `${valueColor === 'No Color Value' ? '#fffff' : valueColor}`}}/>
                            </div>
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

export default ColorForm;