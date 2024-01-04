"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const GotoBanner = () => {
  const router = useRouter()
  return (
    <main className='relative container mx-auto p-3 mt-[250px]'>
      <div className="w-[1350px] h-[514px] bg-[#22AFFF] rounded-[7px] flex flex-col justify-center items-center">
        <h1 className="text-[28px] text-center font-PoppinsBold tracking-[-9.73px] text-[#061439] lg:text-[139px]">Work With Us</h1>
        <p className="mt-[-28px] mb-[20px] w-[480px] h-[54px] text-center text-white text-[13px] font-PoppinsLight">We are dedicated to turning challenges into opportunities. Let us embark on this collaborative path together and achieve your goals.</p>
        <Button onClick={() => router.push('/explore-now')} className='text-center w-[357px] h-[59px] rounded-[20px] bg-[#061439] text-white duration-300 font-PoppinsBold text-[15px]'>
          Explore now
        </Button>
      </div>
    </main>
  )
}

export default GotoBanner