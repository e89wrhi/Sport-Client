'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost, Globe2 } from 'lucide-react';

export default function EmptyPageView() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background flex items-center justify-center p-6">
      {/* Background ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[10%] -right-[10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="h-[2px] w-12 bg-primary rounded-full" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-primary">
                Error 404
              </span>
            </motion.div>
            <h1 className="text-7xl sm:text-9xl font-black tracking-tighter leading-none italic uppercase">
              Lost In <br />
              <span className="text-primary">Play</span>
            </h1>
            <p className="text-xl text-muted-foreground font-medium max-w-lg leading-relaxed">
              We couldn&apos;t find the arena you were looking for. The match
              may have moved or the tunnel is closed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="h-14 px-10 rounded-2xl border-border/40 bg-card/40 backdrop-blur-md font-black uppercase tracking-widest text-xs hover:bg-accent transition-all"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>

          <div className="pt-8 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full bg-muted border-2 border-background animate-pulse"
                />
              ))}
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Joined by <span className="text-foreground">2k+ fans</span> online
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          className="relative aspect-square hidden lg:flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-[4rem] blur-2xl" />
          <div className="relative w-full h-full rounded-[4rem] border border-border/40 bg-card/40 backdrop-blur-xl p-12 flex items-center justify-center group">
            <div className="absolute top-10 right-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-background border shadow-xl">
              <Globe2 className="h-8 w-8 text-primary" />
            </div>
            <Ghost className="h-48 w-48 text-muted-foreground/10 group-hover:text-primary/20 transition-colors duration-700" />
            <div className="absolute bottom-12 left-12 space-y-2">
              <div className="h-1 w-24 bg-primary rounded-full" />
              <p className="text-xs font-black uppercase tracking-[0.3em] opacity-40">
                System Disconnect
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
