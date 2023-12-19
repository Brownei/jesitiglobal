"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BellIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import moment from "moment";
import { Overview } from "../Chart";

const AdminDashboardPage = () => {
  const todayDate = new Date()
  const formatedDate = moment(todayDate).format('DD MMMM, YYYY')
  const totalRevenuePercentage = 50
  return (
    <main>
      <div className="flex flex-row-reverse justify-between items-center">
          <div className="flex gap-3 items-center">
            <span className="font-HelveticaBold text-sm">{formatedDate}</span>
            <div className="relative">
              <BellIcon className="border rounded-full w-7 h-7 p-1" />
              <span className="absolute top-0 right-0 border bg-red-600 text-white rounded-full p-1 w-2 h-2 animate-pulse duration-1000" />
            </div>
          </div>
          <div>
            <h1 className="text-[2rem] font-HelveticaBold">Good Morning, Brownson!</h1>
            <p className="text-sm font-Helvetica">Here&apos;s what&apos;s happening with your store today</p>
          </div>
      </div>
      <Separator className="mt-2 mx-0 p-0"/>
      
      <div className="hidden flex-col mt-10 mb-10 md:flex">
        {/* CARDS */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL REVENUE */}
          <Card className="flex items-center px-5 gap-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-Helvetica text-muted-foreground text-xs">
                  Total Revenue
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3 items-center">
                <div className="text-xl">40000$</div>
                <p className={totalRevenuePercentage > 0 ? 'text-xs text-muted-foreground font-Helvetica text-green-600' : 'text-xs text-muted-foreground font-Helvetica text-red-600'}>
                {totalRevenuePercentage > 0 ? `+100%` : `-50%`}
                </p>
              </CardContent>
            </div>
          </Card>

          {/* PRODUCTS IN STOCK */}
          <Card className="flex items-center px-5 gap-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-Helvetica text-muted-foreground text-xs">
                  Total Products
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3 items-center">
                <div className="text-xl">100</div>
                <p className={totalRevenuePercentage > 0 ? 'text-xs text-muted-foreground font-Helvetica text-green-600' : 'text-xs text-muted-foreground font-Helvetica text-red-600'}>
                {totalRevenuePercentage > 0 ? `+100%` : `-50%`}
                </p>
              </CardContent>
            </div>
          </Card>

          {/* TOTAL SALES MADE  */}
          <Card className="flex items-center px-5 gap-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-Helvetica text-muted-foreground text-xs">
                  Sales Made
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3 items-center">
                <div className="text-xl">200</div>
                <p className={totalRevenuePercentage > 0 ? 'text-xs text-muted-foreground font-Helvetica text-green-600' : 'text-xs text-muted-foreground font-Helvetica text-red-600'}>
                {totalRevenuePercentage > 0 ? `+100%` : `-50%`}
                </p>
              </CardContent>
            </div>
          </Card>

          {/* TOP PRODUCTS */}
          <Card className="flex items-center px-5 gap-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-muted-foreground">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="font-Helvetica text-muted-foreground text-xs">
                  Top Products
                </CardTitle>
              </CardHeader>
              <CardContent className="flex gap-3 items-center">
                <div className="text-xl">10</div>
                <p className={totalRevenuePercentage > 0 ? 'text-xs text-muted-foreground font-Helvetica text-green-600' : 'text-xs text-muted-foreground font-Helvetica text-red-600'}>
                {totalRevenuePercentage > 0 ? `+100%` : `-50%`}
                </p>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* CHARTS */}
        <Overview />
      </div>
    </main>
  )
}

export default AdminDashboardPage;