import { api_paths } from '@/lib/api-routes';
import { DeleteMatchRequestResponse } from '@/types/api/sport/delete';
import { useMutation } from '@tanstack/react-query';

export async function deleteMatch(
  matchId: string
): Promise<DeleteMatchRequestResponse> {
  const url = api_paths.admin.matches.delete(matchId);

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      cache: 'no-store',
    });

    // parse the response as JSON
    const json = (await res
      .json()
      .catch(() => null)) as DeleteMatchRequestResponse | null;

    if (!res.ok || !json) {
      return { Id: '', Success: false };
    }

    return {
      Id: json.Id,
      Success: json.Success,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return { Id: '', Success: false };
  }
}

export function useDeleteMatch() {
  return useMutation({
    mutationFn: (id: string) => deleteMatch(id),
  });
}
