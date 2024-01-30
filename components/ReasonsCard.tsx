"use client"

import { FC } from "react"

type ReasonsCardProps = {
    reason: string;
    id: number;
}

const ReasonsCard: FC<ReasonsCardProps> = ({reason, id}) => {
    let hover = true
  return (
    <div onClick={() => console.log(id)}>
        <div className="flex-initial transition-all duration-300 rounded-[24px] bg-black flex flex-col items-center cursor-pointer w-[250px] h-[150px] md:w-[800px] md:h-[220px] md:justify-end lg:hover:grow lg:hover:w-[400px] lg:w-[220px] lg:h-[508px]">
          <h4 className="text-[20px] font-FamiljenBold">{reason}</h4>
        </div>
    </div>
  )
}

export default ReasonsCard