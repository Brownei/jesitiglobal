import ClientPage from "@/components/admin-dashboard/ClientPage"
import { categoryColumns } from "@/components/admin-dashboard/categories/columns"
import { prisma } from "@/lib/prisma"

const CategoriesPage = async () => {
  const categories = await prisma.category.findMany()
  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Categories ({categories.length})</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage dataItem={categories} column={categoryColumns} header='New Category' navigation="categories" navigationParam="create-categories"/>
      </div>
    </main>
  )
}

export default CategoriesPage