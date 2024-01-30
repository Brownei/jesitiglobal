"use client"

import { FC } from "react"
import {Testimonial} from "./homePage/Testimonials"

type TestimonialCardProps = {
    testimonials: Testimonial[]
}

const TestimonialCard: FC<TestimonialCardProps> = ({testimonials}) => {
  return (
    <div className='relative container mx-auto p-4 mt-[116px]'>
        <div className='grid grid-cols-9 grid-flow-row gap-4'>
            <div className="col-span-2 row-span-6 bg-white text-black rounded-[30px] p-5">01</div>
            <div className="col-span-4 row-span-6 bg-white text-black rounded-[30px] p-5">02</div>
            <div className="col-span-3 row-span-6 bg-white text-black rounded-[30px] p-5">03</div>
            <div className="col-span-3 row-span-6 bg-white text-black rounded-[30px] p-5">04</div>
            <div className="col-span-2 row-span-6 bg-white text-black rounded-[30px] p-5">05</div>
            <div className="col-span-2 row-span-6 bg-white text-black rounded-[30px] p-5">06</div>
            <div className="col-span-2 row-span-6 bg-white text-black rounded-[30px] p-5">07</div>
            <div className="col-span-5 row-span-6 bg-white text-black rounded-[30px] p-5">08</div>
            <div className="col-span-4 row-span-6 bg-white text-black rounded-[30px] p-5">09</div>
        </div>
    </div>
  )
}

export default TestimonialCard