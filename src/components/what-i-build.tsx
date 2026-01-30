"use client";

import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { SectionTitle } from "@/components/section-title";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Globe, 
  Smartphone, 
  Palette, 
  Zap, 
  Code2, 
  Layers
} from "lucide-react";
import { EASE } from "@/lib/animations";
import { useStickyPin, useHorizontalScroll, useMultiLayerParallax, useMagnetic } from "@/lib/advanced-effects";

gsap.registerPlugin(ScrollTrigger);

const content = {
  es: {
    title: "Lo que construyo",
    subtitle: "Experiencias digitales que combinan diseño, código y estrategia",
    services: [
      {
        icon: Globe,
        title: "Sitios Web Premium",
        description: "Landing pages y sitios corporativos con animaciones de alto impacto.",
        tags: ["Next.js", "GSAP", "SEO"],
        gradient: "from-blue-500 via-cyan-400 to-blue-600",
        accentColor: "#3b82f6",
      },
      {
        icon: Smartphone,
        title: "Aplicaciones Web",
        description: "Plataformas interactivas con interfaces intuitivas y UX excepcional.",
        tags: ["React", "TypeScript", "API"],
        gradient: "from-purple-500 via-pink-400 to-purple-600",
        accentColor: "#a855f7",
      },
      {
        icon: Palette,
        title: "Diseño de Interfaces",
        description: "Interfaces modernas con sistemas de diseño consistentes.",
        tags: ["UI/UX", "Figma", "Design System"],
        gradient: "from-orange-500 via-red-400 to-orange-600",
        accentColor: "#f97316",
      },
      {
        icon: Zap,
        title: "Animaciones & Motion",
        description: "Microinteracciones y animaciones scroll-driven impactantes.",
        tags: ["GSAP", "Framer Motion", "CSS"],
        gradient: "from-yellow-400 via-amber-400 to-yellow-500",
        accentColor: "#eab308",
      },
      {
        icon: Code2,
        title: "Desarrollo Frontend",
        description: "Código limpio, escalable con arquitectura sólida.",
        tags: ["Clean Code", "Testing", "Performance"],
        gradient: "from-green-500 via-emerald-400 to-green-600",
        accentColor: "#22c55e",
      },
      {
        icon: Layers,
        title: "Integraciones",
        description: "Conexión con APIs, CMS headless y servicios externos.",
        tags: ["REST API", "CMS", "Stripe"],
        gradient: "from-indigo-500 via-violet-400 to-indigo-600",
        accentColor: "#6366f1",
      }
    ]
  },
  en: {
    title: "What I Build",
    subtitle: "Digital experiences that combine design, code, and strategy",
    services: [
      {
        icon: Globe,
        title: "Premium Websites",
        description: "Landing pages and corporate sites with high-impact animations.",
        tags: ["Next.js", "GSAP", "SEO"],
        gradient: "from-blue-500 via-cyan-400 to-blue-600",
        accentColor: "#3b82f6",
      },
      {
        icon: Smartphone,
        title: "Web Applications",
        description: "Interactive platforms with intuitive interfaces and exceptional UX.",
        tags: ["React", "TypeScript", "API"],
        gradient: "from-purple-500 via-pink-400 to-purple-600",
        accentColor: "#a855f7",
      },
      {
        icon: Palette,
        title: "Interface Design",
        description: "Modern interfaces with consistent design systems.",
        tags: ["UI/UX", "Figma", "Design System"],
        gradient: "from-orange-500 via-red-400 to-orange-600",
        accentColor: "#f97316",
      },
      {
        icon: Zap,
        title: "Animations & Motion",
        description: "Microinteractions and impactful scroll-driven animations.",
        tags: ["GSAP", "Framer Motion", "CSS"],
        gradient: "from-yellow-400 via-amber-400 to-yellow-500",
        accentColor: "#eab308",
      },
      {
        icon: Code2,
        title: "Frontend Development",
        description: "Clean, scalable code with solid architecture.",
        tags: ["Clean Code", "Testing", "Performance"],
        gradient: "from-green-500 via-emerald-400 to-green-600",
        accentColor: "#22c55e",
      },
      {
        icon: Layers,
        title: "Integrations",
        description: "Connection with APIs, headless CMS, and external services.",
        tags: ["REST API", "CMS", "Stripe"],
        gradient: "from-indigo-500 via-violet-400 to-indigo-600",
        accentColor: "#6366f1",
      }
    ]
  }
};

// Service Card with background icon
function ServiceCard({ 
  service, 
  index 
}: { 
  service: typeof content.es.services[0]; 
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const Icon = service.icon;

  useEffect(() => {
    // Orbit rotation - positioned in corner
    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        rotation: 360,
        duration: 25 + index * 3,
        repeat: -1,
        ease: "none"
      });
    }
  }, [index]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // 3D rotation
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: "power2.out"
    });

    // Set spotlight position
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    
    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        scale: 1.2,
        opacity: 0.3,
        duration: 0.6,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power2.out"
      });
    }
    
    if (orbitRef.current) {
      gsap.to(orbitRef.current, {
        scale: 1,
        opacity: 0.15,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="service-card group relative h-full"
      style={{ 
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700`}
      />
      
      {/* Card container */}
      <div className="relative h-full bg-card/95 dark:bg-black/95 rounded-3xl border border-border dark:border-white/10 overflow-hidden group-hover:border-primary/30 dark:group-hover:border-white/20 transition-all duration-500">
        
        {/* Spotlight effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${service.accentColor}15, transparent 40%)`
          }}
        />

        {/* GIANT Background Icon - Watermark style */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <Icon 
            className="w-48 h-48 md:w-56 md:h-56 transition-all duration-700 ease-out"
            style={{ 
              color: service.accentColor,
              opacity: isHovered ? 0.12 : 0.05,
              transform: isHovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)'
            }}
          />
        </div>

        {/* Orbital animation - corner positioned */}
        <div 
          ref={orbitRef}
          className="absolute -top-12 -right-12 w-24 h-24 pointer-events-none opacity-15"
        >
          {/* Orbit ring */}
          <div 
            className="absolute inset-0 rounded-full border border-dashed"
            style={{ borderColor: service.accentColor }}
          />
          {/* Orbit dots */}
          <div 
            className="absolute w-2 h-2 rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: service.accentColor }}
          />
          <div 
            className="absolute w-1.5 h-1.5 rounded-full bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 opacity-60"
            style={{ backgroundColor: service.accentColor }}
          />
          <div 
            className="absolute w-1 h-1 rounded-full left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 opacity-40"
            style={{ backgroundColor: service.accentColor }}
          />
        </div>

        {/* Corner accent particles */}
        <div 
          className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
          style={{ backgroundColor: service.accentColor }}
        />
        <div 
          className="absolute top-6 right-8 w-1 h-1 rounded-full opacity-20 group-hover:opacity-40 transition-opacity"
          style={{ backgroundColor: service.accentColor }}
        />

        {/* Content */}
        <div ref={contentRef} className="relative z-10 p-6 flex flex-col h-full">
          {/* Small icon badge */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110"
            style={{ 
              backgroundColor: `${service.accentColor}15`,
              border: `1px solid ${service.accentColor}30`
            }}
          >
            <Icon 
              className="w-6 h-6"
              style={{ color: service.accentColor }}
            />
          </div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-white transition-colors">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground dark:text-white/50 text-sm leading-relaxed mb-5 group-hover:text-foreground/80 dark:group-hover:text-white/70 transition-colors duration-500 flex-grow">
            {service.description}
          </p>

          {/* Tags as pills */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {service.tags.map((tag, i) => (
              <span 
                key={i}
                className="text-xs font-mono px-3 py-1 rounded-full transition-all duration-300"
                style={{
                  border: `1px solid ${isHovered ? service.accentColor : 'rgba(255,255,255,0.1)'}`,
                  backgroundColor: isHovered ? `${service.accentColor}15` : 'rgba(255,255,255,0.03)',
                  color: isHovered ? service.accentColor : 'rgba(255,255,255,0.5)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.gradient} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700`}
        />
      </div>
    </div>
  );
}

export function WhatIBuild() {
  const { language } = useLanguage();
  const currentContent = content[language as keyof typeof content] || content.es;
  
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  // Multi-layer Parallax
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const midgroundLayerRef = useRef<HTMLDivElement>(null);
  const foregroundLayerRef = useRef<HTMLDivElement>(null);
  
  // Multi-layer Parallax - Deshabilitado temporalmente para depurar duplicación
  // useMultiLayerParallax(
  //   [
  //     { ref: backgroundLayerRef, speed: 0.2 },
  //     { ref: midgroundLayerRef, speed: 0.4 },
  //     { ref: foregroundLayerRef, speed: 0.6 }
  //   ],
  //   sectionRef
  // );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.service-card');
        
        cards.forEach((card, i) => {
          const randomX = (Math.random() - 0.5) * 30;
          const randomRotate = (Math.random() - 0.5) * 6;
          
          gsap.fromTo(card,
            { 
              y: 80,
              x: randomX,
              opacity: 0, 
              rotateZ: randomRotate,
              rotateX: -12,
              scale: 0.9,
              transformPerspective: 1000
            },
            {
              y: 0,
              x: 0,
              opacity: 1,
              rotateZ: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.8,
              delay: i * 0.08,
              ease: EASE.brutalOut,
              force3D: true,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none none",
                invalidateOnRefresh: false,
                once: true,
                onEnterBack: () => {
                  // Depuración solo para el problema de duplicidad
                  console.log(`⚠️ WhatIBuild: Card ${i} ENTER BACK - Verificando duplicidad`);
                  // NO re-ejecutar la animación, solo asegurar visibilidad
                  gsap.set(card, {
                    opacity: 1,
                    visibility: "visible",
                  });
                },
              }
            }
          );
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services"
      style={{ 
        zIndex: 200, 
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "hsl(var(--background) / 0.15)", // Fondo semi-transparente para ver partículas
        background: "hsl(var(--background) / 0.15)",
        // Asegurar que no haya duplicación
        display: "block",
        opacity: 1,
        visibility: "visible",
        // Asegurar que no se superponga sobre About cuando se scrollea
        isolation: "isolate", // Crear nuevo contexto de apilamiento
      }}
      className="py-24 md:py-32 relative overflow-hidden mt-72"
      data-section="what-i-build"
    >
      {/* Multi-layer Parallax Background */}
      <div ref={backgroundLayerRef} className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-[180px]" />
      </div>
      <div ref={midgroundLayerRef} className="absolute inset-0 -z-5">
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
      </div>
      <div ref={foregroundLayerRef} className="absolute inset-0 -z-1">
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[250px] h-[250px] bg-purple-600/3 rounded-full blur-[90px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Title */}
        <SectionTitle 
          title={currentContent.title}
          subtitle={currentContent.subtitle}
        />

        {/* Services Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          style={{ perspective: "1000px" }}
        >
          {currentContent.services.map((service, index) => (
            <ServiceCard 
              key={index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
