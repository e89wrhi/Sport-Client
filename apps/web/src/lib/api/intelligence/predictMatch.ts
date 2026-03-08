import { api_paths } from '@/lib/api-routes';
import {
  PredictMatchRequestDto,
  PredictMatchResponseDto,
} from '@/types/api/intelligence';
import { useMutation } from '@tanstack/react-query';

export async function predictMatch(
  payload: PredictMatchRequestDto
): Promise<PredictMatchResponseDto> {
  const url = api_paths.sport.intelligence.predict();

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
      return {
        MatchId: '',
        Success: true,
        HomeWinProbability: 0,
        AwayWinProbability: 0,
        DrawProbability: 0,
        Prediction: '',
        ModelId: '',
        ProviderName: '',
      };
    }

    const json = (await res
      .json()
      .catch(() => null)) as PredictMatchResponseDto | null;

    return {
      MatchId: json?.MatchId ?? '',
      Success: json?.Success ?? true,
      HomeWinProbability: json?.HomeWinProbability ?? 0,
      AwayWinProbability: json?.AwayWinProbability ?? 0,
      DrawProbability: json?.DrawProbability ?? 0,
      Prediction: json?.Prediction ?? '',
      ModelId: json?.ModelId ?? '',
      ProviderName: json?.ProviderName ?? '',
    };
  } catch (error: unknown) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const message =
      error instanceof Error
        ? error.message
        : 'An unexpected error occurred while voting.';

    return {
      MatchId: '',
      Success: true,
      HomeWinProbability: 0,
      AwayWinProbability: 0,
      DrawProbability: 0,
      Prediction: '',
      ModelId: '',
      ProviderName: '',
    };
  }
}

export function usePredictMatch() {
  return useMutation({
    mutationFn: (payload: PredictMatchRequestDto) => predictMatch(payload),
  });
}
