'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

export default function LoadingPageView() {
  return (
    <div className="relative w-full min-h-screen bg-background flex flex-col items-center justify-center overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full bg-[radial-gradient(circle_at_center,rgba(var(--primary),0.05)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-12">
        <div className="relative">
          {/* Animated rings */}
          {[1.2, 1.5, 1.8].map((scale, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0, 0.2, 0], scale }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.8,
                ease: 'easeOut',
              }}
              className="absolute inset-0 rounded-full border border-primary/30"
            />
          ))}

          {/* Core branding element */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative h-32 w-32 rounded-[3rem] bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-[0_0_50px_rgba(var(--primary),0.3)]"
          >
            <Radio className="h-14 w-14 text-primary-foreground animate-pulse" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-[3rem] border-2 border-white/20 border-t-white/80"
            />
          </motion.div>
        </div>

        <div className="space-y-4 text-center">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter italic">
              <span className="text-primary">SnowBall</span> Intelligence
            </h2>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/60">
              <span className="h-1 w-1 rounded-full bg-primary animate-ping" />
              Initializing Arena
            </div>
          </div>

          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden relative">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-muted-foreground opacity-30">
          Secure Neural Connection Active
        </p>
      </div>
    </div>
  );
}
