export interface PredictMatchRequestDto {
  MatchId: string;
  ModelId: string | null;
}

export interface PredictMatchResponseDto {
  MatchId: string;
  Prediction: string;
  HomeWinProbability: number;
  DrawProbability: number;
  AwayWinProbability: number;
  ModelId: string;
  ProviderName: string | null;
  Success: boolean;
}
