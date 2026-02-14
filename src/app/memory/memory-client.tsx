"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Memory } from "@/lib/types";

export function MemoryClient({ memories }: { memories: Memory[] }) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-black via-deepred to-black p-4 pt-24">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-softpink mb-10 font-headline text-center">
            Our Memories
          </h1>
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-4">
            {memories.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="cursor-pointer aspect-square flex items-center justify-center relative group"
                onClick={() => setSelectedMemory(memory)}
              >
                <div className="absolute inset-0 bg-transparent group-hover:bg-white/10 rounded transition-colors" />
                <Heart className="w-full h-full text-romantic hover:text-softpink transition-colors fill-current" />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={!!selectedMemory} onOpenChange={(open) => !open && setSelectedMemory(null)}>
        <DialogContent className="bg-black/90 border border-white/20 text-white max-w-4xl w-auto h-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-headline text-softpink">
              {selectedMemory?.date ? new Date(selectedMemory.date).toLocaleDateString() : "Memory"}
            </DialogTitle>
          </DialogHeader>
          {selectedMemory && (
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full max-h-[70vh] aspect-video sm:aspect-auto">
                 <Image
                  src={selectedMemory.src}
                  alt="Memory"
                  width={1000}
                  height={1000}
                  className="rounded-lg object-contain max-w-full max-h-[70vh] mx-auto"
                />
              </div>
              <p className="text-center text-lg md:text-xl font-light italic text-gray-200">
                "{selectedMemory.sentence || "Remembering this moment..."}"
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
