interface FetchOptions extends RequestInit {
  token?: string;
}

export const fetchClient = async <T>(
  url: string,
  options: FetchOptions = {}
): Promise<T | null> => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: options.token ? `Bearer ${options.token}` : '',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      cache: 'no-store',
    });

    // Handle non-OK responses consistently
    if (!response.ok) {
      // Optional: standard error logging or toast notification here
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API Request Failed:', error);
    return null;
  }
};
