import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import LoadingView from '@/components/layout/state/loading-view';
import CreateEventClient from './component/add-event-client';
import { Suspense } from 'react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CreateEventPage({ params }: PageProps) {
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CreateEventClient id={id} />
    </HydrationBoundary>
  );
}
