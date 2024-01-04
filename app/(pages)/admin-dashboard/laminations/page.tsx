import ClientPage from "@/components/admin-dashboard/ClientPage"
import { prisma } from "@/lib/prisma"
import { laminationColumns } from "@/components/admin-dashboard/laminations/columns"
import moment from "moment"

const LaminationsPage = async () => {
  const laminations = await prisma.lamination.findMany()
  const changed = laminations.map((item) => ({
    ...item,
    createdAt: moment(item.createdAt).format('MMMM DD, YYYY'),
    updatedAt: moment(item.updatedAt).format('MMMM DD, YYYY')
  }))
  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Laminations ({laminations.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={changed} column={laminationColumns} header='New Lamination' navigation="laminations" navigationParam="create-laminations"/>
      </div>
    </main>
  )
}

export default LaminationsPage