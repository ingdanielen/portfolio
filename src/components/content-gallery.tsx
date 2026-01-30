"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionTitle } from "@/components/section-title"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"
import { Play, ImageIcon, Palette, X, ExternalLink } from "lucide-react"
import Image from "next/image"
import { 
  contentGalleryContent, 
  videosContent, 
  graphicsContent, 
  socialContent 
} from "@/constants"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EASE } from "@/lib/animations"
import { useStickyPin, useHorizontalScroll, useMultiLayerParallax, useVideoScrub } from "@/lib/advanced-effects"
import React from "react"

gsap.registerPlugin(ScrollTrigger)

// Brutal Tab Button
function TabButton({ 
  active, 
  onClick, 
  children,
  icon: Icon,
  accentColor
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  icon: React.ElementType;
  accentColor: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    buttonRef.current.style.setProperty('--mouse-x', `${x}px`);
    buttonRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`
        tab-button relative overflow-hidden px-6 py-4 rounded-xl font-display font-semibold
        transition-all duration-500 group
        ${active 
          ? 'text-white' 
          : 'text-white/60 hover:text-white'
        }
      `}
      style={{
        background: active 
          ? `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` 
          : 'transparent'
      }}
    >
      {/* Spotlight effect */}
      {!active && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}30, transparent 50%)`
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        <div className={`
          p-2 rounded-lg transition-all duration-300
          ${active ? 'bg-white/20' : `bg-white/5 group-hover:bg-white/10`}
        `}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="hidden sm:inline">{children}</span>
      </div>

      {/* Active indicator */}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/50 rounded-full" />
      )}
    </button>
  );
}

// Video Card with cinematic hover
function VideoCard({ 
  video, 
  index,
  viewText
}: { 
  video: { id: number; title: string; description?: string; duration: string; thumbnail: string; link?: string };
  index: number;
  viewText: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle 3D rotation
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out"
    });

    // Parallax on image
    gsap.to(imageRef.current, {
      x: (x - centerX) / 15,
      y: (y - centerY) / 15,
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, { x: 0, y: 0, scale: 1, duration: 0.5 });
    }
  };

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1.1, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={cardRef}
      className="gallery-item group relative"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700" />
      
      <div className="relative bg-card dark:bg-black rounded-2xl border border-border dark:border-white/10 overflow-hidden group-hover:border-primary/30 dark:group-hover:border-white/20 transition-all duration-300">
        {/* Image container */}
        <div className="relative h-64 overflow-hidden">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={video.thumbnail || "/placeholder.svg"}
              alt={video.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-black via-background/50 dark:via-black/50 to-transparent" />
          
          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full bg-background/20 dark:bg-white/20 animate-ping" style={{ animationDuration: "2s" }} />
              <div className="absolute inset-0 rounded-full bg-background/10 dark:bg-white/10 scale-150" />
              
              <Button 
                size="lg" 
                className="relative rounded-full bg-background dark:bg-white/90 text-foreground dark:text-black hover:bg-muted dark:hover:bg-white hover:scale-110 transition-all duration-300 backdrop-blur-sm"
                onClick={(e) => {
                  e.preventDefault();
                  if (video.link) window.open(video.link, '_blank');
                }}
              >
                <Play className="w-6 h-6 fill-current" />
              </Button>
            </div>
          </div>
          
          {/* Duration badge */}
          <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 dark:bg-black/80 backdrop-blur-sm rounded-full border border-border dark:border-white/10">
            <span className="text-xs font-mono text-foreground dark:text-white">{video.duration}</span>
          </div>
          
          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-display font-bold text-foreground dark:text-white mb-2">{video.title}</h3>
            {video.description && (
              <p className="text-muted-foreground dark:text-white/60 text-sm line-clamp-2">{video.description}</p>
            )}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
}

// Graphic Card with 3D tilt
function GraphicCard({ 
  graphic, 
  onClick 
}: { 
  graphic: { id: number; title: string; image: string };
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(imageRef.current, {
      x: (x - centerX) / 10,
      y: (y - centerY) / 10,
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, { x: 0, y: 0, scale: 1, duration: 0.5 });
    }
  };

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1.15, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={cardRef}
      className="gallery-item group relative cursor-pointer"
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700" />
      
      <div className="relative bg-black rounded-2xl border border-white/10 overflow-hidden group-hover:border-white/20 transition-all duration-300">
        <div className="relative h-56 overflow-hidden">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={graphic.image || "/placeholder.svg"}
              alt={graphic.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Expand icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-sm font-display font-semibold text-white">{graphic.title}</h3>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
}

// Social Card
function SocialCard({ 
  item, 
  viewText 
}: { 
  item: { id: number; title: string; image: string };
  viewText: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(imageRef.current, {
      x: (x - centerX) / 12,
      y: (y - centerY) / 12,
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    }
    if (imageRef.current) {
      gsap.to(imageRef.current, { x: 0, y: 0, scale: 1, duration: 0.5 });
    }
  };

  const handleMouseEnter = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, { scale: 1.1, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={cardRef}
      className="gallery-item group relative"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700" />
      
      <div className="relative bg-card dark:bg-black rounded-2xl border border-border dark:border-white/10 overflow-hidden group-hover:border-primary/30 dark:group-hover:border-white/20 transition-all duration-300">
        <div className="relative h-64 overflow-hidden">
          <div ref={imageRef} className="absolute inset-0">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background dark:from-black via-background/30 dark:via-black/30 to-transparent" />
          
          {/* View button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button size="lg" className="rounded-full bg-background dark:bg-white/90 text-foreground dark:text-black hover:bg-muted dark:hover:bg-white hover:scale-110 transition-all duration-300">
              <ImageIcon className="mr-2 h-5 w-5" />
              {viewText}
            </Button>
          </div>
          
          {/* Title */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-display font-bold text-foreground dark:text-white">{item.title}</h3>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </div>
    </div>
  );
}

export function ContentGallery() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("videos")

  const tabConfig = [
    { key: "videos", icon: Play, color: "#ef4444" },
    { key: "graphics", icon: Palette, color: "#a855f7" },
    { key: "social", icon: ImageIcon, color: "#3b82f6" }
  ];

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

  // Animate tabs container
  useEffect(() => {
    if (tabsContainerRef.current) {
      gsap.fromTo(tabsContainerRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: EASE.brutalOut,
          scrollTrigger: {
            trigger: tabsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Animate grid on tab change
  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item')
      
      gsap.killTweensOf(items);
      
      items.forEach((item, i) => {
        const randomX = (Math.random() - 0.5) * 60;
        const randomRotate = (Math.random() - 0.5) * 15;
        
        gsap.fromTo(item,
          { 
            x: randomX,
            y: 80, 
            opacity: 0, 
            scale: 0.85,
            rotateZ: randomRotate,
            rotateX: -10,
            transformPerspective: 800
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            rotateX: 0,
            duration: 0.7,
            delay: i * 0.08,
            ease: EASE.elastic
          }
        );
      });
    }
  }, [activeTab])

  const currentContent = contentGalleryContent[language as keyof typeof contentGalleryContent]
  const currentVideos = videosContent[language as keyof typeof videosContent]
  const currentGraphics = graphicsContent[language as keyof typeof graphicsContent]
  const currentSocial = socialContent[language as keyof typeof socialContent]

  // Multi-layer Parallax
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const midgroundLayerRef = useRef<HTMLDivElement>(null);
  const foregroundLayerRef = useRef<HTMLDivElement>(null);
  
  useMultiLayerParallax(
    [
      { ref: backgroundLayerRef, speed: 0.22 },
      { ref: midgroundLayerRef, speed: 0.42 },
      { ref: foregroundLayerRef, speed: 0.62 }
    ],
    sectionRef
  );

  return (
    <section ref={sectionRef} id="content" className="py-24 md:py-32 relative overflow-hidden">
      {/* Multi-layer Parallax Background */}
      <div ref={backgroundLayerRef} className="absolute inset-0 -z-10">
        {/* Removido fondo opaco para permitir ver ParticleBackground */}
      </div>
      <div ref={midgroundLayerRef} className="absolute inset-0 -z-5">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>
      <div ref={foregroundLayerRef} className="absolute inset-0 -z-1">
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-primary/3 rounded-full blur-[110px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[200px] h-[200px] bg-purple-600/3 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        <SectionTitle 
          title={currentContent.title}
          subtitle={currentContent.description}
        />

        <div className="relative z-10">
          {/* Custom Tabs */}
          <div 
            ref={tabsContainerRef}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex gap-2 p-2 bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10">
              {tabConfig.map((tab) => (
                <TabButton
                  key={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  icon={tab.icon}
                  accentColor={tab.color}
                >
                  {currentContent.tabs[tab.key as keyof typeof currentContent.tabs]}
                </TabButton>
              ))}
            </div>
          </div>

          {/* Videos */}
          {activeTab === "videos" && (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
              {currentVideos.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} viewText={currentContent.viewProject} />
              ))}
            </div>
          )}

          {/* Graphics */}
          {activeTab === "graphics" && (
            <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-4" style={{ perspective: "1000px" }}>
              {currentGraphics.map((graphic) => (
                <GraphicCard 
                  key={graphic.id} 
                  graphic={graphic} 
                  onClick={() => setSelectedImage(graphic.image)} 
                />
              ))}
            </div>
          )}

          {/* Social */}
          {activeTab === "social" && (
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: "1000px" }}>
              {currentSocial.map((item) => (
                <SocialCard key={item.id} item={item} viewText={currentContent.viewProject} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div ref={modalRef} className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-14 right-0 text-white hover:text-primary flex items-center gap-2 bg-black/50 border border-white/10 px-4 py-2 rounded-full transition-colors font-display group"
            >
              <X className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
              <span>{currentContent.close}</span>
            </button>
            <div className="relative rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={selectedImage}
                alt="Selected image"
                width={800}
                height={800}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
