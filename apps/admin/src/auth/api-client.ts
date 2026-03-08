'use client';

import { getSession } from 'next-auth/react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001';

// custom api error
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// api-call utility for client components
// in client use it as
// import { apiCall } from '@/auth/api-client';
// const data = await apiCall<User>('/identity/current');
export async function apiCall<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const session = await getSession();

  // Ensure accessToken exists in the session
  if (!session?.accessToken) {
    throw new ApiError(401, 'Not authenticated - please sign in');
  }

  const url = `${API_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      let errorMessage = response.statusText;
      let errorData;

      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorData.title || errorMessage;
      } catch {
        // If response is not JSON, use text
        const text = await response.text();
        errorMessage = text || errorMessage;
      }

      throw new ApiError(response.status, errorMessage, errorData);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(
      500,
      `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// admin client methods
export const adminApi = {
  // Identity endpoints
  getCurrentUser: () => apiCall<CurrentUserResponse>('/api/identity/current'),
};

// Identity types
interface CurrentUserResponse {
  systemUserId: string;
  email: string;
  displayName: string;
  createdAtUtc: string;
  lastSyncedAtUtc: string;
  isActive: boolean;
  roles?: string[];
  permissions?: string[];
}

// Admin types
interface Admin {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
  isActive?: boolean;
}

// Export types for use in other files
export type { CurrentUserResponse, Admin };
