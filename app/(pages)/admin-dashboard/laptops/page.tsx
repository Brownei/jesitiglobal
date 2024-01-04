import ClientPage from "@/components/admin-dashboard/ClientPage"
import { laptopColumns } from "@/components/admin-dashboard/laptops/columns"
import { prisma } from "@/lib/prisma"
import moment from "moment"

const LaptopPage = async () => {
  const laptops = await prisma.laptop.findMany()
  const changed = laptops.map((item) => ({
    ...item,
    createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
  }))

  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Laptops ({laptops.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={changed} column={laptopColumns} header='New Laptop' navigation="laptops" navigationParam="create-laptops"/>
      </div>
    </main>
  )
}

export default LaptopPage