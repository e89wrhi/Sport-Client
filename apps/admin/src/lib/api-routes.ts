const base_url =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api/v1.0';

export const api_paths = {
  sport: {
    public: {
      get_matches: (league: string | null, status: string | null) =>
        `${base_url}/match/get-matches?league=${league}&status=${status}`,
      get_match: (id: string) => `${base_url}/match/${id}`,
      get_events: (matchId?: string) =>
        matchId
          ? `${base_url}/events?matchId=${matchId}`
          : `${base_url}/events`,
    },
    client: {
      submit_vote: `${base_url}/votes`,
      check_vote: (matchId: string, voterId: string) =>
        `${base_url}/votes?matchId=${matchId}&voterId=${voterId}`,
    },
  },
  admin: {
    matches: {
      create: `${base_url}/matches`,
      update: (id: string) => `${base_url}/matches/${id}`,
      delete: (id: string) => `${base_url}/matches/${id}`,
      score: (id: string) => `${base_url}/matches/${id}`,
    },
    events: {
      add: (matchId: string) => `${base_url}/events/${matchId}`,
      delete: (id: string) => `${base_url}/events/${id}`,
    },
    user: {
      me: () => `${base_url}/user/me`,
    },
  },
};
