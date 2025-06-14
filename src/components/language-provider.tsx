"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Intentar obtener el idioma guardado en localStorage, o usar español por defecto
  const [language, setLanguageState] = useState<Language>("es")

  useEffect(() => {
    // Solo acceder a localStorage en el cliente
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage === "es" || savedLanguage === "en") {
      setLanguageState(savedLanguage)
    } else {
      // Detectar idioma del navegador como alternativa
      const browserLanguage = navigator.language.startsWith("es") ? "es" : "en"
      setLanguageState(browserLanguage)
    }
  }, [])

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)
  }

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
