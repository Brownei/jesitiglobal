"use client"
import profilePic from '../public/2022-11-09.jpg'
import Image from 'next/image'
import { Button } from './ui/button'
import { motion } from 'framer-motion'
import { container, item } from '@/anim/Hero'
import { FC } from 'react'

type HeroProps = {
    mainTitle: string;
    supportTitle: string;
    description: string;
    CAC: boolean
}

const Hero: FC<HeroProps> = ({mainTitle, supportTitle, description, CAC}) => {

  return (
    <div className='relative flex flex-col gap-[-10px] justify-center items-center text-[#061439] p-3 z-20'>
        <motion.div variants={container} initial="hidden" animate="visible" className='overflow-y-hidden leading-none'>
            <motion.h2 variants={item} className='uppercase font-FuturaExtraBlack text-[5vw] text-center tracking-tighter lg:mt-[30px]'>{mainTitle}</motion.h2>
            <motion.h1 variants={item} className='uppercase font-FuturaExtraBlack px-4 py-0 text-[10vw] text-center tracking-tighter'>{supportTitle}</motion.h1>
            <motion.p variants={item} className='text-center font-Helvetica mt-3'>{description}</motion.p>
        </motion.div>
        {CAC && (
            <div>
                <div className=' flex gap-3 items-center justify-center text-sm font-FuturaBold my-3'>
                    <Button className='text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold'>
                        Explore now
                    </Button>
                    <Button className='flex justify-center items-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold'>
                        Contact us
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                        </svg>
                    </Button>
                </div>
                <Image src={profilePic} alt='Logo' width={100*100} height={500} quality={100} priority={false}/>
            </div>
        )}
    </div>
  )
}

export default Hero

// bg-[#22AFFF]