"use client"
import ReasonsCard from "../ReasonsCard"

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
    <main className='mt-[80px]'>
      <div className='relative container mx-auto p-4'>
        <div className="flex flex-col justify-center items-center text-center mb-[61px]">
          <h1 className='text-center text-[2rem] tracking-[-2px] font-FamiljenBold md:tracking-[-5.39px] md:text-[4.8rem]'>Reason to work with us?</h1>
          <p className="flex-shrink-0 flex justify-center items-center text-center font-PoppinsLight text-[0.7rem] lg:mt-[22.5px] md:w-[720.15px] md:h-[72.81px] md:text-[0.9rem]">How may we guide you on a transformative journey, seamlessly blending innovation with excellence? What specific goals or challenges are you looking to address, and how can we tailor our expertise to meet your unique needs?</p>
        </div>
        <div className='flex flex-col justify-center gap-3 mt-[70px] items-center text-center lg:flex-row'>
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