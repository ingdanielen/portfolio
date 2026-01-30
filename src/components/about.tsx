"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionTitle } from "@/components/section-title"
import { SubSectionTitle } from "@/components/sub-section-title"
import { useRef, useState, useEffect } from "react"
import { Code, Palette, Video, Lightbulb, ChevronRight, Briefcase, GraduationCap, ArrowUpRight } from "lucide-react"
import Image from "next/image"
import { aboutContent } from "@/constants/about"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EASE, create3DTilt } from "@/lib/animations"
import { useStickyPin, useVariableFont, useMultiLayerParallax, useKineticTypography } from "@/lib/advanced-effects"

gsap.registerPlugin(ScrollTrigger)

const iconMap = {
  code: <Code className="h-6 w-6" />,
  palette: <Palette className="h-6 w-6" />,
  video: <Video className="h-6 w-6" />,
  lightbulb: <Lightbulb className="h-6 w-6" />,
}

// MEGA Experience Card - Full width, alternando izquierda/derecha con código en espacio muerto
function MegaExperienceCard({ 
  item, 
  index,
  total
}: { 
  item: { year: string; title: string; company?: string; description?: string }; 
  index: number;
  total: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax number
      if (numberRef.current && cardRef.current) {
        gsap.to(numberRef.current, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      // Content reveal
      if (contentRef.current && cardRef.current) {
        gsap.fromTo(contentRef.current,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const isEven = index % 2 === 0;
  
  // Imágenes de código según la empresa - Más visibles
  const getCodeImage = (company?: string) => {
    if (!company) return null;
    const companyLower = company.toLowerCase();
    if (companyLower.includes('litsight')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.8 }}>
            {/* Líneas de código más detalladas */}
            <text x="30" y="50" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.9">
              {`// Litsight Platform - Talent Management`}
            </text>
            <text x="30" y="80" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.85">
              {`interface TalentProfile {`}
            </text>
            <text x="50" y="105" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.8">
              {`  discScore: DISCResult;`}
            </text>
            <text x="50" y="130" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.8">
              {`  lccAssessment: LCCData;`}
            </text>
            <text x="50" y="155" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.8">
              {`  leadershipMetrics: number[];`}
            </text>
            <text x="30" y="180" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.85">
              {`}`}
            </text>
            <text x="30" y="210" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`const evaluateTalent = async (`}
            </text>
            <text x="50" y="235" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`  profile: TalentProfile`}
            </text>
            <text x="30" y="260" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`) => {`}
            </text>
            <text x="50" y="285" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`  return analyzeLeadership(profile);`}
            </text>
            <text x="30" y="310" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`};`}
            </text>
            {/* Números de línea decorativos */}
            <text x="10" y="50" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`1`}
            </text>
            <text x="10" y="80" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`2`}
            </text>
            <text x="10" y="105" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`3`}
            </text>
          </svg>
        </div>
      );
    } else if (companyLower.includes('naowee')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.8 }}>
            {/* Código Next.js/React más detallado */}
            <text x="30" y="50" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.9">
              {`// Naowee Platform - Scalable Web Apps`}
            </text>
            <text x="30" y="80" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.85">
              {`import { NextPage } from 'next';`}
            </text>
            <text x="30" y="105" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.85">
              {`import { useSelector } from 'react-redux';`}
            </text>
            <text x="30" y="130" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.85">
              {`import type { AppState } from '@/store';`}
            </text>
            <text x="30" y="160" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`const PlatformPage: NextPage = () => {`}
            </text>
            <text x="50" y="185" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`  const state = useSelector((s: AppState) => s);`}
            </text>
            <text x="50" y="210" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`  return (`}
            </text>
            <text x="70" y="235" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`<div className="container">`}
            </text>
            <text x="90" y="260" fill="hsl(var(--primary))" fontSize="14" fontFamily="'Courier New', monospace" opacity="0.7">
              {`<ScalableComponent />`}
            </text>
            <text x="70" y="285" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`</div>`}
            </text>
            <text x="50" y="310" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`  );`}
            </text>
            <text x="30" y="335" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`};`}
            </text>
            {/* Números de línea decorativos */}
            <text x="10" y="50" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`1`}
            </text>
            <text x="10" y="80" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`2`}
            </text>
            <text x="10" y="105" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`3`}
            </text>
          </svg>
        </div>
      );
    } else if (companyLower.includes('kymbo')) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" style={{ opacity: 0.8 }}>
            {/* Código WordPress/PHP más detallado */}
            <text x="30" y="50" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.9">
              {`// Kymbo Devs - E-commerce Solutions`}
            </text>
            <text x="30" y="80" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.85">
              {`<?php`}
            </text>
            <text x="30" y="105" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`  $site = new WordPressSite([`}
            </text>
            <text x="50" y="130" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`    'type' => 'ecommerce',`}
            </text>
            <text x="50" y="155" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`    'platform' => 'WooCommerce',`}
            </text>
            <text x="50" y="180" fill="hsl(var(--primary))" fontSize="15" fontFamily="'Courier New', monospace" opacity="0.75">
              {`    'lowCode' => true`}
            </text>
            <text x="30" y="205" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`  ]);`}
            </text>
            <text x="30" y="235" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.75">
              {`  $site->buildLandingPage();`}
            </text>
            <text x="30" y="260" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.75">
              {`  $site->deploy();`}
            </text>
            <text x="30" y="285" fill="hsl(var(--primary))" fontSize="16" fontFamily="'Courier New', monospace" opacity="0.8">
              {`?>`}
            </text>
            {/* Números de línea decorativos */}
            <text x="10" y="50" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`1`}
            </text>
            <text x="10" y="80" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`2`}
            </text>
            <text x="10" y="105" fill="hsl(var(--primary))" fontSize="10" fontFamily="'Courier New', monospace" opacity="0.2">
              {`3`}
            </text>
          </svg>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      ref={cardRef}
      className="exp-mega group relative min-h-[300px] md:min-h-[380px] overflow-hidden rounded-3xl"
    >
      {/* Grid layout similar a featured projects */}
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch h-full ${isEven ? '' : 'lg:flex-row-reverse'}`}>
        {/* Code Section - Similar a imagen en featured projects - Más prominente */}
        <div className={`relative overflow-hidden ${isEven ? 'lg:col-span-7 lg:rounded-l-3xl' : 'lg:col-span-7 lg:order-2 lg:rounded-r-3xl'} min-h-[200px] lg:min-h-full`}>
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-purple-500 to-primary rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-all duration-700 -z-10" />
          
          {/* Code background - Más visible y destacado */}
          <div className="absolute inset-0 z-[1] opacity-100">
            {getCodeImage(item.company)}
          </div>
          
          {/* Gradient overlay - Degradado muy suave y gradual desde código transparente hasta negro en el borde con contenido */}
          <div 
            className="absolute inset-0 z-[2]"
            style={{
              backgroundImage: `linear-gradient(to ${isEven ? 'right' : 'left'}, 
                transparent 0%, 
                hsl(var(--background) / 0.05) 20%, 
                hsl(var(--background) / 0.15) 40%, 
                hsl(var(--background) / 0.30) 60%, 
                hsl(var(--background) / 0.50) 75%, 
                hsl(var(--background) / 0.70) 85%, 
                hsl(var(--background) / 0.90) 100%
              )`
            }}
          />
          
          {/* Spotlight overlay similar a featured projects */}
          <div className="absolute inset-0 pointer-events-none transition-all duration-300 z-[2]" />
          
          {/* Giant number - Más visible */}
          <div 
            ref={numberRef}
            className={`absolute ${isEven ? 'top-6 left-6' : 'top-6 right-6'} pointer-events-none select-none z-[2]`}
          >
            <span 
              className="text-7xl md:text-8xl lg:text-9xl font-display font-black leading-none"
              style={{ 
                WebkitTextStroke: "2px hsl(var(--primary) / 0.25)", 
                color: "transparent"
              }}
            >
              0{index + 1}
            </span>
          </div>
        </div>

        {/* Content Section - Similar a featured projects */}
        <div className={`relative bg-card dark:bg-black p-6 lg:p-8 flex flex-col justify-center ${isEven ? 'lg:col-span-5 lg:rounded-r-3xl' : 'lg:col-span-5 lg:order-1 lg:rounded-l-3xl'}`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 dark:opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div 
            ref={contentRef}
            className="relative z-[3] space-y-4"
          >
            {/* Year badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 border border-primary/30 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-primary text-sm font-mono uppercase tracking-wider">
                {item.year}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-black text-foreground dark:text-white leading-tight">
              {item.title}
            </h3>

            {/* Company with icon */}
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-primary/20 text-primary">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-lg md:text-xl font-display font-semibold text-foreground/90 dark:text-white/90">
                {item.company}
              </span>
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-muted-foreground dark:text-white/70 text-base leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Decorative line */}
            <div className="h-0.5 w-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 group-hover:w-full transition-all duration-1000" />
          </div>
        </div>
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 border border-border/50 dark:border-white/5 rounded-3xl group-hover:border-primary/30 transition-all duration-500 pointer-events-none" />
    </div>
  );
}

// BRUTAL TIMELINE - Educación revolucionaria
function TimelineEducation({ items, language }: { items: Array<{ year: string; title: string; institution?: string }>; language: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanupFns: (() => void)[] = [];
    
    const ctx = gsap.context(() => {
      if (!containerRef.current || !timelineRef.current || !lineRef.current || !progressRef.current) return;

      const cards = timelineRef.current.querySelectorAll('.timeline-card');
      const totalHeight = timelineRef.current.scrollHeight;
      
      // Animación de la línea de progreso
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(progressRef.current, {
            height: `${progress * 100}%`,
            force3D: true,
          });
        }
      });

      // Animación de entrada brutal para cada card
      cards.forEach((card, i) => {
        const isRight = i % 2 === 0; // Pares a la derecha, impares a la izquierda
        const cardElement = card as HTMLElement;
        const dot = cardElement.querySelector('.timeline-dot');
        const content = cardElement.querySelector('.timeline-content');
        
        // Entrada desde diferentes direcciones
        gsap.fromTo(cardElement,
          { 
            x: isRight ? 200 : -200,
            y: 100,
            opacity: 0,
            scale: 0.5,
            rotateY: isRight ? 45 : -45,
            transformPerspective: 1200,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            delay: i * 0.2,
            ease: EASE.brutalOut,
            scrollTrigger: {
              trigger: cardElement,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Animación del dot
        if (dot) {
          gsap.fromTo(dot,
            { scale: 0, rotation: -180 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.8,
              delay: i * 0.2 + 0.3,
              ease: EASE.elastic,
              scrollTrigger: {
                trigger: cardElement,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }

        // Parallax en scroll
        ScrollTrigger.create({
          trigger: cardElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(content, {
              y: progress * 30 * (isRight ? 1 : -1),
              opacity: 1 - progress * 0.3,
              force3D: true,
            });
          }
        });

        // 3D tilt effect
        const cleanup = create3DTilt(cardElement, {
          maxTilt: 8,
          scale: 1.05,
          glare: true
        });
        cleanupFns.push(cleanup);
      });

      // Animación de la línea central
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          duration: 1.5,
          ease: EASE.brutalOut,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, containerRef);

    return () => {
      ctx.revert();
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-4 mb-12">
        <SubSectionTitle 
          title={language === 'es' ? 'Educación' : 'Education'}
          subtitle={language === 'es' ? 'Formación académica' : 'Academic background'}
          icon={<GraduationCap className="w-6 h-6" />}
          counter={items.length}
          size="lg"
        />
      </div>

      {/* Timeline Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto px-4">
        {/* Central Timeline Line */}
        <div 
          ref={lineRef}
          className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden md:block"
          style={{ transformOrigin: "top" }}
        >
          {/* Base line */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-purple-500 to-pink-500 opacity-20 dark:opacity-20" />
          
          {/* Progress line */}
          <div 
            ref={progressRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-purple-500 to-pink-500"
            style={{ height: "0%", transition: "height 0.1s linear" }}
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary via-purple-500 to-pink-500 blur-md opacity-30 dark:opacity-30" />
        </div>

        {/* Timeline Cards */}
        <div ref={timelineRef} className="relative space-y-16 md:space-y-20">
          {items.map((item, index) => {
            // Patrón intercalado simple: derecha, izquierda, derecha, izquierda...
            // index 0: derecha (par)
            // index 1: izquierda (impar)
            // index 2: derecha (par)
            const isRight = index % 2 === 0; // Pares a la derecha, impares a la izquierda
            const isLast = index === items.length - 1;
            
            return (
              <div
                key={index}
                className="timeline-card group relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Card Container - Alternado derecha/izquierda */}
                <div className="relative flex items-center gap-6 md:gap-8">
                  {/* Spacer izquierdo - solo cuando la card está a la derecha */}
                  {isRight && <div className="hidden md:block flex-1" />}
                  
                  {/* Central Dot - siempre en el centro */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="timeline-dot relative">
                      {/* Outer glow rings */}
                      <div className="absolute inset-0 rounded-full bg-primary/20 dark:bg-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
                      <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary/10 animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }} />
                      
                      {/* Main dot */}
                      <div className="relative w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-primary via-purple-500 to-pink-500 border-3 dark:border-4 border-background dark:border-black shadow-lg shadow-primary/50">
                        {/* Inner glow */}
                        <div className="absolute inset-0 rounded-full bg-white/30 dark:bg-white/30 blur-sm" />
                        
                        {/* Number inside dot */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] md:text-xs font-display font-black text-white">
                            {index + 1}
                          </span>
                        </div>
                      </div>
                      
                      {/* Connection line to card */}
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 w-12 md:w-20 h-0.5 bg-gradient-to-r ${
                          isRight 
                            ? 'right-full from-transparent to-primary' 
                            : 'left-full from-primary to-transparent'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Card Content - Intercalado */}
                  <div className={`timeline-content flex-1 max-w-md ${isRight ? 'md:text-left' : 'md:text-right'}`}>
                    <div className="group/card relative">
                      {/* Glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-0 dark:opacity-0 group-hover/card:opacity-40 dark:group-hover/card:opacity-40 transition-all duration-700" />
                      
                      {/* Main Card */}
                      <div className="relative bg-background dark:bg-black rounded-2xl border-2 border-border dark:border-white/10 overflow-hidden group-hover/card:border-primary/50 dark:group-hover/card:border-primary/50 transition-all duration-500">
                        {/* Top accent line */}
                        <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-500 to-pink-500" />
                        
                        <div className="p-5 md:p-6">
                          {/* Year Badge */}
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 dark:bg-primary/20 border border-primary/30 dark:border-primary/30 rounded-full mb-3 ${
                            isRight ? '' : 'md:ml-auto'
                          }`}>
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                            <span className="text-primary text-xs font-mono font-bold uppercase tracking-wider">
                              {item.year}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="text-xl md:text-2xl lg:text-3xl font-display font-black text-foreground dark:text-white mb-2 group-hover/card:text-primary dark:group-hover/card:text-primary transition-colors duration-300 leading-tight">
                            {item.title}
                          </h4>

                          {/* Institution */}
                          <div className={`flex items-center gap-2 text-muted-foreground dark:text-white/70 ${
                            isRight ? '' : 'md:justify-end'
                          }`}>
                            <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
                            <span className="text-base md:text-lg font-display font-semibold">
                              {item.institution}
                            </span>
                          </div>

                          {/* Decorative elements */}
                          <div className={`mt-4 h-0.5 w-0 bg-gradient-to-r ${
                            isRight 
                              ? 'from-primary via-primary to-transparent' 
                              : 'from-transparent via-primary to-primary md:ml-auto'
                          } group-hover/card:w-full transition-all duration-1000`} />
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5 dark:from-primary/5 dark:to-purple-500/5 opacity-0 group-hover/card:opacity-100 dark:group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Spacer derecho - solo cuando la card está a la izquierda */}
                  {!isRight && <div className="hidden md:block flex-1" />}
                </div>

                {/* Connection line to next item (except last) */}
                {!isLast && (
                  <div className="absolute left-1/2 top-full -translate-x-1/2 w-0.5 h-16 md:h-20 bg-gradient-to-b from-primary/50 via-purple-500/30 to-transparent dark:from-primary/50 dark:via-purple-500/30 dark:to-transparent hidden md:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function About() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const experienceRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState(0)

  const currentContent = aboutContent[language as keyof typeof aboutContent]

  useEffect(() => {
    const cleanupFns: (() => void)[] = [];
    
    const ctx = gsap.context(() => {
      // ====================================
      // INTRO - BRUTAL WORD SPLIT
      // ====================================
      if (introRef.current) {
        const children = Array.from(introRef.current.children);
        
        children.forEach((child, i) => {
          gsap.fromTo(child,
            { 
              y: 80, 
              opacity: 0,
              rotateX: -40,
              transformPerspective: 1000,
              transformOrigin: "center bottom"
            },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 1,
              delay: i * 0.15,
              ease: EASE.brutalOut,
              scrollTrigger: {
                trigger: introRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

      // ====================================
      // TABS - STAGGER WITH SKEW
      // ====================================
      if (tabsRef.current) {
        const buttons = tabsRef.current.querySelectorAll('button');
        gsap.fromTo(buttons,
          { 
            x: -80, 
            opacity: 0,
            skewX: -10,
            scale: 0.9
          },
          {
            x: 0,
            opacity: 1,
            skewX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: EASE.brutalOut,
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      // ====================================
      // CONTENT - CLIP PATH REVEAL
      // ====================================
      if (contentRef.current) {
        gsap.fromTo(contentRef.current,
          { 
            clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
            opacity: 0
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            opacity: 1,
            duration: 1.2,
            ease: EASE.brutalOut,
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Add 3D tilt to content panel
        const cleanup = create3DTilt(contentRef.current, {
          maxTilt: 5,
          scale: 1.02,
          glare: true
        });
        cleanupFns.push(cleanup);
      }

      // ====================================
      // EXPERIENCE MEGA CARDS - CINEMATIC
      // ====================================
      if (experienceRef.current) {
        const cards = experienceRef.current.querySelectorAll('.exp-mega');
        cards.forEach((card, i) => {
          const isEven = i % 2 === 0;
          
          gsap.fromTo(card,
            { 
              opacity: 0,
              x: isEven ? -80 : 80,
              scale: 0.92,
              rotateY: isEven ? -8 : 8,
              transformPerspective: 1000
            },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              rotateY: 0,
              duration: 1.2,
              ease: EASE.brutalOut,
              force3D: true,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
                invalidateOnRefresh: false,
              }
            }
          );
        });
      }

    }, sectionRef);

    return () => {
      ctx.revert();
      cleanupFns.forEach(fn => fn());
    };
  }, [])

  // Tab change animation - Optimizado
  const handleTabChange = (index: number) => {
    if (index === activeTab) return
    
    gsap.to(contentRef.current, {
      opacity: 0,
      x: 20,
      duration: 0.15,
      ease: "power2.in",
      force3D: true,
      onComplete: () => {
        setActiveTab(index)
        gsap.fromTo(contentRef.current,
          { opacity: 0, x: -20 },
          { 
            opacity: 1, 
            x: 0, 
            duration: 0.25, 
            ease: "power2.out",
            force3D: true,
          }
        )
      }
    })
  }

  // Multi-layer Parallax
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const midgroundLayerRef = useRef<HTMLDivElement>(null);
  const foregroundLayerRef = useRef<HTMLDivElement>(null);
  
  useMultiLayerParallax(
    [
      { ref: backgroundLayerRef, speed: 0.18 },
      { ref: midgroundLayerRef, speed: 0.38 },
      { ref: foregroundLayerRef, speed: 0.58 }
    ],
    sectionRef
  );

  return (
    <section 
      ref={sectionRef} 
      id="about" 
      className="py-24 md:py-32 relative overflow-hidden"
      style={{
        zIndex: 201, // Z-index más alto que What I Build (200) para asegurar que esté encima
        position: "relative",
        isolation: "isolate", // Crear nuevo contexto de apilamiento
      }}
    >
      {/* Multi-layer Parallax Background */}
      <div ref={backgroundLayerRef} className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
      </div>
      <div ref={midgroundLayerRef} className="absolute inset-0 -z-5">
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />
      </div>
      <div ref={foregroundLayerRef} className="absolute inset-0 -z-1">
        <div className="absolute top-1/2 right-1/3 w-[200px] h-[200px] bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[180px] h-[180px] bg-purple-500/3 rounded-full blur-[110px]" />
      </div>

      <div className="container mx-auto px-4">
        {/* Title */}
        <SectionTitle title={currentContent.title} />

        {/* Intro text */}
        <div ref={introRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <p className="text-xl text-primary mb-4 font-medium">{currentContent.subtitle}</p>
          <p className="text-lg text-muted-foreground">{currentContent.description}</p>
          <p className="text-lg mt-4 font-medium">{currentContent.passion}</p>
        </div>

        {/* Tabs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          {/* Tab buttons */}
          <div ref={tabsRef} className="lg:col-span-1 space-y-3">
            <div className="sticky top-24">
              {currentContent.tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`w-full text-left p-5 rounded-xl flex items-center gap-4 transition-all duration-300 mb-3 group ${
                    activeTab === index 
                      ? "bg-black border border-primary/50 shadow-lg shadow-primary/20" 
                      : "bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg transition-colors ${
                      activeTab === index ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {iconMap[tab.iconKey as keyof typeof iconMap]}
                  </div>
                  <span className={`font-display font-semibold ${activeTab === index ? "text-white" : ""}`}>
                    {tab.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div
            ref={contentRef}
            className="lg:col-span-2 bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="relative h-48 md:h-64 overflow-hidden">
              <Image
                src={currentContent.tabs[activeTab].image || "/placeholder.svg"}
                alt={currentContent.tabs[activeTab].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{currentContent.tabs[activeTab].title}</h3>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-lg mb-6 text-white/70 leading-relaxed">
                {currentContent.tabs[activeTab].description}
              </p>
              <ul className="space-y-3">
                {currentContent.tabs[activeTab].points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 group text-white/80"
                  >
                    <ChevronRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE - FULL WIDTH MEGA SECTION */}
      <div className="mb-16">
        {/* Section header */}
        <div className="container mx-auto px-4 mb-12">
          <SubSectionTitle 
            title={language === 'es' ? 'Experiencia' : 'Experience'}
            subtitle={language === 'es' ? 'Trayectoria profesional' : 'Professional journey'}
            icon={<Briefcase className="w-6 h-6" />}
            counter={currentContent.experience.length}
            size="lg"
          />
        </div>

        {/* Mega cards */}
        <div ref={experienceRef}>
          {currentContent.experience.map((item, index) => (
            <MegaExperienceCard 
              key={index}
              item={item}
              index={index}
              total={currentContent.experience.length}
            />
          ))}
        </div>
      </div>

      {/* EDUCATION - BRUTAL TIMELINE */}
      <TimelineEducation items={currentContent.education} language={language} />
    </section>
  )
}
