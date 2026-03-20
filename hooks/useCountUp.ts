"use client";

import { useEffect, useState } from "react";
import { useInView } from "./useInView";

interface UseCountUpReturn {
  count: number;
  ref: React.RefObject<HTMLDivElement | null>;
}

export function useCountUp(
  end: number,
  duration: number = 2000
): UseCountUpReturn {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOut);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isInView, end, duration]);

  return { count, ref };
}
