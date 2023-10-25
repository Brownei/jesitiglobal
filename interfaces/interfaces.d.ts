import z from "zod";

declare type Graphics = {
    id: string;
    name: string;
    quantity: number;
    thickness?: string;
    corners?: string;
    material?: string;
    price: number;
    image: Array<Image>
    size: Array<Size>
    color?: string;
    lamination?: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}

type Image = {
    url: string
}

type Size = {
    name: string
}