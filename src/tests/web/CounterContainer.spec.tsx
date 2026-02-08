import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'jotai';
import { CounterContainer } from '../../web/containers/CounterContainer';

describe('CounterContainer', () => {
  const renderWithProvider = (component: React.ReactElement) => {
    return render(<Provider>{component}</Provider>);
  };

  it('タイトルが表示される', () => {
    renderWithProvider(<CounterContainer />);
    expect(screen.getByText('カウンター')).toBeInTheDocument();
  });

  it('初期カウント値0が表示される', () => {
    renderWithProvider(<CounterContainer />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('+1ボタンが存在する', () => {
    renderWithProvider(<CounterContainer />);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('-1ボタンが存在する', () => {
    renderWithProvider(<CounterContainer />);
    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('リセットボタンが存在する', () => {
    renderWithProvider(<CounterContainer />);
    expect(screen.getByText('リセット')).toBeInTheDocument();
  });

  it('+1ボタンをクリックすると値が増加する', () => {
    renderWithProvider(<CounterContainer />);
    const incrementButton = screen.getByText('+1');

    fireEvent.click(incrementButton);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('-1ボタンをクリックすると値が減少する', () => {
    renderWithProvider(<CounterContainer />);
    const decrementButton = screen.getByText('-1');

    fireEvent.click(decrementButton);

    expect(screen.getByText('-1')).toBeInTheDocument();
  });

  it('複数回操作すると正しい値が表示される', () => {
    renderWithProvider(<CounterContainer />);
    const incrementButton = screen.getByText('+1');
    const decrementButton = screen.getByText('-1');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(screen.getByText('3')).toBeInTheDocument();

    fireEvent.click(decrementButton);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('リセットボタンをクリックすると0に戻る', () => {
    renderWithProvider(<CounterContainer />);
    const incrementButton = screen.getByText('+1');
    const resetButton = screen.getByText('リセット');

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(screen.getByText('3')).toBeInTheDocument();

    fireEvent.click(resetButton);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('接続状態の表示がない', () => {
    renderWithProvider(<CounterContainer />);
    // リファクタリング後は接続状態インジケータが存在しない
    expect(screen.queryByText(/接続中/)).not.toBeInTheDocument();
    expect(screen.queryByText(/未接続/)).not.toBeInTheDocument();
    expect(screen.queryByText(/エラー/)).not.toBeInTheDocument();
  });

  it('サーバー共有の説明文がない', () => {
    renderWithProvider(<CounterContainer />);
    // リファクタリング後はサーバー関連の説明が存在しない
    expect(
      screen.queryByText(/サーバーで管理/)
    ).not.toBeInTheDocument();
  });
});
