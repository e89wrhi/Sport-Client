import { api_paths } from '@/lib/api-routes';
import {
  AddEventRequest,
  AddEventRequestResponse,
} from '@/types/api/event/add-event';
import { useMutation } from '@tanstack/react-query';

export async function addMatchEvent(
  matchId: string,
  payload: AddEventRequest
): Promise<AddEventRequestResponse> {
  const url = api_paths.admin.events.add(matchId);

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
      .catch(() => null)) as AddEventRequestResponse | null;

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

export function useAddMatchEvent() {
  return useMutation({
    mutationFn: ({
      matchId,
      payload,
    }: {
      matchId: string;
      payload: AddEventRequest;
    }) => addMatchEvent(matchId, payload),
  });
}
