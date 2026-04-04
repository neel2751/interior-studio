'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface FadeInSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'rotate';
  duration?: number;
  threshold?: number;
  stagger?: number;
  staggerChildren?: boolean;
}

export default function FadeInSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  threshold = 0.15,
  stagger = 0.1,
  staggerChildren = false,
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(40px)';
        case 'down':
          return 'translateY(-40px)';
        case 'left':
          return 'translateX(40px)';
        case 'right':
          return 'translateX(-40px)';
        case 'scale':
          return 'scale(0.9)';
        case 'rotate':
          return 'rotate(-3deg) scale(0.95)';
        default:
          return 'none';
      }
    }
    return 'none';
  };

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(40px)';
      case 'down':
        return 'translateY(-40px)';
      case 'left':
        return 'translateX(40px)';
      case 'right':
        return 'translateX(-40px)';
      case 'scale':
        return 'scale(0.9)';
      case 'rotate':
        return 'rotate(-3deg) scale(0.95)';
      default:
        return 'none';
    }
  };

  if (staggerChildren && Array.isArray(children)) {
    return (
      <div ref={ref} className={className}>
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'none' : getInitialTransform(),
              transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay + index * stagger}s, 
                          transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay + index * stagger}s`,
              willChange: 'opacity, transform',
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s, 
                    transform ${duration}s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
}

export function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.innerHeight - rect.top;
        setOffset(scrolled * speed * 0.1);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translateY(${offset}px)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedCounter({
  end,
  duration = 2000,
  suffix = '',
  prefix = '',
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function SplitText({
  children,
  delay = 0,
  stagger = 0.05,
}: {
  children: string;
  delay?: number;
  stagger?: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const words = children.split(' ');

  return (
    <span ref={ref}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.3em' }}>
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              style={{
                display: 'inline-block',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.4s ease ${delay + (wordIndex * word.length + charIndex) * stagger}s, 
                            transform 0.4s ease ${delay + (wordIndex * word.length + charIndex) * stagger}s`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
