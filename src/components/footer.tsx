"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { Github, Linkedin, Twitter, Heart } from "lucide-react"
import Link from "next/link"
import { footerContent, socialLinks } from "@/constants"

export default function Footer() {
  const { language } = useLanguage()
  const currentYear = new Date().getFullYear()
  const currentContent = footerContent[language as keyof typeof footerContent]

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
            {socialLinks.map((social) => (
              <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.icon === "github" && <Github className="h-5 w-5 hover:text-primary transition-colors" />}
                {social.icon === "linkedin" && <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />}
                {social.icon === "twitter" && <Twitter className="h-5 w-5 hover:text-primary transition-colors" />}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-muted-foreground text-center md:text-right"
          >
            <p>
              &copy; {currentYear} Daniel Escorcia. {currentContent.rights}
            </p>
            <p className="flex items-center justify-center md:justify-end gap-1 mt-1">
              {currentContent.madeWith} <Heart className="h-3 w-3 text-red-500 fill-red-500" /> {currentContent.by} Daniel
              Escorcia
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
