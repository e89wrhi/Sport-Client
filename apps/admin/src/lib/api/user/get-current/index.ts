import { api_paths } from '@/lib/api-routes';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { UserDto } from '@/types/api/user/current-user';

export async function getCurrentUser(): Promise<UserDto | null> {
  // If we're using mock auth, return mock admin data directly
  if (process.env.USE_MOCK_AUTH === 'true') {
    return getMockCurrentUser();
  }

  const url = api_paths.admin.user.me();
  return fetchClient<UserDto | null>(url, { token: process.env.Token });
}

export function useGetCurrentUser(accesskey: string) {
  return useQuery<UserDto | null>({
    queryKey: ['user', accesskey],
    queryFn: () => getMockCurrentUser(),
  });
}

export function prefetchCurrentUser(queryClient: QueryClient) {
  return queryClient.prefetchQuery({
    queryKey: ['user'],
    queryFn: () => getMockCurrentUser(),
  });
}

function getMockCurrentUser(): UserDto | null {
  return {
    code: 200,
    message: 'OK',
    id: 'adm-001',
    userId: 'usr-001',
    status: 'Active',
    name: 'Elias Mekonnen',
    image: '/a1.png',
  };
}
