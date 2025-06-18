"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="p-8 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-0"
          >
            <Link href="/">
              <div className="flex items-center py-2 px-4 rounded-full gap-2 text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Daniel Ricardo.
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-4 mb-4 md:mb-0"
          >
            <Link href="https://github.com/ingdanielen" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 hover:text-primary transition-colors" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/daniel-escorcia-b68182269/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
              <span className="sr-only">Twitter</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-muted-foreground text-center md:text-right"
          >
            <p>
              &copy; {currentYear} Daniel Escorcia. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
            </p>
            <p className="flex items-center justify-center md:justify-end gap-1 mt-1">
              {language === "es" ? "Hecho con" : "Made with"} <Heart className="h-3 w-3 text-red-500 fill-red-500" /> {language === "es" ? "por" : "by"} Daniel
              Escorcia
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
