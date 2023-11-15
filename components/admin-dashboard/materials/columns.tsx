"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"

export type MaterialColumn = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const materialColumns: ColumnDef<MaterialColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
        return <TableMenu item={row.original} navigationSection="materials"/>
    }
  }
]
