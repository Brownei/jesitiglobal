"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "./TableMenu"

export type GraphicColumn = {
  id: number;
  userId: number;
  categoryId: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export const graphicColumns: ColumnDef<GraphicColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: (info: any) => (
      <div style={{backgroundColor: info?.getValue()}} className="h-5 w-5 rounded-full"/>
    ),
  },
  {
    accessorKey: "style",
    header: "Style"
  },
  {
    accessorKey: "collection",
    header: "Collection"
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
        return <TableMenu products={row.original}/>
    }
  }
]
