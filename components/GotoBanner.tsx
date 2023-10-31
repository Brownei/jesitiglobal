"use client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

const GotoBanner = () => {
  const router = useRouter()
  return (
    <main className='relative container mx-auto p-3 mt-[100px]'>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-[28px] text-center font-FuturaExtraBold lg:text-[32px]">Impressed? Interested? Want to take control of your business?</h1>
        <Button onClick={() => router.push('/explore-now')} className='text-center w-fit hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-bold'>
          Explore now
        </Button>
      </div>
    </main>
  )
}

export default GotoBanner