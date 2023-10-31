import { ReactNode } from "react";
import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function SectionsLayout({children}: {
    children: ReactNode
}) {
    return (
        <html>
            <body>
            <Banner />
            <Nav />
            {children}
            </body>
        </html>
    )
}