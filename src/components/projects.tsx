"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function Projects() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const content = {
    es: {
      title: "Proyectos destacados",
      description: "Una selección de mis trabajos más recientes en desarrollo frontend y producción de contenido.",
      professionalTitle: "Proyectos Profesionales",
      personalTitle: "Proyectos Personales",
      projects: {
        professional: [
          {
            title: "Juegos Intercolegiados 2025",
            description:
              "Plataforma web para la inscripción y gestión de los Juegos Intercolegiados Nacionales 2025. Desarrollada con Next.js, TypeScript y Tailwind CSS.",
            image: "/projects/jin-img.png",
            tags: ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
            liveUrl: "https://www.juegosintercolegiados.com.co/",
            githubUrl: "https://www.juegosintercolegiados.com.co/",
          },
          {
            title: "Allegretto - Escuela de Música",
            description:
              "Estrategia de contenido digital y desarrollo web para escuela de música. Incluye landing page, blog y sistema de gestión de contenidos.",
            image: "/projects/allegretto-img.png",
            tags: ["WordPress", "CSS", "Adobe CC", "Estrategia Digital"],
            liveUrl: "https://www.allegrettosalmo150.com/",
            githubUrl: "https://www.allegrettosalmo150.com/",
          },
        ],
        personal: [
          {
            title: "Zentro - Bazar Online",
            description:
              "Rediseño y desarrollo de e-commerce para bazar de productos artesanales. Incluye catálogo, carrito de compras y pasarela de pagos.",
            image: "/projects/zentro-img.png",
            tags: ["Next.js", "Tailwind CSS", "Stripe", "Supabase"],
            liveUrl: "https://zentro-woad.vercel.app/",
            githubUrl: "https://github.com/ingdanielen/frontend-zentro.git",
            backendUrl: "https://github.com/ingdanielen/backend-zentro.git",
          },
          {
            title: "Poder Ciudadano",
            description:
              "Aplicación cívica para empoderar a la ciudadanía mediante consulta de información y asesoría. Promueve la transparencia y la participación activa en la gestión pública.",
            image: "/projects/pc-img.png",
            tags: ["React Native", "Firebase", "Google Maps API", "Node.js"],
            liveUrl: "#",
            githubUrl: "#",
          },
        ],
      },
    },
    en: {
      title: "Featured Projects",
      description: "A selection of my most recent work in frontend development and content production.",
      professionalTitle: "Professional Projects",
      personalTitle: "Personal Projects",
      projects: {
        professional: [
          {
            title: "National School Games 2025",
            description:
              "Web platform for registration and management of the 2025 National School Games. Developed with Next.js, TypeScript and Tailwind CSS.",
            image: "/placeholder.svg?height=400&width=600",
            tags: ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
            liveUrl: "#",
            githubUrl: "#",
          },
          {
            title: "Alegretto - Educational Marketing",
            description:
              "Digital content strategy and web development for educational institution. Includes landing page, blog and content management system.",
            image: "/placeholder.svg?height=400&width=600",
            tags: ["WordPress", "CSS", "Adobe CC", "Digital Strategy"],
            liveUrl: "https://www.allegrettosalmo150.com/",
            githubUrl: "https://www.allegrettosalmo150.com/",
          },
        ],
        personal: [
          {
            title: "Zentro - Online Bazaar",
            description:
              "Redesign and development of e-commerce for artisanal products bazaar. Includes catalog, shopping cart and payment gateway.",
            image: "/projects/zentro-img.png",
            tags: ["Next.js", "Tailwind CSS", "Stripe", "Supabase"],
            liveUrl: "#",
            githubUrl: "#",
            backendUrl: "#",
          },
          {
            title: "Citizen Power",
            description:
              "Civic application to empower citizens through information queries and advice. Promotes transparency and active participation in public management.",
            image: "/projects/pc-img.png",
            tags: ["React Native", "Firebase", "Google Maps API", "Node.js"],
            liveUrl: "#",
            githubUrl: "#",
          },
        ],
      },
    },
  }

  const currentContent = content[language as keyof typeof content]

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

  return (
    <section id="projects" className="py-20">
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

          {/* Professional Projects */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-semibold mb-8">{currentContent.professionalTitle}</h3>
          </motion.div>
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {currentContent.projects.professional.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-background rounded-xl border h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>
                  <CardFooter className="flex gap-4 mt-auto">
                    <Button asChild variant="default" size="sm">
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Código
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Personal Projects */}
          <motion.div variants={itemVariants} className="text-center">
            <h3 className="text-2xl font-semibold mb-8">{currentContent.personalTitle}</h3>
          </motion.div>
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.projects.personal.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-background rounded-xl border h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>
                  <CardFooter className="flex gap-4 mt-auto">
                    <Button asChild variant="default" size="sm">
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Frontend
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.backendUrl ?? ""} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Backend
                      </Link>
                    </Button>
                  </CardFooter>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
