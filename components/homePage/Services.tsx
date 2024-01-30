"use client"
import { services } from '@/lib/data';
import ServiceLayout from '../ServiceLayout';
import { FC } from 'react'
import AllServicePageLayout from '../servicePage/AllServicePageLayout'
import Link from 'next/link'

type ServicesProps = {
    isHomePage: boolean;
}

const Services: FC<ServicesProps> = ({isHomePage}) => {
    

    if(isHomePage === true) {
        return (
            <main className='bg-[#061439] lg:mt-[80px]'>
                <div className='flex flex-col mx-auto relative container py-[80px] justify-center items-center text-center p-4'>
                    <h1 className='text-center text-[2rem] tracking-[-2px] font-FamiljenBold text-white md:tracking-[-5.39px] md:text-[4.8rem]'>Take control of your enterprises</h1>
                    <p className='flex-shrink-0 flex justify-center items-center text-center text-white font-PoppinsLight text-[0.7rem] lg:mt-[22.5px] md:w-[720.15px] md:h-[72.81px] md:text-[0.9rem]'><span>Unlock the full potential of your business journey with Jesitiglobal Enterprise. Our comprehensive range of services is designed to propel your company from zero to hero. From strategic consulting to innovative solutions, We are here to drive your success. Take the leap towards growth and excellence with Jesitiglobal.</span></p>
                    <div className='grid gap-[55px] mt-[50px] md:gap-[64px] md:mt-[100px]'>
                        {services.map((service) => (
                            <div key={service.id}>
                                <ServiceLayout index={service.id} serviceDescription={service.description} serviceName={service.name} src={service.image}/>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        )
    } else {
        return (
            <main className='bg-[#061439] mt-[80px]'>
                <div className='flex flex-col mx-auto relative container py-[80px] justify-center items-center text-center p-4'>
                    <h1 className='text-center text-[28px] font-FamiljenBold tracking-[-5.39px] text-white lg:text-[77px]'>All You Need To Elevate Your Enterprise</h1>
                    <p className='w-[720.15px] h-[72.81px] flex-shrink-0 flex justify-center items-center text-center text-white mt-[22.5px] font-PoppinsLight text-[15px]'><span>Unlock the full potential of your business journey with Jesitiglobal Enterprise. Our comprehensive range of services is designed to propel your company from zero to hero. From strategic consulting to innovative solutions, We are here to drive your success. Take the leap towards growth and excellence with Jesitiglobal.</span></p>
                    <div className='grid grid-cols-1 gap-[64px] mt-[100px] lg:grid-cols-2'>
                        {services.map((service) => (
                            <Link className='duration-300 transition shadow-lg' href={`/services/${service.name}`} key={service.id}>
                                <AllServicePageLayout index={service.id} serviceDescription={service.description} serviceName={service.name} src={service.image}/>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        )
    }

}

export default Services;