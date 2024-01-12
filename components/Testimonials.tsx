"use client"
import { FC, MutableRefObject } from "react";
import TestimonialCard from "./TestimonialCard";

export type Testimonial = {
  content: string;
  name: string;
}

type TestimonialsProps = {
  testimonialsRef: MutableRefObject<HTMLDivElement | null>
}

const Testimonials: FC<TestimonialsProps> = ({testimonialsRef}) => {

  const Testimonial: Testimonial[] = [
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
    {
      content: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque, minus officiis repellendus voluptas iure sequi rem ipsum optio reiciendis libero recusandae quam, at beatae magni quisquam magnam esse consectetur harum!",
      name: "Brwonson Esiti"
    },
  ]

  return (
    <main ref={testimonialsRef} className='relative mt-[200px] py-[100px]'>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className='text-center text-[28px] font-FamiljenBold text-white tracking-[-4.9px] lg:text-[70px]'>What do they say about us?</h1>
        <TestimonialCard testimonials={Testimonial}/>
      </div>
    </main>
  )
}

export default Testimonials;