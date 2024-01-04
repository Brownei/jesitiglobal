import ClientPage from "@/components/admin-dashboard/ClientPage"
import { sizeColumns } from "@/components/admin-dashboard/sizes/columns"
import { prisma } from "@/lib/prisma"
import moment from "moment"

const SizesPage = async () => {
  const sizes = await prisma.size.findMany()
  const changed = sizes.map((item) => ({
    ...item,
    createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
  }))


  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Sizes ({sizes.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={changed} column={sizeColumns} header='New Size' navigation="sizes" navigationParam="create-sizes"/>
      </div>
    </main>
  )
}

export default SizesPage