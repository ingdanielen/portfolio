"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { heroContent } from "@/constants";
import {
  useMultiLayerParallax
} from "@/lib/advanced-effects";
import {
  createMagneticEffect,
  EASE,
  splitTextToChars
} from "@/lib/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, FileText, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Hero({
  useProfileImage = false,
}: {
  useProfileImage?: boolean;
}) {
  const { language, isReady } = useLanguage();
  const currentContent = heroContent[language as keyof typeof heroContent] || heroContent.es;
  
  const heroRef = useRef<HTMLElement>(null);
  const greetingRef = useRef<HTMLParagraphElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const midgroundRef = useRef<HTMLDivElement>(null);
  const foregroundRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const cleanupFnsRef = useRef<(() => void)[]>([]);
  const pinTriggerRef = useRef<ScrollTrigger | null>(null);
  const slideOverTriggerRef = useRef<ScrollTrigger | null>(null);
  
  // Multi-layer Parallax for Hero
  useMultiLayerParallax(
    [
      { ref: backgroundRef, speed: 0.1 },
      { ref: midgroundRef, speed: 0.3 },
      { ref: foregroundRef, speed: 0.5 }
    ],
    heroRef
  );

  const getPdfUrl = () => {
    if (!isReady) return "/pdf/Daniel Escorcia - Desarrollador Web.pdf";
    return language === "es" 
      ? "/pdf/Daniel Escorcia - Desarrollador Web.pdf" 
      : "/pdf/Daniel Escorcia - Web Developer.pdf";
  };

  // Scramble text effect
  const scrambleText = useCallback((element: HTMLElement, finalText: string, duration: number = 1.5) => {
    const chars = "!<>-_\\/[]{}—=+*^?#@$%&ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let iteration = 0;
    const speed = (duration * 1000) / (finalText.length * 3);
    
    const animate = () => {
      element.textContent = finalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < iteration) return finalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");
      
      if (iteration < finalText.length) {
        iteration += 1/3;
        setTimeout(animate, speed);
      }
    };
    
    return animate;
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    
    // NO esperar - ejecutar inmediatamente para que las animaciones funcionen
    const ctx = gsap.context(() => {
      // ====================================
      // BRUTAL MASTER TIMELINE
      // ====================================
      const masterTL = gsap.timeline({
        defaults: { ease: EASE.brutalOut }
      });

      // ====================================
      // BACKGROUND ANIMATION
      // ====================================
      if (backgroundRef.current) {
        const orbs = backgroundRef.current.querySelectorAll('.orb');
        gsap.fromTo(orbs,
          { scale: 0, opacity: 0 },
          { 
            scale: 1, 
            opacity: 1, 
            duration: 2,
            stagger: 0.3,
            ease: "elastic.out(1, 0.5)"
          }
        );

        // Floating animation for orbs
        orbs.forEach((orb, i) => {
          gsap.to(orb, {
            y: "random(-30, 30)",
            x: "random(-20, 20)",
            duration: "random(4, 6)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5
          });
        });
      }

      // ====================================
      // GREETING - SCRAMBLE EFFECT
      // ====================================
      if (greetingRef.current) {
        const greetingText = currentContent.greeting;
        greetingRef.current.textContent = "";
        
        masterTL.add(() => {
          if (greetingRef.current) {
            gsap.to(greetingRef.current, { opacity: 1, duration: 0.1 });
            scrambleText(greetingRef.current, greetingText, 1)();
          }
        }, 0.3);
      }

      // ====================================
      // NAME - SPLIT CHARS WITH 3D ROTATION
      // ====================================
      if (firstNameRef.current) {
        const chars = splitTextToChars(firstNameRef.current);
        
        masterTL.fromTo(chars,
          { 
            y: 120, 
            rotateX: -90, 
            rotateY: gsap.utils.wrap([-25, 25]),
            opacity: 0,
            scale: 0.5,
            transformPerspective: 1000,
            transformOrigin: "center bottom"
          },
          { 
            y: 0, 
            rotateX: 0, 
            rotateY: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: {
              each: 0.05,
              from: "center"
            },
            ease: EASE.brutalOut
          },
          0.5
        );
      }

      if (lastNameRef.current && lastNameRef.current.textContent) {
        // Asegurar que el elemento sea visible antes de dividirlo
        // Usar style directamente en lugar de gsap.set para el color para evitar problemas
        lastNameRef.current.style.opacity = "1";
        lastNameRef.current.style.visibility = "visible";
        lastNameRef.current.style.color = "hsl(var(--primary))";
        
        const chars = splitTextToChars(lastNameRef.current);
        
        // Asegurar que los caracteres sean visibles inicialmente y tengan el color correcto
        chars.forEach(char => {
          char.style.visibility = "visible";
          char.style.display = "inline-block";
          char.style.color = "hsl(var(--primary))";
        });
        
        masterTL.fromTo(chars,
          { 
            y: 150, 
            rotateX: -90,
            rotateZ: gsap.utils.wrap([-10, 10]),
            opacity: 0,
            scale: 0.3,
            transformPerspective: 1000,
            transformOrigin: "center bottom"
          },
          { 
            y: 0, 
            rotateX: 0,
            rotateZ: 0,
            opacity: 1,
            scale: 1,
            duration: 1.4,
            stagger: {
              each: 0.04,
              from: "start"
            },
            ease: EASE.elastic,
            onComplete: () => {
              // Asegurar el color después de la animación
              chars.forEach(char => {
                char.style.color = "hsl(var(--primary))";
              });
            }
          },
          0.7
        );
      }

      // ====================================
      // TAGLINE - CLIP PATH REVEAL
      // ====================================
      if (taglineRef.current) {
        // Create a wrapper for the mask effect
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.overflow = 'hidden';
        wrapper.style.display = 'inline-block';
        
        taglineRef.current.parentNode?.insertBefore(wrapper, taglineRef.current);
        wrapper.appendChild(taglineRef.current);

        masterTL.fromTo(taglineRef.current,
          { 
            yPercent: 100,
            opacity: 0
          },
          { 
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: EASE.brutalOut
          },
          1.2
        );
      }

      // ====================================
      // DESCRIPTION - WORDS STAGGER
      // ====================================
      if (descriptionRef.current) {
        const text = descriptionRef.current.textContent || "";
        descriptionRef.current.innerHTML = "";
        
        // Dividir el texto preservando espacios correctamente
        const words = text.split(/(\s+)/).filter(part => part.length > 0).map((part, index) => {
          const span = document.createElement("span");
          // Si es un espacio, mantenerlo como espacio
          if (part.trim() === "") {
            span.textContent = part;
            span.style.display = "inline";
          } else {
            span.textContent = part;
            span.style.display = "inline-block";
            span.style.opacity = "0";
          }
          descriptionRef.current?.appendChild(span);
          return span;
        }).filter(span => span.style.display === "inline-block"); // Solo animar las palabras, no los espacios

        masterTL.fromTo(words,
          { 
            y: 40, 
            opacity: 0,
            filter: "blur(10px)"
          },
          { 
            y: 0, 
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.02,
            ease: EASE.smooth
          },
          1.5
        );
      }

      // ====================================
      // CTA BUTTONS - BRUTAL SCALE + SKEW
      // ====================================
      if (ctaRef.current) {
        const buttons = ctaRef.current.children;
        
        masterTL.fromTo(buttons,
          { 
            y: 60, 
            opacity: 0, 
            scale: 0.7,
            skewY: 5,
            transformOrigin: "left bottom"
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            skewY: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: EASE.back
          },
          1.8
        );
      }

      // ====================================
      // SOCIAL ICONS - BOUNCE CASCADE
      // ====================================
      if (socialRef.current) {
        const icons = socialRef.current.children;
        
        masterTL.fromTo(icons,
          { 
            y: 50, 
            opacity: 0, 
            scale: 0,
            rotation: -180
          },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: EASE.elastic
          },
          2
        );

        // Add magnetic effect to social icons
        Array.from(icons).forEach((icon) => {
          const cleanup = createMagneticEffect(icon as HTMLElement, { strength: 0.4 });
          cleanupFnsRef.current.push(cleanup);
        });
      }

      // ====================================
      // IMAGE - DRAMATIC REVEAL
      // ====================================
      if (imageRef.current) {
        // Initial state
        gsap.set(imageRef.current, { 
          scale: 1.3, 
          opacity: 0, 
          filter: "blur(30px) saturate(0)"
        });

        masterTL.to(imageRef.current, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px) saturate(1)",
          duration: 1.8,
          ease: EASE.brutalOut
        }, 0.8);

        // Add floating animation
        gsap.to(imageRef.current, {
          y: -15,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2.5
        });

        // Subtle rotation on mouse move
        const handleMouseMove = (e: MouseEvent) => {
          if (!imageRef.current || !heroRef.current) return;
          const rect = heroRef.current.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          gsap.to(imageRef.current, {
            rotateY: x * 10,
            rotateX: -y * 10,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        cleanupFnsRef.current.push(() => window.removeEventListener("mousemove", handleMouseMove));
      }

      // ====================================
      // SCROLL INDICATOR
      // ====================================
      if (scrollIndicatorRef.current) {
        masterTL.fromTo(scrollIndicatorRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: EASE.smooth },
          2.5
        );

        // Infinite bounce
        gsap.to(scrollIndicatorRef.current.querySelector('.scroll-arrow'), {
          y: 8,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: 3.5
        });
      }

      // ====================================
      // PARALLAX ON SCROLL - OPTIMIZADO
      // ====================================
      // El parallax debe terminar cuando el hero sale de la vista superior
      // No debe interferir con el pin que comienza en "top top"
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top", // Termina cuando el hero sale de la vista
        scrub: 1.5, // Más suave
        invalidateOnRefresh: false, // Mejor rendimiento
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Usar gsap.set en lugar de gsap.to para mejor rendimiento
          // Background parallax
          if (backgroundRef.current) {
            gsap.set(backgroundRef.current, {
              y: progress * 120, // Reducido
              force3D: true,
            });
          }

          // Image parallax
          if (imageRef.current) {
            gsap.set(imageRef.current, {
              y: progress * 100,
              scale: 1 - progress * 0.12,
              opacity: Math.max(0, 1 - progress * 0.5),
              force3D: true,
            });
          }

          // Text parallax - optimizado
          if (firstNameRef.current) {
            gsap.set(firstNameRef.current, {
              y: progress * 60,
              opacity: Math.max(0, 1 - progress * 1),
              force3D: true,
            });
          }
          if (lastNameRef.current) {
            gsap.set(lastNameRef.current, {
              y: progress * 50,
              opacity: Math.max(0, 1 - progress * 1),
              force3D: true,
            });
          }

          // CTA parallax - optimizado
          if (ctaRef.current) {
            gsap.set(ctaRef.current, {
              y: progress * 30,
              opacity: Math.max(0, 1 - progress * 1.2),
              scale: 1 - progress * 0.08,
              force3D: true,
            });
          }
        }
      });

      // ====================================
      // PIN Y SLIDE-OVER PARA HERO
      // ====================================
      // Asegurar que el hero tenga z-index correcto y position relative inicialmente
      // IMPORTANTE: El hero debe ser relative inicialmente, solo será fixed cuando el pin esté activo
      if (heroRef.current) {
        gsap.set(heroRef.current, {
          zIndex: 40,
          position: "relative", // Relative inicialmente
          opacity: 1,
          visibility: "visible",
        });
        // Asegurar con style directo también
        heroRef.current.style.position = "relative";
        heroRef.current.style.zIndex = "40";
      }

      // PIN: Bloquear hero durante el scroll para el efecto sticky slide-over
      // IMPORTANTE: El pin debe funcionar correctamente para que el slide-over funcione
      // El scrollerProxy ya está configurado en SmoothScroll para usar Lenis
      
      // Solo crear pin si no existe
      if (!pinTriggerRef.current) {
        pinTriggerRef.current = ScrollTrigger.create({
          trigger: heroRef.current,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: false, // Desactivar pinSpacing para evitar scroll adicional
          anticipatePin: 1,
          invalidateOnRefresh: false,
          pinReparent: false, // Desactivar pinReparent para evitar duplicación
          pinType: "fixed", // Usar fixed en lugar de transform para evitar duplicación
          scroller: document.body, // Usar el mismo scroller que el scrollerProxy
          markers: false, // Cambiar a true temporalmente para depurar
          onEnter: () => {
            if (heroRef.current) {
              heroRef.current.style.zIndex = "40";
              heroRef.current.style.opacity = "1";
              heroRef.current.style.visibility = "visible";
              heroRef.current.style.pointerEvents = "auto";
            }
          },
          onLeave: () => {
            if (heroRef.current) {
              heroRef.current.style.position = "relative";
              heroRef.current.style.zIndex = "1";
              heroRef.current.style.opacity = "0";
              heroRef.current.style.visibility = "hidden";
              heroRef.current.style.pointerEvents = "none";
              heroRef.current.style.height = "0";
              heroRef.current.style.overflow = "hidden";
            }
          },
          onEnterBack: () => {
            if (heroRef.current) {
              heroRef.current.style.zIndex = "40";
              heroRef.current.style.opacity = "1";
              heroRef.current.style.visibility = "visible";
              heroRef.current.style.pointerEvents = "auto";
            }
          },
          onLeaveBack: () => {
            if (heroRef.current) {
              heroRef.current.style.position = "relative";
              heroRef.current.style.zIndex = "1";
              heroRef.current.style.opacity = "0";
              heroRef.current.style.visibility = "hidden";
              heroRef.current.style.pointerEvents = "none";
              heroRef.current.style.height = "0";
              heroRef.current.style.overflow = "hidden";
            }
          },
        });
        console.log('✅ Hero: Pin trigger creado');
      }
      
      console.log('📌 Hero: Pin trigger:', pinTriggerRef.current);
      console.log('   - Pin activo?', pinTriggerRef.current?.isActive);

      // SLIDE-OVER: El marquee se superpone como slide desde abajo sobre el hero
      // IMPORTANTE: Crear el slide-over inmediatamente después del pin para que usen el mismo rango
      // No esperar timeout - crear directamente para sincronización perfecta
      console.log('⏳ Hero: Inicializando slide-over inmediatamente después del pin...');
      
      // Limpiar slide-over anterior si existe (por si se ejecuta dos veces)
      if (slideOverTriggerRef.current) {
        console.log('🧹 Hero: Limpiando slide-over trigger anterior');
        slideOverTriggerRef.current.kill();
        slideOverTriggerRef.current = null;
      }
      
      // Crear el slide-over inmediatamente, no en un timeout
      // Esto asegura que use el mismo rango que el pin
      const initSlideOver = () => {
        // Verificar nuevamente
        if (slideOverTriggerRef.current) {
          console.log('⚠️ Hero: Slide-over ya existe, saltando...');
          return;
        }
        console.log('⏳ Hero: Timeout completado, inicializando slide-over');
        
        // Buscar el marquee por ID
        let nextSection = document.getElementById('marquee') as HTMLElement | null;
        console.log('🔍 Hero: Buscando marquee por ID');
        console.log('   - Encontrado:', nextSection);
        console.log('   - Tipo:', nextSection?.tagName);
        console.log('   - ID:', nextSection?.id);
        console.log('   - Position actual:', nextSection?.style.position || window.getComputedStyle(nextSection!).position);
        console.log('   - Transform actual:', nextSection?.style.transform || window.getComputedStyle(nextSection!).transform);
        console.log('   - Z-index actual:', nextSection?.style.zIndex || window.getComputedStyle(nextSection!).zIndex);
        console.log('   - OffsetHeight:', nextSection?.offsetHeight);
        console.log('   - OffsetWidth:', nextSection?.offsetWidth);
        
        // Si no lo encontramos por ID, buscar como siguiente elemento
        if (!nextSection) {
          nextSection = heroRef.current?.nextElementSibling as HTMLElement | null;
          console.log('🔍 Hero: Buscando siguiente sección (nextElementSibling)');
          console.log('   - Encontrado:', nextSection);
          console.log('   - Tipo:', nextSection?.tagName);
        }
        
        if (!nextSection || !(nextSection instanceof HTMLElement)) {
          console.error('❌ Hero: No se encontró el marquee para el slide-over');
          console.error('   - heroRef.current:', heroRef.current);
          console.error('   - nextElementSibling:', heroRef.current?.nextElementSibling);
          return;
        }
        
        console.log('✅ Hero: Marquee encontrado para slide-over');
        console.log('   - Elemento:', nextSection);
        console.log('   - Clases:', nextSection.className);
        console.log('   - Estilos inline:', nextSection.style.cssText);
        
        // Inicializar el marquee completamente abajo (fuera de vista) con position: fixed
        // Esto es necesario para el efecto slide-over - igual que la sección de prueba
        console.log('🎬 Hero: Inicializando marquee para slide-over');
        console.log('   - ANTES de gsap.set:');
        console.log('     * position:', window.getComputedStyle(nextSection).position);
        console.log('     * transform:', window.getComputedStyle(nextSection).transform);
        console.log('     * z-index:', window.getComputedStyle(nextSection).zIndex);
        console.log('     * top:', window.getComputedStyle(nextSection).top);
        
        // IMPORTANTE: NO limpiar cssText completamente porque eliminaría estilos necesarios
        // En su lugar, solo sobrescribir los estilos específicos que necesitamos
        // El marquee puede tener estilos inline que interfieren, pero necesitamos preservar algunos
        
        // IMPORTANTE: El marquee debe estar visible pero fuera de la pantalla inicialmente
        // Usar translateY(100%) para colocarlo completamente abajo (fuera de vista)
        // PERO asegurar que sea visible (opacity: 1, visibility: visible)
        
        // Primero usar gsap.set para aplicar los estilos
        gsap.set(nextSection, {
          zIndex: 100,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          opacity: 1,
          visibility: "visible",
          width: "100%",
          minHeight: "100vh",
          willChange: "transform",
          y: "100%", // Comenzar completamente abajo (fuera de vista)
        });
        
        // Luego asegurar con style directo (sin !important primero para ver si funciona)
        // Si no funciona, usaremos !important
        nextSection.style.position = "fixed";
        nextSection.style.top = "0";
        nextSection.style.left = "0";
        nextSection.style.right = "0";
        nextSection.style.zIndex = "100";
        nextSection.style.transform = "translateY(100%)";
        nextSection.style.width = "100%";
        nextSection.style.minHeight = "100vh";
        nextSection.style.opacity = "1";
        nextSection.style.visibility = "visible";
        nextSection.style.display = "flex"; // Asegurar que sea flex

        // ScrollTrigger para el slide-over effect
        // Debe usar el mismo trigger y rango que el pin para que funcionen juntos
        const pinTrigger = pinTriggerRef.current;
        
        if (!pinTrigger) {
          console.error('❌ Hero: Pin trigger no disponible para slide-over');
          return;
        }
        
        // Forzar refresh del pin trigger para asegurar que tenga valores calculados
        ScrollTrigger.refresh();
        
        // Obtener los valores calculados del pin trigger
        const pinStart = pinTrigger.start;
        const pinEnd = pinTrigger.end;
        
        // Si los valores son números, usarlos directamente
        // Si son strings, ScrollTrigger los calculará igual
        slideOverTriggerRef.current = ScrollTrigger.create({
          trigger: heroRef.current,
          start: typeof pinStart === 'number' ? pinStart : "top top", // Usar el mismo start que el pin
          end: typeof pinEnd === 'number' ? pinEnd : "+=200%", // Usar el mismo end que el pin
          scrub: 0.1, // Más agresivo: menor valor = más rápido y responsive
          scroller: document.body, // Usar el mismo scroller que el pin
          markers: false, // Cambiar a true temporalmente para depurar
          onUpdate: (self) => {
            let currentNext = document.getElementById('marquee') as HTMLElement | null;
            if (!currentNext) {
              currentNext = heroRef.current?.nextElementSibling as HTMLElement | null;
            }
            if (!currentNext || !(currentNext instanceof HTMLElement)) {
              return;
            }
            
            const progress = self.progress;
            // Calcular: de 100% (abajo, fuera de vista) a 0% (arriba, visible) según el progreso
            // Cuando progress = 0, translateY = 100% (completamente abajo, fuera de vista)
            // Cuando progress = 1, translateY = 0% (completamente arriba, visible)
            const translateY = 100 * (1 - progress);
            
            // Sin logs - solo ejecutar la animación
            
            // Aplicar position: fixed durante el slide-over
            // Usar tanto gsap.set como style directo para asegurar que se aplique
            gsap.set(currentNext, {
              y: `${translateY}%`,
              force3D: true,
              opacity: 1,
              visibility: "visible",
              zIndex: 100,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
            });
            
            // Asegurar con style directo también - esto es crítico para sobrescribir estilos del marquee
            // NO usar !important por ahora - puede estar causando problemas
            currentNext.style.position = "fixed";
            currentNext.style.top = "0";
            currentNext.style.left = "0";
            currentNext.style.right = "0";
            currentNext.style.zIndex = "100";
            currentNext.style.transform = `translateY(${translateY}%)`;
            currentNext.style.width = "100%";
            currentNext.style.opacity = "1";
            currentNext.style.visibility = "visible";
            currentNext.style.display = "flex";
            
            // Sin logs - solo aplicar la animación
          },
          onLeave: () => {
            // Cuando sale el pin, el marquee está completamente arriba (cubre el hero)
            // Cambiar a relative para que el scroll continúe normalmente y no se superponga sobre otras secciones
            let currentNext = document.getElementById('marquee') as HTMLElement | null;
            if (!currentNext) {
              currentNext = heroRef.current?.nextElementSibling as HTMLElement | null;
            }
            if (!currentNext || !(currentNext instanceof HTMLElement)) return;
            
            // Limpiar transform y cambiar a relative completamente
            gsap.set(currentNext, {
              y: 0,
              x: 0,
              zIndex: 1, // Reducir z-index para que no se superponga sobre otras secciones
              position: "relative",
              top: "auto",
              left: "auto",
              right: "auto",
              transform: "none", // Limpiar transform
              width: "100%", // Mantener width
            });
            
            // Asegurar con style directo - esto es crítico
            currentNext.style.position = "relative";
            currentNext.style.top = "auto";
            currentNext.style.left = "auto";
            currentNext.style.right = "auto";
            currentNext.style.transform = "none";
            currentNext.style.zIndex = "1"; // Z-index bajo para que no se superponga
            currentNext.style.width = "100%";
          },
          onEnterBack: () => {
            // Cuando vuelve a entrar el pin, el marquee vuelve abajo (fuera de vista)
            let currentNext = document.getElementById('marquee') as HTMLElement | null;
            if (!currentNext) {
              currentNext = heroRef.current?.nextElementSibling as HTMLElement | null;
            }
            if (!currentNext || !(currentNext instanceof HTMLElement)) return;
            gsap.set(currentNext, {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              y: "100%",
              zIndex: 100,
              width: "100%",
            });
          },
          onLeaveBack: () => {
            // Cuando sale hacia atrás, restaurar a relative
            let currentNext = document.getElementById('marquee') as HTMLElement | null;
            if (!currentNext) {
              currentNext = heroRef.current?.nextElementSibling as HTMLElement | null;
            }
            if (!currentNext || !(currentNext instanceof HTMLElement)) return;
            
            // Limpiar transform y cambiar a relative
            gsap.set(currentNext, {
              y: 0,
              x: 0,
              zIndex: 1, // Z-index bajo para que no se superponga
              position: "relative",
              top: "auto",
              left: "auto",
              right: "auto",
              transform: "none", // Limpiar transform
              width: "100%",
            });
            
            // Asegurar con style directo
            currentNext.style.position = "relative";
            currentNext.style.top = "auto";
            currentNext.style.left = "auto";
            currentNext.style.right = "auto";
            currentNext.style.transform = "none";
            currentNext.style.zIndex = "1"; // Z-index bajo para que no se superponga
            currentNext.style.width = "100%";
          },
        });
      };
      
      // Ejecutar después de un pequeño delay para asegurar que el pin esté completamente configurado
      // y que el marquee esté renderizado
      const slideOverTimeout = setTimeout(initSlideOver, 200); // 200ms para asegurar que el pin esté listo
      
      // Guardar el timeout para poder limpiarlo si es necesario
      cleanupFnsRef.current.push(() => {
        clearTimeout(slideOverTimeout);
      });

      // Forzar refresh de ScrollTrigger después de crear todas las animaciones
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 1500);
      
    }, heroRef);

    return () => {
      ctx.revert();
      cleanupFnsRef.current.forEach(fn => fn());
      cleanupFnsRef.current = [];
      
      if (pinTriggerRef.current) {
        pinTriggerRef.current.kill();
        pinTriggerRef.current = null;
      }
      if (slideOverTriggerRef.current) {
        slideOverTriggerRef.current.kill();
        slideOverTriggerRef.current = null;
      }
    };
  }, [isLoaded, currentContent.greeting, scrambleText]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      {/* Multi-layer Parallax Background */}
      <div ref={backgroundRef} className="absolute inset-0 -z-10 overflow-hidden">
        {/* Background Layer - Slowest */}
        <div className="orb absolute top-1/4 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]" />
        <div className="orb absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[100px]" />
        
        {/* Grid pattern - Static */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
      
      {/* Midground Layer - Medium speed */}
      <div ref={midgroundRef} className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        <div className="orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>
      
      {/* Foreground Layer - Fastest */}
      <div ref={foregroundRef} className="absolute inset-0 -z-1 overflow-hidden pointer-events-none">
        <div className="orb absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-primary/3 rounded-full blur-[100px]" />
        <div className="orb absolute bottom-1/3 left-1/4 w-[250px] h-[250px] bg-purple-600/3 rounded-full blur-[90px]" />
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Content */}
          <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left">
            {/* Greeting */}
            <p
              ref={greetingRef}
              className="font-mono text-primary text-sm md:text-base tracking-wider uppercase opacity-0"
            >
              &nbsp;
            </p>

            {/* Name - Two lines with perspective */}
            <div className="perspective-1000">
              <div className="overflow-hidden">
                <span 
                  ref={firstNameRef}
                  className="block text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-foreground will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  Daniel
                </span>
              </div>
              <div className="overflow-hidden">
                <span 
                  ref={lastNameRef}
                  className="block text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-primary will-change-transform"
                  style={{ transformStyle: "preserve-3d", opacity: 1, color: "hsl(var(--primary))" }}
                >
                  Escorcia
                </span>
              </div>
            </div>

            {/* Tagline */}
            <h2
              ref={taglineRef}
              className="text-xl md:text-2xl text-muted-foreground font-normal"
            >
              {currentContent.tagline}
            </h2>

            {/* Description */}
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-muted-foreground/80 max-w-xl mx-auto lg:mx-0"
            >
              {currentContent.description}
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Button 
                asChild 
                size="lg" 
                className="group rounded-full px-8 bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-all duration-300 glow-sm"
              >
                <Link href="#projects">
                  {currentContent.cta}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300"
              >
                <Link 
                  href={getPdfUrl()} 
                  target="_blank" 
                  download
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {currentContent.resume}
                </Link>
              </Button>
            </div>

            {/* Social Icons */}
            <div
              ref={socialRef}
              className="flex gap-3 justify-center lg:justify-start pt-4"
            >
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <Link
                  href="https://github.com/ingdanielen"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <Link
                  href="https://www.linkedin.com/in/daniel-escorcia-b68182269/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                asChild
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-300"
              >
                <Link href="#contact" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="flex-1 flex justify-center lg:justify-end relative opacity-0"
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            {useProfileImage ? (
              <div className="relative w-full max-w-lg">
                {/* Decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[120%] h-[120%] border border-primary/10 rounded-full animate-pulse-glow" />
                  <div className="absolute w-[140%] h-[140%] border border-primary/5 rounded-full animate-pulse-glow" style={{ animationDelay: "0.5s" }} />
                </div>
                
                <Image
                  src="/hero-dark.png"
                  alt="Daniel Escorcia"
                  className="w-full h-full dark:block hidden relative z-10"
                  width={600}
                  height={600}
                  priority
                />
                <Image
                  src="/hero-light.png"
                  alt="Daniel Escorcia"
                  className="w-full h-full dark:hidden block relative z-10"
                  width={600}
                  height={600}
                  priority
                />
              </div>
            ) : (
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600" />
                <div className="absolute inset-0 flex items-center justify-center text-white text-9xl font-display font-bold">
                  DE
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0"
      >
        <Link 
          href="#about" 
          aria-label="Scroll down"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-mono uppercase tracking-wider">Scroll</span>
          <ArrowDown className="scroll-arrow h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}
