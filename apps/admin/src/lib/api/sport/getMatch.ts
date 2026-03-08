import { api_paths } from '@/lib/api-routes';
import { getMockMatchDetail } from '@/mock/sport';
import { MatchDto } from '@/types/api/sport/match';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

export async function getMatch(matchId: string): Promise<MatchDto | null> {
  const url = api_paths.sport.public.get_match(matchId);

  return fetchClient<MatchDto | null>(url, { token: process.env.Token });
}

export function useGetMatch(id: string) {
  return useQuery<MatchDto | null>({
    queryKey: ['match', id],
    queryFn: () => getMockMatchDetail(id),
  });
}

export function prefetchMatch(queryClient: QueryClient, id: string) {
  return queryClient.prefetchQuery({
    queryKey: ['match', id],
    queryFn: () => getMockMatchDetail(id),
  });
}
