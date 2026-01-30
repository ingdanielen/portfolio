"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import gsap from "gsap";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate 404 number
      if (numberRef.current) {
        gsap.fromTo(numberRef.current,
          { scale: 0.5, opacity: 0, rotateX: -90 },
          { 
            scale: 1, 
            opacity: 1, 
            rotateX: 0,
            duration: 1.2,
            ease: "power4.out"
          }
        );

        // Floating animation
        gsap.to(numberRef.current, {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });
      }

      // Animate text
      if (textRef.current) {
        gsap.fromTo(textRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.5,
            ease: "power3.out"
          }
        );
      }

      // Glitch effect on 404
      const glitchInterval = setInterval(() => {
        if (numberRef.current) {
          gsap.to(numberRef.current, {
            x: Math.random() * 10 - 5,
            duration: 0.1,
            repeat: 3,
            yoyo: true,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(numberRef.current, { x: 0 });
            }
          });
        }
      }, 3000);

      return () => clearInterval(glitchInterval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[200px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[180px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center">
        {/* 404 Number */}
        <div 
          ref={numberRef}
          className="perspective mb-8"
        >
          <h1 
            className="text-[12rem] md:text-[20rem] font-display font-black leading-none select-none"
            style={{
              WebkitTextStroke: "2px hsl(var(--primary))",
              color: "transparent",
              textShadow: "0 0 60px hsl(var(--primary) / 0.3), 0 0 120px hsl(var(--primary) / 0.1)"
            }}
          >
            404
          </h1>
        </div>

        {/* Text content */}
        <div ref={textRef} className="space-y-6 max-w-lg mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Página no encontrada
          </h2>
          <p className="text-lg text-muted-foreground">
            La página que buscas no existe o ha sido movida. 
            Pero no te preocupes, puedes volver al inicio.
          </p>
          
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
            >
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Ir al inicio
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 border-white/20 hover:border-primary hover:bg-primary/10"
              onClick={() => window.history.back()}
            >
              <Link href="#" onClick={(e) => { e.preventDefault(); window.history.back(); }}>
                <ArrowLeft className="mr-2 h-5 w-5" />
                Volver atrás
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground/50 font-mono text-sm">
          Error 404 • Page Not Found
        </div>
      </div>
    </div>
  );
}
