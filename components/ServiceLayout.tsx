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
    <main className={`flex justify-between items-center text-white`}>
        <div className="lg:mt-[-100px]">
            <span className="text-[156px] font-FamiljenItalic text-center">{index}</span>
            <h2 className="text-[29px] font-FamiljenBold text-start">{serviceName}</h2>
            <p className="w-[387px] font-PoppinsLight text-[0.9rem] text-start">{serviceDescription}</p>
        </div>
        <Image className="w-[726px] h-[538px] object-cover" src={src} width={1000} height={1000} priority={false} quality={100} alt={serviceName}/>
    </main>
  )
}

export default ServiceLayout;