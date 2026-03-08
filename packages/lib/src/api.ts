import {
  AddEventRequest,
  AddVoteRequest,
  CreateMatchRequest,
  EventDto,
  GetEventsResponse,
  GetMatchesResponse,
  MatchDto,
  UpdateMatchRequest,
} from "@sport/types";
import { API_URLS } from "./api-urls";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1.0";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || response.statusText);
  }
  if (response.status === 204) return {} as T;
  return response.json();
}

/**
 * Public API Functions
 */

export async function getMatches(): Promise<MatchDto[]> {
  const response = await fetch(`${BASE_URL}${API_URLS.MATCHES.GET_ALL}`);
  const data: GetMatchesResponse = await handleResponse(response);
  return data.matchDtos;
}

export async function getMatch(id: string): Promise<MatchDto> {
  const response = await fetch(`${BASE_URL}${API_URLS.MATCHES.GET_ONE(id)}`);
  return handleResponse(response);
}

export async function getEvents(matchId?: string): Promise<EventDto[]> {
  const url = matchId
    ? `${BASE_URL}${API_URLS.EVENTS.GET_ALL}?matchId=${matchId}`
    : `${BASE_URL}${API_URLS.EVENTS.GET_ALL}`;
  const response = await fetch(url);
  const data: GetEventsResponse = await handleResponse(response);
  return data.eventDtos;
}

export async function submitVote(
  request: AddVoteRequest,
  token?: string,
): Promise<void> {
  const response = await fetch(`${BASE_URL}${API_URLS.VOTES.SUBMIT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}

export async function checkUserVote(
  matchId: string,
  voterId: string,
): Promise<any> {
  const response = await fetch(
    `${BASE_URL}${API_URLS.VOTES.GET_BY_USER(matchId, voterId)}`,
  );
  return handleResponse(response);
}

/**
 * Admin API Functions
 */

export async function createMatch(
  request: CreateMatchRequest,
  token: string,
): Promise<MatchDto> {
  const response = await fetch(`${BASE_URL}${API_URLS.MATCHES.CREATE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}

export async function updateMatch(
  id: string,
  request: UpdateMatchRequest,
  token: string,
): Promise<MatchDto> {
  const response = await fetch(`${BASE_URL}${API_URLS.MATCHES.UPDATE(id)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}

export async function deleteMatch(id: string, token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}${API_URLS.MATCHES.DELETE(id)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}

export async function addEvent(
  request: AddEventRequest,
  token: string,
): Promise<EventDto> {
  const response = await fetch(`${BASE_URL}${API_URLS.EVENTS.ADD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(request),
  });
  return handleResponse(response);
}

export async function deleteEvent(id: string, token: string): Promise<void> {
  const response = await fetch(`${BASE_URL}${API_URLS.EVENTS.DELETE(id)}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleResponse(response);
}
