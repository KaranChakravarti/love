"use client";

import { MotionValue, useTransform, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
  // Phase 1: Hero (0 - 0.33)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0.25, 0.33], ["0px", "10px"]);
  const heroY = useTransform(scrollYProgress, [0, 0.33], [0, -50]);

  // Phase 2: Design (0.33 - 0.66)
  const designOpacity = useTransform(scrollYProgress, [0.3, 0.36, 0.6, 0.66], [0, 1, 1, 0]);
  const designY = useTransform(scrollYProgress, [0.3, 0.66], [50, -50]);
  const designBlur = useTransform(scrollYProgress, [0.6, 0.66], ["0px", "10px"]);

  // Phase 3: Engine (0.66 - 1.0)
  const engineOpacity = useTransform(scrollYProgress, [0.63, 0.7, 1], [0, 1, 1]);
  const engineY = useTransform(scrollYProgress, [0.63, 1], [50, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center p-6 md:p-12 text-white">
      {/* PHASE 1: HERO */}
      <motion.div 
        style={{ opacity: heroOpacity, filter: `blur(${heroBlur})`, y: heroY }}
        className="text-center w-full max-w-4xl flex flex-col items-center justify-center h-full"
      >
        <h1 className="text-6xl md:text-9xl font-bold font-orbitron tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-4 drop-shadow-2xl uppercase">
          Pagani Zonda R
        </h1>
        <div className="w-24 h-1 bg-pagani-gold mb-8 shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
        
        <div className="grid grid-cols-2 gap-8 md:gap-16 font-rajdhani text-xl md:text-2xl tracking-widest text-gray-300">
          <div className="flex flex-col items-end border-r border-white/20 pr-8">
            <span className="text-pagani-gold text-sm font-semibold mb-1">PRICE</span>
            <span className="text-3xl font-bold text-white">€1.5M</span>
          </div>
          <div className="flex flex-col items-start pl-8">
             <span className="text-pagani-gold text-sm font-semibold mb-1">AVAILABILITY</span>
             <span className="text-3xl font-bold text-white">INQUIRE</span>
          </div>
        </div>
      </motion.div>

      {/* PHASE 2: DESIGN */}
      <motion.div 
        style={{ opacity: designOpacity, filter: `blur(${designBlur})`, y: designY }}
        className="absolute inset-0 flex flex-col items-start justify-center p-8 md:pl-24 max-w-7xl mx-auto w-full"
      >
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-lg border-l-4 border-pagani-gold">
          <h2 className="text-5xl md:text-7xl font-bold font-orbitron mb-6 text-white uppercase tracking-wider">
            Design
          </h2>
          <p className="text-xl md:text-2xl font-rajdhani text-gray-200 max-w-md leading-relaxed">
            Crafted from <span className="text-pagani-gold font-semibold">carbo-titanium</span>, the chassis offers unparalleled rigidity and lightweight performance. Aerodynamics sculpt the wind itself.
          </p>
          <div className="mt-8 flex gap-4">
             <div className="px-4 py-2 border border-white/30 rounded text-sm font-rajdhani tracking-widest uppercase text-gray-400">
                Monocoque
             </div>
             <div className="px-4 py-2 border border-white/30 rounded text-sm font-rajdhani tracking-widest uppercase text-gray-400">
                Aerodynamics
             </div>
          </div>
        </div>
      </motion.div>

      {/* PHASE 3: ENGINE */}
      <motion.div 
        style={{ opacity: engineOpacity, y: engineY }}
        className="absolute inset-0 flex flex-col items-end justify-center p-8 md:pr-24 max-w-7xl mx-auto w-full"
      >
         <div className="bg-black/40 backdrop-blur-md p-8 rounded-lg border-r-4 border-pagani-gold text-right">
          <h2 className="text-5xl md:text-7xl font-bold font-orbitron mb-6 text-white uppercase tracking-wider">
            Engine
          </h2>
          <div className="space-y-6 font-rajdhani">
            <div className="flex flex-col items-end">
                <span className="text-pagani-gold text-sm font-semibold tracking-widest uppercase mb-1">Engine Type</span>
                <span className="text-4xl md:text-5xl font-bold">AMG V12</span>
            </div>
             <div className="flex flex-col items-end">
                <span className="text-pagani-gold text-sm font-semibold tracking-widest uppercase mb-1">Power Output</span>
                <span className="text-4xl md:text-5xl font-bold">750 HP</span>
            </div>
             <div className="flex flex-col items-end">
                <span className="text-pagani-gold text-sm font-semibold tracking-widest uppercase mb-1">0-100 km/h</span>
                <span className="text-4xl md:text-5xl font-bold">2.7s</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* GLOBAL HUD ELEMENTS */}
      <div className="absolute top-8 left-8 font-rajdhani text-xs tracking-[0.3em] text-white/50">
         SYSTEM: ACTIVE
      </div>
      <div className="absolute top-8 right-8 font-rajdhani text-xs tracking-[0.3em] text-white/50">
         ZONDA R // PROTOTYPE
      </div>
       <div className="absolute bottom-8 left-8 font-rajdhani text-xs tracking-[0.3em] text-white/50">
         SCROLL TO NAVIGATE
      </div>
       <div className="absolute bottom-8 right-8 w-32 h-[1px] bg-white/20">
         <motion.div 
           style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
           className="h-full bg-pagani-gold w-full"
         />
      </div>
    </div>
  );
}
