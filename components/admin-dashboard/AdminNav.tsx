// "use client"
// import Image from "next/image"
// import developer from '@/public/pexels-christina-morillo-1181676.jpg'
// import Link from "next/link"
// import { CubeIcon, FileTextIcon, GlobeIcon, HomeIcon } from '@radix-ui/react-icons';
// import { useState } from "react";
// import { usePathname } from "next/navigation";


// const AdminNav = () => {
//     const pathName = usePathname()
//     const InactiveLink = "flex gap-2 items-center mt-2 cursor-pointer opacity-70 hover:opacity-100 focus-within:opacity-100"
//     const activeLink = InactiveLink + "font-HelveticaBold scale-105 opacity-100 "
//     const navItems = [
//         {
//             name: "Dashboard",
//             href: "/admin-dashboard",
//             icon: <HomeIcon />
//         },
//         {
//             name: "Products",
//             href: "/admin-dashboard/products",
//             icon: <CubeIcon />
//         },
//         {
//             name: "Colors",
//             href: "/admin-dashboard/colors",
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
//                     </svg>          
//         },
//         {
//             name: "Laminations",
//             href: "/admin-dashboard/laminations",
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
//                     </svg>
//         },
//         {
//             name: "Corners",
//             href: "/admin-dashboard/corners",
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
//                     </svg>          
//         },
//         {
//             name: "Sizes",
//             href: "/admin-dashboard/sizes",
//             icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
//                     </svg>          
//         },
//         {
//             name: "Categories",
//             href: "/admin-dashboard/categories",
//             icon: <FileTextIcon />
//         },
//         {
//             name: "Materials",
//             href: "/admin-dashboard/materials",
//             icon: <GlobeIcon />
//         },
//     ]
//   return (
//     <nav className="relative">
//         <aside className="fixed left-0 top-0 z-20 h-[100dvh] w-[250px] border-r border-black">
//             <div className="flex gap-2 items-center m-3">
//                 <Image className="object-cover rounded-full w-[50px] h-[50px]" src={developer} alt="Profile" width={100} height={100} priority={false} quality={100}/>
//                 <div className="flex flex-col items-center">
//                     <h3 className="font-bold">Brownson Esiti</h3>
//                     <p className="text-[12px]">Owner</p>
//                 </div>
//             </div>
//             <div className="border-b border-black" />

//             <div className="m-2 grid gap-2">
//                 {navItems.map((item, index) => (
//                     <div className="flex mx-5" key={index}>
//                         <Link className={pathName.includes(item.href) ? activeLink : InactiveLink} href={item.href}>
//                             <span>{item.icon}</span>
//                             {item.name}
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </aside>
//     </nav>
//   )
// }

// export default AdminNav;


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { Separator } from "../ui/separator"
import Image from "next/image"
import developer from '@/public/pexels-christina-morillo-1181676.jpg'

interface AdminNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    name: string
    icon: JSX.Element
  }[]
}

export function AdminNav({ className, items, ...props }: AdminNavProps) {
  const pathname = usePathname()

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
          <h3 className="font-bold">Brownson Esiti</h3>
          <p className="text-[12px]">Owner</p>
        </div>
      </div>
      <Separator className="hidden my-[100px] lg:block" />
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
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