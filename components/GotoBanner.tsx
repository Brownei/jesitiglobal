"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const GotoBanner = () => {
  const router = useRouter()
  return (
    <main className='flex justify-center bg-[#061439] items-center mx-auto p-3'>
      <div className="relative container bg-[#22AFFF] rounded-[7px] flex flex-col justify-center items-center h-[314px] lg:w-[1350px] lg:h-[514px]">
        <h1 className="text-[3rem] font-FamiljenBold text-white tracking-[-3.39px] md:text-[6.8rem] text-center md:tracking-[-7.73px] lg:text-[8.5rem]">Work With Us</h1>
        <p className="mb-[20px] text-center text-white text-[0.6rem] font-PoppinsLight md:w-[480px] md:h-[54px] md:text-[0.7rem] md:mt-[-28px]">We are dedicated to turning challenges into opportunities. Let us embark on this collaborative path together and achieve your goals.</p>
        <Button onClick={() => router.push('/explore-now')} className='text-center rounded-[10px] bg-[#061439] text-white duration-300 font-PoppinsBold text-[15px] w-[160px] h-[39px] md:w-[357px] md:h-[59px] md:rounded-[20px]'>
          Explore now
        </Button>
      </div>
    </main>
  )
}

export default GotoBanner