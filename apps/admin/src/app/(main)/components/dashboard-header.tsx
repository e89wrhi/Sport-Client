'use client';

import React from 'react';
import { Search, Bell, Menu, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { LocaleChange } from '@/components/shared/change-locale';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  title?: string;
  ref?: React.Ref<HTMLElement>;
}

export const DashboardHeader = ({ className, ...props }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        'h-16 flex items-center justify-between gap-4 px-6 md:px-8',
        'border-b border-border/50',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm' 
          : 'bg-background',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-4 flex-1">
        <div className="hidden lg:flex items-center relative max-w-md w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-yellow-500 transition-colors" />
          <Input 
            type="search" 
            placeholder="Search analytics, matches, or users..." 
            className="pl-10 h-10 w-full bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-yellow-500/50 transition-all rounded-xl"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 hidden sm:flex pointer-events-none">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>
        
        {/* Mobile Logo / Title */}
        <div className="lg:hidden flex items-center">
          <Label className="font-bold text-xl bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            Admin
          </Label>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex items-center pr-2 border-r border-border/50 gap-1">
          <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full text-muted-foreground hover:text-yellow-500">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-yellow-500 ring-2 ring-background ring-offset-0" />
          </Button>
          <ModeToggle />
        </div>
        
        <div className="flex items-center gap-3">
          <LocaleChange pathname="" />
          <Button variant="outline" size="sm" className="hidden sm:flex rounded-full gap-2 border-yellow-500/20 hover:bg-yellow-500/5">
            <UserCircle className="h-4 w-4 text-yellow-500" />
            <span className="font-medium">Support</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

DashboardHeader.displayName = 'Header';
