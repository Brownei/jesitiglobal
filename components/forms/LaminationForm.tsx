"use client"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { FC, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { createNewLamination } from "@/actions/server-actions";
import ImageUpload from "../ImageUpload"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Laminations, laminationSchema, Users } from "@/interfaces/interface"

type LaminationFormProps = {
    title: string;
    initialData?: any;
    currentUser?: any
}

type image = {
    url: string;
}


const LaminationForm: FC<LaminationFormProps> = ({title, initialData, currentUser}) => {
    const router = useRouter()
    const defaultValues = initialData ? {
        ...initialData,
    } : {
        name: '',
        image: '',
    }
    const { control, handleSubmit, formState: {errors, isSubmitting}, reset, } = useForm<Laminations>({
        resolver: zodResolver(laminationSchema),
        defaultValues
    })
    
  return (
    <main>
        <div>
            <div className="flex flex-row-reverse justify-between items-center">
                <Button 
                variant='outline'
                onClick={() => router.push('/admin-dashboard/laminations')}
                className='text-sm flex gap-1 font-ProMedium w-fit'>
                    <ArrowLeftIcon/>
                    Back
                </Button>
                <h1 className="text-[2rem] font-HelveticaBold">{title}</h1>
            </div>
            <div className="border-b border-black mt-2 mx-2" />

            <div className="mt-5 mb-10">
                <div className="border p-4 rounded-lg w-full mb-[100px]">
                    <form onSubmit={handleSubmit(createNewLamination)}>
                        <div className="grid gap-5">
                            <Controller 
                            name="image"
                            control={control}
                            render={({field}) => (
                                <div className="grid gap-1">
                                    <Label>Add an Image</Label>
                                    <ImageUpload values={field.value ? [field.value] : []} onRemove={() => field.onChange('')} onChange={(url) => field.onChange(url)} />
                                </div>
                            )}
                            />

                            <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <div className="grid gap-1">
                                    <Label>Name</Label>
                                    <Input type="text" className="border outline-none" placeholder="Enter the name...." {...field}/>
                                </div>
                            )}
                            />
                        </div>
                        
                        <div className="flex mt-5 justify-end items-center gap-3">
                            <Button type="button" onClick={() => reset()} className="text-center w-fit hover:text-[#061439] duration-300 font-bold" variant='outline'>
                                Cancel
                            </Button>
                            <Button className="text-center w-fit hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold">
                                {isSubmitting ? 'Creating...' : 'Create'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>
  )
}

export default LaminationForm