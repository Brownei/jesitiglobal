"use client"
import TestimonialCard from "../TestimonialCard";
import TestimonialForMultiple from "../TestimonialForMultiple";
import { Button } from "../ui/button";
import { testimonials } from "@/lib/data";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"
import Autoplay from 'embla-carousel-autoplay'

export type Testimonial = {
  content: string;
  name: string;
}

const Testimonials = () => {
  const router = useRouter()
  Autoplay.globalOptions = { delay: 1000, jump: true }
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  useEffect(() => {
    if (emblaApi) {
      //console.log(emblaApi.slideNodes()) // Access API
    }
  }, [emblaApi])


  return (
    <main className='relative bg-[#061439] mt-[80px] py-[100px]'>
      <div className="flex flex-col justify-center items-center">
        <h1 className='text-center text-[2rem] tracking-[-2px] text-white font-FamiljenBold md:tracking-[-5.39px] md:text-[4.8rem]'>What do they say about us?</h1>
        {testimonials.length > 9 ? (
          <TestimonialForMultiple testimonials={testimonials} />
        ) : (
          <div className="relative container mx-auto p-2 md:mt-[50px]">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-[13px] items-center my-[40px]">
                {testimonials.map((testimonial, index) => (
                  <div key={index}>
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <Button onClick={() => router.push('/services')} className='text-center rounded-[10px] bg-[#22AFFF] hover:text-[#061439] hover:bg-[#96FDFF] text-white duration-300 font-PoppinsBold text-[15px] w-[160px] h-[39px] md:w-[357px] md:h-[59px] md:rounded-[20px]'>
          Write a review
        </Button>
      </div>
    </main>
  )
}

export default Testimonials;
