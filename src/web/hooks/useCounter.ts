import { useAtom } from 'jotai';
import { useCallback } from 'react';
import { counterAtom } from '../stores/counterAtom';

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(): UseCounterReturn {
  const [count, setCount] = useAtom(counterAtom);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, [setCount]);

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, [setCount]);

  const reset = useCallback(() => {
    setCount(0);
  }, [setCount]);

  return { count, increment, decrement, reset };
}
