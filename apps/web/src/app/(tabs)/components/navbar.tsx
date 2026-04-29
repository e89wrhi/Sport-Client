'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MainNavOptions } from '../../../components/layout/main-nav-options';
import { UserDto } from '@/types/api/user/current-user';
import { motion } from 'framer-motion';

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
  userProfile: UserDto | null;
}

export function SportNavBar({ userProfile }: NavBarProps) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full border-b border-border/20 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40"
    >
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <Link
          href={'/'}
          className="group flex items-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-colors" />
            <Image
              height={48}
              width={48}
              alt="logo"
              src={'/logo.png'}
              className="relative h-10 w-10 object-contain drop-shadow-2xl transition-transform group-hover:rotate-12"
            />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-2xl font-black tracking-tighter">
              SnowBall
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Market', href: '/market' },
              { label: 'Intelligence', href: '/intelligence' },
              { label: 'Predictions', href: '/predictions' },
              { label: 'Live', href: '/live' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-xs font-black uppercase tracking-widest text-muted-foreground/60 hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full rounded-full" />
              </Link>
            ))}
          </nav>

          <div className="h-6 w-px bg-border/40 hidden md:block" />

          <div className="flex items-center gap-4">
            <MainNavOptions userProfile={userProfile} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
