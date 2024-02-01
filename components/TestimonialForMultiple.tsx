import {FC} from 'react'
import { Testimonial } from './homePage/Testimonials'
import TestimonialCard from './TestimonialCard'
import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"
import Autoplay from 'embla-carousel-autoplay'

type TestimonialForMultipleProps = {
    testimonials: Testimonial[]
}

const TestimonialForMultiple: FC<TestimonialForMultipleProps> = ({testimonials}) => {
    Autoplay.globalOptions = { delay: 1000, jump: true }
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  
    useEffect(() => {
        if (emblaApi) {
            console.log(emblaApi.slideNodes()) // Access API
        }
    }, [emblaApi])

    return (
        <div className='relative container mx-auto p-2 md:my-[50px]'>
            <div className='hidden grid-cols-9 grid-flow-row gap-4 md:grid'>
                <div className="col-span-2 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[0].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[0].name}</span>
                </div>
                </div>
                <div className="col-span-4 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[1].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[1].name}</span>
                </div>
                </div>
                <div className="col-span-3 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[2].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[2].name}</span>
                </div>
                </div>
                <div className="col-span-3 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[3].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[3].name}</span>
                </div>
                </div>
                <div className="col-span-2 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[4].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[4].name}</span>
                </div>
                </div>
                <div className="col-span-2 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[5].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[5].name}</span>
                </div>
                </div>
                <div className="col-span-2 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[6].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[6].name}</span>
                </div>
                </div>
                <div className="col-span-5 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[7].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[7].name}</span>
                </div>
                </div>
                <div className="col-span-4 row-span-4 bg-white text-[#061439] rounded-[30px] p-5">
                <div className="flex flex-col gap-2 justify-center items-center">
                    <p className="text-xs font-PoppinsLight text-center">{testimonials[8].content}</p>
                    <span className="text-lg font-FamiljenBold text-end">{testimonials[8].name}</span>
                </div>
                </div>
            </div>

            <div className="block overflow-hidden md:hidden" ref={emblaRef}>
                <div className="flex gap-[16px] items-center my-[40px]">
                    {testimonials.map((testimonial, index) => (
                        <div key={index}>
                            <TestimonialCard testimonial={testimonial}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TestimonialForMultiple