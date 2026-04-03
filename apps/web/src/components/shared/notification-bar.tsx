'use client';

import { Github, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;
  return (
    <div className="flex flex-col">
      {' '}
      <div
        className={cn(
          'w-full bg-muted/20 border-b backdrop-blur-sm transition-all duration-300 animate-in fade-in',
          'border-border'
        )}
      >
        <div className="container mx-auto px-4 h-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="text-muted-foreground">
              <Github className="h-4 w-4" />
            </div>
            <p className="text-xs font-medium text-foreground/80 tracking-tight">
              Developer Preview: Currently running with simulated(mock) data
              streams for testing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`https://github.com/e89wrhi/sports-client`}
              target="_blank"
              className="text-[11px] font-bold hover:underline underline-offset-4 text-foreground/90 transition-colors px-2 py-0.5"
            >
              Client
            </Link>
            <Link
              href={`https://github.com/e89wrhi/sports-net`}
              target="_blank"
              className="text-[11px] font-bold hover:underline underline-offset-4 text-foreground/90 transition-colors px-2 py-0.5"
            >
              Backend
            </Link>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
