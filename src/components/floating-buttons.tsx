"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Home, User, Briefcase, Code, ImageIcon, Mail, Menu, X } from "lucide-react"

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("home")
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  const navItems = [
    { name: language === "es" ? "Inicio" : "Home", href: "#home", icon: <Home className="h-4 w-4" /> },
    { name: language === "es" ? "Sobre mí" : "About", href: "#about", icon: <User className="h-4 w-4" /> },
    { name: language === "es" ? "Proyectos" : "Projects", href: "#projects", icon: <Briefcase className="h-4 w-4" /> },
    { name: language === "es" ? "Habilidades" : "Skills", href: "#skills", icon: <Code className="h-4 w-4" /> },
    { name: language === "es" ? "Contenido" : "Content", href: "#content", icon: <ImageIcon className="h-4 w-4" /> },
    { name: language === "es" ? "Contacto" : "Contact", href: "#contact", icon: <Mail className="h-4 w-4" /> },
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const navContent = (
    <>
      {/* Mobile Toggle Button */}
      <div 
        style={{ 
          position: "fixed", 
          bottom: "24px", 
          right: "24px", 
          zIndex: 9999 
        }}
        className="md:hidden"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-primary to-purple-600 text-white"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{ 
              position: "fixed", 
              bottom: "88px", 
              right: "24px", 
              zIndex: 9999 
            }}
            className="bg-background/80 backdrop-blur-lg rounded-2xl shadow-lg border p-2"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <Button
                    variant={activeSection === item.href.substring(1) ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "w-full justify-start gap-2",
                      activeSection === item.href.substring(1) && "bg-gradient-to-r from-primary to-purple-600",
                    )}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <div 
        style={{ 
          position: "fixed", 
          top: "50%", 
          right: "24px", 
          transform: "translateY(-50%)", 
          zIndex: 9999 
        }}
        className="hidden md:block"
      >
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="bg-background/80 backdrop-blur-lg rounded-full shadow-lg border p-2"
        >
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("rounded-full relative", activeSection === item.href.substring(1) && "text-primary")}
                    aria-label={item.name}
                  >
                    {item.icon}
                    {activeSection === item.href.substring(1) && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full mr-2 px-2 py-1 rounded bg-background/80 backdrop-blur-sm text-xs font-medium opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap -left-2 invisible group-hover:visible">
                    {item.name}
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )

  // Renderizar usando portal directamente en el html para evitar problemas con stacking contexts
  if (!mounted || typeof window === "undefined") return null
  
  return createPortal(navContent, document.documentElement)
}
