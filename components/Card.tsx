"use client"
import Image from "next/image"
import { Button } from "./ui/button"
import { Product } from "./graphics-store/PopularProducts"
import { FC } from "react"

type CardProps = {
    products: Product[]
}

const Card: FC<CardProps> = ({products}) => {
  return (
    <main>
        <div className='grid gap-4 items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {products.map((product, index) => (
                    <div className='border shadow-md w-full h-full' key={index}>
                        <Image className='w-full h-[250px] object-cover' src={product.image} alt={product.name} width={1000} height={1000} quality={100} priority={false}/>
                        <div className='container mx-auto p-3 flex flex-col gap-2'>
                            <h1 className='text-[0.9rem] capitalize font-FuturaBold'>{product.name}</h1>
                            <span className='mt-[20px]'>
                                <p className='uppercase text-[0.7rem] font-HelveticaBold opacity-50'>Starting At</p>
                                <span className='text-[1.2rem] font-FuturaBlack'>${product.price} <span className='font-HelveticaBold opacity-50 text-[0.8rem]'>per {product.quantity}</span></span>
                            </span>
                        </div>

                        <div className='p-2'>
                            <Button className='w-full font-HelveticaBold duration-300 text-sm hover:bg-[#96FDFF] hover:text-black'>
                                Order Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
    </main>
  )
}

export default Card