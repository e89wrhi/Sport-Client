export interface CreateMatchRequest {
  HomeTeam: string;
  AwayTeam: string;
  League: string;
  Status: string;
  StartAt: Date;
  FinishAt: Date;
  Referee: string;
}

export interface CreateMatchRequestResponse {
  Id: string;
  Success: boolean;
}
