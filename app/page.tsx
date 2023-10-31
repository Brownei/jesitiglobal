import GotoBanner from "@/components/GotoBanner";
import Hero from "@/components/Hero";
import Reasons from "@/components/Reasons";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Banner from '@/components/Banner'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default async function Home() {
  return (
    <main>
      <Banner />
      <Nav />
      <Hero />
      <Services />
      <Reasons/>
      <GotoBanner />
      <Testimonials />
      <Footer />
    </main>
  )
}
