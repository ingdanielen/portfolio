"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { configureScrollTrigger } from "@/lib/scrolltrigger-config";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: false,
      syncTouchLerp: 0.075,
    });

    lenisRef.current = lenis;

    // RAF loop para Lenis
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Integración Lenis + ScrollTrigger
    // Sincronizar ScrollTrigger con el scroll de Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Configurar ScrollTrigger globalmente DESPUÉS de Lenis
    const cleanupConfig = configureScrollTrigger();
    
    // Inicializar ScrollTrigger inmediatamente
    ScrollTrigger.refresh();

    // Configurar ScrollTrigger para usar Lenis como scroller
    // Usar document.body como scroller para mejor compatibilidad con ScrollTrigger
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    // Refresh después de que Lenis esté completamente inicializado
    // Usar un delay más largo para asegurar que todo esté listo
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }, 500);
    
    // Refresh adicional después de que el DOM esté completamente renderizado
    const domReadyTimer = setTimeout(() => {
      if (document.readyState === 'complete') {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
      }
    }, 1000);

    // Refresh en resize y load
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", handleLoad);

    // Clean up on unmount
    return () => {
      clearTimeout(refreshTimer);
      clearTimeout(domReadyTimer);
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleLoad);
      if (cleanupConfig) cleanupConfig(); // Cleanup de configuración
      ScrollTrigger.scrollerProxy(document.body, {}); // Reset proxy
      lenis.destroy();
      ScrollTrigger.refresh(); // Final refresh
    };
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
}
