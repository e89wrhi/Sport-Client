export interface UpdateMatchScoreRequest {
  MatchId: string;
  HomeTeamScore: number;
  AwayTeamScore: number;
}

export interface UpdateMatchScoreRequestResponse {
  Id: string;
  Success: boolean;
}
