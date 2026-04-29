'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  itemsname?: string;
  error?: string;
  onRetry?: () => void;
  className?: string;
}

/* this is for components generic error view like list, detail */
export default function ErrorView(props: Props) {
  const { itemsname, error, onRetry, className } = props;
  const name = itemsname ? itemsname : 'Page';
  const desc =
    'Failed to load ' +
    name +
    ', We are having trouble loading this page right now. Please try refreshing' +
    error;
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 text-center animate-in fade-in-50',
        className
      )}
    >
      <div className="mb-4">
        <Image
          src={'/error.png'}
          height={600}
          width={600}
          alt="snowball"
          className="h-50 w-50"
        />
      </div>
      <h3 className="text-xl font-semibold tracking-tight">
        Something Went Wrong
      </h3>
      <p className="text-muted-foreground max-w-sm mt-2 mb-6 text-sm">{desc}</p>
      {onRetry && (
        <Button variant="default" onClick={onRetry} className="rounded-full">
          Retry
        </Button>
      )}
    </div>
  );
}
