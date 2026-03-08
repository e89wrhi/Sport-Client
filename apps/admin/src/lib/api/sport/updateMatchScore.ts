import { api_paths } from '@/lib/api-routes';
import {
  UpdateMatchScoreRequest,
  UpdateMatchScoreRequestResponse,
} from '@/types/api/sport/score';
import { useMutation } from '@tanstack/react-query';

export async function updateMatchScore(
  payload: UpdateMatchScoreRequest
): Promise<UpdateMatchScoreRequestResponse> {
  const url = api_paths.admin.matches.score(payload.MatchId);

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
      .catch(() => null)) as UpdateMatchScoreRequestResponse | null;

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

export function useUpdateMatchScore() {
  return useMutation({
    mutationFn: (payload: UpdateMatchScoreRequest) => updateMatchScore(payload),
  });
}
