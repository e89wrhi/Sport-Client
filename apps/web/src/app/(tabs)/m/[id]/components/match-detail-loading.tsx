import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import DetailWidthWrapper from '@/components/layout/detail-width-wrapper';

export default function MatchDetailLoading() {
  return (
    <DetailWidthWrapper>
      <div className="mt-6 flex flex-col items-center gap-8 pb-20 animate-pulse">
        {/* League & Status Badge Skeleton */}
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        {/* Scoreboard Skeleton */}
        <div className="w-full flex items-center justify-between max-w-4xl px-4 md:px-12 py-8 md:py-16 bg-card/60 backdrop-blur-sm border rounded-[1.5rem] md:rounded-[3rem] shadow-xl">
          <div className="flex flex-col items-center gap-2 md:gap-4 flex-1">
            <Skeleton className="w-16 h-16 md:w-36 md:h-36 rounded-full" />
            <Skeleton className="h-4 md:h-8 w-20 md:w-32" />
          </div>
          <div className="flex flex-col items-center gap-1 md:gap-3 mx-2 md:mx-6">
            <Skeleton className="h-8 md:h-24 w-12 md:w-48" />
            <Skeleton className="h-4 md:h-6 w-10 md:w-20 rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-2 md:gap-4 flex-1">
            <Skeleton className="w-16 h-16 md:w-36 md:h-36 rounded-full" />
            <Skeleton className="h-4 md:h-8 w-20 md:w-32" />
          </div>
        </div>

        {/* Info Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32 rounded-3xl" />
          ))}
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
          <Skeleton className="h-[400px] rounded-3xl" />
          <Skeleton className="h-[400px] rounded-3xl" />
        </div>
      </div>
    </DetailWidthWrapper>
  );
}
