import ClientPage from "@/components/admin-dashboard/ClientPage"
import { prisma } from "@/lib/prisma"
import { graphicOrderColumns } from "@/components/admin-dashboard/graphic-orders/columns"
import moment from "moment"

const GraphicOrdersPage = async () => {
    const graphicOrder = await prisma.graphicOrder.findMany()
    const changed = graphicOrder.map((item) => ({
      ...item,
      createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
      updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
    }))

  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Graphic Orders ({graphicOrder.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={false} dataItem={changed} column={graphicOrderColumns} navigation="orders"/>
      </div>
    </main>
  )
}

export default GraphicOrdersPage