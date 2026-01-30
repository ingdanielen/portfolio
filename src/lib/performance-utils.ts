/**
 * Performance Utilities
 * Funciones para optimizar el rendimiento de animaciones y eventos
 */

// Throttle function para eventos de scroll/mouse
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// RequestAnimationFrame wrapper con throttling
export function optimizedRAF(callback: (time: number) => void): () => void {
  let rafId: number;
  let lastTime = 0;
  const targetFPS = 60;
  const frameInterval = 1000 / targetFPS;

  function raf(time: number) {
    rafId = requestAnimationFrame(raf);
    const elapsed = time - lastTime;
    
    if (elapsed >= frameInterval) {
      callback(time);
      lastTime = time - (elapsed % frameInterval);
    }
  }

  rafId = requestAnimationFrame(raf);

  return () => cancelAnimationFrame(rafId);
}

// Batch DOM updates
export function batchDOMUpdates(updates: Array<() => void>) {
  requestAnimationFrame(() => {
    updates.forEach(update => update());
  });
}

// Lazy load images
export function lazyLoadImage(img: HTMLImageElement, src: string) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          img.src = src;
          observer.unobserve(img);
        }
      });
    },
    { rootMargin: "50px" }
  );
  observer.observe(img);
}

// Optimize element for animations
export function optimizeForAnimation(element: HTMLElement) {
  element.style.willChange = "transform, opacity";
  element.style.transform = "translateZ(0)";
  element.style.backfaceVisibility = "hidden";
  element.style.perspective = "1000px";
}

// Remove optimization when animation ends
export function removeOptimization(element: HTMLElement) {
  element.style.willChange = "auto";
}
