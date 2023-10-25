"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logoPicture from '/public/companyLogo.jpg'
import { AnimatePresence, motion } from 'framer-motion'
import { opacity } from '@/anim/Nav'
import Hamburger from './Hamburger'

const Nav = () => {
  const [toggle, setToggle] = useState(false)
  const NavItems = [
    {
      name: 'Laptop store',
      href: '/'
    },
    {
      name: 'Contact',
      href: '/'
    },
    {
      name: 'About us',
      href: '/'
    },
  ]
  return (
    <nav className='relative'>
      <div className='flex justify-between items-center mx-auto p-3'>
        <Link href={'/'}>
          <Image className='z-40' src={logoPicture} alt='Company Logo' width={50} height={50}/>
        </Link>
        <motion.div variants={opacity} animate={!toggle ? 'open' : 'closed'} className='hidden gap-10 z-40 font-Helvetica lg:flex'>
          <p>How can we help?</p>
          {NavItems.map((item, index) => (
            <div key={index}>
              <Link href={item.href}>{item.name}</Link>
            </div>
          ))}
        </motion.div>
        <div onClick={() => setToggle(prev => !prev)} className='relative flex flex-col items-center justify-center w-8 h-8 p-2 transition duration-300 transform cursor-pointer z-40 hover:scale-110'>
          <motion.div variants={opacity} animate={!toggle ? 'open' : 'closed'}>
            <div className='w-6 h-0.5 mb-1 bg-gray-800 transition-transform' />
            <div className='w-6 h-0.5 bg-gray-800 transition-transform' />
          </motion.div>
          <motion.div variants={opacity} animate={toggle ? 'open' : 'closed'} className='absolute opacity-0'>
            <div className="w-6 h-0.5 bg-gray-800 rotate-45 transition-transform"></div>
            <div className="w-6 h-0.5 bg-gray-800 -rotate-45 transition-transform"></div>
          </motion.div>
        </div>
      </div>

      <div className='fixed top-0 w-full box-border px-[10px] z-30 bg-[#22AFFF]'>
        <AnimatePresence mode='wait'>
          {toggle && <Hamburger />}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Nav;