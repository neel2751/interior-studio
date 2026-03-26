import { useState, useEffect, useRef, useCallback } from 'react';

interface UseInViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
  delay?: number;
  skip?: boolean;
}

interface UseInViewReturn {
  ref: (node: Element | null) => void;
  inView: boolean;
  entry: IntersectionObserverEntry | null;
  supported: boolean;
}

export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const {
    threshold = 0,
    rootMargin = '0px',
    root = null,
    triggerOnce = false,
    delay = 0,
    skip = false,
  } = options;

  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [supported, setSupported] = useState(true);
  
  const nodeRef = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const setNodeRef = useCallback(
    (node: Element | null) => {
      nodeRef.current = node;
      
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    },
    []
  );

  const updateEntry = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      setEntry(entry);
      
      const isInView = entry.isIntersecting;
      
      if (delay > 0) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          setInView(isInView);
        }, delay);
      } else {
        setInView(isInView);
      }
    },
    [delay]
  );

  useEffect(() => {
    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSupported(false);
      return;
    }

    if (skip) {
      return;
    }

    if (!nodeRef.current) {
      return;
    }

    observerRef.current = new IntersectionObserver(updateEntry, {
      threshold,
      rootMargin,
      root,
    });

    observerRef.current.observe(nodeRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [threshold, rootMargin, root, updateEntry, skip]);

  useEffect(() => {
    if (triggerOnce && inView && observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, [inView, triggerOnce]);

  return {
    ref: setNodeRef,
    inView,
    entry,
    supported,
  };
}

export function useFadeIn(options: UseInViewOptions = {}) {
  const { ref, inView } = useInView(options);
  
  return {
    ref,
    inView,
    className: inView ? 'fade-in-visible' : 'fade-in-hidden',
  };
}

export function useSlideUp(options: UseInViewOptions = {}) {
  const { ref, inView } = useInView(options);
  
  return {
    ref,
    inView,
    className: inView ? 'slide-up-visible' : 'slide-up-hidden',
  };
}

export function useScale(options: UseInViewOptions = {}) {
  const { ref, inView } = useInView(options);
  
  return {
    ref,
    inView,
    className: inView ? 'scale-visible' : 'scale-hidden',
  };
}

export function useMultipleInView(
  refs: Array<React.RefObject<Element>>,
  options: UseInViewOptions = {}
) {
  const [entries, setEntries] = useState<Map<number, IntersectionObserverEntry>>(new Map());
  const [inViewMap, setInViewMap] = useState<Map<number, boolean>>(new Map());
  
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    const { threshold = 0, rootMargin = '0px', root = null } = options;

    const updateEntries = (entries: IntersectionObserverEntry[]) => {
      const newEntries = new Map<number, IntersectionObserverEntry>();
      const newInViewMap = new Map<number, boolean>();

      entries.forEach((entry) => {
        const index = refs.findIndex(ref => ref.current === entry.target);
        if (index !== -1) {
          newEntries.set(index, entry);
          newInViewMap.set(index, entry.isIntersecting);
        }
      });

      setEntries(newEntries);
      setInViewMap(newInViewMap);
    };

    observerRef.current = new IntersectionObserver(updateEntries, {
      threshold,
      rootMargin,
      root,
    });

    refs.forEach((ref) => {
      if (ref.current) {
        observerRef.current?.observe(ref.current);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [refs, options]);

  return {
    entries,
    inViewMap,
    isInView: (index: number) => inViewMap.get(index) || false,
    getEntry: (index: number) => entries.get(index) || null,
  };
}

export function useLazyImage(options: UseInViewOptions = {}) {
  const { ref, inView, entry } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    ...options,
  });

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (inView && entry?.target && !loaded) {
      const img = entry.target as HTMLImageElement;
      
      if (img.dataset.src) {
      // eslint-disable-next-line react-hooks/immutability
      img.src = img.dataset.src;
      // eslint-disable-next-line react-hooks/immutability
      delete img.dataset.src;
    }
    }
  }, [inView, entry, loaded]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    setError(false);
  }, []);

  const handleError = useCallback(() => {
    setError(true);
    setLoaded(false);
  }, []);

  return {
    ref,
    inView,
    loaded,
    error,
    handleLoad,
    handleError,
    className: loaded ? 'image-loaded' : error ? 'image-error' : 'image-loading',
  };
}

export function useInfiniteScroll(
  onLoadMore: () => Promise<void>,
  options: UseInViewOptions & { hasMore?: boolean } = {}
) {
  const { hasMore = true } = options;
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
    ...options,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      const loadMore = async () => {
        setLoading(true);
        setError(null);
        
        try {
          await onLoadMore();
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to load more');
        } finally {
          setLoading(false);
        }
      };

      loadMore();
    }
  }, [inView, hasMore, loading, onLoadMore]);

  return {
    ref,
    inView,
    loading,
    error,
    hasMore,
  };
}
