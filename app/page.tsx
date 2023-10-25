import GotoBanner from "@/components/GotoBanner";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default async function Home() {
  return (
    <main className="h-[1000dvh]">
      <Hero mainTitle="All in one" supportTitle="Solution Hub" description="A specialist who can grow your business, companies and enterprises" CAC={true}/>
      <Services />
      <Testimonials />
      <GotoBanner />
    </main>
  )
}
