"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ZondaScrollCanvas from "./ZondaScrollCanvas";
import ZondaExperience from "./ZondaExperience";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress relative to this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-pagani-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <ZondaScrollCanvas 
            scrollYProgress={scrollYProgress} 
            totalFrames={240}
            imageFolderPath="/images/zonda-sequence"
        />
        <ZondaExperience scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}
