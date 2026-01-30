"use client"

import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { Github, Linkedin, Mail, Instagram, ArrowUpRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { footerContent } from "@/constants"

export default function Footer() {
  const { language } = useLanguage()
  const currentContent = footerContent[language as keyof typeof footerContent] || footerContent.es

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com/ingdanielen", 
      label: "GitHub" 
    },
    { 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/daniel-escorcia-b68182269/", 
      label: "LinkedIn" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/daniel.ricardopr/", 
      label: "Instagram" 
    },
    { 
      icon: Mail, 
      href: "mailto:contacto@danielescorcia.dev", 
      label: "Email" 
    },
  ]

  const navLinks = [
    { href: "#home", label: language === "es" ? "Inicio" : "Home" },
    { href: "#about", label: language === "es" ? "Sobre mí" : "About" },
    { href: "#projects", label: language === "es" ? "Proyectos" : "Projects" },
    { href: "#skills", label: language === "es" ? "Habilidades" : "Skills" },
    { href: "#contact", label: language === "es" ? "Contacto" : "Contact" },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-border/50 bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="#home" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-display font-bold text-xl">
                D
              </div>
              <span className="font-display font-bold text-2xl">Daniel Escorcia</span>
            </Link>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              {language === "es" 
                ? "Desarrollador Frontend especializado en crear experiencias digitales modernas, interactivas y de alto impacto." 
                : "Frontend Developer specialized in creating modern, interactive, and high-impact digital experiences."}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border/50 hover:border-primary hover:bg-primary/5 hover:scale-110 transition-all"
                  asChild
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">
              {language === "es" ? "Enlaces rápidos" : "Quick Links"}
            </h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                >
                  {link.label}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact CTA */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">
              {language === "es" ? "¿Tienes un proyecto?" : "Have a project?"}
            </h4>
            <p className="text-muted-foreground text-sm">
              {language === "es" 
                ? "Hablemos sobre cómo puedo ayudarte a construir algo increíble." 
                : "Let's talk about how I can help you build something amazing."}
            </p>
            <Button asChild className="rounded-full">
              <Link href="#contact">
                {language === "es" ? "Contáctame" : "Contact me"}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} Daniel Escorcia. 
            <span className="inline-flex items-center gap-1">
              {language === "es" ? "Hecho con" : "Made with"}
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              {language === "es" ? "y mucho café" : "and lots of coffee"}
            </span>
          </p>
          <p className="text-sm text-muted-foreground font-mono">
            {language === "es" ? "Construido con" : "Built with"} Next.js, TypeScript & GSAP
          </p>
        </div>
      </div>
    </footer>
  )
}
