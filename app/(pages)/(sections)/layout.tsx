import { ReactNode } from "react";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SectionsLayout({children}: {
    children: ReactNode
}) {
    return (
        <html>
            <body className="bg-[#DFF6FF] transition-colors duration-500 text-[#061439]">
                <Banner />
                <Nav />
                {children}
            </body>
        </html>
    )
}