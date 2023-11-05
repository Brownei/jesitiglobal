"use client"
import { FC, useState } from "react"
import { Button } from "../ui/button";
import ImageUpload from "../ImageUpload";
import { nanoid } from 'nanoid'
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type Image ={
    url: string
    id: string
}

type ProductFormProps = {
    title: string;
}

const ProductForm: FC<ProductFormProps> = ({title}) => {
    const [image, setImage] = useState<Image[]>([{ id: "", url: ""}])


  return (
    <main>
        <div className="relative mt-5 mr-5">
            <div className="flex justify-between items-center">
                <h1 className="text-[2rem] font-HelveticaBold">{title}</h1>
                
            </div>
            <div className="border-b border-black mt-2 mx-2" />

            <div className="mt-5">
                {/* Basic Info */}
                <div className="border p-4 rounded-lg w-full">
                    <h3 className="mb-5">Basic Information</h3>
                    
                    <div className="grid gap-5">

                        {/* NAME */}
                        <div className="grid gap-1">
                            <Label>Name</Label>
                            <Input type="text" className="border outline-none" placeholder="Enter the name...."/>
                        </div>

                        {/* CATEGORY, QUANTITY AND PRICE */}
                        <div className="grid grid-cols-3 gap-5">
                            <div className="grid gap-1">
                                <Label>Category</Label>
                                <input type="text" className="border outline-none" />
                            </div>
                            <div className="grid gap-1">
                                <Label>Quantity</Label>
                                <Input type="number" className="border outline-none" placeholder="Enter the name...."/>
                            </div>
                            <div className="grid gap-1">
                                <Label>Price</Label>
                                <Input type="number" className="border outline-none" placeholder="Enter the name...."/>
                            </div>
                        </div>

                        {/* IMAGES */}
                        <div className="grid gap-1">
                            <Label>Images</Label>
                            <ImageUpload values={image} onRemove={url => setImage(image.filter((i) => i.id !== url))} onChange={url => setImage([...image, {
                                id: nanoid(),
                                url
                            }])} />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="grid gap-1">
                            <Label>Description</Label>
                            <Textarea className="border outline-none" />
                        </div>

                        {/* CORNERS, MATERIALS AND SIZE */}
                        <div className="grid grid-cols-3 gap-5">
                            <div className="grid gap-1">
                                <Label>Corners</Label>
                                <Input type="text" className="border outline-none" />
                            </div>
                            <div className="grid gap-1">
                                <Label>Material</Label>
                                <Input type="number" className="border outline-none" placeholder="Enter the name...."/>
                            </div>
                            <div className="grid gap-1">
                                <Label>Size</Label>
                                <Input type="number" className="border outline-none" placeholder="Enter the name...."/>
                            </div>
                        </div>

                        {/* COLOR AND LAMINATION */}
                        <div className="grid grid-cols-3 gap-5">
                            <div className="grid gap-1">
                                <Label>Color</Label>
                                <Input type="text" className="border outline-none" />
                            </div>
                            <div className="grid gap-1">
                                <Label>Lamination</Label>
                                <Input type="number" className="border outline-none" placeholder="Enter the name...."/>
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