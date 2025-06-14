"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Play, ImageIcon, Palette, X } from "lucide-react"
import Image from "next/image"

export function ContentGallery() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const content = {
    es: {
      title: "Galería de contenido",
      description: "Una muestra de mi trabajo en producción de contenido digital, diseño gráfico y edición de video.",
      tabs: {
        videos: "Videos",
        graphics: "Diseño Gráfico",
        social: "Redes Sociales",
      },
      viewProject: "Ver proyecto",
      close: "Cerrar",
    },
    en: {
      title: "Content Gallery",
      description: "A showcase of my work in digital content production, graphic design and video editing.",
      tabs: {
        videos: "Videos",
        graphics: "Graphic Design",
        social: "Social Media",
      },
      viewProject: "View project",
      close: "Close",
    },
  }

  const currentContent = content[language as keyof typeof content]

  const videos = [
    {
      id: "video1",
      thumbnail: "/placeholder.svg?height=300&width=500",
      title: "Campaña Institucional Alegretto",
      duration: "2:45",
    },
    {
      id: "video2",
      thumbnail: "/placeholder.svg?height=300&width=500",
      title: "Tutorial React Hooks",
      duration: "5:30",
    },
    {
      id: "video3",
      thumbnail: "/placeholder.svg?height=300&width=500",
      title: "Animación Logo Zentro",
      duration: "0:45",
    },
    {
      id: "video4",
      thumbnail: "/placeholder.svg?height=300&width=500",
      title: "Presentación Juegos Intercolegiados",
      duration: "3:20",
    },
  ]

  const graphics = [
    {
      id: "graphic1",
      image: "/placeholder.svg?height=400&width=400",
      title: "Branding Zentro",
    },
    {
      id: "graphic2",
      image: "/placeholder.svg?height=400&width=400",
      title: "UI Kit Enterritorio",
    },
    {
      id: "graphic3",
      image: "/placeholder.svg?height=400&width=400",
      title: "Infografía Educativa",
    },
    {
      id: "graphic4",
      image: "/placeholder.svg?height=400&width=400",
      title: "Poster Evento",
    },
    {
      id: "graphic5",
      image: "/placeholder.svg?height=400&width=400",
      title: "Mockup App Móvil",
    },
    {
      id: "graphic6",
      image: "/placeholder.svg?height=400&width=400",
      title: "Ilustración Digital",
    },
  ]

  const social = [
    {
      id: "social1",
      image: "/placeholder.svg?height=600&width=400",
      title: "Carrusel Instagram - Tips de Desarrollo",
    },
    {
      id: "social2",
      image: "/placeholder.svg?height=600&width=400",
      title: "Reel - Proceso Creativo",
    },
    {
      id: "social3",
      image: "/placeholder.svg?height=600&width=400",
      title: "Post LinkedIn - Tendencias Tech",
    },
    {
      id: "social4",
      image: "/placeholder.svg?height=600&width=400",
      title: "Historia Instagram - Día a día",
    },
  ]

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
    <section id="content" className="py-20">
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
            <Tabs defaultValue="videos" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentContent.tabs.videos}</span>
                </TabsTrigger>
                <TabsTrigger value="graphics" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentContent.tabs.graphics}</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentContent.tabs.social}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {videos.map((video) => (
                    <motion.div
                      key={video.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-0 relative group">
                          <Image
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            width={500}
                            height={300}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary" size="lg" className="rounded-full">
                              <Play className="mr-2 h-4 w-4" />
                              {currentContent.viewProject}
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-medium">{video.title}</h3>
                            <p className="text-white/80 text-sm">{video.duration}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="graphics" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {graphics.map((graphic) => (
                    <motion.div
                      key={graphic.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => setSelectedImage(graphic.image)}
                      className="cursor-pointer"
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-0 relative">
                          <Image
                            src={graphic.image || "/placeholder.svg"}
                            alt={graphic.title}
                            width={400}
                            height={400}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <h3 className="text-white text-sm font-medium">{graphic.title}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="social" className="mt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {social.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onClick={() => setSelectedImage(item.image)}
                      className="cursor-pointer"
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-0 relative">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={600}
                            className="w-full h-72 object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            <h3 className="text-white text-sm font-medium">{item.title}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-5 w-5" />
            </Button>
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Enlarged view"
              width={800}
              height={800}
              className="max-h-[90vh] w-auto object-contain"
            />
          </motion.div>
        </div>
      )}
    </section>
  )
}
