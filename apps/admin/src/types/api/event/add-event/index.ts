export interface AddEventRequest {
  MatchId: string;
  Title: string;
  Time: Date;
  Type: string;
}

export interface AddEventRequestResponse {
  Id: string;
  Success: boolean;
}
