"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handlePointerDetection = () => {
      const hoveredElement = document.elementFromPoint(mousePosition.x, mousePosition.y)
      const isClickable =
        hoveredElement?.tagName === "BUTTON" ||
        hoveredElement?.tagName === "A" ||
        hoveredElement?.closest("button") ||
        hoveredElement?.closest("a") ||
        hoveredElement?.getAttribute("role") === "button" ||
        hoveredElement?.classList.contains("cursor-pointer")

      setIsPointer(!!isClickable)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousemove", handlePointerDetection)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousemove", handlePointerDetection)
    }
  }, [mousePosition.x, mousePosition.y, isMobile])

  if (isMobile) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 800,
          damping: 30,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          mass: 0.1,
          stiffness: 1000,
          damping: 30,
        }}
      />
    </>
  )
}
