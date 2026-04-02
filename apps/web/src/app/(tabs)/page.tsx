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
    <div className="min-h-screen bg-white dark:bg-black">
      <Suspense fallback={<LoadingView />}>
        <DataLoader type={type} location={location} />
      </Suspense>
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
