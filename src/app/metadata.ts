// Advanced SEO Metadata and Schema Markup
import type { Metadata } from "next"

export const siteConfig = {
  name: "Daniel Escorcia",
  title: "Web Developer & Content Creator",
  description:
    "Desarrollador web especializado en React, Next.js, TypeScript y producción multimedia. Portfolio profesional con proyectos destacados y experiencia en desarrollo frontend.",
  url: "https://danielescorcia.dev",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com/ingdanielen",
    linkedin: "https://www.linkedin.com/in/daniel-escorcia-b68182269/",
  },
}

export const seoMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    // Personal Brand
    "Daniel Escorcia",
    "Daniel Escorcia Developer",
    "Daniel Escorcia Portfolio",
    
    // Job Titles
    "Web Developer",
    "Desarrollador Web",
    "Frontend Developer",
    "Desarrollador Frontend",
    "Full Stack Developer",
    "Desarrollador Full Stack",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "UI/UX Designer",
    "Content Creator",
    "Creador de Contenido",
    
    // Technologies
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Tailwind CSS",
    "GSAP",
    "Framer Motion",
    "CSS3",
    "HTML5",
    "Git",
    "GitHub",
    "Vercel",
    "Supabase",
    "Stripe",
    "Firebase",
    
    // Services
    "Desarrollo Web",
    "Desarrollo Frontend",
    "Desarrollo de Aplicaciones Web",
    "Desarrollo de Sitios Web",
    "Landing Pages",
    "E-commerce",
    "CMS",
    "Diseño Web",
    "Diseño de Interfaces",
    "Animaciones Web",
    "Microinteracciones",
    "Optimización SEO",
    "Performance Web",
    "Responsive Design",
    "Mobile First",
    "Progressive Web Apps",
    "PWA",
    
    // Location
    "Desarrollador Web Colombia",
    "Desarrollador Frontend Colombia",
    "Web Developer Colombia",
    "Freelance Developer Colombia",
    
    // Skills
    "Clean Code",
    "Testing",
    "Performance Optimization",
    "Code Review",
    "Agile",
    "Scrum",
    "Git Workflow",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    alternateLocale: ["en_US"],
    url: siteConfig.url,
    siteName: `${siteConfig.name} - Portfolio`,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@danielescorcia",
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "es-CO": `${siteConfig.url}/es`,
      "en-US": `${siteConfig.url}/en`,
    },
  },
  category: "technology",
  classification: "Portfolio, Web Development, Frontend Development, Software Engineering",
}

// JSON-LD Schema Markup
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Daniel Escorcia",
    jobTitle: "Web Developer",
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.linkedin,
    ],
    knowsAbout: [
      "Web Development",
      "Frontend Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "UI/UX Design",
      "Content Creation",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universidad Nacional de Colombia",
    },
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  }
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${siteConfig.name} - Portfolio`,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function generatePortfolioSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteConfig.url}/#portfolio`,
    name: "Portfolio - Daniel Escorcia",
    description: "Portfolio profesional de proyectos web desarrollados por Daniel Escorcia",
    creator: {
      "@type": "Person",
      name: siteConfig.name,
    },
    about: {
      "@type": "Thing",
      name: "Web Development",
    },
  }
}

export function generateProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} - Web Development Services`,
    description: "Servicios profesionales de desarrollo web, diseño de interfaces y creación de contenido digital",
    provider: {
      "@type": "Person",
      name: siteConfig.name,
    },
    areaServed: "Worldwide",
    serviceType: [
      "Web Development",
      "Frontend Development",
      "UI/UX Design",
      "Content Creation",
      "Web Consulting",
    ],
  }
}
