"use client"
import { Dispatch, FC, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blur, translate } from '../anim/Hamburger';
import { HamburgerType, Links } from './Hamburger';

type HamburgerBodyProps = {
    setSelectedLink: Dispatch<SetStateAction<HamburgerType>>;
    selectedLink: HamburgerType;
    links: Links[]
}

const HamburgerBody: FC<HamburgerBodyProps> = ({links, selectedLink, setSelectedLink}) => {

    const getChars = (word: string) => {
        let chars: any[] = [];
        word.split("").forEach( (char, i) => {
          chars.push(
            <motion.span 
                custom={[i * 0.02, (word.length - i) * 0.01]} 
                variants={translate} initial="initial" 
                animate="enter" 
                exit="exit"
                key={char + i}>
                {char}
            </motion.span>
            )
        })
        return chars;
    }
    
    return (
        <div className='grid gap-1 text-[2rem] lg:max-w-[1200px] mt-[80px] lg:text-[5vw] lg:pl-[2vw]'>
        {
            links.map( (link, index) => {
                const { title, href } = link;
                return (
                    <Link key={`l_${index}`} href={href}>
                        <motion.p
                        className='text-[#061439] overflow-hidden font-[32px] pr-[30px] pt-[10px] font-FuturaBold'
                        onMouseOver={() => {setSelectedLink({isActive: true, index})}} 
                        onMouseLeave={() => {setSelectedLink({isActive: false, index})}} 
                        variants={blur} 
                        animate={selectedLink.isActive && selectedLink.index != index ? "open" : "closed"}>
                            {getChars(title)}
                        </motion.p>
                    </Link>
                )
            })
        }
        </div>
    )
}

export default HamburgerBody;