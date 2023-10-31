"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image';
import developer from '@/public/pexels-christina-morillo-1181676.jpg'
import tutoring from '@/public/pexels-thisisengineering-3861966.jpg'
import businessRegi from '@/public/pexels-christina-morillo-1181605.jpg'
import graphicDesign from '@/public/pexels-jonathan-borba-3052727.jpg'
import e from '@/public/pexels-karolina-grabowska-5632381.jpg'
import m from '@/public/pexels-pixabay-414974.jpg'
import Link from 'next/link';

const ExploreNowPage = () => {
  const services = [
    {
      name: "Web Development",
      href: "/",
      image: developer
    },
    {
        name: "Tutoring",
        href: "/",
        image: tutoring
    },
    {
        name: "Business Registrations",
        href: "/",
        image: businessRegi
    },
    {
        name: "Graphic Designing",
        href: "/",
        image: graphicDesign
    },
    {
        name: "Chicken",
        href: "/",
        image: e
    },
    {
        name: "Chicken",
        href: "/",
        image: m
    }
  ]

  return (
    <main className='relative container mx-auto p-3 h-[100dvh]'>
      <div className='flex flex-col justify-between items-center gap-3 mt-[30px]'>
        <div className='mb-[2rem]'>
          <h3 className='text-[1.5rem] font-FuturaBold md:text-[2rem]'>We will like to thank you for your interest</h3>
          <h5 className='text-[1rem] font-Helvetica md:text-[1.5rem]'>What services would you like to recieve?</h5>
        </div>
        <div className='grid grid-cols-2 gap-3 items-center lg:grid-cols-3'>
          {services.map((service, index) => (
            <Link href={service.href} className='relative border h-[200px] w-[130px] md:h-[270px] md:w-[200px]' key={index}>
              <div className='absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent to-black/50 cursor-pointer hover:bg-gradient-to-b hover:from-transparent hover:to-[#22AFFF]/50'/>
              <Image className='w-full h-full object-cover' src={service.image} alt={service.name} width={1000} height={1000} priority={false} quality={100}/>
              <p className='absolute bottom-3 right-3 z-[20] text-white text-end font-HelveticaBold'>{service.name}</p>
            </Link>
          ))}
        </div>

        <Button>
          Continue
        </Button>
      </div>
    </main>
  )
}

export default ExploreNowPage