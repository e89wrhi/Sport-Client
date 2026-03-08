import { MatchDto } from '@/types/api/match';
import { EventDto } from '@/types/api/events';

export const mockMatchesDetail: MatchDto[] = [
  {
    Id: 'match-001',
    Status: 'Scheduled',
    League: 'Premier League',
    StartAt: new Date('2025-06-01T15:00:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'Arsenal',
    AwayTeam: 'Chelsea',
    Referee: 'Michael Oliver',
    HomeTeamScore: 0,
    AwayTeamScore: 0,
    EventsCount: 0,
    HomeVotesCount: 100,
    AwayVotesCount: 80,
    DrawVotesCount: 20,
  },
  {
    Id: 'match-002',
    Status: 'Live',
    League: 'La Liga',
    StartAt: new Date('2025-06-02T19:00:00Z'),
    FinishAt: new Date(),
    HomeTeam: 'Man United',
    AwayTeam: 'Real Madrid',
    Referee: 'Antonio Mateu Lahoz',
    HomeTeamScore: 1,
    AwayTeamScore: 1,
    EventsCount: 5,
    HomeVotesCount: 200,
    AwayVotesCount: 190,
    DrawVotesCount: 50,
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
