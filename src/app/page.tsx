"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function HomePage() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-wallpaper');

  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-bold text-softpink drop-shadow-lg font-headline"
        >
          For Someone Special ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-lg text-gray-200 max-w-xl"
        >
          I made something from my heart… please see till the end.
        </motion.p>

        <Link href="/reasons">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-8 py-4 rounded-full bg-romantic text-white text-lg font-semibold shadow-xl"
          >
            Tap to Begin ❤️
          </motion.button>
        </Link>
      </div>
    </main>
  );
}
