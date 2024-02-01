"use client"
import Image, { StaticImageData } from "next/image"
import { FC } from "react";
import { Button } from "../ui/button";

type AllServiceLayoutProps = {
    src: StaticImageData;
    index: number;
    serviceName: string;
    serviceDescription: string;
}

const AllServicePageLayout: FC<AllServiceLayoutProps> = ({src, index, serviceDescription, serviceName}) => {
  return (
    <div className='text-white p-3'>
      <div className="flex justify-center items-center">
        <Image className="object-cover w-[700px] h-[150px] lg:w-[614px] lg:h-[199px]" src={src} width={1000} height={1000} priority={false} quality={100} alt={serviceName} />
      </div>
      <div className="flex justify-between items-center my-[15px]">
          <h2 className="text-[1.4rem] font-FamiljenBold text-start">{serviceName}</h2>
          <Button className="rounded-[20px] text-center hover:bg-[#96FDFF] hover:text-[#061439] duration-300 font-PoppinsBold text-[0.7rem] w-fit lg:text-[0.7rem] ">View more</Button>
      </div>
      <p className="text-start font-PoppinsLight text-[1rem] line-clamp-2">{serviceDescription}</p>
    </div>
  )
}

export default AllServicePageLayout