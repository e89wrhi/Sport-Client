'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

interface VoteChartProps {
  homeVotes: number;
  awayVotes: number;
  drawVotes: number;
  homeTeamName: string;
  awayTeamName: string;
}

export function VoteChart({
  homeVotes,
  awayVotes,
  drawVotes,
  homeTeamName,
  awayTeamName,
}: VoteChartProps) {
  const total = homeVotes + awayVotes + drawVotes;
  const homePercent = total > 0 ? (homeVotes / total) * 100 : 0;
  const drawPercent = total > 0 ? (drawVotes / total) * 100 : 0;
  const awayPercent = total > 0 ? (awayVotes / total) * 100 : 0;

  return (
    <Card className="w-full bg-card/40 backdrop-blur-md border border-border/40 rounded-[2rem] overflow-hidden">
      <CardContent className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/50">
              Fans Sentiment
            </h4>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black tabular-nums">
                {total.toLocaleString()}
              </span>
              <span className="text-xs font-bold text-muted-foreground">
                Votes
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-orange-500/80">
              Live Results
            </span>
          </div>
        </div>

        {/* Segmented Bar */}
        <div className="relative h-10 w-full bg-muted/20 rounded-2xl overflow-hidden flex shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${homePercent}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="h-full bg-gradient-to-r from-orange-600 to-orange-400 relative group cursor-help"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${drawPercent}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="h-full bg-gradient-to-r from-yellow-500 to-yellow-300 relative group cursor-help border-x border-black/10"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${awayPercent}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700 relative group cursor-help"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        {/* Labels & Stats */}
        <div className="grid grid-cols-3 gap-6">
          {/* Home */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              <span className="text-xs font-black uppercase tracking-wider truncate max-w-[80px]">
                {homeTeamName}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-orange-500">
                {Math.round(homePercent)}%
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tabular-nums">
                {homeVotes.toLocaleString()} Votes
              </span>
            </div>
          </div>

          {/* Draw */}
          <div className="space-y-2 text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.4)]" />
              <span className="text-xs font-black uppercase tracking-wider">
                Draw
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-yellow-500">
                {Math.round(drawPercent)}%
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tabular-nums">
                {drawVotes.toLocaleString()} Votes
              </span>
            </div>
          </div>

          {/* Away */}
          <div className="space-y-2 text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs font-black uppercase tracking-wider truncate max-w-[80px]">
                {awayTeamName}
              </span>
              <div className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-blue-500">
                {Math.round(awayPercent)}%
              </span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tabular-nums">
                {awayVotes.toLocaleString()} Votes
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
