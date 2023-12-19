import ClientPage from "@/components/admin-dashboard/ClientPage"
import { prisma } from "@/lib/prisma"
import { materialColumns } from "@/components/admin-dashboard/materials/columns"

const MaterialsPage = async () => {
  const materials = await prisma.lamination.findMany()

  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Materials ({materials.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={true} dataItem={materials} column={materialColumns} header='New Material' navigation="materials" navigationParam="create-materials"/>
      </div>
    </main>
  )
}

export default MaterialsPage