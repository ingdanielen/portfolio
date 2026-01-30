"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionTitle } from "@/components/section-title"
import { Alert } from '@/components/ui/alert'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactContent } from "@/constants"
import emailjs from "@emailjs/browser"
import { useRef, useState, useEffect } from "react"
import { Github, Instagram, Linkedin, Mail, MapPin, Phone, Send, ArrowUpRight } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useMagnetic, useGlassmorphism, useMultiLayerParallax } from "@/lib/advanced-effects"
import { GlassmorphismWrapper } from "@/components/glassmorphism-wrapper"

gsap.registerPlugin(ScrollTrigger)

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_d3cyncg'
const EMAILJS_TEMPLATE_ID = 'template_sgww83i'
const EMAILJS_PUBLIC_KEY = 'NDMLroegWmMJC49G-'

export function Contact() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const formContainerRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const currentContent = contactContent[language as keyof typeof contactContent]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form container animation
      if (formContainerRef.current) {
        gsap.fromTo(formContainerRef.current,
          { x: -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: formContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

      // Info animation
      if (infoRef.current) {
        gsap.fromTo(infoRef.current,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: infoRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const validateField = (name: string, value: string) => {
    if (!value.trim()) {
      return currentContent.form.errors.required
    }
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return currentContent.form.errors.email
    }
    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    const errors: Record<string, string> = {}
    let hasErrors = false

    Object.entries(formState).forEach(([name, value]) => {
      const error = validateField(name, value)
      if (error) {
        errors[name] = error
        hasErrors = true
      }
    })

    if (hasErrors) {
      setFieldErrors(errors)
      return
    }

    setIsSubmitting(true)

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      setError(language === 'es' 
        ? 'Error de configuración: Por favor, configura las credenciales de EmailJS.' 
        : 'Configuration error: Please set up EmailJS credentials.')
      setIsSubmitting(false)
      return
    }

    try {
      const templateParams = {
        name: formState.name,
        email: formState.email,
        subject: formState.subject,
        message: formState.message,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      }

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      if (result.status === 200) {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormState({ name: "", email: "", subject: "", message: "" })

        setTimeout(() => {
          setIsSubmitted(false)
        }, 5000)
      } else {
        throw new Error('Error en el envío del correo')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setError(language === 'es' 
        ? 'Error al enviar el mensaje. Por favor, intenta de nuevo.' 
        : 'Error sending message. Please try again.')
      setIsSubmitting(false)
    }
  }

  // Multi-layer Parallax
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const midgroundLayerRef = useRef<HTMLDivElement>(null);
  const foregroundLayerRef = useRef<HTMLDivElement>(null);
  
  useMultiLayerParallax(
    [
      { ref: backgroundLayerRef, speed: 0.25 },
      { ref: midgroundLayerRef, speed: 0.45 },
      { ref: foregroundLayerRef, speed: 0.65 }
    ],
    sectionRef
  );

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Multi-layer Parallax Background */}
      <div ref={backgroundLayerRef} className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      </div>
      <div ref={midgroundLayerRef} className="absolute inset-0 -z-5">
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />
      </div>
      <div ref={foregroundLayerRef} className="absolute inset-0 -z-1">
        <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[180px] h-[180px] bg-purple-500/3 rounded-full blur-[110px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Title */}
        <SectionTitle 
          title={currentContent.title}
          subtitle={currentContent.description}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div
            ref={formContainerRef}
            className="lg:col-span-3 relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur-lg opacity-20" />
            
            <div className="relative bg-black/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white mb-6 animate-scale-in">
                    <Send className="h-10 w-10" />
                  </div>
                  <p className="text-xl font-display font-semibold text-center text-white">
                    {currentContent.form.success}
                  </p>
                </div>
              ) : (
                <form 
                  ref={formRef} 
                  onSubmit={handleSubmit} 
                  className="space-y-6 relative z-10"
                  noValidate
                >
                  {error && (
                    <Alert variant="destructive">{error}</Alert>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/80">
                        {currentContent.form.name}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`bg-white/5 border-white/10 focus:border-primary rounded-xl h-12 text-white placeholder:text-white/30 ${fieldErrors.name ? 'border-destructive' : ''}`}
                      />
                      {fieldErrors.name && (
                        <p className="text-sm text-destructive">{fieldErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/80">
                        {currentContent.form.email}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={`bg-white/5 border-white/10 focus:border-primary rounded-xl h-12 text-white placeholder:text-white/30 ${fieldErrors.email ? 'border-destructive' : ''}`}
                      />
                      {fieldErrors.email && (
                        <p className="text-sm text-destructive">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white/80">
                      {currentContent.form.subject}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={`bg-white/5 border-white/10 focus:border-primary rounded-xl h-12 text-white placeholder:text-white/30 ${fieldErrors.subject ? 'border-destructive' : ''}`}
                    />
                    {fieldErrors.subject && (
                      <p className="text-sm text-destructive">{fieldErrors.subject}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/80">
                      {currentContent.form.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className={`bg-white/5 border-white/10 focus:border-primary resize-none rounded-xl text-white placeholder:text-white/30 ${fieldErrors.message ? 'border-destructive' : ''}`}
                    />
                    {fieldErrors.message && (
                      <p className="text-sm text-destructive">{fieldErrors.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    className="w-full md:w-auto rounded-full px-10 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-opacity font-display font-semibold"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        {currentContent.form.sending}
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        {currentContent.form.send}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info */}
          <div
            ref={infoRef}
            className="lg:col-span-2 relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-primary rounded-2xl blur-lg opacity-20" />
            
            <div className="relative bg-black/80 backdrop-blur-sm p-8 md:p-10 rounded-2xl border border-white/10 h-full">
              <h3 className="text-xl font-display font-bold mb-8 text-white">{currentContent.info.title}</h3>

              <div className="space-y-6">
                <a 
                  href={`mailto:${currentContent.info.email}`}
                  className="flex items-start gap-4 group p-4 -mx-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/50">Email</p>
                    <p className="font-medium text-white group-hover:text-primary transition-colors">
                      {currentContent.info.email}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="flex items-start gap-4 p-4 -mx-4">
                  <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-xl text-white">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/50">Location</p>
                    <p className="font-medium text-white">{currentContent.info.location}</p>
                  </div>
                </div>

                <a 
                  href={`tel:${currentContent.info.phone}`}
                  className="flex items-start gap-4 group p-4 -mx-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white/50">Phone</p>
                    <p className="font-medium text-white group-hover:text-primary transition-colors">
                      {currentContent.info.phone}
                    </p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-white/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-sm font-medium mb-4 text-white/70">{currentContent.info.social}</p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/10 bg-white/5 hover:border-primary hover:bg-primary/10 hover:scale-110 transition-all"
                      asChild
                    >
                      <a
                        href="https://www.linkedin.com/in/daniel-escorcia-b68182269/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5 text-primary" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/10 bg-white/5 hover:border-primary hover:bg-primary/10 hover:scale-110 transition-all"
                      asChild
                    >
                      <a
                        href="https://github.com/ingdanielen"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5 text-primary" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-white/10 bg-white/5 hover:border-primary hover:bg-primary/10 hover:scale-110 transition-all"
                      asChild
                    >
                      <a
                        href="https://www.instagram.com/daniel.ricardopr/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5 text-primary" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
