"use client"
import Image, { StaticImageData } from 'next/image'
import { Button } from '../ui/button'
import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";
import { container, item } from '@/anim/Hero'
import { FC, useLayoutEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useScroll, useTransform, motion } from 'framer-motion';
import Link from 'next/link';

type HeroProps = {
  firstTitle: string;
  secondTitle: string;
  imageUsed: StaticImageData | string;
  noButtons: boolean;
  contactButton: boolean;
  description: string;
}

const Hero: FC<HeroProps> = ({ firstTitle, contactButton, imageUsed, noButtons, secondTitle, description }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const message = encodeURIComponent(`Hello, I will like to make more inquires about the services which you offer at Jesitiglobal enterprise.`);
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
      .fromTo(".title h2 span", { opacity: 0, y: 120, ease: "Power3.inOut", }, { opacity: 1, y: 0 }, "<0.1")
      .fromTo(".title h1 span", { opacity: 0, y: 80, ease: "Power2.in", duration: 0.6 }, { opacity: 1, y: 0 }, "<0.1")
      .fromTo(".title p span", { opacity: 0, y: 40, ease: "Power2.in", duration: "0.55" }, { opacity: 1, y: 0 }, "<0.1")
      .fromTo(".title .button", { opacity: 0, y: 70 }, { opacity: 1, y: 0 }, "<0.1")
      .to('#hero .before', { width: 0, duration: 1.2, ease: 'power2.inOut' }, "<")
      .to('#hero .after', { width: 0, duration: 1.2, ease: 'power2.inOut' }, "-=0.8")
      .from('#hero .img', { scale: 1, duration: 2 }, 0)
  }, [timeline])

  return (
    <main id='hero'>
      <div ref={container} className='hero relative flex flex-col gap-[-10px] justify-center items-center text-[#061439] p-3 z-20'>
        <div className='title flex flex-col mb-[2.4rem] md:mb-[3.4rem] mt-[50px] leading-none'>
          <div className='flex flex-col justify-center items-center text-center'>
            <h2 className='leading-[42px] uppercase font-FamiljenBold text-center text-[2.5rem] tracking-[-2.5px]   md:tracking-[-7.91px] md:text-[7rem]'>
              <span className='block'>{firstTitle}</span>
            </h2>
            <h1 className='uppercase font-FamiljenBold text-center px-4 py-0 text-[3.5rem] tracking-[-3px] md:tracking-[-14px] md:text-[13rem]'>
              <span className='block'>{secondTitle}</span>
            </h1>
            <p className='overflow-hidden'>
              <span className='block text-center font-PoppinsLight text-[0.9rem] mt-3 w-[320px] md:w-[719px]'>{description}</span>
            </p>
          </div>

          {noButtons === true && (
            <div className='flex space-x-[48px] items-center justify-center mt-3 overflow-hidden md:mt-0'>
              <Button className='button text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-PoppinsBold text-[0.7rem] w-[120px] h-[45px] rounded-[15px] uppercase md:text-[0.9rem] md:rounded-[20px] md:w-[215px] md:h-[59px]'>
                <Link href={'/services'}>Explore now</Link>
              </Button>
              <Button onClick={() => window.open(`https://wa.me/+2347038808886?text=${message}`, '_blank')} className='button flex justify-center items-center text-[#061439] border-[#22AFFF] bg-white flex-shrink-0 button text-center hover:bg-[#061439] hover:text-white duration-300 font-PoppinsBold text-[0.7rem] w-[120px] h-[45px] rounded-[15px] uppercase md:text-[0.9rem] md:rounded-[20px] md:w-[215px] md:h-[59px]' variant='outline'>
                Contact us
              </Button>
            </div>
          )}

          {contactButton === true && (
            <div className='flex items-center justify-center overflow-hidden mt-3 md:mt-[-20px]'>
              <Button onClick={() => window.open(`https://wa.me/+2347038808886?text=${message}`, '_blank')} className='button text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-PoppinsBold text-[0.7rem] w-[120px] h-[45px] rounded-[15px] uppercase md:text-[0.9rem] md:rounded-[20px] md:w-[215px] md:h-[59px]'>
                Reach us now
              </Button>
            </div>
          )}
        </div>

        <div className='overflow-hidden relative'>
          <Image className='img' src={imageUsed} alt='Logo' width={1080} height={556} quality={100} priority />
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
