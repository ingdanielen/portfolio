"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  title: string
  description?: string
  className?: string
  centered?: boolean
}

export function SectionTitle({ title, description, className, centered = true }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("max-w-3xl mx-auto mb-12", centered && "text-center", className)}
    >
      <div className="inline-block">
        <h2 className="text-3xl font-bold relative z-10">
          <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">{title}</span>
          <div className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/20 to-purple-600/20 -z-10 rounded-lg transform skew-x-12"></div>
        </h2>
      </div>
      {description && <p className="text-lg text-muted-foreground mt-4">{description}</p>}
    </motion.div>
  )
}
