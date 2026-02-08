import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { useCounter } from '../../web/hooks/useCounter';
import { Provider } from 'jotai';

describe('useCounter', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider>{children}</Provider>
  );

  it('初期値が0である', () => {
    const { result } = renderHook(() => useCounter(), { wrapper });
    expect(result.current.count).toBe(0);
  });

  it('incrementを呼ぶとカウントが1増える', () => {
    const { result } = renderHook(() => useCounter(), { wrapper });

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });

  it('decrementを呼ぶとカウントが1減る', () => {
    const { result } = renderHook(() => useCounter(), { wrapper });

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(-1);
  });

  it('複数回increment/decrementが正しく動作する', () => {
    const { result } = renderHook(() => useCounter(), { wrapper });

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(3);

    act(() => {
      result.current.decrement();
    });

    expect(result.current.count).toBe(2);
  });

  it('resetを呼ぶとカウントが0にリセットされる', () => {
    const { result } = renderHook(() => useCounter(), { wrapper });

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(result.current.count).toBe(3);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
  });

  it('負の値からresetすると0になる', () => {
    const { result } = renderHook(() => useCounter(), { wrapper });

    act(() => {
      result.current.decrement();
      result.current.decrement();
    });

    expect(result.current.count).toBe(-2);

    act(() => {
      result.current.reset();
    });

    expect(result.current.count).toBe(0);
  });
});
