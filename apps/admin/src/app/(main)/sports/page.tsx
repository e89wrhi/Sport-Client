import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import { MatchLeague, MatchStatus } from '@/types/enums/sport';
import { prefetchMatches } from '@/lib/api/sport/getMatches';
import MatchListClient from './components/match-list-client';
import { Suspense } from 'react';

interface PageProps {
  searchParams: Promise<{
    type?: string;
    status?: string;
  }>;
}

export default async function MatchListsPage({ searchParams }: PageProps) {
  const searchParamsResolved = await searchParams;

  // Parse search params with proper types
  const type = searchParamsResolved.type || MatchLeague.PremierLeague;
  const status = searchParamsResolved.status || MatchStatus.Upcoming;

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingView />}>
        <DataLoader type={type} status={status} />
      </Suspense>
    </div>
  );
}

async function DataLoader({ type, status }: { type: string; status: string }) {
  const queryClient = new QueryClient();
  await prefetchMatches(queryClient, 0, 50, type, status);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MatchListClient type={type} status={status} offset={0} />
    </HydrationBoundary>
  );
}
