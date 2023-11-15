"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"

export type LaminationColumn = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export const laminationColumns: ColumnDef<LaminationColumn>[] = [
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
        return <TableMenu item={row.original} navigationSection="laminations"/>
    }
  }
]
