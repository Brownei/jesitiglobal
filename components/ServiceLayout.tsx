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
    <main className="p-2 flex justify-between items-center">
        <div className="lg:mt-[-100px]">
            <span className="text-[156px] font-FamiljenItalic text-center text-white">{index}</span>
            <h2 className="text-[29px] font-FamiljenBold text-start text-white">{serviceName}</h2>
            <p className="w-[387px] h-[30px] flex-shrink-0 font-Poppins text-[15px] text-start text-white">{serviceDescription}</p>
        </div>
        <Image className="mt-[64px] w-[726px] h-[538px] object-cover" src={src} width={1000} height={1000} priority={false} quality={100} alt="Service picture"/>
    </main>
  )
}

export default ServiceLayout;