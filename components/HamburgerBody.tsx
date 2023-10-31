"use client"
import { Dispatch, FC, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blur, translate } from '../anim/Hamburger';
import { HamburgerType, Links } from './Hamburger';

type HamburgerBodyProps = {
    setToggle: (value: React.SetStateAction<boolean>) => void;
    setSelectedLink: Dispatch<SetStateAction<HamburgerType>>;
    selectedLink: HamburgerType;
    links: Links[]
}

const HamburgerBody: FC<HamburgerBodyProps> = ({links, selectedLink, setSelectedLink, setToggle}) => {

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
        <div className='flex flex-col justify-end items-center gap-1 text-[2rem] lg:max-w-[1200px] mt-[80px] lg:text-[5vw] lg:pl-[2vw] lg:flex-row lg:flex-wrap lg:justify-center'>
        {
            links.map( (link, index) => {
                const { title, href } = link;
                return (
                    <Link key={`l_${index}`} href={href} onMouseDown={() => setToggle(prev => !prev)}>
                        <motion.p
                        className='flex items-end text-[#061439] overflow-hidden font-[32px] pr-[30px] pt-[10px] font-FuturaBold uppercase'
                        onMouseDown={() => {setSelectedLink({isActive: true, index})}} 
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