/**
 * Advanced UX/UI Effects Library
 * Parallax, Magnetic, Liquid Distortion, 3D, etc.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, RefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// 1. PARALLAX MULTICAPA AVANZADO
// ============================================
export function useMultiLayerParallax(
  layers: Array<{ ref: RefObject<HTMLElement | HTMLDivElement | null>; speed: number }>,
  trigger?: RefObject<HTMLElement | HTMLDivElement | null>
) {
  useEffect(() => {
    if (!layers.length) return;

    const ctx = gsap.context(() => {
      layers.forEach(({ ref, speed }) => {
        if (ref.current) {
          const element = ref.current as HTMLElement;
          
          // Asegurar que el elemento siempre sea visible
          gsap.set(element, { 
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translateZ(0)" // GPU acceleration
          });

          // Parallax vertical optimizado con límites
          const maxMovement = speed * 80; // Reducido para mejor rendimiento
          
          // Usar set en lugar de to para mejor rendimiento
          ScrollTrigger.create({
            trigger: (trigger?.current as HTMLElement) || element.parentElement || element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5, // Más suave
            invalidateOnRefresh: false, // Mejor rendimiento
            onUpdate: (self) => {
              const progress = self.progress;
              const currentY = progress * maxMovement;
              // Usar transform directamente para mejor rendimiento
              gsap.set(element, {
                y: currentY,
                force3D: true, // GPU acceleration
              });
            },
          });

          // Parallax horizontal sutil solo para capas rápidas (optimizado)
          if (speed > 0.5) {
            const maxX = (speed - 0.5) * 20; // Reducido para mejor rendimiento
            ScrollTrigger.create({
              trigger: (trigger?.current as HTMLElement) || element.parentElement || element,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
              invalidateOnRefresh: false,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.set(element, {
                  x: progress * maxX,
                  force3D: true,
                });
              },
            });
          }
        }
      });
    }, (trigger?.current as HTMLElement) || (layers[0]?.ref.current?.parentElement as HTMLElement));

    return () => ctx.revert();
  }, [layers, trigger]);
}

// ============================================
// 2. STICKY SECTION PINNING (Mejorado)
// ============================================
export function useStickyPin(
  ref: RefObject<HTMLElement | HTMLDivElement | null>,
  pinSpacer?: RefObject<HTMLElement | HTMLDivElement | null>,
  duration?: string,
  options?: {
    revealLayers?: boolean;
    onPinStart?: () => void;
    onPinEnd?: () => void;
  }
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current as HTMLElement;
    
    // Asegurar que el elemento sea visible
    gsap.set(element, {
      willChange: "transform",
      backfaceVisibility: "hidden",
    });

    const ctx = gsap.context(() => {
      const pinTrigger = ScrollTrigger.create({
        trigger: element,
        pin: true,
        pinSpacing: true,
        start: "top top",
        end: duration || "+=200%",
        anticipatePin: 1,
        onEnter: () => {
          options?.onPinStart?.();
        },
        onLeave: () => {
          options?.onPinEnd?.();
        },
        onEnterBack: () => {
          options?.onPinStart?.();
        },
        onLeaveBack: () => {
          options?.onPinEnd?.();
        },
      });

      // Reveal layers effect si está habilitado
      if (options?.revealLayers) {
        const layers = element.querySelectorAll('.reveal-layer');
        if (layers.length > 0) {
          gsap.fromTo(layers,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 80%",
                end: "top 50%",
                scrub: true,
              },
            }
          );
        }
      }
    }, element);

    return () => ctx.revert();
  }, [ref, duration, options]);
}

// ============================================
// 3. HORIZONTAL SCROLL
// ============================================
export function useHorizontalScroll(
  containerRef: RefObject<HTMLElement | HTMLDivElement | null>,
  contentRef: RefObject<HTMLElement | HTMLDivElement | null>,
  duration?: string
) {
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const container = containerRef.current as HTMLElement;
      const content = contentRef.current as HTMLElement;
      const contentWidth = content.scrollWidth;

      gsap.to(content, {
        x: -(contentWidth - container.offsetWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: duration || `+=${contentWidth}`,
          pin: true,
          scrub: true,
          anticipatePin: 1,
        },
      });
    }, containerRef.current as HTMLElement);

    return () => ctx.revert();
  }, [containerRef, contentRef, duration]);
}

// ============================================
// 4. MAGNETIC BUTTONS & ELEMENTS
// ============================================
export function useMagnetic(
  ref: RefObject<HTMLElement>,
  strength: number = 0.3
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let x = 0;
    let y = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      x = (e.clientX - centerX) * strength;
      y = (e.clientY - centerY) * strength;

      gsap.to({ currentX, currentY }, {
        currentX: x,
        currentY: y,
        duration: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          gsap.set(element, {
            x: currentX,
            y: currentY,
          });
        },
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      x = 0;
      y = 0;
      currentX = 0;
      currentY = 0;
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, strength]);
}

// ============================================
// 5. VARIABLE FONTS DINÁMICAS
// ============================================
export function useVariableFont(
  ref: RefObject<HTMLElement>,
  minWeight: number = 400,
  maxWeight: number = 900,
  minWidth: number = 100,
  maxWidth: number = 200
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const progress = self.progress;
          const weight = minWeight + (maxWeight - minWeight) * progress;
          const width = minWidth + (maxWidth - minWidth) * progress;

          if (ref.current) {
            ref.current.style.fontVariationSettings = `
              "wght" ${weight},
              "wdth" ${width}
            `;
          }
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, minWeight, maxWeight, minWidth, maxWidth]);
}

// ============================================
// 6. KINETIC TYPOGRAPHY
// ============================================
export function useKineticTypography(
  ref: RefObject<HTMLElement>,
  type: "circular" | "wave" | "float" = "float"
) {
  useEffect(() => {
    if (!ref.current) return;

    const chars = ref.current.textContent?.split("") || [];
    ref.current.innerHTML = chars
      .map((char, i) => `<span class="kinetic-char" style="display: inline-block;">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");

    const charElements = ref.current.querySelectorAll(".kinetic-char");

    if (type === "circular") {
      charElements.forEach((char, i) => {
        const angle = (i / charElements.length) * Math.PI * 2;
        gsap.to(char as HTMLElement, {
          rotation: 360,
          duration: 10 + i * 0.1,
          repeat: -1,
          ease: "none",
        });
      });
    } else if (type === "wave") {
      charElements.forEach((char, i) => {
        gsap.to(char as HTMLElement, {
          y: -20,
          duration: 1 + (i % 3) * 0.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.05,
        });
      });
    } else {
      // float
      charElements.forEach((char, i) => {
        gsap.to(char as HTMLElement, {
          y: -15,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });
    }
  }, [ref, type]);
}

// ============================================
// 7. SVG PATH MORPHING
// ============================================
export function useSVGMorph(
  svgRef: RefObject<SVGPathElement>,
  paths: string[],
  duration: number = 2
) {
  useEffect(() => {
    if (!svgRef.current || paths.length < 2) return;

    let currentIndex = 0;

    const morph = () => {
      const nextIndex = (currentIndex + 1) % paths.length;
      gsap.to(svgRef.current, {
        attr: { d: paths[nextIndex] },
        duration,
        ease: "power2.inOut",
        onComplete: () => {
          currentIndex = nextIndex;
          morph();
        },
      });
    };

    morph();
  }, [svgRef, paths, duration]);
}

// ============================================
// 8. GLASSMORPHISM HELPER
// ============================================
export function useGlassmorphism(
  ref: RefObject<HTMLElement>,
  intensity: number = 10
) {
  useEffect(() => {
    if (!ref.current) return;

    ref.current.style.backdropFilter = `blur(${intensity}px)`;
    ref.current.style.webkitBackdropFilter = `blur(${intensity}px)`;
    ref.current.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
  }, [ref, intensity]);
}

// ============================================
// 9. VIDEO SCRUBBING
// ============================================
export function useVideoScrub(
  videoRef: RefObject<HTMLVideoElement>,
  trigger?: RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trigger?.current || video,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = video.duration * self.progress;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [videoRef, trigger]);
}

// ============================================
// 10. 3D TILT ENHANCED
// ============================================
export function use3DTilt(
  ref: RefObject<HTMLElement>,
  intensity: number = 15
) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - centerY) / rect.height) * intensity;
      const rotateY = ((centerX - e.clientX) / rect.width) * intensity;

      gsap.to(element, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, intensity]);
}

// ============================================
// 11. GRAINY & NOISE OVERLAY
// ============================================
export function createNoiseOverlay(intensity: number = 0.3): string {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const imageData = ctx.createImageData(256, 256);
  for (let i = 0; i < imageData.data.length; i += 4) {
    const value = Math.random() * 255;
    imageData.data[i] = value; // R
    imageData.data[i + 1] = value; // G
    imageData.data[i + 2] = value; // B
    imageData.data[i + 3] = intensity * 255; // A
  }
  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL();
}

// ============================================
// 12. LIQUID DISTORTION (WebGL placeholder - simplified)
// ============================================
export function useLiquidDistortion(
  containerRef: RefObject<HTMLElement | HTMLDivElement | null>,
  imageRef: RefObject<HTMLImageElement | null>
) {
  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    const container = containerRef.current as HTMLElement;
    const img = imageRef.current;

    let rafId: number | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return; // Throttle con RAF
      
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        // Simplified distortion using CSS filters with liquid effect - optimizado
        const distortion = Math.sin((x + y) * 0.1) * 3; // Reducido
        gsap.set(img, {
          filter: `blur(${Math.abs(x - 50) * 0.08 + distortion}px) brightness(${1 + (50 - Math.abs(x - 50)) * 0.008})`,
          rotationY: (x - 50) * 0.08,
          rotationX: (y - 50) * -0.08,
          transformPerspective: 1000,
          force3D: true,
        });
        
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      gsap.to(img, {
        filter: "blur(0px) brightness(1)",
        transform: "perspective(1000px) rotateY(0deg) rotateX(0deg)",
        duration: 0.5,
        ease: "power2.out",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerRef, imageRef]);
}
