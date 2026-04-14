'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EventDto } from '@/types/api/events';
import { MatchEventType } from '@/types/enums/sport';

interface LiveEventsFeedProps {
  events: EventDto[];
  matchId: string;
}

export function LiveEventsFeed({ events }: LiveEventsFeedProps) {
  const visibleEvents = events.slice(-6); // show last 6 like TikTok

  const getEventIcon = (type: string) => {
    switch (type) {
      case MatchEventType.Goal:
        return '⚽';
      case MatchEventType.RedCard:
        return '🟥';
      case MatchEventType.YellowCard:
        return '🟨';
      case MatchEventType.Substitution:
        return '🔄';
      default:
        return '💬';
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 w-[340px] hidden xl:block pointer-events-none">
      <div className="relative flex flex-col gap-3">
        <div className="flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30 w-fit">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Commentary</span>
        </div>
        
        <AnimatePresence initial={false}>
          {visibleEvents.map((event, index) => (
            <motion.div
              key={event.Id}
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ 
                opacity: index === visibleEvents.length - 1 ? 1 : 0.6, 
                x: 0, 
                scale: 1 
              }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lg">
                {getEventIcon(event.Type)}
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-primary uppercase">Event</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-[10px] font-medium text-white/40">Recently</span>
                </div>
                <p className="text-sm font-bold text-white truncate leading-none">
                  {event.Title}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
