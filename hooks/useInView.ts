"use client";

import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string;
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  isInView: boolean;
}

export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const { threshold = 0.1, rootMargin = "0px" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Once in view, stop observing
            observer.unobserve(element);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return { ref, isInView };
}
