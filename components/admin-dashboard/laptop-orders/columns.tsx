"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"
import { Laptops } from "@/interfaces/interface"

export type LaptopOrderColumns = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  isPaid: boolean;
  laptops: Laptops[]
  pricePaid: number;
  createdAt: Date;
}

export const laptopOrderColumns: ColumnDef<LaptopOrderColumns>[] = [
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
    accessorKey: "laptops",
    header: "Product purchased",
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
        return <TableMenu item={row.original} order={true} />
    }
  }
]
