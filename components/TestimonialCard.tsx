"use client"

import { FC } from "react"
import {Testimonial} from "./Testimonials"

type TestimonialCardProps = {
    testimonials: Testimonial[]
}

const TestimonialCard: FC<TestimonialCardProps> = ({testimonials}) => {
  return (
    <div className='relative container mx-auto p-4 mt-[116px]'>
        <div className='grid grid-cols-9 grid-rows-6 gap-4'>
            <div className="col-span-2 row-span-3 bg-white text-black">01</div>
            <div className="col-span-4 row-span-3 bg-white text-black">02</div>
            <div className="col-span-3 row-span-4 bg-white text-black">03</div>
            <div className="col-span-4 row-span-2 bg-white text-black">04</div>
            <div className=" col-span-1 row-span-2 bg-white text-black">05</div>
        </div>
    </div>
  )
}

export default TestimonialCard