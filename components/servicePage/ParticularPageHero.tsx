"use client"
import { services } from "@/lib/data";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { FC } from 'react'

interface ParticularPageHeroSectionProps {
    params: {
        servicesTitle: string;
    },
  }

const ParticularPageHeroSection: FC<ParticularPageHeroSectionProps> = ({params}) => {
    let firstPart: string;
    let lastPart: string;
    const serviceName = decodeURIComponent(params.servicesTitle)
    const currentService = services.find(service => service.name === serviceName)
    const message = encodeURIComponent(`Hello, I will like to make more inquires about the ${currentService?.name} service which you offer at Jesitiglobal enterprise.`);
    const splitStrings = currentService!.name.split(' ')

    firstPart = splitStrings.slice(0, -1).join(' ');
    lastPart = splitStrings.slice(-1).join(' ');

    if(firstPart === 'Cooperate Affairs Commission(CAC)') {
        firstPart = 'CAC'
    };

  return (
    <main>
        <div className='relative flex flex-col gap-[-10px] justify-center items-center text-[#061439] p-3 z-20'>
            <div className='leading-none flex flex-col mb-[2.4rem] md:mb-[3.4rem] mt-[50px]'>
                <div className='flex flex-col justify-center items-center text-center'>
                    <h2 className='leading-[42px] uppercase font-FamiljenBold text-center tracking-[-7.91px] md:text-[113px]'>
                        <span className='block'>{firstPart}</span>
                    </h2>
                    <h1 className='uppercase font-FamiljenBold text-center tracking-[-14px] px-4 py-0 md:text-[13rem]'>
                        <span className='block'>{lastPart}</span>
                    </h1>
                    <p className='overflow-hidden'>
                        <span className='block w-[819px] h-[66px] text-center font-PoppinsLight text-[15px] mt-3'>{currentService?.description}</span>
                    </p>
                </div>

                <div className='flex items-center justify-center overflow-hidden'>
                    <Button onClick={() => window.open(`https://wa.me/+2347038808886?text=${message}`, '_blank')} className='button w-[215px] h-[59px] rounded-[20px] text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-PoppinsBold text-[15px] uppercase'>
                        Reach us now
                    </Button>
                </div>
            </div>

            <Image className='img' src={currentService!.image} alt='Logo' width={1080} height={556} quality={100} priority/>
        </div>
    </main>
  )
}

export default ParticularPageHeroSection;