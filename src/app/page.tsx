import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { ContentGallery } from "@/components/content-gallery"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { FloatingNav } from "@/components/floating-nav"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FloatingNav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <ContentGallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
