import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import React from 'react';

interface Props {
  onUpdate?: () => void;
}
export default function MatchDetailHeader(props: Props) {
  const { onUpdate } = props;
  return (
    <div>
      <div className="bg-white dark:bg-black w-full">
        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold tracking-tight">Match Profile</h1>
            <p className="text-zinc-400 text-lg">
              Match person profile info and more.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button
              onClick={onUpdate}
              className="hover:bg-zinc-300 rounded-full px-6 font-semibold"
            >
              UPDATE
            </Button>
          </div>
        </div>

        <Separator className="mt-7 md:mt-10" />
      </div>
    </div>
  );
}
