import { api_paths } from '@/lib/api-routes';
import { getMockMatches } from '@/mock/sports';
import { MatchDto } from '@/types/api/match';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';

export async function getMatches(
  league: string | null,
  status: string | null
): Promise<MatchDto[] | null> {
  const url = api_paths.sport.public.get_matches(league, status);

  return fetchClient<MatchDto[]>(url, { token: process.env.Token });
}

export function useGetMatches(league: string | null, status: string | null) {
  return useQuery<MatchDto[]>({
    queryKey: ['matches', league, status],
    queryFn: () => getMockMatches({ offset: 0, Limit: 0 }),
    refetchInterval: 10000,
  });
}

export function prefetchMatches(
  queryClient: QueryClient,
  league: string | null,
  status: string | null
) {
  return queryClient.prefetchQuery({
    queryKey: ['matches', league, status],
    queryFn: () => getMockMatches({ offset: 0, Limit: 0 }),
  });
}
