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
        <div className="w-[220px] h-[508px] flex-initial transition-all duration-300 hover:grow hover:w-[400px] rounded-[24px] bg-black flex flex-col justify-end items-center cursor-pointer">
            <h4 className="text-[20px] font-FamiljenBold">{reason}</h4>
        </div>
    </div>
  )
}

export default ReasonsCard