"use client"
import profilePic from '../public/2022-11-09.jpg'
import Image from 'next/image'
import { Button } from './ui/button'
import { easeIn, motion } from 'framer-motion'
import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { container, item } from '@/anim/Hero'
import { useLayoutEffect } from 'react'
import { useRouter } from 'next/navigation'

const Hero = () => {
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
        <div className='hero relative flex flex-col gap-[-10px] justify-center items-center text-[#061439] p-3 z-20'>
            <div className='title leading-none flex flex-col mb-[2.4rem] md:mb-[3.2rem] mt-[1.6rem]'>
                <h2 className='uppercase overflow-hidden font-FuturaExtraBlack text-[5vw] text-center tracking-tighter'>
                    <span className='block'>All in one</span>
                </h2>
                <h1 className='uppercase overflow-hidden font-FuturaExtraBlack px-4 py-0 text-[10vw] text-center tracking-tighter'>
                    <span className='block'>Solution Hub</span>
                </h1>
                <p className='text-center font-Helvetica mt-3 overflow-hidden'>
                    <span className='block'>A specialist who can grow your business, companies and enterprises</span>
                </p>
                <div className='flex gap-3 items-center justify-center text-sm font-FuturaBold my-3 overflow-hidden'>
                    <Button onClick={() => router.push('/explore-now')} className='button text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold'>
                        Explore now
                    </Button>
                    <Button className='button flex justify-center items-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold'>
                        Contact us
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                        </svg>
                    </Button>
                </div>
            </div>

            <div className='overflow-hidden relative'>
                <Image className='img' src={profilePic} alt='Logo' width={100*100} height={500} quality={100} priority={false}/>
                <div className="before z-[3] absolute top-0 right-0 bg-white w-full h-full"></div>
                <div className="after z-[2] absolute top-0 right-0 bg-[#96FDFF] w-full h-full"></div>
            </div>
        </div>
    </main>
)
}

export default Hero

// bg-[#22AFFF]