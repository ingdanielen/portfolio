"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Code, Palette, Video, Lightbulb, ChevronRight } from "lucide-react"
import Image from "next/image"

export function About() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)

  const content = {
    es: {
      title: "Sobre mí",
      subtitle: "Desarrollador Frontend + Creador de Contenido",
      description:
        "Soy Daniel Escorcia, desarrollador frontend junior con experiencia en proyectos reales, tanto institucionales como personales. Combino mis habilidades técnicas con una fuerte orientación hacia la producción de contenido y la creación de experiencias visuales impactantes.",
      passion: "Me apasiona construir interfaces funcionales, claras y modernas que conecten con el usuario.",
      journey: "Mi trayectoria",
      journeyDescription: "Un vistazo a mi camino profesional y formación académica.",
      readMore: "Leer más",
      tabs: [
        {
          title: "Desarrollo Frontend",
          icon: <Code className="h-6 w-6" />,
          description:
            "Especializado en React, Next.js, TypeScript y Tailwind CSS para crear interfaces modernas y responsivas. Mi enfoque se centra en código limpio, componentes reutilizables y experiencias de usuario fluidas.",
          points: [
            "Desarrollo de aplicaciones web con React y Next.js",
            "Implementación de interfaces responsivas con Tailwind CSS",
            "Tipado estático con TypeScript para código más robusto",
            "Optimización de rendimiento y SEO",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Diseño Visual",
          icon: <Palette className="h-6 w-6" />,
          description:
            "Experiencia en Figma, Atomic Design y adaptación de paletas para crear experiencias visuales coherentes. Trabajo en estrecha colaboración con diseñadores para transformar conceptos en interfaces funcionales.",
          points: [
            "Prototipado y diseño de interfaces en Figma",
            "Implementación de sistemas de diseño basados en componentes",
            "Creación de identidades visuales coherentes",
            "Animaciones y transiciones para mejorar la experiencia",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Producción de Contenido",
          icon: <Video className="h-6 w-6" />,
          description:
            "Dominio de Adobe Creative Cloud para edición de video, audio y creación de contenido para redes sociales. Capacidad para contar historias visualmente atractivas que conectan con la audiencia.",
          points: [
            "Edición de video con Adobe Premiere y After Effects",
            "Diseño gráfico con Photoshop e Illustrator",
            "Creación de contenido para redes sociales",
            "Narrativa visual y storytelling",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Estrategia Digital",
          icon: <Lightbulb className="h-6 w-6" />,
          description:
            "Gestión de campañas, comunicación visual y organización de contenido para instituciones y empresas. Enfoque estratégico para alcanzar objetivos de negocio a través de soluciones digitales.",
          points: [
            "Planificación y ejecución de campañas digitales",
            "Análisis de métricas y optimización de resultados",
            "Gestión de contenido para diferentes plataformas",
            "Estrategias de comunicación visual efectiva",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
      ],
      experience: [
        {
          year: "2023-2024",
          title: "Web Developer & Content Producer",
          company: "Kymbo Devs SAS",
          description:
            "Desarrollo de e-commerce, landing pages y sitios corporativos usando WordPress y tecnologías low-code.",
        },
        {
          year: "2025",
          title: "Front-End Developer",
          company: "Naowee SAS",
          description: "Desarrollo de plataformas web escalables usando Next.js, TypeScript, Redux y Tailwind CSS.",
        },
        

      ],
      education: [
        {
          year: "2017-2018",
          title: "Técnico en Ejecución de Instrumentos Musicales",
          institution: "EDA",
        },
        {
          year: "2018-2019",
          title: "Técnico en Sistemas y Redes Computarizadas",
          institution: "SENA",
        },
        {
          year: "2020-Actualidad",
          title: "Ingeniería de Sistemas",
          institution: "Universidad de la Costa",
        },

      ],
    },
    en: {
      title: "About me",
      subtitle: "Frontend Developer + Content Creator",
      description:
        "I'm Daniel Escorcia, a junior frontend developer with experience in real projects, both institutional and personal. I combine my technical skills with a strong orientation towards content production and the creation of impactful visual experiences.",
      passion: "I'm passionate about building functional, clear, and modern interfaces that connect with the user.",
      journey: "My journey",
      journeyDescription: "A glimpse into my professional path and academic background.",
      readMore: "Read more",
      tabs: [
        {
          title: "Frontend Development",
          icon: <Code className="h-6 w-6" />,
          description:
            "Specialized in React, Next.js, TypeScript and Tailwind CSS to create modern and responsive interfaces. My approach focuses on clean code, reusable components and fluid user experiences.",
          points: [
            "Web application development with React and Next.js",
            "Responsive interface implementation with Tailwind CSS",
            "Static typing with TypeScript for more robust code",
            "Performance and SEO optimization",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Visual Design",
          icon: <Palette className="h-6 w-6" />,
          description:
            "Experience in Figma, Atomic Design and palette adaptation to create coherent visual experiences. I work closely with designers to transform concepts into functional interfaces.",
          points: [
            "Interface prototyping and design in Figma",
            "Implementation of component-based design systems",
            "Creation of coherent visual identities",
            "Animations and transitions to enhance the experience",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Content Production",
          icon: <Video className="h-6 w-6" />,
          description:
            "Mastery of Adobe Creative Cloud for video editing, audio and social media content creation. Ability to tell visually appealing stories that connect with the audience.",
          points: [
            "Video editing with Adobe Premiere and After Effects",
            "Graphic design with Photoshop and Illustrator",
            "Content creation for social media",
            "Visual narrative and storytelling",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
        {
          title: "Digital Strategy",
          icon: <Lightbulb className="h-6 w-6" />,
          description:
            "Campaign management, visual communication and content organization for institutions and companies. Strategic approach to achieve business objectives through digital solutions.",
          points: [
            "Planning and execution of digital campaigns",
            "Metrics analysis and results optimization",
            "Content management for different platforms",
            "Effective visual communication strategies",
          ],
          image: "/placeholder.svg?height=400&width=600",
        },
      ],
      experience: [
        {
          year: "2025",
          title: "Front-End Developer",
          company: "Naowee SAS",
          description: "Development of scalable web platforms using Next.js, TypeScript, Redux and Tailwind CSS.",
        },
        {
          year: "2023-2024",
          title: "Web Developer & Content Producer",
          company: "Kymbo Devs SAS",
          description:
            "Development of e-commerce, landing pages and corporate sites using WordPress and low-code technologies.",
        },
      ],
      education: [
        {
          year: "2017-2018",
          title: "Technical in the Execution of Musical Instruments",
          institution: "EDA",
        },
        {
          year: "2020-Present",
          title: "Systems Engineering",
          institution: "Universidad de la Costa",
        },
        {
          year: "2018-2019",
          title: "Systems and Computer Networks Technician",
          institution: "SENA",
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
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full opacity-20" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-16"
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
            <h3 className="text-xl text-primary mb-4">{currentContent.subtitle}</h3>
            <p className="text-lg text-muted-foreground mb-4">{currentContent.description}</p>
            <p className="text-lg font-medium">{currentContent.passion}</p>
          </motion.div>

          <motion.div variants={containerVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <div className="sticky top-24">
                <h3 className="text-2xl font-semibold mb-6 border-b pb-2">{currentContent.tabs[0].title}</h3>
                <div className="space-y-2">
                  {currentContent.tabs.map((tab, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`w-full text-left p-4 rounded-lg flex items-center gap-3 transition-all ${
                        activeTab === index ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-muted/50"
                      }`}
                      whileHover={{ x: activeTab === index ? 0 : 5 }}
                    >
                      <div
                        className={`p-2 rounded-md ${
                          activeTab === index ? "bg-white/20" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {tab.icon}
                      </div>
                      <span className="font-medium">{tab.title}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-background rounded-xl shadow-lg border overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <Image
                  src={currentContent.tabs[activeTab].image || "/placeholder.svg"}
                  alt={currentContent.tabs[activeTab].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{currentContent.tabs[activeTab].title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-lg mb-6">{currentContent.tabs[activeTab].description}</p>
                <ul className="space-y-3">
                  {currentContent.tabs[activeTab].points.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={containerVariants} className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-briefcase"
                    >
                      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Experiencia</h3>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
                  {currentContent.experience.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative flex items-start group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="absolute left-0 md:left-1/2 ml-5 md:-ml-3.5 mt-7 h-7 w-7 rounded-full border-2 border-primary bg-background group-hover:border-primary/70 group-hover:bg-primary/10 transition-colors duration-300"></div>
                      <div className="pl-12 md:pl-0 md:pr-10 md:max-w-[50%] md:ml-auto group-odd:md:ml-0 group-odd:md:mr-auto group-odd:md:pl-10 group-odd:md:pr-0">
                        <div className="p-4 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap justify-between items-center mb-1">
                            <span className="font-medium text-primary">{item.year}</span>
                            <span className="text-sm text-muted-foreground">{item.company}</span>
                          </div>
                          <div className="text-lg font-semibold mb-1">{item.title}</div>
                          <div className="text-muted-foreground">{item.description}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-graduation-cap"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold">Educación</h3>
                </div>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-primary/30 before:to-transparent">
                  {currentContent.education.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative flex items-start group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <div className="absolute left-0 md:left-1/2 ml-5 md:-ml-3.5 mt-7 h-7 w-7 rounded-full border-2 border-primary bg-background group-hover:border-primary/70 group-hover:bg-primary/10 transition-colors duration-300"></div>
                      <div className="pl-12 md:pl-0 md:pr-10 md:max-w-[50%] md:ml-auto group-odd:md:ml-0 group-odd:md:mr-auto group-odd:md:pl-10 group-odd:md:pr-0">
                        <div className="p-4 bg-background rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                          <div className="flex flex-wrap justify-between items-center mb-1">
                            <span className="font-medium text-primary">{item.year}</span>
                            <span className="text-sm text-muted-foreground">{item.institution}</span>
                          </div>
                          <div className="text-lg font-semibold">{item.title}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
