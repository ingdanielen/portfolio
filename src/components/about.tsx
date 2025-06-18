"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/custom-tabs"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronDown, ChevronUp, Calendar, MapPin, GraduationCap, ChevronRight } from "lucide-react"
import Image from "next/image"
import { aboutContent, getAboutIcons } from "@/constants"

export function About() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeTab, setActiveTab] = useState(0)
  const [expandedJourney, setExpandedJourney] = useState(false)
  const currentContent = aboutContent[language as keyof typeof aboutContent]
  const icons = getAboutIcons()

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

  const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <section id="about" className="py-20">
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
            <p className="text-lg text-muted-foreground mb-4">{currentContent.subtitle}</p>
            <p className="text-muted-foreground">{currentContent.description}</p>
            <p className="text-muted-foreground mt-4 font-medium">{currentContent.passion}</p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skills Tabs */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">{currentContent.tabs[activeTab].title}</h3>
              
              <div className="flex flex-col space-y-2">
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
                      {icons[tab.iconKey as keyof typeof icons]}
                    </div>
                    <span className="font-medium">{tab.title}</span>
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {currentContent.tabs[activeTab].description}
                </p>
                
                <ul className="space-y-2">
                  {currentContent.tabs[activeTab].points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src={currentContent.tabs[activeTab].image}
                  alt={currentContent.tabs[activeTab].title}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Journey Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">{currentContent.journey}</h3>
              <p className="text-muted-foreground">{currentContent.journeyDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Experiencia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.experience.slice(0, expandedJourney ? undefined : 2).map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary">{exp.year}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm font-medium">{exp.company}</span>
                      </div>
                      <h4 className="font-semibold">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Educación
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {currentContent.education.slice(0, expandedJourney ? undefined : 2).map((edu, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-primary">{edu.year}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm font-medium">{edu.institution}</span>
                      </div>
                      <h4 className="font-semibold">{edu.title}</h4>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {currentContent.experience.length > 2 && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => setExpandedJourney(!expandedJourney)}
                  className="rounded-full"
                >
                  {expandedJourney ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      {language === "es" ? "Mostrar menos" : "Show less"}
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      {currentContent.readMore}
                    </>
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
