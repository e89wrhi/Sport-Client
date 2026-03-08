import { prefetchMatch } from '@/lib/api/sport/getMatch';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import UpdateMatchScoreClient from './components/match-update-score-client';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UpdateMatchScorePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingView />}>
        <DataLoader id={id} />
      </Suspense>
    </div>
  );
}

async function DataLoader({ id }: { id: string }) {
  const queryClient = new QueryClient();
  await prefetchMatch(queryClient, id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UpdateMatchScoreClient id={id} />
    </HydrationBoundary>
  );
}
