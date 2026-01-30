import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Marquee } from "@/components/marquee"
import { WhatIBuild } from "@/components/what-i-build"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Skills } from "@/components/skills"
import { ContentGallery } from "@/components/content-gallery"
import { Contact } from "@/components/contact"
import Footer from "@/components/footer"
import { FloatingNav } from "@/components/floating-buttons"
import { SmoothScroll } from "@/components/smooth-scroll"
import ParticleBackground from "@/components/particle-background"
import { NoiseOverlay } from "@/components/noise-overlay"

// Nota: El SEO metadata está configurado en layout.tsx
// En Next.js App Router, el metadata del layout.tsx se aplica a todas las páginas
// Para metadata específica de esta página, se puede usar generateMetadata() si es necesario

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative">
        {/* Animated Background */}
        <ParticleBackground />
        
        {/* Noise Overlay - Brutalist texture */}
        <NoiseOverlay intensity={0.4} opacity={0.12} />
        
        <FloatingNav />
        <div className="relative z-[3]" style={{ backgroundColor: "hsl(var(--background) / 0.15)", position: "relative" }}>
          <Header />
          <main>
            <Hero useProfileImage={true} />
          </main>
        </div>
        {/* Marquee con sticky slide-over - se desliza sobre el hero */}
        <Marquee />
        {/* Resto de secciones - Todas con fondo reactivo visible */}
        <div className="relative z-[3]" style={{ backgroundColor: "hsl(var(--background) / 0.15)", position: "relative" }}>
          <main>
            <WhatIBuild />
            <About />
            <Projects />
            <Skills />
            <ContentGallery />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  )
}
