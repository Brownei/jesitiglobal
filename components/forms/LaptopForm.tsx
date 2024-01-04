"use client"
import { FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ImageUpload from "../ImageUpload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from '../ui/select';
import { createNewLaptop } from "@/actions/server-actions";
import { Laptops, laptopSchema, Users } from "@/interfaces/interface";

type LaptopFormProps = {
    title: string;
    initialData?: Laptops;
    currentUser?: Users
}

const LaptopForm: FC<LaptopFormProps> = ({title, initialData, currentUser}) => {
    const [loading, setLoading] = useState(false)
    const [isSelected, setIsSelected] =useState<number[]>([])
    const router = useRouter()
    
    const defaultValues = initialData ? {
        ...initialData,
        price: parseFloat(String(initialData?.price)),
        quantity: parseFloat(String(initialData.quantity)),
        screenSize: parseFloat(String(initialData.screenSize)),
    } : {
        name: '',
        brand: '',
        quantity: 0,
        model: '',
        screenSize: 0,
        RAM: '',
        storage: '',
        color: '',
        price: 0,
        images: []
    }
    const { control, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<Laptops>({
        resolver: zodResolver(laptopSchema),
        defaultValues
    })


  return (
    <main>
        <div>
            <div className="flex flex-row-reverse justify-between items-center">
                <Button 
                variant='outline'
                onClick={() => router.push('/admin-dashboard/laptops')}
                className='text-sm flex gap-1 font-ProMedium w-fit'>
                    <ArrowLeftIcon/>
                    Back
                </Button>
                <h1 className="text-[2rem] font-HelveticaBold">{title}</h1>
            </div>
            <div className="border-b border-black mt-2 mx-2" />

            <div className="mt-5 mb-10">
                {/* Basic Info */}
                <div className="border p-4 rounded-lg w-full mb-[100px]">
                    <h3 className="mb-5">Basic Information</h3>
                    
                    <form onSubmit={handleSubmit(createNewLaptop)}>
                        <div className="grid gap-5">
                            {/* IMAGES */}
                            <Controller 
                            name="images"
                            control={control}
                            render={({field}) => (
                                <div className="grid gap-1">
                                    <Label>Add Images</Label>
                                    <ImageUpload values={field.value.map((v) => v.url)} onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])} onChange={(url) => field.onChange([...field.value, { url }])} />
                                </div>
                            )}
                            />

                            {/* NAME */}
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

                            {/* BRAND, QUANTITY AND PRICE */}
                            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                                <Controller 
                                name="brand"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid gap-1">
                                        <Label>Brand</Label>
                                        <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>List of Brands</SelectLabel>
                                                    <SelectItem value="dell">Dell</SelectItem>
                                                    <SelectItem value="asus">ASUS</SelectItem>
                                                    <SelectItem value="lenovo">Lenovo</SelectItem>
                                                    <SelectItem value="acer">Acer</SelectItem>
                                                    <SelectItem value="apple">Apple</SelectItem>
                                                    <SelectItem value="msi">MSI</SelectItem>
                                                    <SelectItem value="razer">Razer</SelectItem>
                                                    <SelectItem value="microsoft">Microsoft</SelectItem>
                                                    <SelectItem value="samsung">Samsung</SelectItem>
                                                    <SelectItem value="alienware">Alienware</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                />

                                <Controller 
                                name="quantity"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid gap-1">
                                        <Label>Quantity</Label>
                                        <Select disabled={loading} onValueChange={field.onChange} value={String(field.value)} defaultValue={String(field.value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select amount available" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Quantity</SelectLabel>
                                                    <SelectItem value="1">Only 1 but less than 5</SelectItem>
                                                    <SelectItem value="5">Greater than 5</SelectItem>
                                                    <SelectItem value="10">Greater than 10</SelectItem>
                                                    <SelectItem value="20">Greater than 20</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                />

                                <Controller 
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid gap-1">
                                        <Label>Price</Label>
                                        <Input value={field.value} defaultValue={field.value} type="number" className="border outline-none" placeholder="Enter the price...." />
                                    </div>
                                )}
                                />
                            </div>

                            {/* SCREEN SIZES, RAM AND STORAGE */}
                            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                                <Controller 
                                name="screenSize"
                                control={control}
                                render={({field}) => (
                                    <div className="grid gap-1">
                                        <Label>Screen Size</Label>
                                        <Select disabled={loading} onValueChange={field.onChange} value={String(field.value)} defaultValue={String(field.value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a screen size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Screen Size</SelectLabel>
                                                    <SelectItem value="13">13 inches</SelectItem>
                                                    <SelectItem value="14">14 inches</SelectItem>
                                                    <SelectItem value="15">15 inches</SelectItem>
                                                    <SelectItem value="16">16 inches</SelectItem>
                                                    <SelectItem value="17">17 inches</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                />

                                <Controller 
                                name="RAM"
                                control={control}
                                render={({field}) => (
                                    <div className="grid gap-1">
                                        <Label>RAM</Label>
                                        <Select disabled={loading} onValueChange={field.onChange} value={String(field.value)} defaultValue={String(field.value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a RAM" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>RAM</SelectLabel>
                                                    <SelectItem value="4">4GB</SelectItem>
                                                    <SelectItem value="8">8GB</SelectItem>
                                                    <SelectItem value="16">16GB</SelectItem>
                                                    <SelectItem value="32">32GB</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                />

                                <Controller 
                                name="storage"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid gap-1">
                                        <Label>Storage (SSD)</Label>
                                        <Select disabled={loading} onValueChange={field.onChange} value={String(field.value)} defaultValue={String(field.value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a storage" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Storage</SelectLabel>
                                                    <SelectItem value="256">256GB SSD</SelectItem>
                                                    <SelectItem value="512">512GB SSD</SelectItem>
                                                    <SelectItem value="1000">1TB SSD</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                />
                            </div>

                            {/* COLOR */}
                            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">

                                <Controller 
                                name="color"
                                control={control}
                                render={({ field }) => (
                                    <div className="grid gap-1">
                                        <Label>Color</Label>
                                        <Select disabled={loading} onValueChange={field.onChange} value={String(field.value)} defaultValue={String(field.value)}>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a color" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Color</SelectLabel>
                                                    <SelectItem value="black">Black</SelectItem>
                                                    <SelectItem value="silver">Silver</SelectItem>
                                                    <SelectItem value="blue">Blue</SelectItem>
                                                    <SelectItem value="gray">Grey</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                                />
                            </div>
                        </div>

                        <div className="flex mt-5 justify-end items-center gap-3 lg:mt-[150px]">
                            <Button onClick={() => reset()} className="text-center w-fit hover:text-[#061439] duration-300 font-bold" variant='outline'>
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

export default LaptopForm