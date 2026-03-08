import { auth } from '@/auth/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7001';

// api error class
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

// api call util for server components
// import { apiCallServer } from '@/auth/api-server';
// const data = await apiCallServer<User>('/identity/current');
export async function apiCallServer<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  if (!API_URL) {
    throw new Error('NEXT_PUBLIC_API_URL is not defined');
  }

  const session = await auth();

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
      // Disable caching for API calls by default
      cache: options?.cache ?? 'no-store',
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

// api methods
export const serverApi = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiCallServer<T>(endpoint, { ...options, method: 'GET' }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiCallServer<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  put: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiCallServer<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  patch: <T>(endpoint: string, body?: any, options?: RequestInit) =>
    apiCallServer<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiCallServer<T>(endpoint, { ...options, method: 'DELETE' }),
};

// api methods
export const userServerApi = {
  // Identity endpoints
  getCurrentUser: () =>
    apiCallServer<CurrentUserResponse>('/api/identity/current'),
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

// User types
interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  createdAt?: string;
  isActive?: boolean;
}

// Export types for use in other files
export type { CurrentUserResponse, User };
