import ParticularPageHeroSection from "@/components/servicePage/ParticularPageHero";
import GotoBanner from "@/components/GotoBanner"
import Testimonials from "@/components/homePage/Testimonials"
import Footer from "@/components/Footer"
import Reasons from "@/components/homePage/Reasons"
import { FC } from "react";

interface ParticularServicePageProps {
    params: {
        servicesTitle: string;
    },
  }

const ParticularServicePage: FC<ParticularServicePageProps> = ({params}) => {

  return (
    <main className="bg-[#DFF6FF] transition-colors duration-500 text-[#061439]">
        <ParticularPageHeroSection params={params} />
        <Reasons/>
      <div className="bg-[#061439] mt-[80px] py-[100px]">
        <GotoBanner />
        <Testimonials />
        <Footer />
      </div>
    </main>
  )
}

export default ParticularServicePage;