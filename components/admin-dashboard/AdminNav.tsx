"use client"
import Image from "next/image"
import developer from '@/public/pexels-christina-morillo-1181676.jpg'

const AdminNav = () => {
    const navItems = [
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
    ]
  return (
    <nav className="relative">
        <aside className="fixed left-0 top-0 z-20 h-[100dvh] w-[250px] border-r border-black">
            <div className="flex gap-2 items-center m-3">
                <Image className="object-cover rounded-full w-[50px] h-[50px]" src={developer} alt="Profile" width={100} height={100} priority={false} quality={100}/>
                <div className="flex flex-col items-center">
                    <h3 className="font-bold">Brownson Esiti</h3>
                    <p className="text-[12px]">Owner</p>
                </div>
            </div>
            <div className="border-b border-black" />

            <div className="m-2">
                {navItems.map((item, index) => (
                    <div className="flex" key={index}>
                        <ul className="mx-4 text-base">
                            <li className="mt-2 cursor-pointer opacity-70 hover:opacity-100 focus-within:opacity-100">{item.name}</li>
                        </ul>
                    </div>
                ))}
            </div>
        </aside>
    </nav>
  )
}

export default AdminNav;