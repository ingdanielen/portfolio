"use client";

import { useLanguage } from "@/components/language-provider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, FileText, Code2, Database, Cpu, Terminal, Layout, Server } from "lucide-react";
import { SiReact, SiTypescript } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";
import { heroContent } from "@/constants";

export function Hero({
  useProfileImage = false,
}: {
  useProfileImage?: boolean;
}) {
  const { language, isReady } = useLanguage();

  const currentContent = heroContent[language as keyof typeof heroContent] || heroContent.es;

  // Función para obtener la URL del PDF según el idioma
  const getPdfUrl = () => {
    if (!isReady) return "/pdf/Daniel Escorcia - Desarrollador Web.pdf"; // Default
    return language === "es" 
      ? "/pdf/Daniel Escorcia - Desarrollador Web.pdf" 
      : "/pdf/Daniel Escorcia - Web Developer.pdf";
  };

  return (
    <section
      id="home"
      className="lg:min-h-screen flex items-center justify-center pt-16 md:pt-20 lg:pt-10 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:py-4 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 space-y-6 md:max-w-[45%]"
        >
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-primary font-medium text-lg"
            >
              {currentContent.greeting}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              {currentContent.name}
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground mt-2"
            >
              {currentContent.tagline}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-muted-foreground max-w-xl"
          >
            {currentContent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4"
          >
            <Button asChild size="lg" className="rounded-full">
              <Link href="#projects">{currentContent.cta}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full"
            >
              <Link 
                href={getPdfUrl()} 
                target="_blank" 
                download
              >
                <FileText className="mr-2 h-4 w-4" />
                {currentContent.resume}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 pt-4"
          >
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://github.com/ingdanielen"
                target="_blank"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link
                href="https://www.linkedin.com/in/daniel-escorcia-b68182269/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link href="#contact" aria-label="Email">
                <Mail className="h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex justify-center relative"
        >
          {/* Floating Tech Icons */}
          <motion.div
            animate={{
              y: [0, -8, 0],
              x: [0, 4, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-1 -left-1 bg-gray-500/10 p-2 rounded-full"
          >
            <Code2 className="h-3 w-3 text-gray-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 6, 0],
              x: [0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-1 -right-1 bg-gray-500/10 p-3 rounded-full blur-[1px]"
          >
            <Database className="h-5 w-5 text-gray-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              x: [0, -6, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 -right-2 bg-gray-500/10 p-4 rounded-full z-10"
          >
            <Cpu className="h-6 w-6 text-gray-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 10, 0],
              x: [0, 6, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 -left-2 bg-gray-500/10 p-2 rounded-full blur-sm"
          >
            <Terminal className="h-3 w-3 text-gray-500" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, -8, 0],
              x: [0, 4, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 right-16 bg-gray-500/10 p-3 rounded-full"
          >
            <SiReact className="h-8 w-8 text-blue-900" />
          </motion.div>

          <motion.div
            animate={{
              y: [0, 8, 0],
              x: [0, -4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-44 left-1 bg-gray-500/10 p-3 rounded-full blur-[1px]"
          >
            <SiTypescript className="h-5 w-5 text-gray-500" />
          </motion.div>

          {useProfileImage ? (
            <div className="relative w-full lg:max-w-xl md:max-w-md max-w-md ">
              <Image
                src="/hero-dark.png"
                alt="Daniel Escorcia"
                className="w-full h-full opacity-90 dark:block hidden"
                width={4000}
                height={4000}
                priority
              />
              <Image
                src="/hero-light.png"
                alt="Daniel Escorcia"
                className="w-full h-full opacity-90 dark:hidden block"
                width={4000}
                height={4000}
                priority
              />
              
            </div>
          ) : (
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-9xl">
                DE
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.8,
          duration: 0.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <Button variant="ghost" size="icon" asChild>
          <Link href="#about" aria-label="Scroll down">
            <ArrowDown className="h-6 w-6" />
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
