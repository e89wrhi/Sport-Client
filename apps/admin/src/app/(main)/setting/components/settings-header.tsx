import { Separator } from '@/components/ui/separator';
import React from 'react';

export default function SettingsHeader() {
  return (
    <div>
      <div className="bg-white dark:bg-black w-full">
        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
            <p className="text-zinc-400 text-lg">
              Manage settings. general, appearance, notifications...
            </p>
          </div>
        </div>

        <Separator className="mt-7 md:mt-10" />
      </div>
    </div>
  );
}
