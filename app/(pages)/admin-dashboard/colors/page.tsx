import { prisma } from '@/lib/prisma'
import ClientPage from '@/components/admin-dashboard/ClientPage'
import {colorColumns} from '@/components/admin-dashboard/colors/columns'

const ColorsPage = async () => {
  const colors = await prisma.color.findMany()
  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Colors ({colors.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage dataItem={colors} column={colorColumns} header='New Color' navigation='colors' navigationParam='create-colors'/>
      </div>
    </main>
  )
}

export default ColorsPage