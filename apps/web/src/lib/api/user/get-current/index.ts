import { api_paths } from '@/lib/api-routes';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/lib/fetchClient';
import { UserDto } from '@/types/api/user/current-user';
import { useSession } from 'next-auth/react';

interface GetCurrentUserOptions {
  token?: string;
}

export async function getCurrentUser(
  options: GetCurrentUserOptions = {}
): Promise<UserDto | null> {
  // If we're using mock auth, return mock admin data directly
  if (
    process.env.USE_MOCK_AUTH === 'true' ||
    process.env.NEXT_PUBLIC_USE_MOCK_AUTH === 'true'
  ) {
    return getMockCurrentUser();
  }

  const url = api_paths.sport.user.me();
  const token = options.token || process.env.Token;
  return fetchClient<UserDto | null>(url, { token });
}

export function useGetCurrentUser() {
  const { data: session } = useSession();
  return useQuery<UserDto | null>({
    queryKey: ['user', session?.user?.id],
    queryFn: async () => {
      // If no user session, return null immediately
      if (!session?.user) return null;
      return getCurrentUser({ token: session.accessToken });
    },
    enabled: !!session?.user,
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
