"use client"
import Image, { StaticImageData } from "next/image"
import { FC } from "react"

type ServiceLayoutProps = {
    src: StaticImageData;
    index: number;
    serviceName: string;
    serviceDescription: string;
}

const ServiceLayout: FC<ServiceLayoutProps> = ({src, index, serviceName, serviceDescription}) => {


  return (
    <div className={`flex flex-col-reverse items-center text-white lg:justify-between lg:flex-row`}>
      <div className="grid gap-[5px] lg:gap-0 lg:mt-[-100px]">
          <span className="hidden text-[156px] font-FamiljenItalic text-center lg:block">{index}</span>
          <h2 className=" font-FamiljenBold text-center text-[1.3rem] md:text-[1.7rem] lg:w-[600px] lg:text-start">{serviceName}</h2>
          <p className=" font-PoppinsLight text-[0.8rem] text-center md:w-[800px] md:text-[0.9rem] lg:w-[387px] lg:text-start">{serviceDescription}</p>
      </div>
      <Image className="object-cover w-[500px] h-[150px] mb-[22px] md:w-[700px] md:h-[300px] lg:mb-0 lg:w-[726px] lg:h-[538px]" src={src} width={1000} height={1000} priority={false} quality={100} alt={serviceName}/>
    </div>
  )
}

export default ServiceLayout;