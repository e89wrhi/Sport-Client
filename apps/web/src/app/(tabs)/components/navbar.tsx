'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MainNavOptions } from '../../../components/layout/main-nav-options';
import { UserDto } from '@/types/api/user/current-user';

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
  userProfile: UserDto | null;
}

export function SportNavBar({ userProfile }: NavBarProps) {
  return (
    <header
      className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link
          href={'/'}
          className="flex items-center space-x-2 transition-all hover:opacity-90"
        >
          <div className="relative">
            <Image
              height={40}
              width={40}
              alt="logo"
              src={'/logo.png'}
              className="h-8 w-8 object-contain"
            />
          </div>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-xl font-black tracking-tighter text-transparent">
            SPORTS
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <MainNavOptions userProfile={userProfile} />
        </div>
      </div>
    </header>
  );
}
