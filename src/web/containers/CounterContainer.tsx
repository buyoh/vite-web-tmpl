import React from 'react';
import { useCounter } from '../hooks/useCounter';
import { CounterDisplay } from '../components/CounterDisplay';
import { CounterButton } from '../components/CounterButton';

export function CounterContainer(): React.ReactNode {
  const { count, increment, decrement, reset } = useCounter();

  return (
    <div className="counter-container">
      <h2>カウンター</h2>
      <CounterDisplay count={count} />
      <div className="counter-buttons">
        <CounterButton onClick={decrement} variant="secondary">
          -1
        </CounterButton>
        <CounterButton onClick={increment} variant="primary">
          +1
        </CounterButton>
        <CounterButton onClick={reset} variant="danger">
          リセット
        </CounterButton>
      </div>
    </div>
  );
}
