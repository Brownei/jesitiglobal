"use client"
import { services } from '@/lib/data';
import Image from 'next/image'
import Link from 'next/link';
import logoPicture from '/public/companyLogo.jpg'

const Footer = () => {
  return (
    <main>
      <div className='bg-[#061439] text-white flex flex-col gap-5 items-start p-5 mt-[100px] md:gap-[150px] md:flex-row'>
        <Image className='hidden w-[200px] h-fit object-cover md:block lg:w-[300px]' src={logoPicture} alt='Logo' width={1000} height={1000}/>

        {/* INFORMATION */}
        <div className="flex flex-col gap-4 items-start font-PoppinsLight">
          <span className='text-[1.2rem]'>Information</span>
          <ul className='text-[0.9rem] grid gap-2 text-gray-400'>
            <li className='hover:text-white'>About Jesitiglobal</li>
            <li className='hover:text-white'>Email Us</li>
            <li className='hover:text-white'>Privacy Policy</li>
            <li className='hover:text-white'>Terms and Conditions</li>
            <li className='hover:text-white'>Terms of Service</li>
            <li className='hover:text-white'>Refund Policy</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col gap-4 items-start font-PoppinsLight">
          <span className='text-[1.2rem]'>Contact</span>
          <ul className='text-[0.9rem] grid gap-2 text-gray-400'>
            <li>PortHarcourt</li>
            <li className='hover:text-white underline'>+2348035982957</li>
            <li className='hover:text-white underline'>esitibrownson@gmail.com</li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="flex flex-col gap-4 items-start font-PoppinsLight">
          <span className='text-[1.2rem]'>Services</span>
          <ul className='text-[0.9rem] grid gap-2 text-gray-400'>
            {services.map((service, index) => (
              <li key={index} className='hover:text-white'>
                <Link href={`/services/${service.name}`}>{service.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}

export default Footer