import { api_paths } from '@/lib/api-routes';
import {
  CreateMatchRequest,
  CreateMatchRequestResponse,
} from '@/types/api/sport/create';
import { useMutation } from '@tanstack/react-query';

export async function createMatch(
  payload: CreateMatchRequest
): Promise<CreateMatchRequestResponse> {
  const url = api_paths.admin.matches.create;

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

    // parse the response as JSON
    const json = (await res
      .json()
      .catch(() => null)) as CreateMatchRequestResponse | null;

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

export function useCreateMatch() {
  return useMutation({
    mutationFn: (payload: CreateMatchRequest) => createMatch(payload),
  });
}
