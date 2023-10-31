import Banner from "@/components/Banner";
import Nav from "@/components/Nav";
import { ReactNode } from "react";

export default function ExploreNowLayout({
    children
}: {
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