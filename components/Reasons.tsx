"use client"
import ReasonsCard from "./ReasonsCard"

const Reasons = () => {
  const reasons = [
    {
      name: "One stop solution"
    },
    {
      name: "One stop solution"
    },
    {
      name: "One stop solution"
    },
    {
      name: "One stop solution"
    },
    {
      name: "One stop solution"
    },
  ]
  return (
    <main className='mt-[300px]'>
      <div className='relative container mx-auto p-4'>
        <div className="flex flex-col justify-center items-center text-center mb-[61px]">
          <h1 className='text-center text-[28px] font-FamiljenBold tracking-[-5.25px] lg:text-[75px]'>Reason to work with us?</h1>
          <p className="w-[479px] h-[48px] text-[15px] font-PoppinsLight">How may we guide you on a transformative journey, seamlessly blending innovation with excellence? What specific goals or challenges are you looking to address, and how can we tailor our expertise to meet your unique needs?</p>
        </div>
        <div className='flex justify-center gap-3 mt-[70px] items-center text-center'>
          {reasons.map((reason, index) => (
            <div key={index}>
              <ReasonsCard reason={reason.name} id={index}/>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Reasons