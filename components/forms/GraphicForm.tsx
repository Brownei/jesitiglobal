"use client"
import { FC, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import ImageUpload from "../ImageUpload";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from '../ui/select';
import { createNewGraphic } from "@/actions/server-actions";
import { useCategories } from "@/actions/queries/get-categories";
import { Graphics, graphicSchema, Users } from "@/interfaces/interface";

type GraphicFormProps = {
  title: string;
  initialData?: Graphics;
  currentUser?: any
}

const GraphicForm: FC<GraphicFormProps> = ({ title, initialData, currentUser }) => {
  const { data: categories, isError } = useCategories()
  const [isSelected, setIsSelected] = useState<number[]>([])
  const router = useRouter()

  const defaultValues = initialData ? {
    ...initialData,
    price: parseFloat(String(initialData?.price)),
    quantity: parseFloat(String(initialData.quantity)),
    thickness: parseFloat(String(initialData.thickness))
  } : {
    name: '',
    description: '',
    quantity: 0,
    thickness: 0,
    corners: [],
    materials: [],
    price: 0,
    images: [],
    categoryId: '',
    sizes: [],
    laminations: [],
    colors: []
  }
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<Graphics>({
    resolver: zodResolver(graphicSchema),
    defaultValues
  })

  // function onSelectCategories(name: string, field: ControllerRenderProps<Graphics, 'corners'>) {
  //     if(field.value.includes(name)) {
  //         field.onChange(field.value.filter(i => i.name !== name))
  //     } else {
  //         field.onChange([...field.value, { name }])
  //     }
  // }

  const submit: SubmitHandler<Graphics> = async (data) => {
    console.log(data)
  }


  return (
    <main>
      <div>
        <div className="flex flex-row-reverse justify-between items-center">
          <Button
            variant='outline'
            onClick={() => router.push('/admin-dashboard/graphics')}
            className='text-sm flex gap-1 font-ProMedium w-fit'>
            <ArrowLeftIcon />
            Back
          </Button>
          <h1 className="text-[2rem] font-HelveticaBold">{title}</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />

        <div className="mt-5 mb-10">
          {/* Basic Info */}
          <div className="border p-4 rounded-lg w-full mb-[100px]">
            <h3 className="mb-5">Basic Information</h3>

            <form onSubmit={handleSubmit(createNewGraphic)}>
              <div className="grid gap-5">
                {/* IMAGES */}
                <Controller
                  name="images"
                  control={control}
                  render={({ field }) => (
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
                      <Input type="text" className="border outline-none" placeholder="Enter the name...." {...field} />
                    </div>
                  )}
                />

                {/* CATEGORY, QUANTITY AND PRICE */}
                <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                  <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Category</Label>
                        <div className='flex items-center gap-3'>
                          {/* {categories?.map((size) => (
                                                <div key={size.id}>
                                                    <p onMouseDown={() => onSelectCategories(size.id, field )} className={isSelected.includes(size.id) ? 'border-2 border-black bg-white h-10 w-10 rounded-full grid justify-center items-center cursor-pointer font-ProBold' : 'h-10 w-10 rounded-full bg-white grid justify-center items-center cursor-pointer font-ProBold'}>{size.name}</p>
                                                </div>
                                            ))} */}
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    name="quantity"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Quantity</Label>
                        <Input type="number" className="border outline-none" placeholder="Enter the quantity avialable...." {...field} />
                      </div>
                    )}
                  />

                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Price</Label>
                        <Input type="number" className="border outline-none" placeholder="Enter the price...." {...field} />
                      </div>
                    )}
                  />
                </div>

                {/* DESCRIPTION */}
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <div className="grid gap-1">
                      <Label>Description</Label>
                      <Textarea className="border outline-none" {...field} />
                    </div>
                  )}
                />

                {/* CORNERS, MATERIALS AND SIZE */}
                <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">
                  <Controller
                    name="corners"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Corners</Label>
                        <div className='flex items-center gap-3'>
                          {/* {categories?.map((size) => (
                                                <div key={size.id}>
                                                    <p {...field} onClick={() => onSelectCategories(size.name, field)} className={field.value.includes(size.name) ? 'border-2 border-black bg-white h-10 w-10 rounded-full grid justify-center items-center cursor-pointer font-ProBold' : 'h-10 w-10 rounded-full bg-white grid justify-center items-center cursor-pointer font-ProBold'}>{size.name}</p>
                                                </div>
                                            ))} */}
                        </div>
                      </div>
                    )}
                  />

                  <Controller
                    name="materials"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Material</Label>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue defaultValue={field.value.map(i => i.name)} placeholder="Select a material" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />

                  <Controller
                    name="sizes"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Size</Label>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue defaultValue={field.value.map(i => i.name)} placeholder="Select a size" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />
                </div>

                {/* COLOR AND LAMINATION */}
                <div className="flex flex-col gap-5 lg:grid lg:grid-cols-3">

                  <Controller
                    name="colors"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Color</Label>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue defaultValue={field.value.map(i => i.name)} placeholder="Select a color" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />

                  <Controller
                    name="laminations"
                    control={control}
                    render={({ field }) => (
                      <div className="grid gap-1">
                        <Label>Lamination</Label>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="w-full">
                            <SelectValue defaultValue={field.value.map(i => i.name)} placeholder="Select a lamination" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.name}>{category.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="flex mt-5 justify-end items-center gap-3 lg:mt-[120px]">
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

export default GraphicForm
