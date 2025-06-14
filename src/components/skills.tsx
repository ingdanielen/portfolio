"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Skills() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const content = {
    es: {
      title: "Habilidades técnicas",
      description: "Mi stack tecnológico y herramientas que utilizo para crear experiencias digitales excepcionales.",
      categories: [
        {
          name: "Desarrollo Frontend",
          key: "frontend",
          description: "Tecnologías que uso para construir interfaces modernas y responsivas.",
        },
        {
          name: "Diseño y Multimedia",
          key: "design",
          description: "Herramientas para crear experiencias visuales impactantes.",
        },
        {
          name: "Herramientas y Metodologías",
          key: "tools",
          description: "Recursos que utilizo para optimizar mi flujo de trabajo.",
        },
      ],
      skills: {
        frontend: [
          {
            name: "JavaScript",
            icon: "/icons/javascript.svg",
            level: "Avanzado",
            color: "#F7DF1E",
            description: "ES6+, Promesas, Async/Await, DOM",
          },
          {
            name: "TypeScript",
            icon: "/icons/typescript.svg",
            level: "Intermedio-Avanzado",
            color: "#3178C6",
            description: "Tipos, Interfaces, Genéricos",
          },
          {
            name: "React",
            icon: "/icons/react.svg",
            level: "Avanzado",
            color: "#61DAFB",
            description: "Hooks, Context, Suspense",
          },
          {
            name: "Next.js",
            icon: "/icons/nextjs.svg",
            level: "Intermedio-Avanzado",
            color: "#000000",
            description: "App Router, Server Components, API Routes",
          },
          {
            name: "HTML5",
            icon: "/icons/html5.svg",
            level: "Avanzado",
            color: "#E34F26",
            description: "Semántica, Accesibilidad, SEO",
          },
          {
            name: "CSS3",
            icon: "/icons/css3.svg",
            level: "Avanzado",
            color: "#1572B6",
            description: "Flexbox, Grid, Animaciones",
          },
          {
            name: "Tailwind CSS",
            icon: "/icons/tailwindcss.svg",
            level: "Avanzado",
            color: "#06B6D4",
            description: "Configuración, Plugins, JIT",
          },
          {
            name: "Redux",
            icon: "/icons/redux.svg",
            level: "Intermedio",
            color: "#764ABC",
            description: "Redux Toolkit, Thunks",
          },
        ],
        design: [
          {
            name: "Figma",
            icon: "/icons/figma.svg",
            level: "Intermedio-Avanzado",
            color: "#F24E1E",
            description: "Prototipos, Componentes, Auto Layout",
          },
          {
            name: "Adobe Photoshop",
            icon: "/icons/photoshop.svg",
            level: "Avanzado",
            color: "#31A8FF",
            description: "Edición, Composición, Retoque",
          },
          {
            name: "Adobe Premiere",
            icon: "/icons/premiere.svg",
            level: "Intermedio-Avanzado",
            color: "#9999FF",
            description: "Edición, Color, Audio",
          },
          {
            name: "Adobe After Effects",
            icon: "/icons/aftereffects.svg",
            level: "Intermedio",
            color: "#9999FF",
            description: "Animación, Composición, VFX",
          },
          {
            name: "Canva",
            icon: "/icons/canva.svg",
            level: "Avanzado",
            color: "#00C4CC",
            description: "Diseño rápido, Plantillas, Colaboración",
          },
          {
            name: "UI/UX Design",
            icon: "/icons/ux.svg",
            level: "Intermedio-Avanzado",
            color: "#FF5722",
            description: "Wireframes, Usabilidad, Investigación",
          },
        ],
        tools: [
          {
            name: "Git & GitHub",
            icon: "/icons/github.svg",
            level: "Avanzado",
            color: "#181717",
            description: "Branching, PR, CI/CD",
          },
          {
            name: "VS Code",
            icon: "/icons/vscode.svg",
            level: "Avanzado",
            color: "#007ACC",
            description: "Extensiones, Snippets, Depuración",
          },
          {
            name: "WordPress",
            icon: "/icons/wordpress.svg",
            level: "Intermedio-Avanzado",
            color: "#21759B",
            description: "Temas, Plugins, Gutenberg",
          },
          {
            name: "Scrum/Kanban",
            icon: "/icons/agile.svg",
            level: "Intermedio",
            color: "#6DB33F",
            description: "Sprints, Historias, Retrospectivas",
          },
          {
            name: "Jira",
            icon: "/icons/jira.svg",
            level: "Intermedio",
            color: "#0052CC",
            description: "Tickets, Workflows, Reportes",
          },
          {
            name: "Notion",
            icon: "/icons/notion.svg",
            level: "Avanzado",
            color: "#000000",
            description: "Bases de datos, Wikis, Gestión de proyectos",
          },
        ],
      },
    },
    en: {
      title: "Technical Skills",
      description: "My technology stack and tools I use to create exceptional digital experiences.",
      categories: [
        {
          name: "Frontend Development",
          key: "frontend",
          description: "Technologies I use to build modern and responsive interfaces.",
        },
        {
          name: "Design & Multimedia",
          key: "design",
          description: "Tools for creating impactful visual experiences.",
        },
        {
          name: "Tools & Methodologies",
          key: "tools",
          description: "Resources I use to optimize my workflow.",
        },
      ],
      skills: {
        frontend: [
          {
            name: "JavaScript",
            icon: "/icons/javascript.svg",
            level: "Advanced",
            color: "#F7DF1E",
            description: "ES6+, Promises, Async/Await, DOM",
          },
          {
            name: "TypeScript",
            icon: "/icons/typescript.svg",
            level: "Intermediate-Advanced",
            color: "#3178C6",
            description: "Types, Interfaces, Generics",
          },
          {
            name: "React",
            icon: "/icons/react.svg",
            level: "Advanced",
            color: "#61DAFB",
            description: "Hooks, Context, Suspense",
          },
          {
            name: "Next.js",
            icon: "/icons/nextjs.svg",
            level: "Intermediate-Advanced",
            color: "#000000",
            description: "App Router, Server Components, API Routes",
          },
          {
            name: "HTML5",
            icon: "/icons/html5.svg",
            level: "Advanced",
            color: "#E34F26",
            description: "Semantics, Accessibility, SEO",
          },
          {
            name: "CSS3",
            icon: "/icons/css3.svg",
            level: "Advanced",
            color: "#1572B6",
            description: "Flexbox, Grid, Animations",
          },
          {
            name: "Tailwind CSS",
            icon: "/icons/tailwindcss.svg",
            level: "Advanced",
            color: "#06B6D4",
            description: "Configuration, Plugins, JIT",
          },
          {
            name: "Redux",
            icon: "/icons/redux.svg",
            level: "Intermediate",
            color: "#764ABC",
            description: "Redux Toolkit, Thunks",
          },
        ],
        design: [
          {
            name: "Figma",
            icon: "/icons/figma.svg",
            level: "Intermediate-Advanced",
            color: "#F24E1E",
            description: "Prototypes, Components, Auto Layout",
          },
          {
            name: "Adobe Photoshop",
            icon: "/icons/photoshop.svg",
            level: "Advanced",
            color: "#31A8FF",
            description: "Editing, Composition, Retouching",
          },
          {
            name: "Adobe Premiere",
            icon: "/icons/premiere.svg",
            level: "Intermediate-Advanced",
            color: "#9999FF",
            description: "Editing, Color, Audio",
          },
          {
            name: "Adobe After Effects",
            icon: "/icons/aftereffects.svg",
            level: "Intermediate",
            color: "#9999FF",
            description: "Animation, Composition, VFX",
          },
          {
            name: "Canva",
            icon: "/icons/canva.svg",
            level: "Advanced",
            color: "#00C4CC",
            description: "Quick design, Templates, Collaboration",
          },
          {
            name: "UI/UX Design",
            icon: "/icons/ux.svg",
            level: "Intermediate-Advanced",
            color: "#FF5722",
            description: "Wireframes, Usability, Research",
          },
        ],
        tools: [
          {
            name: "Git & GitHub",
            icon: "/icons/github.svg",
            level: "Advanced",
            color: "#181717",
            description: "Branching, PR, CI/CD",
          },
          {
            name: "VS Code",
            icon: "/icons/vscode.svg",
            level: "Advanced",
            color: "#007ACC",
            description: "Extensions, Snippets, Debugging",
          },
          {
            name: "WordPress",
            icon: "/icons/wordpress.svg",
            level: "Intermediate-Advanced",
            color: "#21759B",
            description: "Themes, Plugins, Gutenberg",
          },
          {
            name: "Scrum/Kanban",
            icon: "/icons/agile.svg",
            level: "Intermediate",
            color: "#6DB33F",
            description: "Sprints, Stories, Retrospectives",
          },
          {
            name: "Jira",
            icon: "/icons/jira.svg",
            level: "Intermediate",
            color: "#0052CC",
            description: "Tickets, Workflows, Reports",
          },
          {
            name: "Notion",
            icon: "/icons/notion.svg",
            level: "Advanced",
            color: "#000000",
            description: "Databases, Wikis, Project management",
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
        staggerChildren: 0.1,
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

  // Placeholder SVG icons for skills
  const getSkillIcon = (name: string) => {
    return (
      <div
        className="w-12 h-12 flex items-center justify-center rounded-lg"
        style={{ backgroundColor: `${name.toLowerCase().includes("dark") ? "#ffffff10" : "#00000010"}` }}
      >
        {name.charAt(0)}
      </div>
    )
  }

  const getLevelColor = (level: string) => {
    if (level.includes("Avanzado") || level.includes("Advanced")) {
      return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
    } else if (level.includes("Intermedio") || level.includes("Intermediate")) {
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
    } else {
      return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
    }
  }

  return (
    <section id="skills" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
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

          <motion.div variants={itemVariants}>
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {currentContent.categories.map((category) => (
                  <TabsTrigger key={category.key} value={category.key}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {Object.entries(currentContent.skills).map(([key, skills]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  <p className="text-muted-foreground mb-8 text-center">
                    {currentContent.categories.find((cat) => cat.key === key)?.description}
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="relative"
                        onMouseEnter={() => setHoveredSkill(`${key}-${index}`)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="bg-background rounded-xl border p-4 h-full flex flex-col items-center text-center hover:shadow-md transition-shadow">
                          <div className="w-16 h-16 mb-4 relative">
                            {/* Placeholder for skill icon */}
                            <div
                              className="w-full h-full rounded-lg flex items-center justify-center"
                              style={{
                                backgroundColor: `${skill.color}20`,
                                color: skill.color,
                              }}
                            >
                              {skill.name.charAt(0)}
                            </div>
                          </div>
                          <h3 className="font-medium mb-2">{skill.name}</h3>
                          <Badge variant="outline" className={`${getLevelColor(skill.level)} mt-auto`}>
                            {skill.level}
                          </Badge>

                          {/* Skill tooltip */}
                          {hoveredSkill === `${key}-${index}` && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-2  transform -translate-x-1/2 translate-y-full  w-64 bg-popover text-popover-foreground p-4 rounded-lg shadow-lg border z-20"
                            >
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-popover border-t border-l"></div>
                              <h4 className="font-semibold mb-2">{skill.name}</h4>
                              <p className="text-sm text-muted-foreground">{skill.description}</p>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
