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
    <div className="absolute bottom-6 left-6 w-[320px] z-30 pointer-events-none">
      {/* Fade mask */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl pointer-events-none" />

      <div className="relative flex flex-col gap-2 max-h-[300px] overflow-hidden">
        <AnimatePresence initial={false}>
          {visibleEvents.map((event) => (
            <motion.div
              key={event.Id}
              initial={{ opacity: 0, x: -30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="flex items-start gap-2 px-3 py-2 rounded-full 
                         bg-white/10 backdrop-blur-md border border-white/20
                         text-white text-xs shadow-lg"
            >
              <span className="font-mono text-[10px] opacity-60">
                {event.Time.toDateString()}&apos;
              </span>

              <span className="font-semibold text-primary">{event.Title}</span>

              <span className="opacity-80 truncate">
                {getEventIcon(event.Type)} {event.Title}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
