"use client";

import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StickySectionProps {
  children: ReactNode;
  sectionIndex: number;
  className?: string;
}

export function StickySection({ children, sectionIndex, className = "" }: StickySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const section = sectionRef.current;
    const zIndex = 1000 - sectionIndex; // Z-index decreciente para slide-over

    // Configurar sticky con pin
    const pinTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200%", // Duración del pin
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: false,
    });

    // Efecto slide-over: la siguiente sección sube y cubre esta
    const nextSection = section.nextElementSibling as HTMLElement;
    if (nextSection) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          // La siguiente sección sube y cubre esta
          gsap.set(nextSection, {
            y: -progress * 100, // Sube mientras scrolleamos
            zIndex: zIndex - 1,
            force3D: true,
          });
        },
        invalidateOnRefresh: false,
      });
    }

    return () => {
      pinTrigger.kill();
    };
  }, [sectionIndex]);

  return (
    <section
      ref={sectionRef}
      className={`sticky-section relative ${className}`}
      style={{
        zIndex: 1000 - sectionIndex,
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      {children}
    </section>
  );
}
