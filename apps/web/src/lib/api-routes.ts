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
    intelligence: {
      predict: () => `${base_url}/intelligence/predict`,
    },
    client: {
      submit_vote: (matchId: string) => `${base_url}/votes/${matchId}`,
      delete_vote: (matchId: string, voterId: string) =>
        `${base_url}/votes?matchId=${matchId}&voterId=${voterId}`,
    },
    user: {
      me: () => `${base_url}/user/me`,
    },
  },
};
