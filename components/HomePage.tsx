"use client"
import GotoBanner from "@/components/GotoBanner";
import Hero from "@/components/Hero";
import Reasons from "@/components/Reasons";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Banner from '@/components/Banner'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useEffect, useRef, useState } from 'react';

const HomePage = () => {
    const serviceRef = useRef<HTMLDivElement | null>(null)
    const testimonialsRef = useRef<HTMLDivElement | null>(null)
    const [inViewport, SetInViewport] = useState(false)
    const callBack = (entries: IntersectionObserverEntry[]) => {
        SetInViewport(entries[0].isIntersecting)
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callBack, {
            root: null,
            rootMargin: '0px'
        })
        if (testimonialsRef.current) observer.observe(testimonialsRef.current)
        if (serviceRef.current) observer.observe(serviceRef.current)

        return () => {
            if (testimonialsRef.current) observer.observe(testimonialsRef.current)
            if (serviceRef.current) observer.observe(serviceRef.current)
        }
    }, [serviceRef, testimonialsRef])


  return (
    <main className={inViewport ? 'bg-[#061439] transition-colors duration-500 text-white' : 'bg-[#DFF6FF] transition-colors duration-500 text-[#061439]'}>
        <Banner />
        <Nav />
        <Hero />
        <Services serviceRef={serviceRef}/>
        <Reasons/>
        <GotoBanner />
        <Testimonials testimonialsRef={testimonialsRef}/>
        <Footer />
    </main>
  )
}

export default HomePage