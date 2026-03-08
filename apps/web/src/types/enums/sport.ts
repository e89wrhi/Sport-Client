export const MatchEventType = {
  Goal: 'Goal',
  Substitution: 'Substitution',
  Offside: 'Offside',
  Penality: 'Penality',
  Foul: 'Foul',
  FeeKick: 'FeeKick',
  YellowCard: 'YellowCard',
  RedCard: 'RedCard',
  ThrowIn: 'ThrowIn',
  GoalKick: 'GoalKick',
  Handball: 'Handball',
  Injury: 'Injury',
  Kickoff: 'Kickoff',
  OwnGoal: 'OwnGoal',
} as const;
export type MatchEventType =
  (typeof MatchEventType)[keyof typeof MatchEventType];

export const MatchStatus = {
  Upcoming: 'Upcoming',
  Live: 'Live',
  Postpond: 'Postpond',
  Over: 'Over',
};
export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];

export const MatchLeague = {
  PremierLeague: 'PremierLeague',
  LaLiga: 'LaLiga',
  Bundesliga: 'Bundesliga',
  SerieA: 'SerieA',
};
export type MatchLeague = (typeof MatchLeague)[keyof typeof MatchLeague];

export const MatchVoteType = {
  Home: 'Home',
  Away: 'Away',
  Abstain: 'Abstain',
};

export type MatchVoteType = (typeof MatchVoteType)[keyof typeof MatchVoteType];
