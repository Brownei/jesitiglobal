"use client"
import developer from '@/public/pexels-christina-morillo-1181676.jpg'
import tutoring from '@/public/pexels-thisisengineering-3861966.jpg'
import businessRegi from '@/public/pexels-christina-morillo-1181605.jpg'
import graphicDesign from '@/public/pexels-jonathan-borba-3052727.jpg'
import e from '@/public/pexels-karolina-grabowska-5632381.jpg'
import m from '@/public/pexels-pixabay-414974.jpg'
import ServiceLayout from './ServiceLayout';
import { FC, MutableRefObject, useEffect } from 'react'
import CSSRulePlugin from "gsap/CSSRulePlugin";
import gsap from 'gsap'

type ServicesProps = {
    serviceRef: MutableRefObject<HTMLDivElement | null>
}

const Services: FC<ServicesProps> = ({serviceRef}) => {
    const services = [
        {
            id: 1,
            name: "Custom Web Development",
            description: "Experience unparalleled digital innovation with our custom web development service. Tailored to meet your unique needs, we specialize in crafting bespoke, high-performance websites. From intuitive user interfaces to seamless functionality, our expert team ensures your online presence reflects the essence of your business. Elevate your brand with a custom web solution that stands out in a competitive digital landscape",
            image: developer
        },
        {
            id: 2,
            name: "Soft Skill Training",
            description: "In the fast-paced digital era, web development services play a pivotal role in shaping the online presence of businesses and individuals. Offering web development services can be a fulfilling venture, blending technical prowess with creative problem-solving. This essay explores key considerations for those venturing into the realm of web development services, from honing skills to establishing a thriving business.",
            image: tutoring
        },
        {
            id: 3,
            name: "Cooperate Affairs Commission(CAC) Registration",
            description: "In the fast-paced digital era, web development services play a pivotal role in shaping the online presence of businesses and individuals. Offering web development services can be a fulfilling venture, blending technical prowess with creative problem-solving. This essay explores key considerations for those venturing into the realm of web development services, from honing skills to establishing a thriving business.",
            image: businessRegi
        },
        {
            id: 4,
            name: "Graphic Arts and Design",
            description: "Immerse your brand in captivating visuals with our Graphic Arts and Design service. Our talented team of designers brings creativity to life, crafting eye-catching logos, stunning marketing collateral, and engaging visual content. Elevate your brand identity and make a lasting impression with our expert Graphic Arts and Design service.",
            image: graphicDesign
        },
        {
            id: 5,
            name: "Graphic Printing",
            description: "In the fast-paced digital era, web development services play a pivotal role in shaping the online presence of businesses and individuals. Offering web development services can be a fulfilling venture, blending technical prowess with creative problem-solving. This essay explores key considerations for those venturing into the realm of web development services, from honing skills to establishing a thriving business.",
            image: e
        },
        {
            id: 6,
            name: "Advertisement",
            description: "In the fast-paced digital era, web development services play a pivotal role in shaping the online presence of businesses and individuals. Offering web development services can be a fulfilling venture, blending technical prowess with creative problem-solving. This essay explores key considerations for those venturing into the realm of web development services, from honing skills to establishing a thriving business.",
            image: m
        }
    ]
    const timeline = gsap.timeline({ delay: 0.1 });
    useEffect(() => {
        gsap.registerPlugin(CSSRulePlugin);
        
        timeline
        .fromTo(".title h1", { opacity: 0, y: 70, ease: "Power2.inOut" }, { opacity: 1, y: 0 }, "<0.4")
        .fromTo(".title p span", { opacity: 0, y: 70, ease: "Power2.in", duration: "0.55" }, { opacity: 1, y: 0 }, "<0.4")

    }, [timeline])


    return (
        <main ref={serviceRef} className='relative container mx-auto mt-[300px]'>
            <div className='title flex flex-col justify-center items-center text-center p-4'>
                <h1 className='text-center text-[28px] font-FamiljenBold tracking-[-5.39px] text-white lg:text-[77px]'>Take control of your enterprises</h1>
                <p className='w-[720.15px] h-[72.81px] flex-shrink-0 flex justify-center items-center text-center text-white mt-[22.5px] font-PoppinsLight text-[15px]'><span>Unlock the full potential of your business journey with Jesitiglobal Enterprise. Our comprehensive range of services is designed to propel your company from zero to hero. From strategic consulting to innovative solutions, We are here to drive your success. Take the leap towards growth and excellence with Jesitiglobal.</span></p>
                <div className='grid gap-[64px] mt-[100px]'>
                    {services.map((service) => (
                        <div key={service.id}>
                            <ServiceLayout index={service.id} serviceDescription={service.description} serviceName={service.name} src={service.image}/>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )

}

export default Services;