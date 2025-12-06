import { useEffect } from 'react';

const DEFAULT_OPTIONS = {
  once: true,
  threshold: 0.15,
  rootMargin: '0px 0px -10% 0px',
};

const useScrollReveal = (ref, options = {}) => {
  const { once, threshold, rootMargin, delay } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    node.style.setProperty('--reveal-delay', `${delay ?? 0}ms`);

    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      node.classList.add('scroll-reveal-visible');
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('scroll-reveal-visible');
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [ref, once, threshold, rootMargin, delay]);
};

export default useScrollReveal;
