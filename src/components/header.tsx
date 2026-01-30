"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Menu, X, Sun, Moon, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { navItems } from "@/constants"
import gsap from "gsap"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const { theme, setTheme } = useTheme()
  const { language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

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

      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initial animation
  useEffect(() => {
    if (mounted) {
      gsap.fromTo(".header-content",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      )
    }
  }, [mounted])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      gsap.fromTo(".mobile-nav-item",
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      )
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 py-3" 
          : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="header-content flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="#home" 
            className="flex items-center gap-3 group"
            onClick={() => setActiveSection("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-display font-bold text-lg group-hover:scale-110 transition-transform duration-300">
              D
            </div>
            <span className="font-display font-bold text-xl hidden sm:block">
              Daniel<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-muted/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/50">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                  activeSection === item.href.substring(1)
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setActiveSection(item.href.substring(1))}
              >
                {activeSection === item.href.substring(1) && (
                  <span className="absolute inset-0 bg-primary rounded-full -z-10" />
                )}
                {language === "es" ? item.name : item.nameEn}
              </Link>
            ))}
          </nav>

          {/* Actions - Box similar al nav */}
          <div className="flex items-center gap-2">
            {/* Desktop: Theme and Language in box */}
            <div className="hidden md:flex items-center gap-1 bg-muted/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/50">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="rounded-full hover:bg-primary/10"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                aria-label="Toggle language"
                className="rounded-full hover:bg-primary/10"
              >
                <span className="text-xs font-mono font-bold">
                  {language === "es" ? "EN" : "ES"}
                </span>
              </Button>
            </div>

            {/* Mobile: Theme, Language and Menu Toggle in box */}
            <div className="flex md:hidden items-center gap-1 bg-muted/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-border/50">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="rounded-full hover:bg-primary/10"
              >
                {mounted && theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "es" ? "en" : "es")}
                aria-label="Toggle language"
                className="rounded-full hover:bg-primary/10"
              >
                <span className="text-xs font-mono font-bold">
                  {language === "es" ? "EN" : "ES"}
                </span>
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "mobile-nav-item px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeSection === item.href.substring(1)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={() => {
                  setActiveSection(item.href.substring(1))
                  setIsOpen(false)
                }}
              >
                {language === "es" ? item.name : item.nameEn}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
