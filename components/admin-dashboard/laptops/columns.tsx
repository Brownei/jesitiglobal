"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"

export type LaptopColumn = {
    id: number;
    brand: string;
    name: string;
    price: number;
    quantity: number;
    model: string;
    screeenSize: string;
    RAM: string;
    storage: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}

export const laptopColumns: ColumnDef<LaptopColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "brand",
        header: "Brand",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "model",
        header: "Model",
    },
    {
        accessorKey: "screenSize",
        header: "Screen size",
    },
    {
        accessorKey: "RAM",
        header: "RAM",
    },
    {
        accessorKey: "storage",
        header: "Storage",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: (info: any) => (
        <div style={{backgroundColor: info?.getValue()}} className="h-5 w-5 rounded-full"/>
        ),
    },
    {
        accessorKey: "isSoldOut",
        header: "Sold Out"
    },
    {
        accessorKey: "isFeatured",
        header: "Featured"
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
    },
    {
        accessorKey: "updatedAt",
        header: "Updated At",
    },
    {
        id: "actions",
        cell: ({row}) => {
            return <TableMenu item={row.original} navigationSection="graphics"/>
        }
    }
]
