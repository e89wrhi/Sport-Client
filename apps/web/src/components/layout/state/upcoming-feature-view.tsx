'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  BrainCircuit,
  Binary,
  Zap,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface UpcomingFeatureViewProps {
  featureId: string;
  featureName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const featureIcons: Record<string, any> = {
  market: BarChart3,
  intelligence: BrainCircuit,
  predictions: Binary,
  live: Zap,
};

export function UpcomingFeatureView({
  featureId,
  featureName,
}: UpcomingFeatureViewProps) {
  const Icon = featureIcons[featureId] || Sparkles;

  return (
    <div className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
            <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-card border border-border/40 shadow-2xl mx-auto">
              <Icon className="h-16 w-16 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              {featureName} <br />
              <span className="text-muted-foreground/30">Hub</span>
            </h1>
            <p className="text-lg text-muted-foreground font-medium max-w-lg mx-auto leading-relaxed">
              <span className="text-foreground font-bold">{featureName}</span>{' '}
              experience. Deploying soon.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/">
              <Button className="h-14 px-10 rounded-full bg-primary text-primary-foreground font-black tracking-widest text-xs hover:scale-105 active:scale-95 transition-all">
                <ArrowLeft className="ml-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
