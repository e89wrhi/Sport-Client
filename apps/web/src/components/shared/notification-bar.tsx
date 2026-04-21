'use client';

import { X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative group overflow-hidden text-foreground">
      <div className="container mx-auto px-4 h-11 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-2.5 py-1 border border-primary/20">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">
              Mock Data
            </span>
          </div>

          <p className="text-[11px] font-bold tracking-tight text-foreground/60 whitespace-nowrap truncate md:block hidden">
            Developer Preview: Experience high-fidelity simulated sports data &
            real-time events.
          </p>
          <p className="text-[11px] font-bold tracking-tight text-foreground/60 whitespace-nowrap truncate md:hidden block">
            Dev Preview: Mock data enabled.
          </p>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center h-5 rounded-lg bg-muted border border-border/50 p-0.5 overflow-hidden">
            <Link
              href="https://github.com/e89wrhi/sport-client"
              target="_blank"
              className="flex items-center px-2 h-full text-[9px] font-black uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-background rounded-sm transition-all"
            >
              Client
            </Link>
            <div className="w-px h-2 bg-border mx-0.5" />
            <Link
              href="https://github.com/e89wrhi/sports-net"
              target="_blank"
              className="flex items-center px-2 h-full text-[9px] font-black uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-background rounded-sm transition-all"
            >
              Backend
            </Link>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
