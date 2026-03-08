import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import CreateMatchClient from './component/create-match-client';
import { Suspense } from 'react';

export default async function CreateMatchPage() {
  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<LoadingView />}>
        <DataLoader />
      </Suspense>
    </div>
  );
}

async function DataLoader() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateMatchClient />
    </HydrationBoundary>
  );
}
