'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Languages } from 'lucide-react';
import React from 'react';

export function LocaleChange({ pathname }: { pathname: string }) {
  const router = useRouter();

  function switchTo(locale: string) {
    // Save language preference in a cookie (expires in 1 year)
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;

    // Update the URL
    const segments = pathname.split('/');
    segments[1] = locale;
    router.replace(segments.join('/'));
    //router.push(`/${locale}/` + url);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 px-0 rounded-full
        hover:text-orange-500"
        >
          <Languages className="" />
          <span className="sr-only"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div>
          <DropdownMenuItem onClick={() => switchTo('en')}>
            <span>English</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
