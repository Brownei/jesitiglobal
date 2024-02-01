'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { height } from '../anim/Hamburger';
import HamburgerBody from './HamburgerBody';

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
    href: "/about",
  },
  {
    title: "How can we help?",
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

  const [selectedLink, setSelectedLink] = useState<HamburgerType>({isActive: false, index: 0});
  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className='overflow-hidden'>
      <div className='flex flex-col justify-end items-center mb-[80px] lg:mb-0'>
        <HamburgerBody setToggle={setToggle} links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink}/>
      </div>
    </motion.div>
  )
}


export default Hamburger;