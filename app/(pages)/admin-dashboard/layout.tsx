import { ReactNode } from "react";
import AdminNav from "@/components/admin-dashboard/AdminNav";

export default function SectionsLayout({children}: {
    children: ReactNode
}) {
    return (
        <html>
            <body>
                <AdminNav />
                {children}
            </body>
        </html>
    )
}