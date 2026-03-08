import { api_paths } from '@/lib/api-routes';
import { RequestResponse } from '@/types/api/Respose';
import { AddVoteRequest, AddVoteRequestResponse } from '@/types/api/vote/add';
import { useMutation } from '@tanstack/react-query';

export async function castMatchVote(
  payload: AddVoteRequest
): Promise<AddVoteRequestResponse> {
  const url = api_paths.sport.public.get_events(payload.MatchId);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!res.ok) {
      let message = `Failed to cast vote (${res.statusText})`;
      try {
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message = json.message || message;
      } catch {}
      return { Id: '', Success: true };
    }

    const json = (await res.json().catch(() => null)) as RequestResponse | null;

    return {
      Id: json?.Id ?? '',
      Success: json?.Success ?? true,
    };
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const message =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while voting.';

    return { Id: '', Success: false };
  }
}

export function useCastMatchVote() {
  return useMutation({
    mutationFn: (payload: AddVoteRequest) => castMatchVote(payload),
  });
}
