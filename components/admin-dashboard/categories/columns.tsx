"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"

export type CategoryColumn = {
  id: number;
  name: string;
  description: string
  createdAt: Date;
  updatedAt: Date;
}

export const categoryColumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: (info: any) => (
      <div style={{maxWidth: '200px'}} />
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
        return <TableMenu item={row.original} navigationSection="categories"/>
    }
  }
]
