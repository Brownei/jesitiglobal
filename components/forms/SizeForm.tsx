"use client"
import { FC, useState, useEffect, ChangeEvent, useCallback, useMemo } from "react";
import { Sizes, sizeSchema } from "@/interfaces/interface";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";


type SizeFormProps = {
    title: string;
    initialData?: Sizes;
}

const SizeForm: FC<SizeFormProps> = ({initialData, title}) => {
    const [onLoading, setOnLoading] = useState(false)
    const [size, setSize] = useState(initialData ? initialData.name : '')
    const [valueSize, setValueSize] = useState(initialData ? initialData.value : '')
    const pathname = usePathname()
    const router = useRouter()
    const search = useSearchParams()!
    const query = useMemo(() => new URLSearchParams(search), [search])

    function resetValues() {
        setSize('')
        setValueSize('')
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            query.set(name, value)

            return query.toString()
        },
        [query]
    )

    function onChange(e: ChangeEvent<HTMLInputElement>, indication: string) {
        if(indication === 'size') {
            const text = e.target.value
            router.push(pathname + '?' + createQueryString('size', text))
            setSize(text)
        }

        if(indication === 'value') {
            const value = e.target.value
            router.push(pathname + '?' + createQueryString('value', value))
            setValueSize(value)
        }

    }

    
    useEffect(() => {
        function saveToQuery() {
            const size = query.get('size') as string
            const value = query.get('value') as string
            const hasSizeQuery = query.has('size')
            const hasValueQuery = query.has('value')

            if(hasSizeQuery && size.length > 0) {
                setSize(size)
            } 

            if(hasValueQuery && value.length > 0) {
                setValueSize(value)
            } 
        }
        
        saveToQuery()
    }, [pathname, query, router])

    function onSubmit() {
        console.log('Hrjrjrhht')
    }


  return (
    <main>
        <div>
            <div className="flex flex-row-reverse justify-between items-center">
                <Button 
                variant='outline'
                onClick={() => router.push('/admin-dashboard/sizes')}
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
                            <Input className="w-[70%]" value={size} onChange={(e) => onChange(e, 'size')} placeholder="Small, Large or ExtraLarge" autoComplete="false"/>
                        </div>

                        <div>
                            <Label className="text-md font-ProBold">Value</Label>
                            <Input className="w-[70%]" value={valueSize} onChange={(e) => onChange(e, 'value')} placeholder="Value..." autoComplete="false"/>
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

export default SizeForm;