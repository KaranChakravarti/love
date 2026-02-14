"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function ReasonsClient({ reasons }: { reasons: string[] }) {
  const [index, setIndex] = useState(0);

  const nextReason = () => {
    if (index < reasons.length - 1) setIndex(index + 1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-deepred to-black flex flex-col items-center justify-center px-6 text-center">

      <h1 className="text-4xl md:text-5xl font-bold text-softpink mb-10 font-headline">
        Few Reasons Why I Love You ❤️
      </h1>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-xl border border-pink-400/30 rounded-3xl p-10 max-w-xl w-full shadow-2xl"
        >
          <p className="text-2xl md:text-3xl text-white font-semibold min-h-[100px] flex items-center justify-center">
            {index + 1}. {reasons[index]}
          </p>

          <div className="mt-8 flex justify-center gap-4">
            {index < reasons.length - 1 ? (
              <button
                onClick={nextReason}
                className="px-6 py-3 rounded-full bg-romantic hover:bg-softpink transition text-white font-semibold"
              >
                Next ❤️
              </button>
            ) : (
              <Link href="/proposal">
                <button className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold">
                  Final Surprise 💍
                </button>
              </Link>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
