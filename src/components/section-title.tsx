"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { splitTextToChars, EASE } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionTitle({ title, subtitle, align = "center", className = "" }: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Card entrance with scale and rotation
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { 
            y: 80, 
            opacity: 0, 
            scale: 0.8,
            rotateX: -30,
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
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Glow pulse animation
      if (glowRef.current) {
        gsap.fromTo(glowRef.current,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 0.4,
            duration: 1.5,
            ease: EASE.elastic,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // Title text split animation
      if (titleRef.current) {
        const chars = splitTextToChars(titleRef.current);
        
        gsap.fromTo(chars,
          { 
            y: 40, 
            opacity: 0,
            rotateX: -90,
            transformPerspective: 1000,
            transformOrigin: "center bottom"
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: EASE.brutalOut,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            },
            delay: 0.3
          }
        );
      }

      // Subtitle words animation
      if (subtitleRef.current && subtitle) {
        const text = subtitleRef.current.textContent || "";
        subtitleRef.current.innerHTML = "";
        
        // Preservar espacios correctamente dividiendo por palabras y espacios
        const parts = text.split(/(\s+)/).filter(part => part.length > 0);
        const words = parts.map(part => {
          const span = document.createElement("span");
          if (part.trim() === "") {
            // Es un espacio, mantenerlo como espacio normal
            span.textContent = part;
            span.style.display = "inline";
            span.style.opacity = "1"; // Los espacios siempre visibles
          } else {
            // Es una palabra, animarla
            span.textContent = part;
            span.style.display = "inline-block";
            span.style.opacity = "0";
          }
          subtitleRef.current?.appendChild(span);
          return span;
        }).filter(span => span.style.display === "inline-block"); // Solo animar las palabras

        gsap.fromTo(words,
          { 
            y: 30, 
            opacity: 0,
            filter: "blur(10px)"
          },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.04,
            ease: EASE.smooth,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            delay: 0.6
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, [subtitle]);

  return (
    <div 
      ref={containerRef}
      className={`${align === "center" ? "text-center" : "text-left"} mb-16 md:mb-20 ${className}`}
    >
      <div className={`inline-block ${align === "center" ? "mx-auto" : ""}`}>
        <div 
          ref={cardRef}
          className="group relative cursor-default"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Gradient glow effect */}
          <div 
            ref={glowRef}
            className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" 
          />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-xl opacity-50 group-hover:opacity-90 transition-opacity duration-500" />
          
          {/* Card */}
          <div className="relative bg-black px-8 py-4 md:px-12 md:py-5 rounded-xl border border-white/10 overflow-hidden">
            {/* Animated line */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
            
            <h2 
              ref={titleRef}
              className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight"
            >
              {title}
            </h2>
          </div>
        </div>
      </div>
      
      {subtitle && (
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
