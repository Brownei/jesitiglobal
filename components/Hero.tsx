"use client"
import profilePic from '../public/2022-11-09.jpg'
import Image from 'next/image'
import { Button } from './ui/button'
import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { container, item } from '@/anim/Hero'
import { useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useScroll, useTransform, motion } from 'framer-motion';


const Hero = () => {
    const container = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })
    const height = useTransform(scrollYProgress, [0, 1], [50, -400])
    const router = useRouter()
    const timeline = gsap.timeline({ delay: 0.1 });

    useLayoutEffect(() => {
        gsap.registerPlugin(CSSRulePlugin);

        timeline
            .fromTo(".title h2 span", { opacity: 0, y: 120, ease: "Power3.inOut",}, { opacity: 1, y: 0 }, "<0.1")
            .fromTo(".title h1 span", { opacity: 0, y: 80, ease: "Power2.in", duration: 0.6 }, { opacity: 1, y: 0 }, "<0.1")
            .fromTo(".title p span", { opacity: 0, y: 40, ease: "Power2.in", duration: "0.55" }, { opacity: 1, y: 0}, "<0.1")
            .fromTo(".title .button", { opacity: 0, y: 70 }, { opacity: 1, y: 0}, "<0.1")
            .to('#hero .before', { width: 0, duration: 1.2, ease: 'power2.inOut' }, "<")
            .to('#hero .after', { width: 0, duration: 1.2, ease: 'power2.inOut' }, "-=0.8")
            .from('#hero .img', { scale: 1, duration: 2 }, 0)
    }, [timeline])

return (
    <main id='hero'>
        <div ref={container} className='hero relative flex flex-col gap-[-10px] justify-center items-center text-[#061439] p-3 z-20'>
            <div className='title leading-none flex flex-col mb-[2.4rem] md:mb-[3.4rem] mt-[50px]'>
                <div className='flex flex-col justify-center items-center text-center'>
                    <h2 className='leading-[42px] uppercase font-FamiljenBold text-center tracking-[-7.91px] md:text-[113px]'>
                        <span className='block'>All in one</span>
                    </h2>
                    <h1 className='uppercase font-FamiljenBold text-center tracking-[-14px] px-4 py-0 md:text-[200px]'>
                        <span className='block'>Solution Hub</span>
                    </h1>
                    <p className='overflow-hidden'>
                        <span className='block w-[719px] h-[66px] text-center font-PoppinsLight text-[15px] mt-3'>Transform your business with expertise that goes beyond expectations. Experience strategic guidance, innovative solutions, and a commitment to your success. Elevate your business to new heights today.</span>
                    </p>
                </div>
                <div className='flex space-x-[48px] items-center justify-center overflow-hidden'>
                    <Button onClick={() => router.push('/explore-now')} className='button w-[215px] h-[59px] rounded-[20px] text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-PoppinsBold text-[15px] uppercase'>
                        Explore now
                    </Button>
                    <Button className='button w-[215px] h-[59px] rounded-[20px] flex justify-center items-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-PoppinsBold text-[#061439] border-[#22AFFF] bg-white flex-shrink-0 text-[15px] uppercase' variant='outline'>
                        Contact us
                    </Button>
                </div>
            </div>

            <div className='overflow-hidden relative'>
                <Image className='img' src={profilePic} alt='Logo' width={1080} height={556} quality={100} priority/>
                <div className="before z-[3] absolute top-0 right-0 bg-white w-full h-full"></div>
                <div className="after z-[2] absolute top-0 right-0 bg-[#96FDFF] w-full h-full"></div>
            </div>

            <motion.div style={{ height }} className='relative mt-[100px] '>
                <div className='h-[1550%] w-[120%] left-[-10%] bg-inherit z-20 absolute shadow-[0_60px_50px_rgba(0,0,0,0.748)] rounded-[0_0_50%_50%]'></div>
            </motion.div>
        </div>
    </main>
)
}

export default Hero

// bg-[#22AFFF]