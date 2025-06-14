"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Palette, Video, Lightbulb } from "lucide-react"
import { SectionTitle } from "@/components/section-title"

export function About() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const content = {
    es: {
      title: "Sobre mí",
      description:
        "Soy Daniel Escorcia, desarrollador frontend junior con experiencia en proyectos reales, tanto institucionales como personales. Combino mis habilidades técnicas con una fuerte orientación hacia la producción de contenido y la creación de experiencias visuales impactantes.",
      passion: "Me apasiona construir interfaces funcionales, claras y modernas que conecten con el usuario.",
      areas: [
        {
          icon: <Code className="h-6 w-6" />,
          title: "Desarrollo Frontend",
          description:
            "Especializado en React, Next.js, TypeScript y Tailwind CSS para crear interfaces modernas y responsivas.",
        },
        {
          icon: <Palette className="h-6 w-6" />,
          title: "Diseño Visual",
          description:
            "Experiencia en Figma, Atomic Design y adaptación de paletas para crear experiencias visuales coherentes.",
        },
        {
          icon: <Video className="h-6 w-6" />,
          title: "Producción de Contenido",
          description:
            "Dominio de Adobe Creative Cloud para edición de video, audio y creación de contenido para redes sociales.",
        },
        {
          icon: <Lightbulb className="h-6 w-6" />,
          title: "Estrategia Digital",
          description:
            "Gestión de campañas, comunicación visual y organización de contenido para instituciones y empresas.",
        },
      ],
    },
    en: {
      title: "About me",
      description:
        "I'm Daniel Escorcia, a junior frontend developer with experience in real projects, both institutional and personal. I combine my technical skills with a strong orientation towards content production and the creation of impactful visual experiences.",
      passion: "I'm passionate about building functional, clear, and modern interfaces that connect with the user.",
      areas: [
        {
          icon: <Code className="h-6 w-6" />,
          title: "Frontend Development",
          description:
            "Specialized in React, Next.js, TypeScript and Tailwind CSS to create modern and responsive interfaces.",
        },
        {
          icon: <Palette className="h-6 w-6" />,
          title: "Visual Design",
          description:
            "Experience in Figma, Atomic Design and palette adaptation to create coherent visual experiences.",
        },
        {
          icon: <Video className="h-6 w-6" />,
          title: "Content Production",
          description: "Mastery of Adobe Creative Cloud for video editing, audio and social media content creation.",
        },
        {
          icon: <Lightbulb className="h-6 w-6" />,
          title: "Digital Strategy",
          description:
            "Campaign management, visual communication and content organization for institutions and companies.",
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
    <section id="about" className="py-20 bg-muted/30">
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
            {currentContent.areas.map((area, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-background p-4 sm:p-6 rounded-xl shadow-sm border flex flex-col sm:flex-row gap-4"
              >
                <div className="bg-primary/10 p-3 rounded-lg text-primary h-fit mx-auto sm:mx-0">{area.icon}</div>
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold mb-2">{area.title}</h3>
                  <p className="text-muted-foreground">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
