export interface UpdateMatchRequest {
  MatchId: string;
  HomeTeam: string;
  AwayTeam: string;
  League: string;
  Status: string;
  StartAt: Date;
  FinishAt: Date;
  Referee: string;
}

export interface UpdateMatchRequestResponse {
  Id: string;
  Success: boolean;
}
