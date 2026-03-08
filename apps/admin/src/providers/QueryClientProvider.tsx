'use client';

import { PropsWithChildren } from 'react';
import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';

let globalQueryClient: QueryClient | undefined;

// new instance
const createQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 3600,
        refetchOnMount: true,
      },
    },
  });

// return client instance
const getQueryClient = (): QueryClient => {
  if (typeof window === 'undefined') {
    // Server-side: return a fresh QueryClient
    return createQueryClient();
  }
  // Client-side: reuse the same instance
  if (!globalQueryClient) {
    globalQueryClient = createQueryClient();
  }
  return globalQueryClient;
};

// wrapper
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export const QueryClientProvider = ({ children }: PropsWithChildren<{}>) => {
  const queryClient = getQueryClient();

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
    </TanStackQueryClientProvider>
  );
};
