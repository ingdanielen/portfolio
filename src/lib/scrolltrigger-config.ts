/**
 * Global ScrollTrigger Configuration
 * Centraliza la configuración de ScrollTrigger para todo el proyecto
 */

import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Configura ScrollTrigger globalmente con las mejores prácticas
 * para detección precisa de elementos y efectos
 */
export function configureScrollTrigger() {
  // Configuración por defecto optimizada
  ScrollTrigger.defaults({
    markers: false,
    scroller: document.body, // Usar body como scroller principal
    refreshPriority: 0, // Prioridad normal para mejor detección
    invalidateOnRefresh: false, // Mejor rendimiento
    anticipatePin: 1, // Anticipar pin para mejor performance
  });

  // Configurar refresh automático en eventos importantes
  if (typeof window !== "undefined") {
    // Refresh en resize con debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    };

    // Refresh en load de imágenes
    const handleImageLoad = () => {
      ScrollTrigger.refresh();
    };

    // NO usar MutationObserver - está interfiriendo con las animaciones
    // Las animaciones se refrescan automáticamente cuando es necesario
    
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", handleImageLoad);

    // Cleanup function
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleImageLoad);
    };
  }
}

/**
 * Helper para crear ScrollTriggers con configuración consistente
 */
export function createScrollTrigger(config: ScrollTrigger.Vars) {
  return ScrollTrigger.create({
    ...config,
    // Valores por defecto que se pueden sobrescribir
    invalidateOnRefresh: config.invalidateOnRefresh ?? false,
    anticipatePin: config.anticipatePin ?? 1,
  });
}

/**
 * Refresh ScrollTrigger de forma segura
 */
export function safeRefresh() {
  if (typeof window !== "undefined" && ScrollTrigger) {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
}
