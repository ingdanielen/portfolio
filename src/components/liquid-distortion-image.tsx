"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useLiquidDistortion } from "@/lib/advanced-effects";

interface LiquidDistortionImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function LiquidDistortionImage({
  src,
  alt,
  width = 800,
  height = 600,
  className = "",
  priority = false,
}: LiquidDistortionImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useLiquidDistortion(containerRef, imageRef);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover"
        priority={priority}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      />
    </div>
  );
}
