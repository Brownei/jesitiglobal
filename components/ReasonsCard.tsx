"use client"
import { FC, useState } from "react"

type ReasonsCardProps = {
  reason: string;
  id: number;
  description: string;
}

const ReasonsCard: FC<ReasonsCardProps> = ({ reason, id, description }) => {
  const [hover, setHover] = useState(false);
  return (
    <div onClick={() => console.log(id)}>
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="flex-initial transition-all duration-300 rounded-[24px] p-3 bg-[#061439] text-white hidden flex-col gap-3 items-start cursor-pointer w-[250px] h-[150px] md:flex md:w-[800px] md:h-[220px] md:justify-end lg:hover:grow lg:hover:w-[400px] lg:w-[220px] lg:h-[508px]">
        <h4 className="text-[1.4rem] font-FamiljenBold text-start">{reason}</h4>
        <p className={hover ? 'text-xs font-PoppinsLight w-full text-start' : 'line-clamp-3 text-xs text-start'}>{description}</p>
      </div>

      <div className="flex-initial transition-all duration-300 p-5 rounded-[24px] bg-[#061439] flex flex-col items-center cursor-pointer w-full text-white h-fit gap-2 md:hidden">
        <h4 className="text-[1.4rem] font-FamiljenBold text-start">{reason}</h4>
        <p className='w-full text-xs text-start'>{description}</p>
      </div>
    </div>
  )
}

export default ReasonsCard;
