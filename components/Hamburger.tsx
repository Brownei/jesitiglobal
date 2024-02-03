'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { menuSlide } from '../anim/Hamburger';
import HamburgerBody from './HamburgerBody';
import { usePathname } from 'next/navigation';
import LinkForNav from './LinkForNav';

export type HamburgerType = {
    isActive: boolean
    index: number
}

export type Links = {
    title: string;
    href: string;
}

const links: Links[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Laptop Shop",
    href: "/laptop-store",
  },
  {
    title: "Graphic Shop",
    href: "/graphic-store",
  },
  {
    title: "About Us",
    href: "/about-us",
  },
  {
    title: "Services",
    href: "/services",
  },
  {
    title: "Sign Up",
    href: "/sign-up",
  },
  {
    title: "Log In",
    href: "/login",
  }
]
const Hamburger = ({setToggle}: {setToggle: (value: React.SetStateAction<boolean>) => void
}) => {
  const pathname = usePathname();
  const [selectedLink, setSelectedLink] = useState(pathname);
  return (
    <motion.div 
      variants={menuSlide} 
      initial="initial" 
      animate="enter" 
      exit="exit" 
      className="h-[100dvh] bg-[#061439] fixed right-0 top-0 text-white"
    >
      <div className="box-border h-full p-[100px] flex flex-col justify-between">
        <div onMouseLeave={() => {setSelectedLink(pathname)}} className="flex flex-col text-[2rem] font-FamiljenItalic gap-[20px] mt-[10px]">
          {
            links.map((link, index) => {
              return <LinkForNav 
                  key={index} 
                  data={{...link, index}} 
                  isActive={selectedLink == link.href} 
                  setSelectedIndicator={setSelectedLink} 
                  setToggle={setToggle}
                />
            })
          }
        </div>
        </div>

    </motion.div>
  )
}


export default Hamburger;