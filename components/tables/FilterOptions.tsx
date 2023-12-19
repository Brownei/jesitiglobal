"use client"
import { MixerHorizontalIcon, PlusCircledIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { useRouter } from "next/navigation"

interface ProductFilterOptionsProps<TData> {
    table: Table<TData>
    newTitle?: string;
    navigation: string;
    navigationParam?: string;
    isThereNewTitle?: boolean;
}

export function FilterOptions<TData>({
  table,
  newTitle,
  navigation,
  navigationParam,
  isThereNewTitle
}: ProductFilterOptionsProps<TData>) {
  const router = useRouter()
  return (
    <div className="flex gap-3 items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 flex font-ProExtraBold"
          >
            <MixerHorizontalIcon className="mr-2 h-4 w-4" />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
        </DropdownMenuContent>
        {isThereNewTitle === true && (
          <div>
          <Button className="ml-auto h-8 flex font-ProExtraBold" variant='outline' size='sm' onClick={() => router.push(`/admin-dashboard/${navigation}/${navigationParam}`)}>
            <PlusCircledIcon className="mr-2 h-4 w-4"/>
            {newTitle}
          </Button>
        </div>
        )}
      </DropdownMenu>
    </div>
  )
}

