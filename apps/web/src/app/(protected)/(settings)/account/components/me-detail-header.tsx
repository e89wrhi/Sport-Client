import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function MeHeader() {
  return (
    <div>
      <div className="bg-white dark:bg-black w-full">
        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl tracking-[0em] font-bold">
              Account
            </h1>
          </div>
        </div>

        <Separator className="mt-7 md:mt-10" />
      </div>
    </div>
  );
}
