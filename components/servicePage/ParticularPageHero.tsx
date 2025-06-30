"use client"
import { services } from "@/lib/data";
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { FC } from 'react'
import Link from "next/link";

interface ParticularPageHeroSectionProps {
  params: {
    servicesTitle: string;
  },
}

const ParticularPageHeroSection: FC<ParticularPageHeroSectionProps> = ({ params }) => {
  let firstPart: string;
  let lastPart: string;
  const serviceName = decodeURIComponent(params.servicesTitle)
  const currentService = services.find(service => service.name === serviceName)
  const message = encodeURIComponent(`Hello, I will like to make more inquires about the ${currentService?.name} service which you offer at Jesitiglobal enterprise.`);
  const splitStrings = currentService!.name.split(' ')

  firstPart = splitStrings.slice(0, -1).join(' ');
  lastPart = splitStrings.slice(-1).join(' ');

  return (
    <main>
      <div className='relative flex flex-col gap-[-10px] justify-center items-center text-[#061439] p-3 z-20'>
        <div className='leading-none flex flex-col mb-[2.4rem] md:mb-[3.4rem] mt-[50px]'>
          <div className='flex flex-col justify-center items-center text-center'>
            <h2 className='leading-[42px] uppercase font-FamiljenBold text-center text-[2.5rem] tracking-[-2.5px] md:tracking-[-3.95px] md:text-[5rem] lg:tracking-[-7.91px] lg:text-[7rem]'>
              <span className='block'>{firstPart}</span>
            </h2>
            <h1 className='uppercase font-FamiljenBold text-center px-4 py-0 text-[3.5rem] tracking-[-3px] md:tracking-[-7px] md:text-[10rem] lg:tracking-[-14px] lg:text-[13rem]'>
              <span className='block'>{lastPart}</span>
            </h1>
            <p className='overflow-hidden'>
              <span className='block text-center font-PoppinsLight text-[0.9rem] mt-3 w-[320px] md:w-[719px] md:h-[74px]'>{currentService?.description}</span>
            </p>
          </div>

          <div className='flex items-center space-x-[48px] justify-center overflow-hidden mt-3'>
            <Button onClick={() => window.open(`https://wa.me/+2347038808886?text=${message}`, '_blank')} className='button text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-PoppinsBold text-[0.7rem] w-[120px] h-[45px] rounded-[15px] uppercase md:text-[0.9rem] md:rounded-[20px] md:w-[215px] md:h-[59px]'>
              Reach us now
            </Button>
            {serviceName === 'Graphic Arts and Design' && (
              <Button className='button flex justify-center items-center text-[#061439] border-[#22AFFF] bg-white flex-shrink-0 button text-center hover:bg-[#061439] hover:text-white duration-300 font-PoppinsBold text-[0.7rem] w-[120px] h-[45px] rounded-[15px] uppercase md:text-[0.9rem] md:rounded-[20px] md:w-[215px] md:h-[59px]' variant='outline'>
                <Link href={'/graphic-store'} target="_blank">View Store</Link>
              </Button>
            )}
          </div>
        </div>

        <Image className='img' src={currentService!.image} alt='Logo' width={1080} height={556} quality={100} priority />
      </div>
    </main>
  )
}

export default ParticularPageHeroSection;
