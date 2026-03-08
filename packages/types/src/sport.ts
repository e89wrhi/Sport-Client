export enum MatchLeague {
  PremierLeague = 1,
  LaLiga = 2,
  Bundesliga = 3,
}

export enum MatchStatus {
  Upcoming = 1,
  Live = 2,
  Postpond = 3,
  Over = 4,
}

export enum VoteType {
  Home = 1,
  Away = 2,
  Draw = 3,
}

export enum EventType {
  Goal = 1,
  Substitution = 2,
  Offside = 3,
  Penality = 4,
  Foul = 5,
  FreeKick = 6,
  YellowCard = 7,
  RedCard = 8,
}

export interface MatchDto {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeTeamScore: number;
  awayTeamScore: number;
  league: MatchLeague;
  status: MatchStatus;
  matchTime: string; // ISO string
  eventsCount: number;
  homeVotesCount: number;
  awayVotesCount: number;
  drawVotesCount: number;
}

export interface GetMatchesResponse {
  matchDtos: MatchDto[];
}

export interface EventDto {
  id: string;
  matchId: string;
  title: string;
  time: string; // ISO string
  type: EventType;
}

export interface GetEventsResponse {
  eventDtos: EventDto[];
}

export interface CreateMatchRequest {
  homeTeam: string;
  awayTeam: string;
  league: MatchLeague;
  status: MatchStatus;
  matchTime: string; // ISO string
}

export interface UpdateMatchRequest {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  league: MatchLeague;
  status: MatchStatus;
  matchTime: string; // ISO string
}

export interface AddEventRequest {
  matchId: string;
  title: string;
  time: string; // ISO string
  type: EventType;
}

export interface AddVoteRequest {
  matchId: string;
  voterId: string;
  type: VoteType;
}
