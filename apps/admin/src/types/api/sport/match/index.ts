export interface MatchDto {
  Id: string;
  HomeTeam: string;
  AwayTeam: string;
  HomeTeamScore: number;
  AwayTeamScore: number;
  League: string;
  Status: string;
  StartAt: Date;
  FinishAt: Date;
  Referee: string;
  EventsCount: number;
  HomeVotesCount: number;
  AwayVotesCount: number;
  DrawVotesCount: number;
}
