'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2, Radio } from 'lucide-react';

interface Props {
  itemsname?: string;
  className?: string;
}

export default function LoadingView(props: Props) {
  const { itemsname, className } = props;
  const name = itemsname ? itemsname.toLowerCase() : 'data';

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-24 text-center w-full',
        className
      )}
    >
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
          />
          <div className="relative h-20 w-20 rounded-[2.5rem] bg-card/50 backdrop-blur-sm border border-border/40 flex items-center justify-center shadow-2xl">
            <Loader2 className="h-10 w-10 text-primary animate-spin-slow" />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-0 right-0 p-1.5"
            >
              <Radio className="h-4 w-4 text-primary" />
            </motion.div>
          </div>
        </div>

        <div className="space-y-1">
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground italic flex items-center justify-center gap-2"
          >
            Fetching {name}
          </motion.p>
          <div className="h-1 w-32 bg-muted rounded-full overflow-hidden mx-auto">
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
