'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Trophy,
  Dribbble,
  Swords,
  Activity,
  Flame,
  Gamepad2,
} from 'lucide-react';

interface UpcomingSportViewProps {
  sportId: string;
  sportName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sportIcons: Record<string, any> = {
  soccer: Trophy,
  nba: Dribbble,
  nfl: Activity,
  ufc: Swords,
  esports: Gamepad2,
  f1: Flame,
};

export function UpcomingSportView({
  sportId,
  sportName,
}: UpcomingSportViewProps) {
  const Icon = sportIcons[sportId] || Calendar;

  return (
    <div className="relative w-full py-12 md:py-24 px-6 overflow-hidden rounded-[3rem] border border-border/40 bg-card/20 backdrop-blur-md">
      <div className="relative z-10 flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative"
        >
          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full bg-background flex items-center justify-center shadow-2xl">
            <Icon className="h-12 w-12 md:h-16 md:w-16 text-primary" />
          </div>
        </motion.div>

        <div className="max-w-xl space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
            Season <span className="text-primary">Opening</span> Soon
          </h2>
          <p className="text-muted-foreground font-medium text-sm md:text-base leading-relaxed">
            The {sportName} market is currently being calibrated by our AI
            engines. We&apos;re aggregating historical data and real-time
            performance vectors to bring you the best-in-class {sportName}{' '}
            experience.
          </p>
        </div>
      </div>
    </div>
  );
}
