import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import { LocationType } from '@/types/enums/location';
import { MatchLeague } from '@/types/enums/sport';
import { prefetchMatches } from '@/lib/api/sports/getMatches';
import MatchListClient from './components/components/match-list-client';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{
    type?: string;
    location?: string;
  }>;
}

export default async function MatchListsPage({ searchParams }: PageProps) {
  const searchParamsResolved = await searchParams;

  // Parse search params with proper types
  const type = searchParamsResolved.type || MatchLeague.PremierLeague;
  const location = searchParamsResolved.location || LocationType.Global;

  return (
    <div className="relative min-h-screen bg-white dark:bg-black">
      {/* Ambient background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] h-[50%] w-[50%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<LoadingView />}>
          <DataLoader type={type} location={location} />
        </Suspense>
      </div>
    </div>
  );
}

async function DataLoader({
  type,
  location,
}: {
  type: string;
  location: string;
}) {
  const queryClient = new QueryClient();
  await prefetchMatches(queryClient, type, location);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MatchListClient type={type} location={LocationType.Global} offset={0} />
    </HydrationBoundary>
  );
}
