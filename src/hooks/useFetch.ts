import { useState, useEffect, useCallback, useRef } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export function useFetch<T = unknown>(
  url: string | null,
  options: RequestInit = {},
  hookOptions: UseFetchOptions<T> = {}
) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (fetchUrl?: string, fetchOptions?: RequestInit) => {
      const targetUrl = fetchUrl || url;
      const targetOptions = { ...options, ...fetchOptions };

      if (!targetUrl) {
        console.warn('No URL provided for fetch');
        return;
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      setState(prev => ({ ...prev, loading: true, error: null }));

      try {
        const response = await fetch(targetUrl, {
          ...targetOptions,
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setState({
          data,
          loading: false,
          error: null,
        });

        hookOptions.onSuccess?.(data);
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.log('Fetch aborted');
          return;
        }

        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        setState(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));

        hookOptions.onError?.(errorMessage);
      } finally {
        hookOptions.onComplete?.();
        abortControllerRef.current = null;
      }
    },
    [url, options, hookOptions]
  );

  const reset = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  useEffect(() => {
    if (hookOptions.immediate && url) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [hookOptions.immediate, url, execute]);

  return {
    ...state,
    execute,
    reset,
    abort: () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      setState(prev => ({ ...prev, loading: false, error: 'Request aborted' }));
    },
  };
}

export function useGet<T = unknown>(
  url: string | null,
  options: Omit<UseFetchOptions<T>, 'immediate'> = {}
) {
  return useFetch<T>(url, { method: 'GET' }, { ...options, immediate: true });
}

export function usePost<T = unknown>(
  url: string | null,
  options: Omit<UseFetchOptions<T>, 'immediate'> = {}
) {
  return useFetch<T>(url, { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    ...options 
  });
}

export function usePut<T = unknown>(
  url: string | null,
  options: Omit<UseFetchOptions<T>, 'immediate'> = {}
) {
  return useFetch<T>(url, { 
    method: 'PUT', 
    headers: { 'Content-Type': 'application/json' },
    ...options 
  });
}

export function useDelete<T = unknown>(
  url: string | null,
  options: Omit<UseFetchOptions<T>, 'immediate'> = {}
) {
  return useFetch<T>(url, { method: 'DELETE' }, options);
}
