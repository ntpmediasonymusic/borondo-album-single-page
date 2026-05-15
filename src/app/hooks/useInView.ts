import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

export function useInView({
  threshold = 0.1,
  once = true,
  rootMargin = "0px 0px -40px 0px",
}: UseInViewOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, inView };
}
