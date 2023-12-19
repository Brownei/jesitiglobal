"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"
import { Graphics } from "@/interfaces/interface";

export type GraphicOrderColumns = {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    isPaid: boolean;
    laptops: Graphics[]
    pricePaid: number;
    createdAt: Date;
}

export const graphicOrderColumns: ColumnDef<GraphicOrderColumns>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "graphic",
    header: "Graphic purchased",
  },
  {
    accessorKey: "pricePaid",
    header: "Price",
  },
  {
    accessorKey: "isPaid",
    header: "Transaction status",
  },
  {
    accessorKey: "createdAt",
    header: "Created at",
  },
  {
    id: "actions",
    cell: ({row}) => {
        return <TableMenu item={row.original} order={true}/>
    }
  }
]
