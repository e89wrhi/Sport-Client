'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PackageOpen, Sparkles, Plus } from 'lucide-react';

interface Props {
  title?: string;
  description?: string;
  itemsname?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyView(props: Props) {
  const { title, description, itemsname, actionLabel, onAction, className } =
    props;

  const name = itemsname ? itemsname : 'Item';
  const displayTitle = title || `All Caught Up`;
  const displayDesc =
    description || `No ${name.toLowerCase()} found in this section right now.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex flex-col items-center justify-center py-20 text-center px-4',
        className
      )}
    >
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-card to-muted/50 border border-border/40 shadow-2xl">
          <PackageOpen className="h-10 w-10 text-muted-foreground/40" />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
        </div>
      </div>

      <div className="max-w-xs space-y-2">
        <h3 className="text-2xl font-black tracking-tight uppercase italic italic">
          {displayTitle}
        </h3>
        <p className="text-muted-foreground font-medium text-sm leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {actionLabel && onAction && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Button
            onClick={onAction}
            className="h-12 rounded-full px-8 font-black uppercase tracking-widest text-xs group transition-all hover:shadow-[0_0_20px_rgba(var(--primary),0.3)] shadow-lg"
          >
            <Plus className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
