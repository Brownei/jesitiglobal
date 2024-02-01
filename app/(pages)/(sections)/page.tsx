import GotoBanner from "@/components/GotoBanner";
import Hero from "@/components/homePage/Hero";
import Reasons from "@/components/homePage/Reasons";
import Services from "@/components/homePage/Services";
import Testimonials from "@/components/homePage/Testimonials";
import Footer from '@/components/Footer'
import profilePic from '@/public/2022-11-09.jpg'


export default async function Home() {
  return (
    <main className='bg-[#DFF6FF] transition-colors duration-500 text-[#061439]'>
        <Hero 
            firstTitle='All in one' 
            secondTitle='Solution Hub' 
            imageUsed={profilePic} 
            noButtons
            description='Transform your business with expertise that goes beyond expectations. Experience strategic guidance, innovative solutions, and a commitment to your success. Elevate your business to new heights today.'
            contactButton={false}
        />
        <Services isHomePage/>
        <Reasons/>
        <div className="bg-[#061439] mt-[80px] py-[100px]">
            <GotoBanner />
            <Testimonials />
            <Footer />
        </div>
    </main>
  )
}
