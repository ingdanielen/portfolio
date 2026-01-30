"use client";

import { ReactNode, useRef, useEffect } from "react";

interface GlassmorphismWrapperProps {
  children: ReactNode;
  intensity?: number;
  className?: string;
}

export function GlassmorphismWrapper({ 
  children, 
  intensity = 10, 
  className = "" 
}: GlassmorphismWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.backdropFilter = `blur(${intensity}px)`;
    ref.current.style.webkitBackdropFilter = `blur(${intensity}px)`;
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={`bg-background/40 border border-white/10 rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
