'use client';

import { Github, X, Info, ExternalLink, Code2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'motion/react';

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative z-50 overflow-hidden"
        >
          <div
            className={cn(
              'w-full bg-neutral-600 dark:bg-neutral-950 text-white border-b border-neutral-500/30',
              'py-2 px-4 shadow-sm'
            )}
          >
            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-lg hidden sm:block">
                  <Code2 className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-[10px] uppercase tracking-wider font-extrabold h-5">
                    DEVELOPER PREVIEW
                  </Badge>
                  <p className="text-xs font-semibold tracking-tight text-white/90">
                    Currently streaming <span className="text-white underline decoration-white/30 underline-offset-2">mock analytics</span> for testing purposes.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-4">
                  <Link
                    href="https://github.com/e89wrhi/sports-client"
                    target="_blank"
                    className="group flex items-center gap-1.5 text-[11px] font-bold text-white/80 hover:text-white transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    FE Repo
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                  <div className="w-px h-3 bg-white/20" />
                  <Link
                    href="https://github.com/e89wrhi/sports-net"
                    target="_blank"
                    className="group flex items-center gap-1.5 text-[11px] font-bold text-white/80 hover:text-white transition-colors"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    BE Repo
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </div>
                
                <button
                  onClick={() => setIsVisible(false)}
                  className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-all duration-200"
                  aria-label="Close notification"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
