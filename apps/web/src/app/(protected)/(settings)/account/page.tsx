export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import MeClient from './components/me-detail-client';

export default async function MePage() {
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
      <MeClient />
    </HydrationBoundary>
  );
}
