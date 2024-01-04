import ClientPage from "@/components/admin-dashboard/ClientPage"
import { userColumns } from "@/components/admin-dashboard/employees/columns"
import { prisma } from "@/lib/prisma"

const EmployeesPage = async () => {
  const users = await prisma.user.findMany({
    where: {
      role: 'EMPLOYEE'
    }
  })
  
  return (
    <main>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-[2rem] uppercase font-HelveticaBold">Employees</h1>
        </div>
        <div className="border-b border-black mt-2 mx-2" />
        <ClientPage isThereNewTitle={false} dataItem={users} column={userColumns} navigation="employees"/>
      </div>
    </main>
  )
}

export default EmployeesPage