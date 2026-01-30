"use client"

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  pulse: number
  pulseSpeed: number
}

interface MousePosition {
  x: number
  y: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const { theme } = useTheme()

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const particleCount = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000))
    const particles: Particle[] = []
    
    const colors = theme === "dark" 
      ? ["#8b5cf6", "#a78bfa", "#c4b5fd", "#7c3aed", "#6d28d9"]
      : ["#8b5cf6", "#a78bfa", "#c4b5fd", "#7c3aed", "#6d28d9"]

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.1,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01
      })
    }
    
    particlesRef.current = particles
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const particles = particlesRef.current
      const mouse = mouseRef.current

      particles.forEach((particle, index) => {
        // Mouse interaction - particles are attracted/repelled
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          // Subtle repulsion effect
          particle.x -= Math.cos(angle) * force * 0.5
          particle.y -= Math.sin(angle) * force * 0.5
        }

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Pulse effect
        particle.pulse += particle.pulseSpeed
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle with glow
        ctx.save()
        ctx.globalAlpha = particle.opacity * 0.6
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, pulseSize * 3
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "transparent")
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulseSize * 3, 0, Math.PI * 2)
        ctx.fill()

        // Core particle
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Connect nearby particles
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j]
          const distX = particle.x - other.x
          const distY = particle.y - other.y
          const dist = Math.sqrt(distX * distX + distY * distY)

          if (dist < 120) {
            ctx.save()
            ctx.globalAlpha = 0.15 * (1 - dist / 120)
            ctx.strokeStyle = particle.color
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
            ctx.restore()
          }
        }

        // Connect to mouse if close enough
        if (distance < 150) {
          ctx.save()
          ctx.globalAlpha = 0.2 * (1 - distance / 150)
          ctx.strokeStyle = particle.color
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
          ctx.restore()
        }
      })

      // Draw mouse glow
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 100
        )
        mouseGradient.addColorStop(0, "rgba(139, 92, 246, 0.1)")
        mouseGradient.addColorStop(1, "transparent")
        ctx.fillStyle = mouseGradient
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2)
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate()

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationRef.current)
    }
  }, [theme, initParticles])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ 
        opacity: 1, 
        mixBlendMode: "normal",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none"
      }}
    />
  )
}
