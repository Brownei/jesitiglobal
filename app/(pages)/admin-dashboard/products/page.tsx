import ClientPage from '@/components/admin-dashboard/products/ClientPage';
import { prisma } from '@/lib/prisma';
import React from 'react'

const ProductPage = async () => {
  const graphics = await prisma.graphic.findMany()
  return (
    <main>
      <div className='relative mt-5 mr-5 rounded-full ml-[270px]'>
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Graphics ({graphics.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage productDataItem={graphics}/>
      </div>
    </main>
  )
}

export default ProductPage;