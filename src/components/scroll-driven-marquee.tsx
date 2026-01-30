"use client";

import { useRef, useEffect, useMemo } from "react";
import { useLanguage } from "@/components/language-provider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marqueeContent = {
  es: {
    row1: ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "GSAP", "FRAMER MOTION", "NODE.JS"],
    row2: ["INTERFACES PREMIUM", "ANIMACIONES DE ALTO IMPACTO", "EXPERIENCIAS INTERACTIVAS", "CÓDIGO LIMPIO", "DISEÑO RESPONSIVE"],
    row3: ["LANDING PAGES", "APLICACIONES WEB", "E-COMMERCE", "DASHBOARDS", "CMS HEADLESS", "API REST"],
  },
  en: {
    row1: ["REACT", "NEXT.JS", "TYPESCRIPT", "TAILWIND", "GSAP", "FRAMER MOTION", "NODE.JS"],
    row2: ["PREMIUM INTERFACES", "HIGH-IMPACT ANIMATIONS", "INTERACTIVE EXPERIENCES", "CLEAN CODE", "RESPONSIVE DESIGN"],
    row3: ["LANDING PAGES", "WEB APPLICATIONS", "E-COMMERCE", "DASHBOARDS", "HEADLESS CMS", "REST API"],
  }
};

interface MarqueeRowProps {
  items: string[];
  direction?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl";
  outlined?: boolean;
}

/**
 * Componente de fila del marquee con animación automática
 */
function MarqueeRow({ 
  items, 
  direction = "left", 
  size = "lg",
  outlined = false,
}: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "text-2xl md:text-3xl",
    md: "text-4xl md:text-5xl",
    lg: "text-6xl md:text-7xl lg:text-8xl",
    xl: "text-7xl md:text-9xl lg:text-[12rem]",
  };

  // Validar que items sea un array válido
  const validItems = Array.isArray(items) ? items : [];

  useEffect(() => {
    if (!trackRef.current || validItems.length === 0) return;

    const track = trackRef.current;
    let trackWidth = 0;
    let hasCloned = false;

    // Función para clonar el contenido
    const cloneContent = () => {
      if (track.children.length > 0 && !hasCloned) {
        const firstChild = track.children[0] as HTMLElement;
        // Esperar a que el contenido tenga ancho antes de clonar
        if (firstChild.offsetWidth > 0) {
          const clone = firstChild.cloneNode(true) as HTMLElement;
          track.appendChild(clone);
          hasCloned = true;
          return true;
        }
      }
      return false;
    };

    // Función para obtener el ancho del track
    const getTrackWidth = () => {
      if (track.children.length > 0) {
        const firstChild = track.children[0] as HTMLElement;
        if (firstChild.offsetWidth > 0) {
          return firstChild.offsetWidth;
        }
      }
      // Fallback: usar scrollWidth dividido por número de hijos
      return track.scrollWidth / Math.max(track.children.length, 1);
    };

    // Inicializar con múltiples intentos
    let initAttempts = 0;
    const maxAttempts = 20;
    
    const initTimer = setInterval(() => {
      // Intentar clonar si aún no se ha clonado
      if (!hasCloned) {
        cloneContent();
      }
      
      // Verificar si tenemos el contenido clonado y el ancho
      if (track.children.length >= 2) {
        trackWidth = getTrackWidth();
        if (trackWidth > 0) {
          clearInterval(initTimer);
          startAnimation();
          return;
        }
      } else if (track.children.length === 1) {
        // Si solo hay un hijo, intentar clonar
        const cloned = cloneContent();
        if (cloned) {
          trackWidth = getTrackWidth();
          if (trackWidth > 0) {
            clearInterval(initTimer);
            startAnimation();
            return;
          }
        }
      }
      
      initAttempts++;
      if (initAttempts >= maxAttempts) {
        // Forzar clonación y animación después de maxAttempts
        if (!hasCloned && track.children.length > 0) {
          cloneContent();
        }
        trackWidth = getTrackWidth();
        clearInterval(initTimer);
        if (trackWidth > 0) {
          startAnimation();
        }
      }
    }, 50);

    // Animación automática continua
    const startAnimation = () => {
      if (trackWidth === 0 || track.children.length < 2) {
        console.warn("MarqueeRow: No se pudo inicializar correctamente", {
          trackWidth,
          childrenCount: track.children.length,
          hasCloned
        });
        return;
      }

      const duration = 30;
      const distance = direction === "left" ? -trackWidth : trackWidth;

      gsap.to(track, {
        x: distance,
        duration: duration,
        ease: "none",
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize((x) => {
            const num = parseFloat(x);
            if (direction === "left" && num <= -trackWidth) {
              return (num + trackWidth) + "px";
            } else if (direction === "right" && num >= trackWidth) {
              return (num - trackWidth) + "px";
            }
            return x;
          })
        }
      });
    };

    return () => {
      clearInterval(initTimer);
      gsap.killTweensOf(track);
    };
  }, [direction, validItems]);

  // Si no hay items válidos, retornar null silenciosamente
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  return (
    <div 
      className="overflow-visible relative w-full" 
      style={{ 
        willChange: "transform",
        opacity: 1,
        visibility: "visible",
        display: "block",
        width: "100%",
        position: "relative",
      }}
    >
      <div 
        ref={trackRef}
        className="flex items-center shrink-0"
        style={{ 
          willChange: "transform",
          transform: "translateZ(0)",
          width: "fit-content",
          opacity: 1,
          visibility: "visible",
          display: "flex",
        }}
      >
        <div className="flex items-center shrink-0">
          {validItems.map((item, index) => (
            <div key={`${item}-${index}`} className="flex items-center shrink-0">
              <span 
                className={`
                  ${sizeClasses[size]} 
                  font-display font-black uppercase whitespace-nowrap px-4 md:px-6 lg:px-8
                  transition-colors duration-300
                  ${outlined ? "text-transparent" : "text-foreground hover:text-primary"}
                `}
                style={{
                  ...(outlined ? { 
                    WebkitTextStroke: "2px hsl(var(--primary))",
                    color: "transparent"
                  } : {}),
                }}
              >
                {item}
              </span>
              <span className="text-primary text-xl md:text-3xl lg:text-4xl mx-2 md:mx-4 lg:mx-6 opacity-60">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Componente principal del marquee con efecto slide-over
 */
export function ScrollDrivenMarquee() {
  const { language } = useLanguage();
  const content = useMemo(() => {
    const langContent = marqueeContent[language as keyof typeof marqueeContent] || marqueeContent.es;
    // Asegurar que todas las propiedades existan y sean arrays
    return {
      row1: Array.isArray(langContent?.row1) ? langContent.row1 : marqueeContent.es.row1,
      row2: Array.isArray(langContent?.row2) ? langContent.row2 : marqueeContent.es.row2,
      row3: Array.isArray(langContent?.row3) ? langContent.row3 : marqueeContent.es.row3,
    };
  }, [language]);
  const sectionRef = useRef<HTMLElement>(null);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const slideOverTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (!sectionRef.current) {
      console.warn('⚠️ Marquee: sectionRef.current es null');
      return;
    }

    const section = sectionRef.current;
    console.log('🎨 Marquee: useEffect ejecutado');
    console.log('   - Section:', section);
    console.log('   - ID:', section.id);
    console.log('   - Position inicial:', window.getComputedStyle(section).position);
    console.log('   - Transform inicial:', window.getComputedStyle(section).transform);
    
    // Asegurar visibilidad básica inmediata
    // PERO NO tocar position - el hero lo manejará
    section.style.opacity = "1";
    section.style.visibility = "visible";
    section.style.display = "flex";
    
    // CRÍTICO: NO establecer position aquí - el hero lo hará
    // Si establecemos position aquí, puede interferir con el slide-over
    // También NO establecer transform aquí - el hero lo manejará
    console.log('   - Estilos aplicados (sin position ni transform):');
    console.log('     * opacity:', section.style.opacity);
    console.log('     * visibility:', section.style.visibility);
    console.log('     * display:', section.style.display);
    console.log('     * position (NO establecido):', window.getComputedStyle(section).position);
    console.log('     * transform (NO establecido):', window.getComputedStyle(section).transform);
    
    // Esperar a que el DOM esté completamente renderizado antes de obtener nextSection
    const nextSection = section?.nextElementSibling as HTMLElement | null;

    const ctx = gsap.context(() => {
      // Configuración inicial de la sección
      // NO configurar position aquí - el hero lo hará para el slide-over
      // Solo asegurar visibilidad básica
      // El hero inicializará el marquee con position: fixed y translateY(100%)
      console.log('   - GSAP context creado');
      console.log('   - NO configurando position aquí (el hero lo hará)');

      // STICKY PIN: Deshabilitado para evitar duplicación
      // En su lugar, usamos un efecto de parallax más suave
      // pinTriggerRef.current = ScrollTrigger.create({
      //   trigger: section,
      //   start: "top top",
      //   end: "+=200%",
      //   pin: true,
      //   pinSpacing: true,
      //   anticipatePin: 1,
      //   invalidateOnRefresh: false,
      //   pinReparent: false,
      //   pinType: "transform",
      // });

      // SLIDE-OVER: Deshabilitado para evitar duplicación
      // El marquee ahora simplemente se desplaza normalmente sin pin

      // Refresh después de crear todos los triggers
      setTimeout(() => {
        console.log('   - ScrollTrigger.refresh() ejecutado');
        ScrollTrigger.refresh();
      }, 300);
    }, sectionRef);

    return () => {
      ctx.revert();
      
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }
      if (slideOverTriggerRef.current) {
        slideOverTriggerRef.current.kill();
        slideOverTriggerRef.current = null;
      }
    };
  }, [language]);

  // Renderizar directamente sin condiciones complejas
  return (
    <section 
      ref={sectionRef}
      id="marquee"
      className="relative overflow-visible select-none min-h-screen flex items-center justify-center bg-transparent"
      style={{ 
        willChange: "transform",
        zIndex: 100, // Z-index alto para que se deslice sobre el hero (z-index 40)
        // CRÍTICO: NO establecer position aquí - el hero lo configurará para el slide-over
        // El hero establecerá position: fixed y translateY(100%) inicialmente
        opacity: 1,
        visibility: "visible",
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        overflow: "visible",
        backgroundColor: "hsl(var(--background))", // Fondo similar al hero
        // Asegurar que sea visible aunque esté fuera de la pantalla inicialmente
        pointerEvents: "auto",
      }}
      data-marquee-section="true"
      data-pin-section="true"
    >
      {/* Multi-layer Parallax Background - Diferente al Hero */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Background Layer - Orbs con colores diferentes */}
        <div className="orb absolute top-1/4 -right-20 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px]" />
        <div className="orb absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-emerald-600/12 rounded-full blur-[100px]" />
        <div className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px]" />
        
        {/* Code pattern - Líneas de código en lugar de grid */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.1) 2px, hsl(var(--primary) / 0.1) 4px),
              repeating-linear-gradient(90deg, transparent, transparent 2px, hsl(var(--primary) / 0.1) 2px, hsl(var(--primary) / 0.1) 4px)
            `,
            backgroundSize: "40px 40px, 40px 40px",
          }}
        />
        
        {/* Diagonal lines pattern para diferenciarlo más */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              hsl(var(--primary) / 0.1) 10px,
              hsl(var(--primary) / 0.1) 20px
            )`,
          }}
        />
      </div>

      {/* Marquee Content - Renderizar siempre */}
      <div 
        className="w-full flex flex-col items-center justify-center space-y-6 md:space-y-10 py-16 md:py-24 relative z-10" 
        style={{ 
          opacity: 1,
          visibility: "visible",
          display: "flex",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* Row 1 */}
        <div className="marquee-row w-full flex justify-center relative z-10">
          <MarqueeRow 
            items={content.row1} 
            direction="left" 
            size="xl"
            outlined={true}
          />
        </div>
        
        {/* Row 2 */}
        <div className="marquee-row w-full flex justify-center relative z-10">
          <MarqueeRow 
            items={content.row2} 
            direction="right" 
            size="md"
          />
        </div>

        {/* Row 3 */}
        <div className="marquee-row w-full flex justify-center relative z-10">
          <MarqueeRow 
            items={content.row3} 
            direction="left" 
            size="lg"
            outlined={true}
          />
        </div>
      </div>
    </section>
  );
}
