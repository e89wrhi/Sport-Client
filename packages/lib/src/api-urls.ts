export const API_URLS = {
  MATCHES: {
    GET_ALL: "/match/get-matches",
    GET_ONE: (id: string) => `/match/${id}`,
    CREATE: "/matches",
    UPDATE: (id: string) => `/matches/${id}`,
    DELETE: (id: string) => `/matches/${id}`,
  },
  EVENTS: {
    GET_ALL: "/events",
    ADD: "/events",
    DELETE: (id: string) => `/events/${id}`,
  },
  VOTES: {
    SUBMIT: "/votes",
    GET_BY_USER: (matchId: string, voterId: string) =>
      `/votes?matchId=${matchId}&voterId=${voterId}`,
  },
};
