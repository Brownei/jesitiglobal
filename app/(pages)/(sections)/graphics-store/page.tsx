import Image from "next/image"
import graphicDesign from '@/public/pexels-jonathan-borba-3052727.jpg'
import SearchComponent from "@/components/SearchComponent";
import PopularProducts from "@/components/graphics-store/PopularProducts";
import PopularCategories from "@/components/graphics-store/PopularCategories";

const GraphicStorePage = () => {
  return (
    <main>
        <div>
          <div className='relative'>
            <div className='absolute left-0 right-0 top-0 bottom-0 bg-gradient-to-b from-transparent to-black/90'/>
            <div className="flex flex-col gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center text-white font-HelveticaBold">
              <h1 className="uppercase font-FuturaExtraBlack text-[5vw] tracking-tighter">Graphic Design</h1>
              <p className="font-Helvetica text-[1rem]">Get the best designs at an affordable rate!</p>
              <SearchComponent />
            </div>
            <Image className='w-full h-[300px] object-cover md:h-[400px] lg:h-[500px]' src={graphicDesign} width={1000} height={1000} alt='Graphic_Name' quality={100} priority={false}/>
          </div>

          <PopularProducts />
          <PopularCategories />
        </div>
    </main>
  )
}

export default GraphicStorePage;