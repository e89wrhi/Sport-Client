'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw, Unlink } from 'lucide-react';

interface Props {
  itemsname?: string;
  error?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorView(props: Props) {
  const { itemsname, error, onRetry, className } = props;
  const name = itemsname || 'content';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        'flex flex-col items-center justify-center py-20 text-center px-4',
        className
      )}
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-destructive/10 blur-3xl rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-card to-destructive/5 border border-destructive/20 shadow-2xl">
          <AlertOctagon className="h-10 w-10 text-destructive/60" />
          <motion.div
            animate={{
              rotate: [0, 15, -15, 0],
            }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            className="absolute -top-1 -right-1 p-1 bg-background rounded-full border shadow-sm"
          >
            <Unlink className="h-4 w-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-xs space-y-3">
        <h3 className="text-2xl font-black tracking-tight uppercase italic text-destructive">
          Signal Interrupted
        </h3>
        <p className="text-muted-foreground font-medium text-sm leading-relaxed px-4">
          We encountered an issue while attempting to transmit the latest{' '}
          <span className="text-foreground font-black">
            {name.toLowerCase()}
          </span>{' '}
          data.
          {error && (
            <span className="block mt-2 text-[10px] uppercase tracking-tighter opacity-50 font-mono italic">
              Trace: {error}
            </span>
          )}
        </p>
      </div>

      {onRetry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-10"
        >
          <Button
            onClick={onRetry}
            className="h-12 rounded-xl px-10 bg-destructive hover:bg-destructive/90 font-black uppercase tracking-widest text-xs shadow-lg shadow-destructive/20 active:scale-95 transition-all group"
          >
            <RefreshCw className="mr-2 h-4 w-4 transition-transform group-hover:rotate-180 duration-500" />
            Establish Connection
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
