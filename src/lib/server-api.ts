import { getBaseUrl } from '@/lib/utils';

type QueryValue = string | number | boolean | null | undefined;

type ServerFetchOptions = Omit<RequestInit, 'body'> & {
  params?: Record<string, QueryValue>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export class ServerApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details: unknown,
  ) {
    super(message);
    this.name = 'ServerApiError';
  }
}

export async function serverFetch<T>(path: string, options: ServerFetchOptions = {}): Promise<T> {
  const url = new URL(`${getBaseUrl()}${path}`);

  Object.entries(options.params ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  const { params: _params, ...requestOptions } = options;
  const response = await fetch(url, {
    ...requestOptions,
    headers: {
      Accept: 'application/json',
      ...requestOptions.headers,
    },
  });

  const details = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof details === 'object' && details !== null && 'message' in details
        ? String(details.message)
        : `API request failed with status ${response.status}`;

    throw new ServerApiError(message, response.status, details);
  }

  return details as T;
}
