"use client"

import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { SectionTitle } from "@/components/section-title"

export function Skills() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const content = {
    es: {
      title: "Habilidades técnicas",
      description: "Mi stack tecnológico y herramientas que utilizo para crear experiencias digitales excepcionales.",
      categories: [
        {
          name: "Desarrollo Frontend",
          skills: [
            { name: "JavaScript (ES6+)", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "HTML5 & CSS3", level: 95 },
            { name: "Tailwind CSS", level: 90 },
            { name: "Redux", level: 80 },
          ],
        },
        {
          name: "Diseño y Multimedia",
          skills: [
            { name: "Figma", level: 85 },
            { name: "Adobe Photoshop", level: 90 },
            { name: "Adobe Premiere", level: 85 },
            { name: "Adobe After Effects", level: 80 },
            { name: "Canva", level: 95 },
            { name: "UI/UX Design", level: 85 },
          ],
        },
        {
          name: "Herramientas y Metodologías",
          skills: [
            { name: "Git & GitHub", level: 90 },
            { name: "VS Code", level: 95 },
            { name: "WordPress", level: 85 },
            { name: "Scrum/Kanban", level: 80 },
            { name: "Jira", level: 75 },
            { name: "Notion", level: 90 },
          ],
        },
      ],
    },
    en: {
      title: "Technical Skills",
      description: "My technology stack and tools I use to create exceptional digital experiences.",
      categories: [
        {
          name: "Frontend Development",
          skills: [
            { name: "JavaScript (ES6+)", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "React", level: 90 },
            { name: "Next.js", level: 85 },
            { name: "HTML5 & CSS3", level: 95 },
            { name: "Tailwind CSS", level: 90 },
            { name: "Redux", level: 80 },
          ],
        },
        {
          name: "Design & Multimedia",
          skills: [
            { name: "Figma", level: 85 },
            { name: "Adobe Photoshop", level: 90 },
            { name: "Adobe Premiere", level: 85 },
            { name: "Adobe After Effects", level: 80 },
            { name: "Canva", level: 95 },
            { name: "UI/UX Design", level: 85 },
          ],
        },
        {
          name: "Tools & Methodologies",
          skills: [
            { name: "Git & GitHub", level: 90 },
            { name: "VS Code", level: 95 },
            { name: "WordPress", level: 85 },
            { name: "Scrum/Kanban", level: 80 },
            { name: "Jira", level: 75 },
            { name: "Notion", level: 90 },
          ],
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

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <SectionTitle title={currentContent.title} description={currentContent.description} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {currentContent.categories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-background p-4 sm:p-6 rounded-xl shadow-sm border"
              >
                <h3 className="text-xl font-semibold mb-4 sm:mb-6 text-center sm:text-left">{category.name}</h3>
                <div className="space-y-4 sm:space-y-6">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div key={skillIndex} variants={itemVariants} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.2 * skillIndex }}
                          className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
