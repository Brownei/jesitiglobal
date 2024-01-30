"use client"
import TestimonialCard from "../TestimonialCard";

export type Testimonial = {
  content: string;
  name: string;
}

const Testimonials = () => {

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
    <main className='relative bg-[#061439] mt-[80px] py-[100px]'>
      <div className="flex flex-col justify-center items-center md:gap-3">
        <h1 className='text-center text-[2rem] tracking-[-2px] text-white font-FamiljenBold md:tracking-[-5.39px] md:text-[4.8rem]'>What do they say about us?</h1>
        <TestimonialCard testimonials={Testimonial}/>
      </div>
    </main>
  )
}

export default Testimonials;