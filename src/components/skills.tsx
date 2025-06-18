"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/custom-tabs"
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiHtml5, 
  SiCss3, 
  SiTailwindcss, 
  SiRedux, 
  SiFigma, 
  SiAdobephotoshop, 
  SiAdobepremierepro, 
  SiAdobeaftereffects, 
  SiCanva, 
  SiGithub, 
  SiWordpress, 
  SiJira, 
  SiNotion,
  SiPython,
  SiNodedotjs,
  SiBootstrap
} from "react-icons/si"
import { FaUikit, FaCode } from "react-icons/fa"
import { TbApi } from "react-icons/tb"
import { BsKanbanFill } from "react-icons/bs"
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Palette, Wrench, Star, TrendingUp, Zap, Target, Award, CheckCircle, Clock, Users, Lightbulb } from "lucide-react"
import Image from "next/image"
import { skillsContent } from "@/constants"

export function Skills() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const currentContent = skillsContent[language as keyof typeof skillsContent]

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

  const getSkillIcon = (name: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "JavaScript": <SiJavascript className="w-8 h-8" />,
      "TypeScript": <SiTypescript className="w-8 h-8" />,
      "React": <SiReact className="w-8 h-8" />,
      "Next.js": <SiNextdotjs className="w-8 h-8" />,
      "HTML5": <SiHtml5 className="w-8 h-8" />,
      "CSS3": <SiCss3 className="w-8 h-8" />,
      "Tailwind CSS": <SiTailwindcss className="w-8 h-8" />,
      "Bootstrap": <SiBootstrap className="w-8 h-8" />,
      "Redux": <SiRedux className="w-8 h-8" />,
      "Figma": <SiFigma className="w-8 h-8" />,
      "Adobe Photoshop": <SiAdobephotoshop className="w-8 h-8" />,
      "Adobe Premiere": <SiAdobepremierepro className="w-8 h-8" />,
      "Adobe After Effects": <SiAdobeaftereffects className="w-8 h-8" />,
      "Canva": <SiCanva className="w-8 h-8" />,
      "UI/UX Design": <FaUikit className="w-8 h-8" />,
      "Git & GitHub": <SiGithub className="w-8 h-8" />,
      "VS Code": <FaCode className="w-8 h-8" />,
      "WordPress": <SiWordpress className="w-8 h-8" />,
      "Jira": <SiJira className="w-8 h-8" />,
      "Notion": <SiNotion className="w-8 h-8" />,
      "Node.js": <SiNodedotjs className="w-8 h-8" />,
      "Python": <SiPython className="w-8 h-8" />,
      "API Development": <TbApi className="w-8 h-8" />,
      "Scrum/Kanban": <BsKanbanFill className="w-8 h-8" />
    }

    return iconMap[name] || (
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

          <div className="relative z-10">
            <Tabs defaultValue="development">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 gap-2 mb-8">
                {currentContent.categories.map((category) => (
                  <TabsTrigger 
                    key={category.key} 
                    value={category.key}
                    className="relative z-20 w-full"
                  >
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
                            <div
                              className="w-full h-full rounded-lg flex items-center justify-center"
                              style={{
                                backgroundColor: `${skill.color}20`,
                                color: skill.color,
                              }}
                            >
                              {getSkillIcon(skill.name)}
                            </div>
                          </div>
                          <h3 className="font-medium mb-2">{skill.name}</h3>
                          <Badge variant="outline" className={`${getLevelColor(skill.level)} mt-auto`}>
                            {skill.level}
                          </Badge>

                          {hoveredSkill === `${key}-${index}` && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute -bottom-2 transform -translate-x-1/2 translate-y-full w-64 bg-popover text-popover-foreground p-4 rounded-lg shadow-lg border z-20"
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
