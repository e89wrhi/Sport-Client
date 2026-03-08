export interface MatchDto {
  Id: string;
  HomeTeam: string;
  AwayTeam: string;
  HomeTeamScore: number;
  AwayTeamScore: number;
  League: string;
  Status: string;
  EventsCount: number;
  HomeVotesCount: number;
  AwayVotesCount: number;
  DrawVotesCount: number;
  StartAt: Date;
  FinishAt: Date;
  Referee: string;
}
