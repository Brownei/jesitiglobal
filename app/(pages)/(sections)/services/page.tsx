import Hero from "@/components/homePage/Hero"
import profilePic from '@/public/2022-11-09.jpg'
import GotoBanner from "@/components/GotoBanner"
import Testimonials from "@/components/homePage/Testimonials"
import Footer from "@/components/Footer"
import Reasons from "@/components/homePage/Reasons"
import Services from "@/components/homePage/Services"

const ServicesPage = () => {
  return (
    <main className="bg-[#DFF6FF] transition-colors duration-500 text-[#061439]">
      <Hero 
        firstTitle='All your needs in' 
        secondTitle='one platform' 
        imageUsed={profilePic} 
        noButtons={false}
        description='Know more about what we offer and we can help you'
        contactButton
      />
      <Services isHomePage={false}/>
      <Reasons/>
      <div className="bg-[#061439] mt-[80px] py-[100px]">
        <GotoBanner />
        <Testimonials />
        <Footer />
      </div>
    </main>
  )
}

export default ServicesPage