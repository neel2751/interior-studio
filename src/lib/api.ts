import { ApiResponse, PaginatedResponse } from '@/types';

export type ApiRequestOptions = {
  params?: Record<string, any>;
  data?: any;
  headers?: HeadersInit;
  tags?: string[];
  revalidate?: number | false | 'force-cache' | undefined;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

function normalizeApiOptions(value?: ApiRequestOptions | any): ApiRequestOptions {
  if (!value) return {};

  const isApiOptions =
    typeof value === 'object' &&
    (Object.prototype.hasOwnProperty.call(value, 'params') ||
      Object.prototype.hasOwnProperty.call(value, 'data') ||
      Object.prototype.hasOwnProperty.call(value, 'headers') ||
      Object.prototype.hasOwnProperty.call(value, 'tags') ||
      Object.prototype.hasOwnProperty.call(value, 'revalidate'));

  if (isApiOptions) {
    return value as ApiRequestOptions;
  }

  return { data: value };
}

function buildUrl(path: string, params?: Record<string, any>): string {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;

  if (!params || Object.keys(params).length === 0) return url;

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (Array.isArray(value)) {
      value.forEach((item) => query.append(key, String(item)));
    } else {
      query.append(key, String(value));
    }
  });

  return `${url}${url.includes('?') ? '&' : '?'}${query.toString()}`;
}

async function request<T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  url: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const finalUrl = buildUrl(url, options.params);

  const requestInit: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  };

  if (options.data !== undefined) {
    requestInit.body = JSON.stringify(options.data);
  }

  const nextOptions: any = {}; // https://nextjs.org/docs/api-reference/functions/fetch
  if (options.tags) nextOptions.tags = options.tags;
  if (options.revalidate !== undefined) nextOptions.revalidate = options.revalidate;
  if (Object.keys(nextOptions).length > 0) {
    (requestInit as any).next = nextOptions;
  }

  const response = await fetch(finalUrl, requestInit);

  if (!response.ok) {
    const contentType = response.headers.get('content-type');
    const body = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();
    throw new Error(
      `API request failed (${response.status}): ${JSON.stringify(body)}`
    );
  }

  return (await response.json()) as T;
}

const api = {
  get: <T = any>(url: string, options?: ApiRequestOptions | any) =>
    request<T>(`GET`, url, normalizeApiOptions(options)),
  post: <T = any>(url: string, options?: ApiRequestOptions | any) =>
    request<T>(`POST`, url, normalizeApiOptions(options)),
  put: <T = any>(url: string, options?: ApiRequestOptions | any) =>
    request<T>(`PUT`, url, normalizeApiOptions(options)),
  patch: <T = any>(url: string, options?: ApiRequestOptions | any) =>
    request<T>(`PATCH`, url, normalizeApiOptions(options)),
  delete: <T = any>(url: string, options?: ApiRequestOptions | any) =>
    request<T>(`DELETE`, url, normalizeApiOptions(options)),
};

export type { ApiResponse, PaginatedResponse as PaginatedApiResponse } from '@/types';

export default api;
