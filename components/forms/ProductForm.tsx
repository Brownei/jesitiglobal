"use client"
import { FC, useState } from "react"
import { Button } from "../ui/button";
import ImageUpload from "../ImageUpload";
import { nanoid } from 'nanoid'
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from '../ui/select';


type Image ={
    url: string
    id: string
}

type ProductFormProps = {
    title: string;
}

const ProductForm: FC<ProductFormProps> = ({title}) => {
    const [image, setImage] = useState<Image[]>([])


  return (
    <main className="container">
        <div className="relative mt-5 mr-5 rounded-full">
            <div className="flex justify-between items-center">
                <h1 className="text-[2rem] font-HelveticaBold">{title}</h1>
            </div>
            <div className="border-b border-black mt-2 mx-2" />

            <div className="mt-5 mb-10">
                {/* Basic Info */}
                <div className="border p-4 rounded-lg w-full mb-[100px]">
                    <h3 className="mb-5">Basic Information</h3>
                    
                    <div className="grid gap-5">

                         {/* IMAGES */}
                        <div className="grid gap-1">
                            <Label>Add Images</Label>
                            <ImageUpload values={image} onRemove={url => setImage(image.filter((i) => i.id !== url))} onChange={url => setImage([...image, {
                                id: nanoid(),
                                url
                            }])} />
                        </div>

                        {/* NAME */}
                        <div className="grid gap-1">
                            <Label>Name</Label>
                            <Input type="text" className="border outline-none" placeholder="Enter the name...."/>
                        </div>

                        {/* CATEGORY, QUANTITY AND PRICE */}
                        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                            <div className="grid gap-1">
                                <Label>Category</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-1">
                                <Label>Quantity</Label>
                                <Input type="number" className="border outline-none" placeholder="Enter the quantity avialable...."/>
                            </div>
                            <div className="grid gap-1">
                                <Label>Price</Label>
                                <Input type="number" className="border outline-none" placeholder="Enter the price...."/>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="grid gap-1">
                            <Label>Description</Label>
                            <Textarea className="border outline-none" />
                        </div>

                        {/* CORNERS, MATERIALS AND SIZE */}
                        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                            <div className="grid gap-1">
                                <Label>Corners</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a corner" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-1">
                                <Label>Material</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a material" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-1">
                                <Label>Size</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* COLOR AND LAMINATION */}
                        <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                            <div className="grid gap-1">
                                <Label>Color</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a color" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-1">
                                <Label>Lamination</Label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a lamination" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="flex mt-5 justify-end items-center gap-3">
                        <Button className="text-center w-fit hover:text-[#061439] duration-300 font-bold" variant='outline'>
                            Cancel
                        </Button>
                        <Button className="text-center w-fit hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold">
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}

export default ProductForm