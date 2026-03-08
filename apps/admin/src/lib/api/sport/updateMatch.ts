import { api_paths } from '@/lib/api-routes';
import {
  UpdateMatchRequest,
  UpdateMatchRequestResponse,
} from '@/types/api/sport/update';
import { useMutation } from '@tanstack/react-query';

export async function updateMatch(
  matchId: string,
  payload: UpdateMatchRequest
): Promise<UpdateMatchRequestResponse> {
  const url = api_paths.admin.matches.update(matchId);

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    // parse the response as JSON
    const json = (await res
      .json()
      .catch(() => null)) as UpdateMatchRequestResponse | null;

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

export function useUpdateMatch() {
  return useMutation({
    mutationFn: ({
      matchId,
      payload,
    }: {
      matchId: string;
      payload: UpdateMatchRequest;
    }) => updateMatch(matchId, payload),
  });
}
