import ClientPage from "@/components/admin-dashboard/ClientPage"
import { prisma } from "@/lib/prisma"
import { laptopOrderColumns } from "@/components/admin-dashboard/laptop-orders/columns"
import moment from "moment"

const LaptopOrdersPage = async () => {
    const laptopOrder = await prisma.laptopOrder.findMany()
    const changed = laptopOrder.map((item) => ({
      ...item,
      createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
      updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
    }))

  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Laptop Orders ({laptopOrder.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={false} dataItem={changed} column={laptopOrderColumns} navigation="orders"/>
      </div>
    </main>
  )
}

export default LaptopOrdersPage