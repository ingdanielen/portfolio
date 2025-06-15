"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/custom-tabs"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Play, ImageIcon, Palette, X } from "lucide-react"
import Image from "next/image"

export function ContentGallery() {
  const { language } = useLanguage()
  const ref = useRef(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedImage(null)
      }
    }

    if (selectedImage) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedImage])

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
      thumbnail: "/projects/audit-img.jpg",
      title: "Concurso de Piano - Festival Internacional PIANO FESTIBAQ",
      description: "Primer concurso de piano para pianistas de la Costa y Colombia",
      duration: "1:30",
      link: "https://www.instagram.com/p/CyMjWzlr5v0/"
    },
    {
      id: "video2",
      thumbnail: "/projects/recital-img.jpg",
      title: "Matrículas 2025-1 - Allegretto Salmo 150",
      description: "¡Descubre tu talento musical! Piano, Guitarra, Batería, Canto y más",
      duration: "1:00",
      link: "https://www.instagram.com/reel/DEIQG8kJ6V2/"
    },
    {
      id: "video3",
      thumbnail: "/projects/casio-img.jpg",
      title: "CASIO Latinoamérica - Patrocinador Oficial",
      description: "Premiando el talento musical con teclados CASIO Privia y CT-S1",
      duration: "0:45",
      link: "https://www.instagram.com/reel/CzZI23ZuVeE/"
    }
  ]

  const graphics = [
    {
      id: "graphic1",
      image: "/projects/zentro-figma.png",
      title: "Branding Zentro",
      description: "Branding para la escuela de música Zentro",
      duration: "1:00",
      link: "https://www.instagram.com/p/CyMjWzlr5v0/"
    },
    {
      id: "graphic2",
      image: "/projects/pc-img.png",
      title: "UI Kit Poder Ciudadano",
      description: "UI Kit para la aplicación Poder Ciudadano",
      duration: "1:00",
      link: "https://www.instagram.com/reel/CzZI23ZuVeE/"
    },
    {
      id: "graphic3",
      image: "/projects/allegretto-figma.png",
      title: "Allegretto Figma",
      description: "Figma para la escuela de música Allegretto",
      duration: "1:00",
      link: "https://www.instagram.com/p/CyMjWzlr5v0/"
    }
  ]

  const social = [
    {
      id: "social1",
      image: "/projects/IMG_0173.jpg",
      title: "Recitales musicales - Allegretto",
    },
    {
      id: "social2",
      image: "/projects/IMG_2057.jpg",
      title: "Evento musical institucional",
      link: "https://www.instagram.com/reel/CzZI23ZuVeE/"
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

          <div className="relative z-10">
            <Tabs defaultValue="videos">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="videos" className="flex items-center gap-2 relative z-20">
                  <Play className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentContent.tabs.videos}</span>
                </TabsTrigger>
                <TabsTrigger value="graphics" className="flex items-center gap-2 relative z-20">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentContent.tabs.graphics}</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex items-center gap-2 relative z-20">
                  <ImageIcon className="h-4 w-4" />
                  <span className="hidden sm:inline">{currentContent.tabs.social}</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos">
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
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-medium">{video.title}</h3>
                            {video.description && (
                              <p className="text-white/80 text-sm mb-1">{video.description}</p>
                            )}
                            <p className="text-white/80 text-sm">{video.duration}</p>
                          </div>
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="secondary" 
                              size="lg" 
                              className="rounded-full"
                              onClick={(e) => {
                                e.preventDefault()
                                if (video.link) {
                                  window.open(video.link, '_blank')
                                }
                              }}
                            >
                              <Play className="mr-2 h-4 w-4" />
                              {currentContent.viewProject}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="graphics">
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

              <TabsContent value="social">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {social.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Card className="overflow-hidden">
                        <CardContent className="p-0 relative group">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            width={400}
                            height={600}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary" size="lg" className="rounded-full">
                              <ImageIcon className="mr-2 h-4 w-4" />
                              {currentContent.viewProject}
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                            <h3 className="text-white font-medium">{item.title}</h3>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>

      {/* Modal para imágenes */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div ref={modalRef} className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 flex items-center gap-2 bg-black/50 px-4 py-2 rounded-lg transition-colors"
            >
              <X className="h-6 w-6" />
              <span>{currentContent.close}</span>
            </button>
            <Image
              src={selectedImage}
              alt="Selected image"
              width={800}
              height={800}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  )
}
