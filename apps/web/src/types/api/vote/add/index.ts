export interface AddVoteRequest {
  MatchId: string;
  VoterId: string;
  Type: string;
}

export interface AddVoteRequestResponse {
  Id: string;
  Success: boolean;
}
