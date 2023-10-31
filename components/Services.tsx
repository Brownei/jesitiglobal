"use client"
import Image from 'next/image';
import developer from '@/public/pexels-christina-morillo-1181676.jpg'
import tutoring from '@/public/pexels-thisisengineering-3861966.jpg'
import businessRegi from '@/public/pexels-christina-morillo-1181605.jpg'
import graphicDesign from '@/public/pexels-jonathan-borba-3052727.jpg'
import e from '@/public/pexels-karolina-grabowska-5632381.jpg'
import m from '@/public/pexels-pixabay-414974.jpg'

const Services = () => {
    const services = [
        {
            name: "Web Development",
            image: developer
        },
        {
            name: "Tutoring",
            image: tutoring
        },
        {
            name: "Business Registrations",
            image: businessRegi
        },
        {
            name: "Graphic Designing",
            image: graphicDesign
        },
        {
            name: "Chicken",
            image: e
        },
        {
            name: "Chicken",
            image: m
        }
    ]
    return (
        <main className='mt-[100px]'>
            <div className='relative container mx-auto p-4 font-Helvetica'>
                <h1 className='text-center text-[28px] capitalize font-FuturaExtraBold text-[#061439] lg:text-[44px]'>Take control of your enterprises</h1>
                <p className='text-center text-[1rem] text-[#061439]'>Jesitiglobal enterprise help by offering a wide range of services to take your business, company and enterprise from zero to hero.</p>
                <div className='grid grid-cols-1 justify-center items-center gap-5 mt-5 md:grid-cols-2 lg:grid-cols-3'>
                    {services.map((service, index) => (
                        <div className='relative border w-full overflow-hidden h-[200px] lg:h-[400px]' key={index}>
                            <div className='absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent to-black/50'/>
                            <Image className='w-full h-full object-cover' src={service.image} width={1000} height={1000} alt={service.name} quality={100} priority={false}/>
                            <p className='absolute bottom-3 right-3 text-white font-HelveticaBold text-[1.5rem]'>{service.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )

}

export default Services;