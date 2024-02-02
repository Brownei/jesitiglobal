import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { services } from "@/lib/data";
import Link from "next/link";


// const contentForDropdown = [
//     {
//         title: "Custome"
//     }
// ]

export const FlyoutLink = ({
    children,
    href,
    FlyoutContent,
    }: {
        children: React.ReactNode;
        href: string;
        FlyoutContent?: React.ElementType;
    }) => {
    const [open, setOpen] = useState(false);

    const showFlyout = FlyoutContent && open;

    return (
    <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative w-fit h-fit"
    >
        <a href={href} className="relative text-[#061439]">
        {children}
        <span
            style={{
            transform: showFlyout ? "scaleX(1)" : "scaleX(0)",
            }}
            className="absolute -bottom-2 -left-2 -right-2 h-1 origin-left scale-x-0 rounded-full bg-[#061439] transition-transform duration-300 ease-out"
        />
        </a>
        <AnimatePresence>
        {showFlyout && (
            <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            style={{ translateX: "-50%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onMouseEnter={() => setOpen(false)}
            className="absolute left-1/2 top-12 bg-white text-black"
            >
                <div className="absolute -top-6 left-0 right-0 h-6 bg-transparent" />
                <div className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                <FlyoutContent />
            </motion.div>
        )}
        </AnimatePresence>
    </div>
    );
};

export const PricingContent = ({onClick} : {
    onClick: () => void
}) => {
    return (
        <div className="w-64 bg-white p-6 shadow-xl text-[#061439]">
            <div className="mb-3 space-y-3">
                <h3 className="font-FamiljenBold text-lg">All Our Services</h3>
                {services.map((service, index) => (
                    <Link onClick={onClick} key={index} href={`/services/${service.name}`} className="block text-sm font-PoppinsLight hover:underline">
                        {service.name}
                    </Link>
                ))}
                
            </div>
        </div>
    );
};