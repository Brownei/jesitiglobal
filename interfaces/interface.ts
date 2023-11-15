import {z} from "zod";


//CORNERS
export const cornerSchema = z.object({
    name: z.string().min(5, 'The name of your corners should be more than 5 characters.').max(50, 'The name of your product should be more than 5 characters.'),
    image: z.string()
})
export type Corners = z.infer<typeof cornerSchema>


//MATERIALS
export const materialSchema = z.object({
    name: z.string().min(5, 'The name of your materials should be more than 5 characters.').max(50, 'The name of your product should be more than 5 characters.'),
    image: z.string()
})
export type Materials = z.infer<typeof materialSchema>


//IMAGES
export const imageSchema = z.object({
    url: z.string()
})
export type Images = z.infer<typeof imageSchema>


//COLORS
export const colorSchema = z.object({
    name: z.string().max(20, 'Requires only 20 characters'),
    value: z.string().max(10, 'Requires only 10 characters')
})
export type Colors = z.infer<typeof colorSchema>


//SIZES
export const sizeSchema = z.object({
    name: z.string().max(20, 'Requires only 20 characters'),
    value: z.string().max(10, 'Requires only 10 characters')
})
export type Sizes = z.infer<typeof sizeSchema>


//LAMINATIONS
export const laminationSchema = z.object({
    name: z.string().min(5, 'The name of your laminations should be more than 5 characters.').max(50, 'The name of your product should be more than 5 characters.'),
    image: z.string()
})
export type Laminations = z.infer<typeof laminationSchema>


//GRAPHICS
export const graphicSchema = z.object({
    name: z.string().min(5, 'The name of your graphics should be more than 5 characters.').max(100, 'The name of your product should be more than 5 characters.'),
    description: z.string().min(10, 'The name of your product should be more than 10 characters.'),
    quantity: z.number(),
    thickness: z.number().nullable().default(0),
    corners: z.array(cornerSchema),
    materials: z.array(materialSchema),
    price: z.number(),
    images: z.array(imageSchema),
    colors: z.array(colorSchema),
    sizes: z.array(sizeSchema),
    laminations: z.array(laminationSchema),
    categoryId: z.string(),
})
export type Graphics = z.infer<typeof graphicSchema>
