import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { ContentGallery } from "@/components/content-gallery"
import { Contact } from "@/components/contact"
import Footer from "@/components/footer"
import ParticleBackground from "@/components/particle-background"
import { FloatingNav } from "@/components/floating-buttons"

export default function Home() {
  return (
    <div className="relative">
      <ParticleBackground />
      <FloatingNav />
      <div className=" bg-background">
        <Header />
        <main>
          <Hero useProfileImage={true} />
          <About />
          <Projects />
          <Skills />
          <ContentGallery />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
