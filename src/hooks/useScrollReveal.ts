"use client";

import { useEffect, useRef, useState, RefObject } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface UseScrollRevealReturn<T extends HTMLElement> {
  ref: RefObject<T | null>;
  isVisible: boolean;
}

/**
 * Custom hook for scroll-triggered reveal animations
 * @param options - Configuration options for the Intersection Observer
 * @param options.threshold - Visibility threshold (0.0 to 1.0), default 0.1
 * @param options.rootMargin - Root margin for observer, default "-50px"
 * @param options.once - If true, animation triggers only once, default true
 * @returns Object containing ref to attach to element and visibility state
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
): UseScrollRevealReturn<T> {
  const { threshold = 0.1, rootMargin = "-50px", once = true } = options;

  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * CSS classes for scroll reveal animations
 * Use these with the isVisible state from useScrollReveal
 */
export const scrollRevealClasses = {
  base: "transition-all duration-700 ease-out",
  hidden: "opacity-0 translate-y-8",
  visible: "opacity-100 translate-y-0",
};

/**
 * Helper function to get combined classes based on visibility
 */
export function getScrollRevealClass(isVisible: boolean): string {
  return `${scrollRevealClasses.base} ${
    isVisible ? scrollRevealClasses.visible : scrollRevealClasses.hidden
  }`;
}
