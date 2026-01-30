"use client"

import { useLanguage } from "@/components/language-provider"
import { SectionTitle } from "@/components/section-title"
import { useRef, useState, useEffect } from "react"
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNextdotjs, 
  SiHtml5, 
  SiCss3, 
  SiTailwindcss, 
  SiRedux, 
  SiFigma, 
  SiAdobephotoshop, 
  SiAdobepremierepro, 
  SiAdobeaftereffects, 
  SiCanva, 
  SiGithub, 
  SiWordpress, 
  SiJira, 
  SiNotion,
  SiPython,
  SiNodedotjs,
  SiBootstrap
} from "react-icons/si"
import { FaUikit, FaCode } from "react-icons/fa"
import { TbApi } from "react-icons/tb"
import { BsKanbanFill } from "react-icons/bs"
import { Code2, Palette, Wrench } from "lucide-react"
import React from "react"
import { skillsContent } from "@/constants"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { EASE } from "@/lib/animations"
import { useMultiLayerParallax } from "@/lib/advanced-effects"

gsap.registerPlugin(ScrollTrigger)

// Brutal Tab Button Component
function TabButton({ 
  active, 
  onClick, 
  children,
  icon: Icon,
  accentColor
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  icon: React.ElementType;
  accentColor: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    buttonRef.current.style.setProperty('--mouse-x', `${x}px`);
    buttonRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      className={`
        tab-button relative overflow-hidden px-6 py-4 rounded-xl font-display font-semibold
        transition-all duration-500 group
        ${active 
          ? 'text-white' 
          : 'text-white/60 hover:text-white'
        }
      `}
      style={{
        background: active 
          ? `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` 
          : 'transparent'
      }}
    >
      {/* Spotlight effect */}
      {!active && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(150px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor}30, transparent 50%)`
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-3">
        <div className={`
          p-2 rounded-lg transition-all duration-300
          ${active ? 'bg-white/20' : `bg-white/5 group-hover:bg-white/10`}
        `}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="hidden sm:inline">{children}</span>
      </div>

      {/* Active indicator */}
      {active && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/50 rounded-full" />
      )}
    </button>
  );
}

// Skill Card with orbital icon
function SkillCard({ 
  skill, 
  index,
  isHovered,
  onHover,
  onLeave
}: { 
  skill: { name: string; level: string; description: string; color: string };
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const getSkillIcon = (name: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      "JavaScript": <SiJavascript className="w-7 h-7" />,
      "TypeScript": <SiTypescript className="w-7 h-7" />,
      "React": <SiReact className="w-7 h-7" />,
      "Next.js": <SiNextdotjs className="w-7 h-7" />,
      "HTML5": <SiHtml5 className="w-7 h-7" />,
      "CSS3": <SiCss3 className="w-7 h-7" />,
      "Tailwind CSS": <SiTailwindcss className="w-7 h-7" />,
      "Bootstrap": <SiBootstrap className="w-7 h-7" />,
      "Redux": <SiRedux className="w-7 h-7" />,
      "Figma": <SiFigma className="w-7 h-7" />,
      "Adobe Photoshop": <SiAdobephotoshop className="w-7 h-7" />,
      "Adobe Premiere": <SiAdobepremierepro className="w-7 h-7" />,
      "Adobe After Effects": <SiAdobeaftereffects className="w-7 h-7" />,
      "Canva": <SiCanva className="w-7 h-7" />,
      "UI/UX Design": <FaUikit className="w-7 h-7" />,
      "Git & GitHub": <SiGithub className="w-7 h-7" />,
      "VS Code": <FaCode className="w-7 h-7" />,
      "WordPress": <SiWordpress className="w-7 h-7" />,
      "Jira": <SiJira className="w-7 h-7" />,
      "Notion": <SiNotion className="w-7 h-7" />,
      "Node.js": <SiNodedotjs className="w-7 h-7" />,
      "Python": <SiPython className="w-7 h-7" />,
      "API Development": <TbApi className="w-7 h-7" />,
      "Scrum/Kanban": <BsKanbanFill className="w-7 h-7" />
    }

    return iconMap[name] || (
      <div className="w-7 h-7 flex items-center justify-center font-bold text-lg">
        {name.charAt(0)}
      </div>
    )
  }

  const getLevelWidth = (level: string) => {
    if (level.includes("Avanzado") || level.includes("Advanced")) return "85%";
    if (level.includes("Intermedio") || level.includes("Intermediate")) return "65%";
    return "45%";
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // 3D rotation
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out"
    });

    // Icon follows cursor
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        x: (x - centerX) / 6,
        y: (y - centerY) / 6,
        duration: 0.3
      });
    }
  };

  const handleMouseLeave = () => {
    onLeave();
    if (cardRef.current) {
      gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power2.out" });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, { x: 0, y: 0, duration: 0.5 });
    }
  };

  return (
    <div
      ref={cardRef}
      className="skill-card group relative"
      style={{ transformStyle: "preserve-3d", perspective: "800px" }}
      onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow */}
      <div 
        className="absolute -inset-1 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-all duration-500"
        style={{ background: skill.color }}
      />
      
      <div className="relative h-full bg-card dark:bg-black rounded-2xl border border-border dark:border-white/10 overflow-hidden group-hover:border-primary/30 dark:group-hover:border-white/20 transition-all duration-300">
        {/* Top gradient line */}
        <div 
          className="absolute top-0 left-0 right-0 h-0.5 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ background: skill.color }}
        />

        {/* Content */}
        <div className="p-5 flex flex-col items-center text-center h-full">
          {/* Icon with glow */}
          <div ref={iconRef} className="relative mb-4">
            <div 
              className="absolute inset-0 rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500 scale-150"
              style={{ backgroundColor: skill.color }}
            />
            <div 
              className="relative w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ 
                backgroundColor: `${skill.color}20`,
                color: skill.color,
                boxShadow: isHovered ? `0 0 30px ${skill.color}40` : 'none'
              }}
            >
              {getSkillIcon(skill.name)}
            </div>
          </div>

          {/* Name */}
          <h3 className="font-display font-semibold text-sm text-foreground dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-white transition-colors">
            {skill.name}
          </h3>

          {/* Level bar - Always visible */}
          <div className="w-full h-1.5 bg-muted dark:bg-white/10 rounded-full overflow-hidden mt-auto">
            <div 
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: getLevelWidth(skill.level),
                background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`
              }}
            />
          </div>
          
          {/* Level text - Always visible */}
          <span 
            className="text-xs font-mono mt-2 transition-colors duration-300"
            style={{ color: skill.color }}
          >
            {skill.level}
          </span>
        </div>

        {/* Tooltip on hover */}
        {isHovered && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 translate-y-full w-56 bg-popover dark:bg-black/95 backdrop-blur-sm text-popover-foreground dark:text-white p-4 rounded-xl shadow-xl border border-border dark:border-white/10 z-50 pointer-events-none">
            <div 
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-popover dark:bg-black/95 border-t border-l border-border dark:border-white/10" 
              style={{ borderTopColor: skill.color, borderLeftColor: skill.color }}
            />
            <p className="text-sm text-muted-foreground dark:text-white/70 relative z-10">{skill.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Skills() {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const tabsContainerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("development")

  const currentContent = skillsContent[language as keyof typeof skillsContent]

  const tabConfig = [
    { key: "development", icon: Code2, color: "#8b5cf6" },
    { key: "design", icon: Palette, color: "#ec4899" },
    { key: "tools", icon: Wrench, color: "#22c55e" }
  ];

  // Animate tabs on mount
  useEffect(() => {
    if (tabsContainerRef.current) {
      gsap.fromTo(tabsContainerRef.current,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: EASE.brutalOut,
          scrollTrigger: {
            trigger: tabsContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Animate skills on tab change
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.skill-card');
      
      gsap.killTweensOf(cards);
      
      cards.forEach((card, i) => {
        const randomX = (Math.random() - 0.5) * 60; // Reducido
        const randomRotate = (Math.random() - 0.5) * 15; // Reducido
        
        gsap.fromTo(card,
          { 
            x: randomX,
            y: 50, // Reducido
            opacity: 0, 
            scale: 0.85,
            rotateZ: randomRotate,
            rotateX: -12,
            transformPerspective: 800
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateZ: 0,
            rotateX: 0,
            duration: 0.6, // Reducido
            delay: i * 0.03, // Reducido
            ease: EASE.elastic,
            force3D: true, // GPU acceleration
          }
        );
      });
    }
  }, [activeTab]);

  // Multi-layer Parallax
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const midgroundLayerRef = useRef<HTMLDivElement>(null);
  const foregroundLayerRef = useRef<HTMLDivElement>(null);
  
  useMultiLayerParallax(
    [
      { ref: backgroundLayerRef, speed: 0.2 },
      { ref: midgroundLayerRef, speed: 0.4 },
      { ref: foregroundLayerRef, speed: 0.6 }
    ],
    sectionRef
  );

  return (
    <section ref={sectionRef} id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Multi-layer Parallax Background */}
      <div ref={backgroundLayerRef} className="absolute inset-0 -z-10">
        {/* Removido fondo opaco para permitir ver ParticleBackground */}
      </div>
      <div ref={midgroundLayerRef} className="absolute inset-0 -z-5">
        <div className="absolute top-40 left-20 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[150px]" />
      </div>
      <div ref={foregroundLayerRef} className="absolute inset-0 -z-1">
        <div className="absolute top-1/3 right-1/4 w-[250px] h-[250px] bg-primary/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-[220px] h-[220px] bg-purple-500/3 rounded-full blur-[110px]" />
      </div>

      <div className="container mx-auto px-4">
        <SectionTitle 
          title={currentContent.title}
          subtitle={currentContent.description}
        />

        <div className="relative z-10">
          {/* Custom Tabs */}
          <div 
            ref={tabsContainerRef}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex gap-2 p-2 bg-black/80 backdrop-blur-sm rounded-2xl border border-white/10">
              {tabConfig.map((tab) => {
                const category = currentContent.categories.find(c => c.key === tab.key);
                return (
                  <TabButton
                    key={tab.key}
                    active={activeTab === tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    icon={tab.icon}
                    accentColor={tab.color}
                  >
                    {category?.name}
                  </TabButton>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
            {currentContent.categories.find(c => c.key === activeTab)?.description}
          </p>

          {/* Skills Grid */}
          <div 
            ref={gridRef} 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            style={{ perspective: "1000px" }}
          >
            {currentContent.skills[activeTab as keyof typeof currentContent.skills]?.map((skill, index) => (
              <SkillCard
                key={`${activeTab}-${index}`}
                skill={skill}
                index={index}
                isHovered={hoveredSkill === `${activeTab}-${index}`}
                onHover={() => setHoveredSkill(`${activeTab}-${index}`)}
                onLeave={() => setHoveredSkill(null)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
