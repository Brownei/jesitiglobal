"use client"
import Card from "../Card"
import Link from "next/link"
import developer from '@/public/pexels-christina-morillo-1181676.jpg'
import tutoring from '@/public/pexels-thisisengineering-3861966.jpg'
import businessRegi from '@/public/pexels-christina-morillo-1181605.jpg'
import graphicDesign from '@/public/pexels-jonathan-borba-3052727.jpg'
import { Product } from "./PopularProducts";

const PopularCategories = () => {
  const products: Product[] = [
    {
        name: "Web Development",
        image: developer,
        price: 3000,
        quantity: 100
    },
    {
        name: "Tutoring",
        image: tutoring,
        price: 3000,
        quantity: 100
    },
    {
        name: "Business Registrations",
        image: businessRegi,
        price: 3000,
        quantity: 100
    },
    {
        name: "Graphic Designing",
        image: graphicDesign,
        price: 3000,
        quantity: 100
    },
  ]
  return (
    <main className='relative container mx-auto p-3'>
        <div className='mt-[50px]'>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='text-[1rem] font-FuturaBlack md:text-[1.2rem] lg:text-[1.5rem]'>Popular Categories</h1>
                <Link className='text-[0.5rem] capitalize font-HelveticaBold text-[#22AFFF] md:text-[0.7rem] lg:text-[0.9rem]' href={'/'}>Explore All Categories</Link>
            </div>
            <Card products={products} CAC='Examine'/>
        </div>
    </main>
  )
}

export default PopularCategories