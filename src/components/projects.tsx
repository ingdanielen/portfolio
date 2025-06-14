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
import { SectionTitle } from "@/components/section-title"

export function Projects() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const content = {
    es: {
      title: "Proyectos destacados",
      description: "Una selección de mis trabajos más recientes en desarrollo frontend y producción de contenido.",
      projects: [
        {
          title: "Juegos Intercolegiados 2025",
          description:
            "Plataforma web para la inscripción y gestión de los Juegos Intercolegiados Nacionales 2025. Desarrollada con Next.js, TypeScript y Tailwind CSS.",
          image: "/placeholder.svg?height=400&width=600",
          tags: ["Next.js", "TypeScript", "Tailwind CSS", "Redux"],
          liveUrl: "#",
          githubUrl: "#",
        },
        {
          title: "Enterritorio - Web de Subsidios",
          description:
            "Interfaz de usuario para la gestión de subsidios estatales. Colaboración institucional con enfoque en accesibilidad y experiencia de usuario.",
          image: "/placeholder.svg?height=400&width=600",
          tags: ["React", "TypeScript", "Styled Components", "Figma"],
          liveUrl: "#",
          githubUrl: "#",
        },
        {
          title: "Zentro - Bazar Online",
          description:
            "Rediseño y desarrollo de e-commerce para bazar de productos artesanales. Incluye catálogo, carrito de compras y pasarela de pagos.",
          image: "/placeholder.svg?height=400&width=600",
          tags: ["Next.js", "Tailwind CSS", "Stripe", "Supabase"],
          liveUrl: "#",
          githubUrl: "#",
        },
        {
          title: "Alegretto - Marketing Educativo",
          description:
            "Estrategia de contenido digital y desarrollo web para institución educativa. Incluye landing page, blog y sistema de gestión de contenidos.",
          image: "/placeholder.svg?height=400&width=600",
          tags: ["WordPress", "CSS", "Adobe CC", "Estrategia Digital"],
          liveUrl: "#",
          githubUrl: "#",
        },
      ],
    },
    en: {
      title: "Featured Projects",
      description: "A selection of my most recent work in frontend development and content production.",
      projects: [
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
          title: "Enterritorio - Subsidies Platform",
          description:
            "User interface for state subsidies management. Institutional collaboration with focus on accessibility and user experience.",
          image: "/placeholder.svg?height=400&width=600",
          tags: ["React", "TypeScript", "Styled Components", "Figma"],
          liveUrl: "#",
          githubUrl: "#",
        },
        {
          title: "Zentro - Online Bazaar",
          description:
            "Redesign and development of e-commerce for artisanal products bazaar. Includes catalog, shopping cart and payment gateway.",
          image: "/placeholder.svg?height=400&width=600",
          tags: ["Next.js", "Tailwind CSS", "Stripe", "Supabase"],
          liveUrl: "#",
          githubUrl: "#",
        },
        {
          title: "Alegretto - Educational Marketing",
          description:
            "Digital content strategy and web development for educational institution. Includes landing page, blog and content management system.",
          image: "/placeholder.svg?height=400&width=600",
          tags: ["WordPress", "CSS", "Adobe CC", "Digital Strategy"],
          liveUrl: "#",
          githubUrl: "#",
        },
      ],
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
          <SectionTitle title={currentContent.title} description={currentContent.description} />

          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentContent.projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
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
                  <CardContent className="flex flex-wrap gap-2 overflow-hidden">
                    {project.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="mb-1">
                        {tag}
                      </Badge>
                    ))}
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 mt-auto">
                    <Button asChild variant="default" size="sm" className="w-full sm:w-auto">
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="w-full sm:w-auto">
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="mr-2 h-4 w-4" />
                        Código
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
