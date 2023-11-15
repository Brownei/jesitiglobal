import { ReactNode } from "react";
import { AdminNav } from "@/components/admin-dashboard/AdminNav";
import { CubeIcon, FileTextIcon, GlobeIcon, HomeIcon } from '@radix-ui/react-icons';
import { AvatarShortcut } from "@/components/AvatarShortcut";
import { Search } from "@/components/Search";
import { MobileNav } from "@/components/MobileNav";


export default function SectionsLayout({children}: {
    children: ReactNode
}) {
    const navItems = [
                {
                    name: "Dashboard",
                    href: "/admin-dashboard",
                    icon: <HomeIcon />
                },
                {
                    name: "Graphics",
                    href: "/admin-dashboard/graphics",
                    icon: <CubeIcon />
                },
                {
                    name: "Colors",
                    href: "/admin-dashboard/colors",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                            </svg>          
                },
                {
                    name: "Laminations",
                    href: "/admin-dashboard/laminations",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                },
                {
                    name: "Corners",
                    href: "/admin-dashboard/corners",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                            </svg>          
                },
                {
                    name: "Sizes",
                    href: "/admin-dashboard/sizes",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                            </svg>          
                },
                {
                    name: "Categories",
                    href: "/admin-dashboard/categories",
                    icon: <FileTextIcon />
                },
                {
                    name: "Materials",
                    href: "/admin-dashboard/materials",
                    icon: <GlobeIcon />
                },
            ]
    return (
        <html>
            <body className="hidden space-y-6 px-10 pb-16 md:block">

                <div className="flex flex-col lg:flex-row">
                    <aside className="hidden -mx-4 lg:block lg:w-1/5">
                        <AdminNav items={navItems} />
                    </aside>
                    <div className="flex flex-col lg:hidden">
                        <div className="border-b">
                            <div className="flex h-16 items-center px-4">
                                <MobileNav className="mx-6" />
                                <div className="ml-auto flex items-center space-x-4">
                                    <Search />
                                    <AvatarShortcut />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1">{children}</div>
                </div>
            </body>
        </html>
    )
}