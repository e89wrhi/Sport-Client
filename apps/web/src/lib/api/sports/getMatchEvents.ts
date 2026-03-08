import { api_paths } from '@/lib/api-routes';
import { getMockMatchEvents } from '@/mock/sports';
import { EventDto } from '@/types/api/events';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

export async function getMatchEvents(
  matchId: string
): Promise<EventDto[] | null> {
  const url = api_paths.sport.public.get_events(matchId);

  return fetchClient<EventDto[] | null>(url, { token: process.env.Token });
}

export function useGetMatchEvents(MatchId: string) {
  return useQuery<EventDto[] | null>({
    queryKey: ['match-events', MatchId],
    queryFn: () => getMockMatchEvents({ MatchId }),
  });
}

export function prefetchMatchEvents(queryClient: QueryClient, MatchId: string) {
  return queryClient.prefetchQuery({
    queryKey: ['match-events', MatchId],
    queryFn: () => getMockMatchEvents({ MatchId }),
  });
}
