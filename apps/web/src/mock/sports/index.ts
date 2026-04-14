import { MatchDto } from '@/types/api/match';
import { EventDto } from '@/types/api/events';
import { MatchLeague } from '@/types/enums/sport';

export const mockMatchesDetail: MatchDto[] = [
  {
    Id: 'match-001',
    Status: 'Scheduled',
    League: MatchLeague.PremierLeague,
    StartAt: new Date('2025-06-01T15:00:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'Arsenal',
    AwayTeam: 'Chelsea',
    Referee: 'Michael Oliver',
    HomeTeamScore: 0,
    AwayTeamScore: 0,
    EventsCount: 0,
    HomeVotesCount: 120,
    AwayVotesCount: 85,
    DrawVotesCount: 45,
  },
  {
    Id: 'match-002',
    Status: 'live',
    League: MatchLeague.PremierLeague,
    StartAt: new Date('2025-06-02T19:00:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'Man United',
    AwayTeam: 'Man City',
    Referee: 'Anthony Taylor',
    HomeTeamScore: 2,
    AwayTeamScore: 1,
    EventsCount: 8,
    HomeVotesCount: 450,
    AwayVotesCount: 410,
    DrawVotesCount: 120,
  },
  {
    Id: 'match-003',
    Status: 'Scheduled',
    League: MatchLeague.PremierLeague,
    StartAt: new Date('2025-06-03T14:30:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'Tottenham',
    AwayTeam: 'Arsenal',
    Referee: 'Paul Tierney',
    HomeTeamScore: 0,
    AwayTeamScore: 0,
    EventsCount: 0,
    HomeVotesCount: 90,
    AwayVotesCount: 150,
    DrawVotesCount: 40,
  },
  {
    Id: 'match-004',
    Status: 'live',
    League: MatchLeague.LaLiga,
    StartAt: new Date('2025-06-04T20:00:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'Real Madrid',
    AwayTeam: 'Barcelona',
    Referee: 'Gil Manzano',
    HomeTeamScore: 1,
    AwayTeamScore: 3,
    EventsCount: 12,
    HomeVotesCount: 800,
    AwayVotesCount: 750,
    DrawVotesCount: 200,
  },
  {
    Id: 'match-005',
    Status: 'finished',
    League: 'Champions League',
    StartAt: new Date('2025-05-30T20:00:00Z'),
    FinishAt: new Date('2025-05-30T22:00:00Z'),
    HomeTeam: 'Bayern Munich',
    AwayTeam: 'Real Madrid',
    Referee: 'Szymon Marciniak',
    HomeTeamScore: 2,
    AwayTeamScore: 2,
    EventsCount: 15,
    HomeVotesCount: 300,
    AwayVotesCount: 320,
    DrawVotesCount: 100,
  },
  {
    Id: 'match-006',
    Status: 'Scheduled',
    League: MatchLeague.SerieA,
    StartAt: new Date('2025-06-05T18:00:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'AC Milan',
    AwayTeam: 'Inter Milan',
    Referee: 'Daniele Orsato',
    HomeTeamScore: 0,
    AwayTeamScore: 0,
    EventsCount: 0,
    HomeVotesCount: 200,
    AwayVotesCount: 210,
    DrawVotesCount: 80,
  },
  {
    Id: 'match-007',
    Status: 'finished',
    League: MatchLeague.Bundesliga,
    StartAt: new Date('2025-05-28T15:30:00Z'),
    FinishAt: new Date('2025-05-28T17:30:00Z'),
    HomeTeam: 'Dortmund',
    AwayTeam: 'Bayern Munich',
    Referee: 'Felix Zwayer',
    HomeTeamScore: 1,
    AwayTeamScore: 4,
    EventsCount: 20,
    HomeVotesCount: 150,
    AwayVotesCount: 400,
    DrawVotesCount: 50,
  },
  {
    Id: 'match-008',
    Status: 'Scheduled',
    League: MatchLeague.PremierLeague,
    StartAt: new Date('2025-06-06T12:30:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'Chelsea',
    AwayTeam: 'Liverpool',
    Referee: 'Simon Hooper',
    HomeTeamScore: 0,
    AwayTeamScore: 0,
    EventsCount: 0,
    HomeVotesCount: 180,
    AwayVotesCount: 220,
    DrawVotesCount: 90,
  },
];

const mockEvents: EventDto[] = [
  {
    Id: 'event-001',
    MatchId: 'match-002',
    Title: 'Kickoff',
    Time: new Date(),
    Type: 'Info',
  },
  {
    Id: 'event-002',
    MatchId: 'match-002',
    Title: 'Goal',
    Time: new Date(),
    Type: 'Goal',
  },
  {
    Id: 'event-003',
    MatchId: 'match-002',
    Title: 'Yellow Card',
    Time: new Date(),
    Type: 'YellowCard',
  },
  {
    Id: 'event-004',
    MatchId: 'match-002',
    Title: 'Substitution',
    Time: new Date(),
    Type: 'Substitution',
  },
  {
    Id: 'event-005',
    MatchId: 'match-002',
    Title: 'Second Half',
    Time: new Date(),
    Type: 'Info',
  },
  {
    Id: 'event-006',
    MatchId: 'match-002',
    Title: 'Goal',
    Time: new Date(),
    Type: 'Goal',
  },
  {
    Id: 'event-007',
    MatchId: 'match-002',
    Title: 'Red Card',
    Time: new Date(),
    Type: 'RedCard',
  },
  {
    Id: 'event-008',
    MatchId: 'match-002',
    Title: 'Goal',
    Time: new Date(),
    Type: 'Goal',
  },
  {
    Id: 'event-009',
    MatchId: 'match-002',
    Title: 'Full Time',
    Time: new Date(),
    Type: 'Info',
  },
];

export function getMockMatchDetail(Id: string): Promise<MatchDto | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const match = mockMatchesDetail.find((m) => m.Id === Id);
      resolve(match || null);
    }, 300);
  });
}

export function getMockMatches({}: {
  offset?: number;
  Limit?: number;
}): MatchDto[] {
  const filtered = mockMatchesDetail;
  // This mock doesn't truly filter/sort, just returns slice
  const paged = filtered;

  const items: MatchDto[] = paged.map((m) => ({
    Id: m.Id,
    Status: m.Status,
    League: m.League,
    HomeTeam: m.HomeTeam,
    AwayTeam: m.AwayTeam,
    HomeTeamScore: m.HomeTeamScore,
    AwayTeamScore: m.AwayTeamScore,
    StartAt: m.StartAt,
    FinishAt: m.FinishAt,
    EventsCount: m.EventsCount,
    AwayVotesCount: m.AwayVotesCount,
    DrawVotesCount: m.DrawVotesCount,
    HomeVotesCount: m.HomeVotesCount,
    Referee: m.Referee,
  }));

  return items;
}

export function getMockMatchEvents({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  MatchId,
}: {
  MatchId: string;
  offset?: number;
  Limit?: number;
}): EventDto[] {
  const filtered = mockEvents;
  return filtered;
}
