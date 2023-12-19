import ClientPage from "@/components/admin-dashboard/ClientPage"
import { prisma } from "@/lib/prisma"
import { laminationColumns } from "@/components/admin-dashboard/laminations/columns"

const LaminationsPage = async () => {
  const laminations = await prisma.lamination.findMany()
  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Laminations ({laminations.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={laminations} column={laminationColumns} header='New Lamination' navigation="laminations" navigationParam="create-laminations"/>
      </div>
    </main>
  )
}

export default LaminationsPage