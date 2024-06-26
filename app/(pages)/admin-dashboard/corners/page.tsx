import ClientPage from "@/components/admin-dashboard/ClientPage"
import { cornerColumns } from "@/components/admin-dashboard/corners/columns"
import { prisma } from "@/lib/prisma"
import moment from "moment"


const CornersPage = async () => {
  const corners = await prisma.corners.findMany()
  const changed = corners.map((item) => ({
    ...item,
    createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
  }))

  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Corners ({corners.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={changed} column={cornerColumns} header='New Corner' navigation="corners" navigationParam="create-corners"/>
      </div>
    </main>
  )
}

export default CornersPage