'use client';

import { motion } from 'motion/react';
import React from 'react';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden relative">
      {/* Main Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="relative z-10 w-full max-w-[440px] px-6 py-12"
      >
        <div className="relative group">
          <div className="relative p-8 shadow-none">
            {/* Logo/Brand Header */}
            <div className="flex flex-col items-center mb-10">
              <Image
                height={228}
                width={220}
                alt="logo"
                className="shrink-0 rounded-sm h-19 w-20 drop-shadow-lg transition-transform group-hover:scale-105"
                src={'/logo.png'}
              />
              <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                Sport App
              </h1>
              <p className="text-neutral-400 text-lg font-semibold mt-2">
                matches, intellegent interactions.
              </p>
            </div>

            {children}
          </div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-[10px] text-neutral-600 uppercase tracking-[0.3em] font-medium">
            SPORT APP • v1.0
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
