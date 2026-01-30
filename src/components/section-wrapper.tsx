"use client";

import { ReactNode, useRef, useEffect } from "react";
import { useMultiLayerParallax, useMagnetic, use3DTilt, useKineticTypography } from "@/lib/advanced-effects";
import { GlassmorphismWrapper } from "./glassmorphism-wrapper";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  enableParallax?: boolean;
  enableMagnetic?: boolean;
  enable3D?: boolean;
  enableKinetic?: boolean;
  enableGlass?: boolean;
  parallaxLayers?: Array<{ speed: number }>;
}

export function SectionWrapper({
  children,
  className = "",
  enableParallax = false,
  enableMagnetic = false,
  enable3D = false,
  enableKinetic = false,
  enableGlass = false,
  parallaxLayers = [{ speed: 0.3 }, { speed: 0.5 }, { speed: 0.7 }],
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const midgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);

  // Setup parallax layers
  useEffect(() => {
    if (enableParallax && sectionRef.current) {
      const layers = [];
      if (backgroundRef.current) layers.push({ ref: backgroundRef, speed: parallaxLayers[0]?.speed || 0.3 });
      if (midgroundRef.current) layers.push({ ref: midgroundRef, speed: parallaxLayers[1]?.speed || 0.5 });
      if (foregroundRef.current) layers.push({ ref: foregroundRef, speed: parallaxLayers[2]?.speed || 0.7 });
      
      if (layers.length > 0) {
        // useMultiLayerParallax will be called via the hook
      }
    }
  }, [enableParallax, parallaxLayers]);

  const content = (
    <section ref={sectionRef} className={`relative ${className}`}>
      {/* Parallax layers */}
      {enableParallax && (
        <>
          <div ref={backgroundRef} className="absolute inset-0 -z-10" />
          <div ref={midgroundRef} className="absolute inset-0 -z-5" />
          <div ref={foregroundRef} className="absolute inset-0 -z-1" />
        </>
      )}
      {children}
    </section>
  );

  if (enableGlass) {
    return <GlassmorphismWrapper>{content}</GlassmorphismWrapper>;
  }

  return content;
}
