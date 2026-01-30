"use client";

import { useEffect, useRef } from "react";

interface NoiseOverlayProps {
  intensity?: number;
  opacity?: number;
  className?: string;
}

export function NoiseOverlay({ intensity = 0.3, opacity = 0.15, className = "" }: NoiseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 256;
    canvas.height = 256;

    // Generate noise
    const imageData = ctx.createImageData(256, 256);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const value = Math.random() * 255;
      imageData.data[i] = value; // R
      imageData.data[i + 1] = value; // G
      imageData.data[i + 2] = value; // B
      imageData.data[i + 3] = intensity * 255; // A
    }
    ctx.putImageData(imageData, 0, 0);
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 mix-blend-overlay ${className}`}
      style={{
        opacity,
        backgroundImage: `url(${canvasRef.current?.toDataURL()})`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
      }}
    />
  );
}
