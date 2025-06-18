"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  isReady: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es")
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Solo acceder a localStorage en el cliente
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage === "es" || savedLanguage === "en") {
      setLanguageState(savedLanguage)
    } else {
      // Detectar idioma del navegador como alternativa
      const browserLanguage = navigator.language.startsWith("es") ? "es" : "en"
      setLanguageState(browserLanguage)
      // Guardar el idioma detectado
      localStorage.setItem("language", browserLanguage)
    }
    setIsReady(true)
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isReady }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
