"use client"

import { useLanguage } from "@/components/language-provider"

export function Footer() {
  const { language } = useLanguage()
  
  const content = {
    es: {
      rights: "Todos los derechos reservados",
      madeWith: "Hecho con",
      by: "por"
    },
    en: {
      rights: "All rights reserved",
      madeWith: "Made with",
      by: "by"
    }
  }

  const currentContent = content[language as keyof typeof content]

  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text\
