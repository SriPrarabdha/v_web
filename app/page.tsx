import { ContactSection } from "@/components/contact-section"
import { HamperSection } from "@/components/hamper-section"
import { HeroSection } from "@/components/hero-section"
import { HowItWorks } from "@/components/how-it-works"
import { MusicServices } from "@/components/music-services"
import { PromoBanner } from "@/components/promo-banner"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen max-w-screen w-100 contain flex-col ">
      <PromoBanner />
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <HamperSection />
        <MusicServices />
        <HowItWorks />
        <ContactSection />
      </main>
    </div>
  )
}

// how its work link
// set toggle in right
//contain page
//link plans link
//video section 9:16
