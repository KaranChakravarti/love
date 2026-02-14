"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const steps = [
  {
    img: "/proposal/step1.gif",
    title: "Manja na! Kitna bhav khaegi 😭",
    subtitle: "bht glt baat hai 😤",
  },
  {
    img: "/proposal/step2.gif",
    title: "Ek aur baar Soch le! 😣",
    subtitle: "kyu aisa kr rahi hai 🥺",
  },
  {
    img: "/proposal/step3.gif",
    title: "Soch le ache se! 😳",
    subtitle: "itte jldi mt bol 🥹",
  },
  {
    img: "/proposal/step4.gif",
    title: "Do you love me? 🥺",
    subtitle: "Lucky tera hi hai 😌",
  },
];

export default function ProposalPage() {
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const handleNo = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleYes = () => {
    setAccepted(true);
  };

  return (
    <main className="min-h-screen bg-[#f5d6d6] flex items-center justify-center px-6 text-center">

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl max-w-md w-full"
          >
            {/* IMAGE */}
            <div className="flex justify-center mb-6">
              <Image
                src={steps[step].img}
                alt="cute"
                width={200}
                height={200}
                className="rounded-2xl"
                unoptimized
              />
            </div>

            {/* TITLE */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {steps[step].title}
            </h1>

            {/* SUBTITLE */}
            <p className="text-gray-600 mt-2">
              {steps[step].subtitle}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={handleYes}
                className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold hover:scale-110 transition"
              >
                Yes
              </button>

              <button
                onClick={handleNo}
                className="px-6 py-2 rounded-lg bg-white shadow hover:scale-110 transition"
              >
                No
              </button>
            </div>
          </motion.div>
        ) : (
          /* 🎉 FINAL SCREEN */
          <motion.div
            key="accepted"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Image
                src="/proposal/final.gif"
                alt="love"
                width={220}
                height={220}
                unoptimized
              />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
              Hehehehe, I knew it! 😘
            </h1>

            <p className="mt-4 text-gray-700 text-lg">
              Now you are officially mine forever 💖
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
