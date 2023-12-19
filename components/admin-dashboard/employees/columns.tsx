"use client"
import { ColumnDef } from "@tanstack/react-table"
import TableMenu from "../../tables/TableMenu"
import { Users } from "@/interfaces/interface";
import { Roles } from "@prisma/client";
import Image from "next/image";

enum roles {
    "Client", 
    "Employee", 
    "Owner"
}

export type UserColumns = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    role: roles
}

export const userColumns: ColumnDef<UserColumns>[] = [
    {
        accessorKey: "image",
        header: "Profile",
        cell: (info: any) => (
            <Image src={info?.getValue()} alt="Profile Image" width={1000} height={1000} quality={100} className="h-12 w-12 rounded-full object-cover"/>
        ),
    },
    {
        accessorKey: "firstName",
        header: "First Name",
    },
    {
        accessorKey: "lastName",
        header: "Last Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        id: "actions",
        cell: ({row}) => {
            return <TableMenu item={row.original} employees={true} />
        }
    }
]
