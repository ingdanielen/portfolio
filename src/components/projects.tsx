"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionTitle } from "@/components/section-title"
import { Button } from "@/components/ui/button"
import { useRef, useEffect, useState } from "react"
import { ExternalLink, Github, ArrowUpRight, Briefcase, User, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { projectsContent } from "@/constants"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EASE, create3DTilt } from "@/lib/animations"
import { useStickyPin, useHorizontalScroll, useMultiLayerParallax, useMagnetic, useVideoScrub, useLiquidDistortion } from "@/lib/advanced-effects"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl: string
  githubUrl?: string
  backendUrl?: string
  featured?: boolean
}

// Section Divider with gradient box style
function SectionDivider({ 
  title, 
  subtitle, 
  number, 
  icon: Icon 
}: { 
  title: string; 
  subtitle: string; 
  number: string;
  icon: React.ElementType;
}) {
  const dividerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { 
            y: 60, 
            opacity: 0, 
            scale: 0.9,
            rotateX: -20,
            transformPerspective: 1000,
            transformOrigin: "center bottom"
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotateX: 0,
            duration: 1.2,
            ease: EASE.brutalOut,
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (dividerRef.current) {
        const elements = dividerRef.current.querySelectorAll('.divider-animate');
        gsap.fromTo(elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: EASE.brutalOut,
            scrollTrigger: {
              trigger: dividerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: 0.3
          }
        );
      }
    }, dividerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={dividerRef} className="relative py-12 md:py-16 overflow-hidden">
      {/* Background number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[12rem] md:text-[20rem] font-display font-black leading-none opacity-[0.03]">
          {number}
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Icon */}
          <div className="divider-animate relative flex-shrink-0">
            <div className="absolute inset-0 bg-primary/50 rounded-xl blur-lg" />
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white">
              <Icon className="w-6 h-6" />
            </div>
          </div>

          {/* Title card with gradient border */}
          <div 
            ref={cardRef}
            className="group relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Gradient glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-xl blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
            
            {/* Card */}
            <div className="relative bg-black px-8 py-4 md:px-12 md:py-5 rounded-lg border border-white/10">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight text-center">
                {title}
              </h3>
            </div>
          </div>

          {/* Counter */}
          <div className="divider-animate hidden md:block">
            <span 
              className="text-4xl lg:text-5xl font-display font-black"
              style={{ WebkitTextStroke: "2px hsl(var(--primary))", color: "transparent" }}
            >
              {number}
            </span>
          </div>
        </div>

        {/* Subtitle */}
        <p className="divider-animate text-muted-foreground text-center mt-4 max-w-md mx-auto">{subtitle}</p>

        {/* Divider line */}
        <div className="divider-animate mt-8 h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
}

// BRUTAL Featured Card - Cinematic style (RESTORED)
function FeaturedProjectCard({ project, index, content }: { project: Project; index: number; content: typeof projectsContent.es }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const imgElementRef = useRef<HTMLImageElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Liquid Distortion Effect
  useLiquidDistortion(imageContainerRef, imgElementRef)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax on scroll - Optimizado
      if (imageRef.current) {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: false,
          onUpdate: (self) => {
            gsap.set(imageRef.current, {
              yPercent: -self.progress * 20,
              scale: 1 + self.progress * 0.1,
              force3D: true,
            });
          }
        });
      }

      // Content reveal on scroll - Optimizado
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            force3D: true,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
              invalidateOnRefresh: false,
            }
          }
        )
      }
    }, cardRef)

    return () => ctx.revert()
  }, [])

  // Spotlight follow effect - Optimizado con throttling
  let rafId: number | null = null;
  let lastX = 0;
  let lastY = 0;
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    if (rafId) return; // Throttle con RAF
    
    rafId = requestAnimationFrame(() => {
      const rect = cardRef.current!.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      // Move spotlight overlay - optimizado
      if (overlayRef.current) {
        gsap.set(overlayRef.current, {
          background: `radial-gradient(800px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.15) 0%, transparent 50%)`,
          force3D: true,
        });
      }

      // Subtle parallax on image - optimizado
      if (imageRef.current) {
        const moveX = (x - rect.width / 2) / 30
        const moveY = (y - rect.height / 2) / 30
        gsap.set(imageRef.current, {
          x: moveX,
          y: moveY,
          force3D: true,
        });
      }

      // Content subtle movement - optimizado
      if (contentRef.current) {
        const moveX = (x - rect.width / 2) / 50
        const moveY = (y - rect.height / 2) / 50
        gsap.set(contentRef.current, {
          x: -moveX,
          y: -moveY,
          force3D: true,
        });
      }
      
      rafId = null;
    });
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (imageRef.current) {
      gsap.to(imageRef.current, { 
        scale: 1.08, 
        filter: "blur(2px) brightness(0.7)",
        duration: 0.6,
        ease: EASE.brutalOut,
        force3D: true,
      })
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { 
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        duration: 0.4 
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (imageRef.current) {
      gsap.to(imageRef.current, { 
        scale: 1.1, 
        x: 0,
        y: 0,
        filter: "blur(0px) brightness(1)",
        duration: 0.6, 
        ease: "power2.out" 
      })
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, { 
        backdropFilter: "blur(0px)",
        backgroundColor: "transparent",
        duration: 0.4 
      })
    }
    if (contentRef.current) {
      gsap.to(contentRef.current, { x: 0, y: 0, duration: 0.4 })
    }
  }

  return (
    <div
      ref={cardRef}
      className="featured-project group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-0 items-stretch min-h-[280px] lg:min-h-[350px]`}>
        {/* Image Section - Takes more space */}
        <div className={`relative overflow-hidden rounded-3xl lg:rounded-none ${index % 2 === 0 ? 'lg:col-span-7 lg:rounded-l-3xl' : 'lg:col-span-7 lg:order-2 lg:rounded-r-3xl'}`}>
          {/* Glow */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-3xl blur-2xl opacity-0 group-hover:opacity-50 transition-all duration-700 -z-10" />
          
          <div ref={imageContainerRef} className="relative h-full min-h-96 overflow-hidden" style={{ willChange: "transform" }}>
            <div ref={imageRef} className="absolute inset-0 scale-110" style={{ willChange: "transform" }}>
              <Image
                ref={imgElementRef}
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover"
                style={{ willChange: "transform" }}
              />
            </div>
            
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-${index % 2 === 0 ? 'r' : 'l'} from-background/90 dark:from-black/90 via-background/50 dark:via-black/50 to-transparent`} />
            
            {/* Spotlight overlay - Blur y oscurecimiento en hover */}
            <div 
              ref={overlayRef} 
              className="absolute inset-0 pointer-events-none transition-all duration-300"
              style={{
                backdropFilter: "blur(0px)",
                backgroundColor: "transparent",
              }}
            />
            
            {/* Number */}
            <div className="absolute top-6 left-6">
              <span className="text-7xl md:text-8xl font-display font-black text-foreground/10 dark:text-white/10">
                0{index + 1}
              </span>
            </div>

            {/* View button - appears on hover */}
            <Link 
              href={project.liveUrl} 
              target="_blank"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className={`flex items-center gap-3 px-8 py-4 bg-background dark:bg-white text-foreground dark:text-black rounded-full font-display font-bold text-lg transform transition-all duration-500 ${isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
                {content.viewProject}
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className={`relative bg-card dark:bg-black p-6 lg:p-8 flex flex-col justify-center ${index % 2 === 0 ? 'lg:col-span-5 lg:rounded-r-3xl' : 'lg:col-span-5 lg:order-1 lg:rounded-l-3xl'}`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div ref={contentRef} className="relative z-10 space-y-4">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/30 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-mono uppercase tracking-wider">Featured</span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-foreground dark:text-white leading-tight">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground dark:text-white/60 text-base leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 bg-muted/50 dark:bg-white/5 border border-border dark:border-white/10 rounded-full text-muted-foreground dark:text-white/70 text-xs font-mono hover:border-primary/50 hover:text-primary dark:hover:text-white transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="sm" className="group/btn rounded-full px-6 bg-background dark:bg-white text-foreground dark:text-black hover:bg-muted dark:hover:bg-white/90 font-display font-semibold">
                <Link href={project.liveUrl} target="_blank">
                  Ver Demo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
              {project.githubUrl && project.githubUrl !== project.liveUrl && project.githubUrl !== "#" && (
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-border dark:border-white/20 hover:border-primary hover:bg-primary/10">
                  <Link href={project.githubUrl} target="_blank">
                    <Github className="mr-2 h-5 w-5" />
                    Código
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Project Card - All info visible
function ProjectCard({ project, index, content }: { project: Project; index: number; content: typeof projectsContent.es }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current && cardRef.current) {
        ScrollTrigger.create({
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: false,
          onUpdate: (self) => {
            gsap.set(imageRef.current, {
              yPercent: -self.progress * 8,
              force3D: true,
            });
          }
        });
      }
    }, cardRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 50
    const rotateY = (centerX - x) / 50

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" })
    }
  }

  return (
    <div
      ref={cardRef}
      className="project-card group relative perspective"
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Brutal Glow - Más intenso */}
      <div className="absolute -inset-2 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700" />
      <div className="absolute -inset-1 bg-gradient-to-br from-primary/50 via-purple-500/50 to-pink-500/50 rounded-3xl blur-lg opacity-0 group-hover:opacity-60 transition-all duration-700" />
      
      {/* Main Card - Diseño brutal mejorado */}
      <div className="relative h-full bg-card dark:bg-black rounded-3xl border-2 border-border dark:border-white/10 overflow-hidden group-hover:border-primary/50 transition-all duration-500 shadow-2xl">
        {/* Image Section - Más grande y prominente */}
        <div className="relative h-64 md:h-72 overflow-hidden">
          <div ref={imageRef} className="absolute inset-0 scale-110">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          
          {/* Gradient overlay - Más dramático */}
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-black via-background/70 dark:via-black/70 via-background/40 dark:via-black/40 to-transparent" />
          
          {/* Brutal Number - Más grande y visible */}
          <div className="absolute top-6 left-6">
            <span 
              className="text-7xl md:text-8xl font-display font-black leading-none"
              style={{ WebkitTextStroke: "2px hsl(var(--primary) / 0.3)", color: "transparent" }}
            >
              0{index + 1}
            </span>
          </div>

          {/* Quick action button - Mejorado */}
          <Link 
            href={project.liveUrl} 
            target="_blank"
            className="absolute top-6 right-6 flex items-center justify-center w-12 h-12 bg-background/80 dark:bg-black/80 backdrop-blur-md border-2 border-primary/50 rounded-full text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
          >
            <ArrowUpRight className="w-6 h-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </Link>

          {/* Title on image - Más prominente */}
          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-3xl md:text-4xl font-display font-black text-foreground dark:text-white leading-tight group-hover:text-primary transition-colors duration-300 drop-shadow-2xl">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Section - Más espacioso y brutal */}
        <div className="p-6 md:p-8 space-y-5 bg-gradient-to-b from-card dark:from-black to-card/95 dark:to-black/95">
          {/* Description - Mejor tipografía */}
          <p className="text-muted-foreground dark:text-white/70 text-base leading-relaxed line-clamp-3 font-medium">
            {project.description}
          </p>

          {/* Tags - Diseño más brutal */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span 
                key={i}
                className="px-4 py-2 bg-muted/50 dark:bg-white/5 border-2 border-border dark:border-white/10 rounded-full text-muted-foreground dark:text-white/80 text-xs font-mono font-bold uppercase tracking-wider hover:border-primary/60 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Actions - Botones más grandes y prominentes */}
          <div className="flex gap-3 pt-2">
            <Button asChild size="lg" className="flex-1 rounded-full bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:opacity-90 font-display font-bold text-sm shadow-lg shadow-primary/30">
              <Link href={project.liveUrl} target="_blank">
                <ExternalLink className="mr-2 h-5 w-5" />
                Ver Demo
              </Link>
            </Button>
            {project.githubUrl && project.githubUrl !== "#" && (
              <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-border dark:border-white/20 hover:border-primary hover:bg-primary/10 px-6">
                <Link href={project.githubUrl} target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            )}
            {project.backendUrl && project.backendUrl !== "#" && (
              <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-border dark:border-white/20 hover:border-primary hover:bg-primary/10 px-6" title="Backend">
                <Link href={project.backendUrl} target="_blank">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Horizontal scroll marquee
function TitleMarquee({ text, direction = "left" }: { text: string; direction?: "left" | "right" }) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const content = marqueeRef.current.querySelector('.marquee-content');
    if (!content) return;

    const contentWidth = content.scrollWidth / 2;
    
    gsap.to(content, {
      x: direction === "left" ? -contentWidth : contentWidth,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  }, [direction]);

  return (
    <div ref={marqueeRef} className="overflow-hidden py-4 select-none">
      <div className="marquee-content inline-flex">
        {[...Array(4)].map((_, i) => (
          <span 
            key={i} 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black uppercase whitespace-nowrap mx-6"
            style={{ WebkitTextStroke: "1px hsl(var(--primary) / 0.3)", color: "transparent" }}
          >
            {text}
            <span className="text-primary mx-6">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const featuredRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const personalRef = useRef<HTMLDivElement>(null)
  
  const currentContent = projectsContent[language as keyof typeof projectsContent]

  const featuredProjects = currentContent.projects.professional.filter(p => p.featured)
  const regularProfessional = currentContent.projects.professional.filter(p => !p.featured)

  // Removido sticky pin y horizontal scroll que causan bugs
  // Se mantienen solo las animaciones de entrada

  // Multi-layer Parallax
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const midgroundLayerRef = useRef<HTMLDivElement>(null);
  useMultiLayerParallax(
    [
      { ref: backgroundLayerRef, speed: 0.2 },
      { ref: midgroundLayerRef, speed: 0.4 }
    ],
    sectionRef
  );

  useEffect(() => {
    const cleanupFns: (() => void)[] = [];
    
    const ctx = gsap.context(() => {
      // ====================================
      // FEATURED - CINEMATIC REVEAL
      // ====================================
      if (featuredRef.current) {
        const projects = featuredRef.current.querySelectorAll('.featured-project');
        projects.forEach((project, i) => {
          const isEven = i % 2 === 0;
          
          gsap.fromTo(project,
            { 
              y: 200, 
              opacity: 0, 
              scale: 0.85,
              rotateX: 15,
              transformPerspective: 1200,
              transformOrigin: "center bottom"
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 1.5,
              ease: EASE.brutalOut,
              scrollTrigger: {
                trigger: project,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

      // ====================================
      // GRID CARDS - BRUTAL STAGGER
      // ====================================
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card');
        
        cards.forEach((card, i) => {
          const randomRotate = (Math.random() - 0.5) * 15;
          const randomX = (Math.random() - 0.5) * 80;
          
          gsap.fromTo(card,
            { 
              y: 120, 
              x: randomX,
              opacity: 0,
              scale: 0.8,
              rotateZ: randomRotate,
              transformPerspective: 1000
            },
            {
              y: 0,
              x: 0,
              opacity: 1,
              scale: 1,
              rotateZ: 0,
              duration: 1,
              delay: i * 0.1,
              ease: EASE.elastic,
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
          
          // Add 3D tilt
          const cleanup = create3DTilt(card as HTMLElement, {
            maxTilt: 8,
            scale: 1.03,
            glare: true
          });
          cleanupFns.push(cleanup);
        });
      }

      // ====================================
      // PERSONAL PROJECTS - CASCADE
      // ====================================
      if (personalRef.current) {
        const cards = personalRef.current.querySelectorAll('.project-card');
        
        cards.forEach((card, i) => {
          const isEven = i % 2 === 0;
          
          gsap.fromTo(card,
            { 
              y: 100, 
              x: isEven ? -60 : 60,
              opacity: 0,
              scale: 0.85,
              rotateY: isEven ? -15 : 15,
              transformPerspective: 1000
            },
            {
              y: 0,
              x: 0,
              opacity: 1,
              scale: 1,
              rotateY: 0,
              duration: 1.2,
              delay: i * 0.15,
              ease: EASE.brutalOut,
              scrollTrigger: {
                trigger: personalRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
          
          // Add 3D tilt
          const cleanup = create3DTilt(card as HTMLElement, {
            maxTilt: 10,
            scale: 1.02,
            glare: true
          });
          cleanupFns.push(cleanup);
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      cleanupFns.forEach(fn => fn());
    };
  }, [])

  const professionalDividerContent = {
    es: { title: "Proyectos Profesionales", subtitle: "Trabajo real para clientes reales." },
    en: { title: "Professional Projects", subtitle: "Real work for real clients." }
  };

  const personalDividerContent = {
    es: { title: "Proyectos Personales", subtitle: "Experimentos y exploraciones." },
    en: { title: "Personal Projects", subtitle: "Experiments and explorations." }
  };

  return (
    <section ref={sectionRef} id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Multi-layer Parallax Background */}
      <div ref={backgroundLayerRef} className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />
      </div>
      <div ref={midgroundLayerRef} className="absolute inset-0 -z-5">
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4">
        <SectionTitle 
          title={currentContent.title}
          subtitle={currentContent.description}
        />

        {/* Featured Projects - Cinematic */}
        <div ref={featuredRef} className="space-y-16 md:space-y-24 mb-8">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard 
              key={project.title} 
              project={project} 
              index={index}
              content={currentContent}
            />
          ))}
        </div>
      </div>

      {/* Professional Projects Divider */}
      <TitleMarquee text={professionalDividerContent[language as keyof typeof professionalDividerContent].title} direction="left" />
      
      <SectionDivider 
        title={professionalDividerContent[language as keyof typeof professionalDividerContent].title}
        subtitle={professionalDividerContent[language as keyof typeof professionalDividerContent].subtitle}
        number="01"
        icon={Briefcase}
      />

      {/* Professional Projects Grid - 2 columns */}
      <div className="container mx-auto px-4 mb-8">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {regularProfessional.map((project, index) => (
                <ProjectCard 
                  key={project.title} 
                  project={project} 
                  index={index} 
                  content={currentContent}
                />
              ))}
        </div>
      </div>

      {/* Personal Projects Divider */}
      <TitleMarquee text={personalDividerContent[language as keyof typeof personalDividerContent].title} direction="right" />
      
      <SectionDivider 
        title={personalDividerContent[language as keyof typeof personalDividerContent].title}
        subtitle={personalDividerContent[language as keyof typeof personalDividerContent].subtitle}
        number="02"
        icon={User}
      />

      {/* Personal Projects */}
      <div className="container mx-auto px-4">
        <div ref={personalRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {currentContent.projects.personal.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index} 
              content={currentContent}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
