import { useEffect, useRef, useState } from 'react';

export function useScrollLock(isLocked: boolean, targetElement?: HTMLElement) {
  const originalOverflowRef = useRef<string>('');
  const originalPaddingRightRef = useRef<string>('');
  const scrollBarWidthRef = useRef<number>(0);

  // Calculate scrollbar width
  const getScrollBarWidth = (): number => {
    if (scrollBarWidthRef.current > 0) {
      return scrollBarWidthRef.current;
    }

    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';
    document.body.appendChild(outer);

    const inner = document.createElement('div');
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    
    outer.remove();
    scrollBarWidthRef.current = scrollbarWidth;
    
    return scrollbarWidth;
  };

  const lockScroll = () => {
    const element = targetElement || document.body;
    const scrollBarWidth = getScrollBarWidth();

    originalOverflowRef.current = element.style.overflow;
    originalPaddingRightRef.current = element.style.paddingRight;

    element.style.overflow = 'hidden';

    if (scrollBarWidth > 0) {
      element.style.paddingRight = `${scrollBarWidth}px`;
    }
  };

  const unlockScroll = () => {
    const element = targetElement || document.body;

    element.style.overflow = originalOverflowRef.current;
    element.style.paddingRight = originalPaddingRightRef.current;
  };

  useEffect(() => {
    if (isLocked) {
      lockScroll();
    } else {
      unlockScroll();
    }

    return () => {
      if (isLocked) {
        unlockScroll();
      }
    };
  }, [isLocked, targetElement]);

  return {
    lockScroll,
    unlockScroll,
    scrollBarWidth: getScrollBarWidth(),
  };
}

export function useScrollLockToggle() {
  const [isLocked, setIsLocked] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock(isLocked);

  const toggle = () => {
    setIsLocked((prev: boolean) => !prev);
  };

  const lock = () => {
    setIsLocked(true);
  };

  const unlock = () => {
    setIsLocked(false);
  };

  return {
    isLocked,
    toggle,
    lock,
    unlock,
    lockScroll,
    unlockScroll,
  };
}

/**
 * Hook for iOS-specific scroll locking
 * iOS has different scroll behavior that requires special handling
 */
export function useIOSScrollLock(isLocked: boolean) {
  const originalPositionRef = useRef<string>('');
  const originalOverflowRef = useRef<string>('');
  const originalTopRef = useRef<string>('');
  const scrollYRef = useRef<number>(0);

  const isIOS = (): boolean => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent);
  };

  useEffect(() => {
    if (!isIOS()) return;

    const body = document.body;

    if (isLocked) {
      // Store current scroll position
      scrollYRef.current = window.scrollY;
      originalPositionRef.current = body.style.position;
      originalOverflowRef.current = body.style.overflow;
      originalTopRef.current = body.style.top;

      // Apply iOS-specific lock styles
      body.style.position = 'fixed';
      body.style.overflow = 'hidden';
      body.style.top = `${-scrollYRef.current}px`;
      body.style.width = '100%';
    } else {
      // Restore original styles and scroll position
      body.style.position = originalPositionRef.current;
      body.style.overflow = originalOverflowRef.current;
      body.style.top = originalTopRef.current;
      body.style.width = '';

      // Restore scroll position
      window.scrollTo(0, scrollYRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (isLocked && isIOS()) {
        body.style.position = originalPositionRef.current;
        body.style.overflow = originalOverflowRef.current;
        body.style.top = originalTopRef.current;
        body.style.width = '';
        window.scrollTo(0, scrollYRef.current);
      }
    };
  }, [isLocked]);

  return {
    isIOS: isIOS(),
    scrollPosition: scrollYRef.current,
  };
}

/**
 * Hook that combines regular and iOS scroll locking
 */
export function useUniversalScrollLock(isLocked: boolean, targetElement?: HTMLElement) {
  const regularLock = useScrollLock(isLocked, targetElement);
  const iosLock = useIOSScrollLock(isLocked);

  return {
    ...regularLock,
    isIOS: iosLock.isIOS,
    scrollPosition: iosLock.scrollPosition,
  };
}
