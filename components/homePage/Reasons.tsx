"use client"
import ReasonsCard from "../ReasonsCard"

const Reasons = () => {
  const reasons = [
    {
      name: "One Stop Solution",
      description: "Offering a wide range of services under one roof saves your company, business or enterprise time and effort. They can get all their design, development, registration and printing needs met without dealing with multiple vendors, ensuring consistency in branding and communication."
    },
    {
      name: "Expertise and Quality",
      description: "Demonstrating a high level of expertise and delivering quality work is essential. Showcasing a portfolio of impressive designs, successful websites and satisfied clients build trust. High quality work often leads to positive word of mouth referrals, which can attract more clients."
    },
    {
      name: "Excellent Customer Service",
      description: "Exceptional customer service, including clear communication, responsiveness and willingness to accommodate changes, can set you apart. A positive client experience encourages repeat business and referrals."
    },
    {
      name: "Print Quality and Options",
      description: "For printing services, offering a variety of high quality printing materials and finishes, along with options for customization, allows companies to create marketing materials that truly stand out. High-resolution prints and attention to detail make a significant difference."
    },
    {
      name: "Innovation and Technology",
      description: "Staying updated with the latest design trends, web technologies and printing techniques showcases your commitment to innovation. Being able to offer cutting edge solutions can attract forward-thinking companies seeking modern and visually appealing designs."
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
              <ReasonsCard reason={reason.name} id={index} description={reason.description}/>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Reasons