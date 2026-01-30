import type React from "react"
import { Syne, DM_Sans, Space_Mono } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import "./performance.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { Analytics } from "@/components/analytics"
import { Suspense } from "react"
import { seoMetadata, generatePersonSchema, generateWebSiteSchema, generatePortfolioSchema, generateProfessionalServiceSchema } from "./metadata"

// Display font - Bold, expressive for headlines
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
})

// Body font - Clean, readable
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
})

// Mono font - For code and accents
const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
})

export const metadata = seoMetadata

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personSchema = generatePersonSchema()
  const websiteSchema = generateWebSiteSchema()
  const portfolioSchema = generatePortfolioSchema()
  const serviceSchema = generateProfessionalServiceSchema()

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${syne.variable} ${dmSans.variable} ${spaceMono.variable} font-sans antialiased`}>
        {/* JSON-LD Schema Markup para SEO */}
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="portfolio-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
        />
        <Script
          id="service-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Suspense fallback={null}>
              {children}
              <Analytics />
            </Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
