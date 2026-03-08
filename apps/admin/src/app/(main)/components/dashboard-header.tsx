'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { LocaleChange } from '@/components/shared/change-locale';
import { ModeToggle } from '@/components/shared/mode-toggle';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  title?: string;
  ref?: React.Ref<HTMLElement>;
}

export const DashboardHeader = ({ className, ...props }: HeaderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [offset, setOffset] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener('scroll', onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40',
        'bg-card dark:bg-black',
        'flex h-16 items-center justify-between gap-4 p-4',
        'border-b border-border/90 dark:border-gray-800',
        className
      )}
      {...props}
    >
      <div className="flex flex-row items-center">
        <Label className="font-bold ml-5 text-2xl">Admin Portal</Label>
      </div>

      <div className="flex items-center flex-row">
        <ModeToggle />
        <LocaleChange pathname="" />
      </div>
    </header>
  );
};

DashboardHeader.displayName = 'Header';
