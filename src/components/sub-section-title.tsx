"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

interface SubSectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  counter?: string | number;
  align?: "center" | "left";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SubSectionTitle({ 
  title, 
  subtitle, 
  icon,
  counter,
  align = "left", 
  size = "md",
  className = "" 
}: SubSectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: "text-xl md:text-2xl px-5 py-3",
    md: "text-2xl md:text-3xl px-6 py-4",
    lg: "text-3xl md:text-4xl px-8 py-5"
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(cardRef.current,
          { 
            y: 50, 
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
            duration: 1,
            ease: EASE.brutalOut,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`flex items-center ${align === "center" ? "justify-center" : "justify-between"} gap-6 mb-8 ${className}`}
    >
      <div className={`flex items-center gap-4 ${align === "center" ? "" : ""}`}>
        {/* Icon with glow */}
        {icon && (
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-primary/50 rounded-xl blur-lg" />
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white">
              {icon}
            </div>
          </div>
        )}
        
        {/* Title card with gradient border */}
        <div 
          ref={cardRef}
          className="group relative"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Gradient glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-xl blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500" />
          
          {/* Card */}
          <div className={`relative bg-black rounded-lg border border-white/10 ${sizeClasses[size]}`}>
            <h3 className="font-display font-bold text-white tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-white/60 mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Counter */}
      {counter && (
        <div className="hidden md:block">
          <span 
            className="text-5xl lg:text-6xl font-display font-black"
            style={{ WebkitTextStroke: "2px hsl(var(--primary))", color: "transparent" }}
          >
            {typeof counter === 'number' ? String(counter).padStart(2, '0') : counter}
          </span>
        </div>
      )}
    </div>
  );
}
