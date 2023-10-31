'use client';
import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {

  const cursorSize = 15;
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothOptions = {damping: 20, stiffness: 300, mass: 0.5}
  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions)
  }

  const manageMouseMove = (e: any) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - cursorSize / 2);
    mouse.y.set(clientY - cursorSize / 2);
  }

  // const manageMouseEnter = (e: any) => {
  //   const { clientX, clientY } = e;
  //   mouse.x.set(clientX - cursorSize / 200);
  //   mouse.y.set(clientY - cursorSize / 200);
  // }

  useEffect( () => {
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove)
    }
  }, [])

  // useEffect(() => {
  //   window.addEventListener("click", manageMouseEnter)
  //   return () => {
  //     window.addEventListener("click", manageMouseEnter)
  //   }
  // }, [])

  return (
    <div>
      <motion.div 
        style={{
          left: smoothMouse.x, 
          top: smoothMouse.y,
        }} 
        className='fixed w-[25px] h-[25px] z-[999] cursor-none bg-[#96FDFF] rounded-[50%] pointer-events-none'>
      </motion.div>
    </div>
  )
}