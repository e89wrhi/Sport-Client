'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

/* this is for page not component generic for not-found pages */
export default function EmptyPageView() {
  return (
    <div className="flex w-full max-w-6xl min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="flex items-center justify-center p-6 aspect-square">
          <Image
            src={'/_logo/logo1.png'}
            height={200}
            width={200}
            alt="snowball"
            className="h-20 w-20 md:h-30 md:w-30 hidden dark:block"
          />
          <Image
            src={'/_logo/logo4.png'}
            height={200}
            width={200}
            alt="snowball"
            className="h-20 w-20 md:h-30 md:w-30 block dark:hidden"
          />
        </div>

        <div className="flex flex-col justify-center space-y-5">
          <p className="text-sm font-semibold uppercase tracking-widest">
            SnowBall
          </p>
          <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight">
            Page not found
          </h1>
          <p className="text-lg">Opps, couldn&apos;t find this page.</p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href={`/`}>
              <Button
                className="px-8 py-4 rounded-full font-semibold text-base"
                variant="default"
              >
                Home
              </Button>
            </Link>
            <Link href={`/`}>
              <Button
                className="px-8 py-4 rounded-full hover:bg-background/30 font-semibold text-base"
                variant="link"
              >
                Help?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
