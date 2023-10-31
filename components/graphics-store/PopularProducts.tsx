"use client"
import Image, { StaticImageData } from 'next/image';
import developer from '@/public/pexels-christina-morillo-1181676.jpg'
import tutoring from '@/public/pexels-thisisengineering-3861966.jpg'
import businessRegi from '@/public/pexels-christina-morillo-1181605.jpg'
import graphicDesign from '@/public/pexels-jonathan-borba-3052727.jpg'
import e from '@/public/pexels-karolina-grabowska-5632381.jpg'
import m from '@/public/pexels-pixabay-414974.jpg'
import Link from 'next/link';
import { Button } from '../ui/button';
import Card from '../Card';

export type Product = {
    name: string;
    image: StaticImageData;
    price: number;
    quantity: number;
}

const PopularProducts = () => {
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
        {
            name: "Chicken",
            image: e,
            price: 3000,
            quantity: 100
        },
        {
            name: "Chicken",
            image: m,
            price: 3000,
            quantity: 100
        }
    ]
  return (
    <main className='relative container mx-auto p-3'>
        <div className='mt-[50px]'>
            <div className='flex justify-between items-center mb-5'>
                <h1 className='text-[1.5rem] font-FuturaBlack'>Popular Products</h1>
                <Link className='text-[0.9rem] capitalize font-HelveticaBold text-[#22AFFF]' href={'/'}>Explore All Products</Link>
            </div>
            <Card products={products}/>
        </div>
    </main>
  )
}

export default PopularProducts