import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ============================================
// BRUTAL ANIMATION PRESETS
// ============================================

export const EASE = {
  // Dramatic easings
  brutalOut: "power4.out",
  brutalIn: "power4.in",
  brutalInOut: "power4.inOut",
  elastic: "elastic.out(1, 0.5)",
  bounce: "bounce.out",
  // Smooth premium
  smooth: "power2.out",
  smoothIn: "power2.in",
  // Sharp
  sharp: "expo.out",
  sharpIn: "expo.in",
  // Custom
  back: "back.out(1.7)",
  backIn: "back.in(1.7)",
}

// ============================================
// TEXT SPLIT ANIMATION (Manual implementation)
// ============================================

export function splitTextToChars(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || ""
  element.innerHTML = ""
  
  const chars: HTMLSpanElement[] = []
  
  text.split("").forEach((char) => {
    const span = document.createElement("span")
    span.textContent = char === " " ? "\u00A0" : char
    span.style.display = "inline-block"
    span.style.willChange = "transform, opacity"
    element.appendChild(span)
    chars.push(span)
  })
  
  return chars
}

export function splitTextToWords(element: HTMLElement): HTMLSpanElement[] {
  const text = element.textContent || ""
  element.innerHTML = ""
  
  const words: HTMLSpanElement[] = []
  
  text.split(" ").forEach((word, index, array) => {
    const span = document.createElement("span")
    span.textContent = word
    span.style.display = "inline-block"
    span.style.willChange = "transform, opacity"
    element.appendChild(span)
    words.push(span)
    
    if (index < array.length - 1) {
      const space = document.createElement("span")
      space.innerHTML = "&nbsp;"
      space.style.display = "inline-block"
      element.appendChild(space)
    }
  })
  
  return words
}

export function splitTextToLines(element: HTMLElement): HTMLDivElement[] {
  const text = element.textContent || ""
  element.innerHTML = ""
  
  const lines: HTMLDivElement[] = []
  
  // Split by line breaks or treat as single line
  const lineTexts = text.split("\n").filter(l => l.trim())
  
  lineTexts.forEach((lineText) => {
    const div = document.createElement("div")
    div.style.overflow = "hidden"
    
    const inner = document.createElement("div")
    inner.textContent = lineText
    inner.style.willChange = "transform, opacity"
    
    div.appendChild(inner)
    element.appendChild(div)
    lines.push(inner as HTMLDivElement)
  })
  
  return lines
}

// ============================================
// BRUTAL TEXT ANIMATIONS
// ============================================

export function animateTextReveal(
  element: HTMLElement,
  options: {
    type?: "chars" | "words" | "lines"
    duration?: number
    stagger?: number
    delay?: number
    y?: number
    rotateX?: number
    ease?: string
    scrollTrigger?: ScrollTrigger.Vars
  } = {}
) {
  const {
    type = "chars",
    duration = 0.8,
    stagger = 0.02,
    delay = 0,
    y = 100,
    rotateX = 90,
    ease = EASE.brutalOut,
    scrollTrigger
  } = options

  let elements: HTMLElement[]
  
  switch (type) {
    case "chars":
      elements = splitTextToChars(element)
      break
    case "words":
      elements = splitTextToWords(element)
      break
    case "lines":
      elements = splitTextToLines(element)
      break
    default:
      elements = splitTextToChars(element)
  }

  return gsap.fromTo(elements,
    {
      y,
      rotateX,
      opacity: 0,
      transformOrigin: "center bottom",
      transformPerspective: 1000,
    },
    {
      y: 0,
      rotateX: 0,
      opacity: 1,
      duration,
      stagger: {
        each: stagger,
        from: "start",
      },
      delay,
      ease,
      scrollTrigger
    }
  )
}

export function animateTextScramble(
  element: HTMLElement,
  options: {
    duration?: number
    delay?: number
    scrollTrigger?: ScrollTrigger.Vars
  } = {}
) {
  const { duration = 1.5, delay = 0, scrollTrigger } = options
  const originalText = element.textContent || ""
  const chars = "!<>-_\\/[]{}—=+*^?#________"
  
  let iteration = 0
  const speed = duration * 1000 / (originalText.length * 3)
  
  const animate = () => {
    element.textContent = originalText
      .split("")
      .map((char, index) => {
        if (index < iteration) {
          return originalText[index]
        }
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join("")
    
    if (iteration < originalText.length) {
      iteration += 1/3
      setTimeout(animate, speed)
    }
  }

  if (scrollTrigger) {
    ScrollTrigger.create({
      ...scrollTrigger,
      onEnter: () => {
        setTimeout(() => animate(), delay * 1000)
      }
    })
  } else {
    setTimeout(() => animate(), delay * 1000)
  }
}

// ============================================
// BRUTAL ELEMENT ANIMATIONS
// ============================================

export function animateBrutalReveal(
  elements: HTMLElement | HTMLElement[] | NodeListOf<Element>,
  options: {
    duration?: number
    stagger?: number
    delay?: number
    y?: number
    x?: number
    scale?: number
    rotation?: number
    skewX?: number
    skewY?: number
    ease?: string
    scrollTrigger?: ScrollTrigger.Vars
  } = {}
) {
  const {
    duration = 1,
    stagger = 0.1,
    delay = 0,
    y = 100,
    x = 0,
    scale = 0.8,
    rotation = 0,
    skewX = 0,
    skewY = 0,
    ease = EASE.brutalOut,
    scrollTrigger
  } = options

  return gsap.fromTo(elements,
    {
      y,
      x,
      scale,
      rotation,
      skewX,
      skewY,
      opacity: 0,
      transformOrigin: "center center",
    },
    {
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      skewX: 0,
      skewY: 0,
      opacity: 1,
      duration,
      stagger,
      delay,
      ease,
      scrollTrigger
    }
  )
}

export function animateClipReveal(
  element: HTMLElement,
  options: {
    direction?: "up" | "down" | "left" | "right" | "center"
    duration?: number
    delay?: number
    ease?: string
    scrollTrigger?: ScrollTrigger.Vars
  } = {}
) {
  const {
    direction = "up",
    duration = 1.2,
    delay = 0,
    ease = EASE.brutalOut,
    scrollTrigger
  } = options

  const clipPaths = {
    up: { from: "inset(100% 0 0 0)", to: "inset(0% 0 0 0)" },
    down: { from: "inset(0 0 100% 0)", to: "inset(0 0 0% 0)" },
    left: { from: "inset(0 100% 0 0)", to: "inset(0 0% 0 0)" },
    right: { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0%)" },
    center: { from: "inset(50% 50% 50% 50%)", to: "inset(0% 0% 0% 0%)" },
  }

  return gsap.fromTo(element,
    { clipPath: clipPaths[direction].from, opacity: 0 },
    {
      clipPath: clipPaths[direction].to,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger
    }
  )
}

export function animateMaskReveal(
  element: HTMLElement,
  options: {
    duration?: number
    delay?: number
    ease?: string
    scrollTrigger?: ScrollTrigger.Vars
  } = {}
) {
  const { duration = 1.5, delay = 0, ease = EASE.brutalOut, scrollTrigger } = options

  // Create mask overlay
  const wrapper = document.createElement("div")
  wrapper.style.position = "relative"
  wrapper.style.overflow = "hidden"
  
  const mask = document.createElement("div")
  mask.style.position = "absolute"
  mask.style.inset = "0"
  mask.style.background = "linear-gradient(90deg, hsl(var(--primary)), hsl(280, 100%, 50%))"
  mask.style.transformOrigin = "left center"
  mask.style.zIndex = "10"
  
  element.parentNode?.insertBefore(wrapper, element)
  wrapper.appendChild(element)
  wrapper.appendChild(mask)

  const tl = gsap.timeline({ delay, scrollTrigger })
  
  tl.fromTo(element, 
    { opacity: 0 },
    { opacity: 1, duration: 0.01 }
  )
  .fromTo(mask,
    { scaleX: 0 },
    { scaleX: 1, duration: duration * 0.5, ease }
  )
  .to(mask, {
    scaleX: 0,
    transformOrigin: "right center",
    duration: duration * 0.5,
    ease
  })

  return tl
}

// ============================================
// PARALLAX & SCROLL EFFECTS
// ============================================

export function createParallax(
  element: HTMLElement,
  options: {
    speed?: number
    direction?: "vertical" | "horizontal"
    trigger?: HTMLElement | string
  } = {}
) {
  const { speed = 0.5, direction = "vertical", trigger } = options
  
  const movement = speed * 100

  return gsap.to(element, {
    [direction === "vertical" ? "yPercent" : "xPercent"]: -movement,
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    }
  })
}

export function createHorizontalScroll(
  container: HTMLElement,
  track: HTMLElement
) {
  const trackWidth = track.scrollWidth
  const viewportWidth = window.innerWidth

  return gsap.to(track, {
    x: -(trackWidth - viewportWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${trackWidth - viewportWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    }
  })
}

// ============================================
// MAGNETIC EFFECT
// ============================================

export function createMagneticEffect(
  element: HTMLElement,
  options: {
    strength?: number
    ease?: number
  } = {}
) {
  const { strength = 0.3, ease = 0.1 } = options
  
  let bounds: DOMRect
  let currentX = 0
  let currentY = 0
  let targetX = 0
  let targetY = 0
  let rafId: number

  const updateBounds = () => {
    bounds = element.getBoundingClientRect()
  }

  const animate = () => {
    currentX += (targetX - currentX) * ease
    currentY += (targetY - currentY) * ease
    
    gsap.set(element, {
      x: currentX,
      y: currentY,
    })
    
    rafId = requestAnimationFrame(animate)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e
    const centerX = bounds.left + bounds.width / 2
    const centerY = bounds.top + bounds.height / 2
    
    targetX = (clientX - centerX) * strength
    targetY = (clientY - centerY) * strength
  }

  const handleMouseLeave = () => {
    targetX = 0
    targetY = 0
  }

  updateBounds()
  animate()

  element.addEventListener("mouseenter", updateBounds)
  element.addEventListener("mousemove", handleMouseMove)
  element.addEventListener("mouseleave", handleMouseLeave)
  window.addEventListener("resize", updateBounds)

  return () => {
    cancelAnimationFrame(rafId)
    element.removeEventListener("mouseenter", updateBounds)
    element.removeEventListener("mousemove", handleMouseMove)
    element.removeEventListener("mouseleave", handleMouseLeave)
    window.removeEventListener("resize", updateBounds)
  }
}

// ============================================
// 3D TILT EFFECT
// ============================================

export function create3DTilt(
  element: HTMLElement,
  options: {
    maxTilt?: number
    perspective?: number
    scale?: number
    speed?: number
    glare?: boolean
  } = {}
) {
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.05,
    speed = 0.4,
    glare = true
  } = options

  element.style.transformStyle = "preserve-3d"
  element.style.perspective = `${perspective}px`

  let glareElement: HTMLElement | null = null

  if (glare) {
    glareElement = document.createElement("div")
    glareElement.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(
        135deg,
        rgba(255,255,255,0.25) 0%,
        rgba(255,255,255,0) 60%
      );
      opacity: 0;
      transition: opacity ${speed}s ease;
      border-radius: inherit;
    `
    element.style.position = "relative"
    element.appendChild(glareElement)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const tiltX = ((y - centerY) / centerY) * maxTilt
    const tiltY = ((centerX - x) / centerX) * maxTilt

    gsap.to(element, {
      rotateX: tiltX,
      rotateY: tiltY,
      scale,
      duration: speed,
      ease: "power2.out",
    })

    if (glareElement) {
      const glareX = (x / rect.width) * 100
      const glareY = (y / rect.height) * 100
      glareElement.style.background = `
        radial-gradient(
          circle at ${glareX}% ${glareY}%,
          rgba(255,255,255,0.3) 0%,
          rgba(255,255,255,0) 60%
        )
      `
      glareElement.style.opacity = "1"
    }
  }

  const handleMouseLeave = () => {
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: speed * 2,
      ease: "power2.out",
    })
    
    if (glareElement) {
      glareElement.style.opacity = "0"
    }
  }

  element.addEventListener("mousemove", handleMouseMove)
  element.addEventListener("mouseleave", handleMouseLeave)

  return () => {
    element.removeEventListener("mousemove", handleMouseMove)
    element.removeEventListener("mouseleave", handleMouseLeave)
    if (glareElement) {
      glareElement.remove()
    }
  }
}

// ============================================
// STAGGER GRID ANIMATION
// ============================================

export function animateStaggerGrid(
  elements: HTMLElement[] | NodeListOf<Element>,
  options: {
    columns?: number
    duration?: number
    stagger?: number
    from?: "start" | "center" | "end" | "edges" | "random"
    y?: number
    scale?: number
    rotation?: number
    ease?: string
    scrollTrigger?: ScrollTrigger.Vars
  } = {}
) {
  const {
    columns = 3,
    duration = 0.8,
    stagger = 0.08,
    from = "start",
    y = 60,
    scale = 0.9,
    rotation = 0,
    ease = EASE.brutalOut,
    scrollTrigger
  } = options

  return gsap.fromTo(elements,
    {
      y,
      scale,
      rotation,
      opacity: 0,
    },
    {
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration,
      ease,
      stagger: {
        each: stagger,
        from,
        grid: [Math.ceil(Array.from(elements).length / columns), columns],
      },
      scrollTrigger
    }
  )
}

// ============================================
// COUNTER ANIMATION
// ============================================

export function animateCounter(
  element: HTMLElement,
  options: {
    end: number
    duration?: number
    delay?: number
    prefix?: string
    suffix?: string
    decimals?: number
    scrollTrigger?: ScrollTrigger.Vars
  }
) {
  const {
    end,
    duration = 2,
    delay = 0,
    prefix = "",
    suffix = "",
    decimals = 0,
    scrollTrigger
  } = options

  const obj = { value: 0 }

  return gsap.to(obj, {
    value: end,
    duration,
    delay,
    ease: EASE.brutalOut,
    scrollTrigger,
    onUpdate: () => {
      element.textContent = `${prefix}${obj.value.toFixed(decimals)}${suffix}`
    }
  })
}

// ============================================
// MORPH ANIMATION
// ============================================

export function animateMorph(
  element: HTMLElement,
  states: Array<{
    borderRadius?: string
    scale?: number
    rotation?: number
    backgroundColor?: string
  }>,
  options: {
    duration?: number
    repeat?: number
    yoyo?: boolean
    ease?: string
  } = {}
) {
  const { duration = 1, repeat = -1, yoyo = true, ease = EASE.smooth } = options

  const tl = gsap.timeline({ repeat, yoyo })
  
  states.forEach((state, index) => {
    tl.to(element, {
      ...state,
      duration,
      ease,
    }, index === 0 ? 0 : undefined)
  })

  return tl
}
