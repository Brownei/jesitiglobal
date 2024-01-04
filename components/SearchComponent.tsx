"use client"
import React from 'react'
import { Button } from './ui/button'

const SearchComponent = () => {
  const width = window.innerWidth
  return (
    <main>
        <div className='border bg-white text-black rounded-full flex gap-2 items-center p-3 w-full h-[30px] lg:h-[35px]'>
            <input type="text" className='text-sm p-3 w-full h-[30px] rounded-full focus:outline-none bg-transparent' placeholder={width < 760 ? 'Search for products......' : 'Search for your preference....'}/>
            {/* <button className='flex items-center border rounded-full p-1 bg-[#22AFFF] hover:bg-[#96FDFF]'>
                <span className='text-sm text-white'>S</span>
            </button> */}
        </div>
    </main>
  )
}

export default SearchComponent;