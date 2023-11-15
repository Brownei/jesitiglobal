"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"

export type ColorColumn = {
  id: number;
  name: string;
  value: string
  createdAt: Date;
  updatedAt: Date;
}

export const colorColumns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: (info: any) => (
      <div style={{backgroundColor: info?.getValue()}} className="h-5 w-5 rounded-full"/>
    ),
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
        return <TableMenu item={row.original} navigationSection="colors"/>
    }
  }
]
