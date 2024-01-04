import ClientPage from '@/components/admin-dashboard/ClientPage';
import { prisma } from '@/lib/prisma';
import { graphicColumns } from "@/components/admin-dashboard/graphics/columns";
import moment from 'moment';

const ProductPage = async () => {
  const graphics = await prisma.graphic.findMany()
  const changed = graphics.map((item) => ({
    ...item,
    createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
  }))

  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Graphics ({graphics.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={changed} column={graphicColumns} header='New Graphic' navigation='graphics' navigationParam='create-graphics'/>
      </div>
    </main>
  )
}

export default ProductPage;