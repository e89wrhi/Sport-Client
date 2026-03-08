import { api_paths } from '@/lib/api-routes';
import { fetchClient } from '@/lib/fetchClient';
import { getMockMatchEvents } from '@/mock/sport';
import { EventDto } from '@/types/api/event/events';
import { QueryClient, useQuery } from '@tanstack/react-query';

export async function getMatchEvents(
  matchId: string
): Promise<EventDto[] | null> {
  const url = api_paths.sport.public.get_events(matchId);

  return fetchClient<EventDto[] | null>(url, { token: process.env.Token });
}

export function useGetMatchEvents(matchId: string) {
  return useQuery<EventDto[] | null>({
    queryKey: ['match-events', matchId],
    queryFn: () => getMockMatchEvents({ MatchId: matchId }),
    refetchInterval: 10000,
  });
}

export function prefetchMatchEvents(queryClient: QueryClient, matchId: string) {
  return queryClient.prefetchQuery({
    queryKey: ['match-events', matchId],
    queryFn: () => getMockMatchEvents({ MatchId: matchId }),
  });
}
