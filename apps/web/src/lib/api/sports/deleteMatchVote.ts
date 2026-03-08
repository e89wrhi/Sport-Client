import { api_paths } from '@/lib/api-routes';
import { DeleteVoteRequestResponse } from '@/types/api/vote/delete';
import { useMutation } from '@tanstack/react-query';

export async function deleteMatchVote(
  mathcId: string,
  voterId: string
): Promise<DeleteVoteRequestResponse | null> {
  const url = api_paths.sport.client.delete_vote(mathcId, voterId);

  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      let message = `Failed to delete vote (${res.statusText})`;
      try {
        const json = await res.json();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        message = json.message || message;
      } catch {}
      return { Id: '', Success: false };
    }

    const json = (await res
      .json()
      .catch(() => null)) as DeleteVoteRequestResponse | null;

    return {
      Id: json?.Id ?? '',
      Success: json?.Success ?? true,
    };
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const message =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while deleting vote.';

    return { Id: '', Success: false };
  }
}

export function useMatchDeleteVote() {
  return useMutation({
    mutationFn: ({ matchId, voterId }: { matchId: string; voterId: string }) =>
      deleteMatchVote(matchId, voterId),
  });
}
