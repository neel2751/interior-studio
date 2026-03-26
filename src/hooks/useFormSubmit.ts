import { useState, useCallback, useRef } from 'react';

export type FormState = 'idle' | 'loading' | 'success' | 'error';

interface UseFormSubmitOptions<T, E = string> {
  onSubmit?: (data: T) => Promise<void>;
  onSuccess?: (data: T) => void;
  onError?: (error: E) => void;
  onComplete?: () => void;
  resetOnSuccess?: boolean;
  resetOnError?: boolean;
}

interface UseFormSubmitReturn<T, E = string> {
  state: FormState;
  loading: boolean;
  success: boolean;
  error: E | null;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  submit: (data: T) => Promise<void>;
  reset: () => void;
  setLoading: () => void;
  setSuccess: () => void;
  setError: (error: E) => void;
  setIdle: () => void;
}

export function useFormSubmit<T = any, E = string>( // eslint-disable-line @typescript-eslint/no-explicit-any
  options: UseFormSubmitOptions<T, E> = {}
): UseFormSubmitReturn<T, E> {
  const [state, setState] = useState<FormState>('idle');
  const [error, setError] = useState<E | null>(null);
  const isSubmittingRef = useRef(false);

  const setLoading = useCallback(() => {
    setState('loading');
    setError(null);
  }, []);

  const setSuccess = useCallback(() => {
    setState('success');
    setError(null);
  }, []);

  const setErrorState = useCallback((errorValue: E) => {
    setState('error');
    setError(errorValue);
  }, []);

  const setIdle = useCallback(() => {
    setState('idle');
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setState('idle');
    setError(null);
    isSubmittingRef.current = false;
  }, []);

  const submit = useCallback(
    async (data: T) => {
      if (isSubmittingRef.current) {
        return;
      }

      isSubmittingRef.current = true;
      setLoading();

      try {
        await options.onSubmit?.(data);
        setSuccess();
        options.onSuccess?.(data);
        
        if (options.resetOnSuccess) {
          setTimeout(reset, 2000);
        }
      } catch (errorValue) {
        const error = errorValue as E;
        setErrorState(error);
        options.onError?.(error);
        
        if (options.resetOnError) {
          setTimeout(reset, 5000);
        }
      } finally {
        isSubmittingRef.current = false;
        options.onComplete?.();
      }
    },
    [options, setLoading, setSuccess, setErrorState, reset]
  );

  return {
    state,
    loading: state === 'loading',
    success: state === 'success',
    error,
    isIdle: state === 'idle',
    isLoading: state === 'loading',
    isSuccess: state === 'success',
    isError: state === 'error',
    submit,
    reset,
    setLoading,
    setSuccess,
    setError: setErrorState,
    setIdle,
  };
}

export function useFormSubmitWithTimeout<T = any, E = string>( // eslint-disable-line @typescript-eslint/no-explicit-any
  timeout: number = 5000,
  options: UseFormSubmitOptions<T, E> = {}
) {
  const formSubmit = useFormSubmit<T, E>(options);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const submitWithTimeout = useCallback(
    async (data: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (formSubmit.state === 'loading') {
          formSubmit.setError('Request timed out. Please try again.' as E);
        }
      }, timeout);

      try {
        await formSubmit.submit(data);
      } finally {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
    },
    [formSubmit, timeout]
  );

  return {
    ...formSubmit,
    submit: submitWithTimeout,
  };
}

export function useFormSubmitWithRetry<T = unknown, E = string>(
  maxRetries: number = 3,
  options: UseFormSubmitOptions<T, E> = {}
) {
  const formSubmit = useFormSubmit<T, E>(options);
  const [retryCount, setRetryCount] = useState(0);

  const submitWithRetry = useCallback(
    async (data: T): Promise<void> => {
      const execute = async (attempt: number, nextData: T): Promise<void> => {
        try {
          await formSubmit.submit(nextData);
          setRetryCount(0);
        } catch (error) {
          if (attempt < maxRetries) {
            setRetryCount(attempt);
            const delay = Math.pow(2, attempt) * 1000;
            await new Promise((resolve) => setTimeout(resolve, delay));
            await execute(attempt + 1, nextData);
          } else {
            console.error('Max retries reached');
            throw error;
          }
        }
      };

      return execute(1, data);
    },
    [formSubmit, maxRetries]
  );

  return {
    ...formSubmit,
    submit: submitWithRetry,
    retryCount,
    canRetry: retryCount < maxRetries,
  };
}

export function useDebouncedFormSubmit<T = any, E = string>(
  delay: number = 500,
  options: UseFormSubmitOptions<T, E> = {}
) {
  const formSubmit = useFormSubmit<T, E>(options);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingDataRef = useRef<T | null>(null);

  const debouncedSubmit = useCallback(
    (data: T) => {
      pendingDataRef.current = data;
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        if (pendingDataRef.current) {
          await formSubmit.submit(pendingDataRef.current);
          pendingDataRef.current = null;
        }
      }, delay);
    },
    [formSubmit, delay]
  );

  const submitImmediately = useCallback(
    async (data: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      pendingDataRef.current = null;
      return formSubmit.submit(data);
    },
    [formSubmit]
  );

  return {
    ...formSubmit,
    submit: debouncedSubmit,
    submitImmediately,
    cancel: () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      pendingDataRef.current = null;
    },
  };
}
