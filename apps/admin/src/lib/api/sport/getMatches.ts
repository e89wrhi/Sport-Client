import { api_paths } from '@/lib/api-routes';
import { getMockMatches } from '@/mock/sport';
import { MatchDto } from '@/types/api/sport/match';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

export async function getMatches(
  offset: number,
  limit: number,
  league: string | null,
  status: string | null
): Promise<MatchDto[] | null> {
  const url = api_paths.sport.public.get_matches(league, status);

  return fetchClient<MatchDto[] | null>(url, { token: process.env.Token });
}

export function useGetMatches(
  offset: number,
  limit: number,
  league: string | null,
  status: string | null
) {
  return useQuery<MatchDto[] | null>({
    queryKey: ['matches', offset, limit, league, status],
    queryFn: () => getMockMatches({ offset }),
    refetchInterval: 10000,
  });
}

export function prefetchMatches(
  queryClient: QueryClient,
  offset: number,
  limit: number,
  league: string | null,
  status: string | null
) {
  return queryClient.prefetchQuery({
    queryKey: ['matches', offset, limit, league, status],
    queryFn: () => getMockMatches({ offset }),
  });
}
