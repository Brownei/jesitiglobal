"use client"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { slide, scale } from '@/anim/Hamburger';
import { Dispatch, FC, SetStateAction } from 'react';
import { Links } from './Hamburger';


interface LinkWithIndex extends Links {
    index: number
}

type LinkForNavProps = {
    data: LinkWithIndex
    isActive: boolean
    setSelectedIndicator: Dispatch<SetStateAction<string>>;
    setToggle: Dispatch<SetStateAction<boolean>>;
}

export default function LinkForNav ({data, isActive, setSelectedIndicator, setToggle}: LinkForNavProps) {

    const { title, href, index} = data;

    return (
        <motion.div 
            className="relative flex items-center" 
            onMouseEnter={() => {
                setSelectedIndicator(href)
                setToggle(false)
            }}
            custom={index} 
            variants={slide} 
            initial="initial" 
            animate="enter" 
            exit="exit"
        >
            <motion.div 
                variants={scale} 
                animate={isActive ? "open" : "closed"} 
                className="w-[10px] h-[10px] bg-white rounded-[50%] absolute -left-[30px]">
            </motion.div>
            <Link href={href}>{title}</Link>
        </motion.div>
    )
}


