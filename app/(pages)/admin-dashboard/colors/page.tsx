import { prisma } from '@/lib/prisma'
import ClientPage from '@/components/admin-dashboard/ClientPage'
import {colorColumns} from '@/components/admin-dashboard/colors/columns'
import moment from 'moment'

const ColorsPage = async () => {
  const colors = await prisma.color.findMany()
  const changed = colors.map((item) => ({
    ...item,
    createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
  }))

  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Colors ({colors.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={changed} column={colorColumns} header='New Color' navigation='colors' navigationParam='create-colors'/>
      </div>
    </main>
  )
}

export default ColorsPage;