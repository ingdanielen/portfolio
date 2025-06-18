"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Linkedin, Github, Instagram } from "lucide-react"
import emailjs from "@emailjs/browser"
import { contactContent } from "@/constants"
import { Alert } from '@/components/ui/alert'

// Configuración de EmailJS
const EMAILJS_SERVICE_ID = 'service_d3cyncg' // Reemplaza con tu Service ID
const EMAILJS_TEMPLATE_ID = 'template_sgww83i' // Reemplaza con tu Template ID
const EMAILJS_PUBLIC_KEY = 'NDMLroegWmMJC49G-' // Reemplaza con tu Public Key

export function Contact() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const formRef = useRef<HTMLFormElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

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
    setFormState(prev => ({
      ...prev,
      [name]: value,
    }))
    
    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    // Validate all fields
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

    // Verificar que las credenciales estén configuradas
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
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        })

        // Reset success message after 5 seconds
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

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <div className="inline-block mb-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-25"></div>
                <div className="relative bg-background px-6 py-2 rounded-lg border">
                  <h2 className="text-3xl font-bold">{currentContent.title}</h2>
                </div>
              </div>
            </div>
            <p className="text-lg text-muted-foreground">{currentContent.description}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <motion.div
              variants={itemVariants}
              className="lg:col-span-3 bg-background p-8 rounded-xl shadow-lg border relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6"
                  >
                    <Send className="h-10 w-10" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-medium text-center"
                  >
                    {currentContent.form.success}
                  </motion.p>
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
                      <label htmlFor="name" className="text-sm font-medium">
                        {currentContent.form.name}
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`border-muted-foreground/20 focus:border-primary ${fieldErrors.name ? 'border-destructive' : ''}`}
                      />
                      {fieldErrors.name && (
                        <Alert variant="destructive" className="py-2 px-3 text-sm mt-1">
                          {fieldErrors.name}
                        </Alert>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        {currentContent.form.email}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={`border-muted-foreground/20 focus:border-primary ${fieldErrors.email ? 'border-destructive' : ''}`}
                      />
                      {fieldErrors.email && (
                        <Alert variant="destructive" className="py-2 px-3 text-sm mt-1">
                          {fieldErrors.email}
                        </Alert>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      {currentContent.form.subject}
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={`border-muted-foreground/20 focus:border-primary ${fieldErrors.subject ? 'border-destructive' : ''}`}
                    />
                    {fieldErrors.subject && (
                      <Alert variant="destructive" className="py-2 px-3 text-sm mt-1">
                        {fieldErrors.subject}
                      </Alert>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      {currentContent.form.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className={`border-muted-foreground/20 focus:border-primary resize-none ${fieldErrors.message ? 'border-destructive' : ''}`}
                    />
                    {fieldErrors.message && (
                      <Alert variant="destructive" className="py-2 px-3 text-sm mt-1">
                        {fieldErrors.message}
                      </Alert>
                    )}
                  </div>
                  <Button
                    type="submit"
                    className="w-full md:w-auto bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
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
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-background p-8 rounded-xl shadow-lg border relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-8 pb-2 border-b">{currentContent.info.title}</h3>

                <div className="space-y-8">
                  <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-lg text-white group-hover:shadow-lg transition-shadow">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${currentContent.info.email}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {currentContent.info.email}
                      </a>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-lg text-white group-hover:shadow-lg transition-shadow">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{currentContent.info.location}</p>
                    </div>
                  </motion.div>

                  <motion.div whileHover={{ x: 5 }} className="flex items-start gap-4 group">
                    <div className="bg-gradient-to-br from-primary to-purple-600 p-3 rounded-lg text-white group-hover:shadow-lg transition-shadow">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <a
                        href={`tel:${currentContent.info.phone}`}
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {currentContent.info.phone}
                      </a>
                    </div>
                  </motion.div>

                  <div>
                    <p className="text-sm font-medium mb-4">{currentContent.info.social}</p>
                    <div className="flex gap-4">
                      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5"
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
                      </motion.div>

                      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5"
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
                      </motion.div>

                      <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full border-primary/20 hover:border-primary hover:bg-primary/5"
                          asChild
                        >
                          <a
                            href="hhttps://www.instagram.com/daniel.ricardopr/"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                          >
                            <Instagram className="h-5 w-5 text-primary" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
