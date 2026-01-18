import { useState, useEffect } from 'react';

/**
 * Custom hook for debouncing values
 *
 * Prevents excessive updates (e.g. API calls)
 * by delaying value changes until user stops typing.
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

