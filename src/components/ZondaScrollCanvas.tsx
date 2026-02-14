"use client";

import { useEffect, useRef, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface ZondaScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function ZondaScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: ZondaScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    const loadImages = async () => {
      // Create empty slots
      imgArray.length = totalFrames;
      
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        img.src = `${imageFolderPath}/${i + 1}.jpg`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalFrames) {
            setIsLoaded(true);
          }
        };
        imgArray[i] = img;
      }
      imagesRef.current = imgArray;
    };

    loadImages();
  }, [totalFrames, imageFolderPath]);

  // Draw frame logic
  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img) return;

    const dpr = window.devicePixelRatio || 1;
    
    // Canvas dimensions (physical pixels)
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Image aspect ratio
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = canvasWidth / canvasHeight;
    
    let renderWidth, renderHeight, offsetX, offsetY;
    
    if (canvasAspect > imgAspect) {
        // Canvas is wider than image (fit height)
        renderHeight = canvasHeight;
        renderWidth = canvasHeight * imgAspect;
        offsetX = (canvasWidth - renderWidth) / 2;
        offsetY = 0;
    } else {
        // Canvas is taller than image (fit width)
        renderWidth = canvasWidth;
        renderHeight = canvasWidth / imgAspect;
        offsetX = 0;
        offsetY = (canvasHeight - renderHeight) / 2;
    }
    
    ctx.drawImage(img, offsetX, offsetY, renderWidth, renderHeight);
  };

  // Handle Resize & Setup Canvas Resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Attempt to redraw current frame immediately after resize
      if (isLoaded) {
         const currentProgress = scrollYProgress.get();
         const frameIndex = Math.min(
           totalFrames - 1,
           Math.floor(currentProgress * (totalFrames - 1))
         );
         requestAnimationFrame(() => renderFrame(frameIndex));
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial size

    return () => window.removeEventListener('resize', handleResize);
  }, [isLoaded, scrollYProgress, totalFrames]);

  // Sync scroll to frame
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isLoaded || !canvasRef.current) return;
    
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.floor(latest * (totalFrames - 1))
    );
    
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-contain bg-pagani-black"
    />
  );
}
