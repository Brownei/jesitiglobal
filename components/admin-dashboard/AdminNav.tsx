"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import Image from "next/image"
import developer from '@/public/pexels-christina-morillo-1181676.jpg'

interface AdminNavProps extends React.HTMLAttributes<HTMLElement> {
  graphicItem: {
    href: string
    name: string
    icon: JSX.Element
  }[];
  adminItem: {
    href: string
    name: string
    icon: JSX.Element
  }[];
  laptopItem: {
    href: string
    name: string
    icon: JSX.Element
  }[];
} 

export function AdminNav({ className, graphicItem, laptopItem, adminItem, ...props }: AdminNavProps) {
  const pathname = usePathname()
  let isOwner = true

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:fixed lg:left-0 lg:top-0 lg:z-20 lg:h-[100dvh] lg:w-[250px] lg:border-r lg:border-black lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
      {...props}
    >
      <div className="flex gap-2 items-center m-3">
        <Image className="object-cover rounded-full w-[50px] h-[50px]" src={developer} alt="Profile" width={100} height={100} priority={false} quality={100}/>
        <div className="flex flex-col items-center">
          <h3 className="font-HelveticaBold">Brownson Esiti</h3>
          <p className="text-[10px] font-Helvetica">Owner</p>
        </div>
      </div>
      <Separator className="hidden my-[100px] lg:block" />

      {/* MAIN MENU */}
      <h3 className='justify-start opacity-40 text-sm pl-4 pt-3'>Main Menu</h3>
      {graphicItem.slice(0, 1).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.includes(item.href)
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start font-HelveticaBold"
          )}
        >
          <span className="flex gap-1 items-center">
            {item.icon}
            {item.name}
          </span>
        </Link>
      ))}

      {/* GRAPHICS MAIN MENU */}
      <h3 className='justify-start opacity-40 text-sm pl-4 pt-3'>Graphics Menu</h3>
      {graphicItem.slice(1).map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.includes(item.href)
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start font-HelveticaBold"
          )}
        >
          <span className="flex gap-1 items-center">
            {item.icon}
            {item.name}
          </span>
        </Link>
      ))}

      {/* ADMIN MAIN MENU */}
      {isOwner === true && (
        <div className="flex lg:left-0 lg:top-0 lg:w-[250px] lg:border-r lg:border-black lg:flex-col lg:space-x-0 lg:space-y-1">
          <h3 className='justify-start opacity-40 text-sm pl-4 pt-3'>Admin Menu</h3>
          {adminItem.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname.includes(item.href)
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start font-HelveticaBold"
              )}
            >
              <span className="flex gap-1 items-center">
                {item.icon}
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* LAPTOP MAIN MENU */}
      <h3 className='justify-start opacity-40 text-sm pl-4 pt-3'>Laptops Menu</h3>
      {laptopItem.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname.includes(item.href)
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start font-HelveticaBold"
          )}
        >
          <span className="flex gap-1 items-center">
            {item.icon}
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  )
}