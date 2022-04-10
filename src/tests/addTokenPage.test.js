import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const tokens = [
  { token: 'KLV', balance: '10250.50' },
  { token: 'DVK', balance: '50250.71' },
  { token: 'KFI', balance: '10' },
];

describe('Tests add token page', () => {
  it('Renders initial components', () => {
    renderWithRouter(<App />);
    const addTokenBtn = screen.getByText('Add Token');
    fireEvent.click(addTokenBtn);
    const kleverLogo = screen.getByTestId('klever-logo');
    expect(kleverLogo).toBeInTheDocument();
    const shootingStar = screen.getByTestId('shooting-star');
    expect(shootingStar).toBeInTheDocument();
    const wishWalletTitle = screen.getByText('Wish Wallet');
    expect(wishWalletTitle).toBeInTheDocument();
    const backBtn = screen.getByText('Back');
    expect(backBtn).toBeInTheDocument();
    const addTokenTitle = screen.getByText('Add Token');
    expect(addTokenTitle).toBeInTheDocument();
    const tokenLabel = screen.getByText('Token');
    expect(tokenLabel).toBeInTheDocument();
    const tokenInput = screen.getByTestId('token-input');
    expect(tokenInput).toBeInTheDocument();
    const balanceLabel = screen.getByText('Balance');
    expect(balanceLabel).toBeInTheDocument();
    const balanceInput = screen.getByTestId('balance-input');
    expect(balanceInput).toBeInTheDocument();
    const saveBtn = screen.getByText('Save');
    expect(saveBtn).toBeInTheDocument();
  });

  it('Tests back button', () => {
    renderWithRouter(<App />);
    const addTokenBtn = screen.getByText('Add Token');
    fireEvent.click(addTokenBtn);
    const backBtn = screen.getByText('Back');
    fireEvent.click(backBtn);
    expect(location.pathname).toBe('/');
  });

  describe('Tests save button', () => {
    it('Empty field error messages are shown', () => {
      renderWithRouter(<App />);
      const addTokenBtn = screen.getByText('Add Token');
      fireEvent.click(addTokenBtn);
      const emptyTokenErrorGetter = screen.queryByText('Token field is required');
      const emptyBalanceErrorGetter = screen.queryByText('Balance field is required');
      expect(emptyTokenErrorGetter).not.toBeInTheDocument();
      expect(emptyBalanceErrorGetter).not.toBeInTheDocument();
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      expect(location.pathname).toBe('/add');
      const emptyTokenError = screen.getByText('Token field is required');
      const emptyBalanceError = screen.queryByText('Balance field is required');
      expect(emptyTokenError).toBeInTheDocument();
      expect(emptyBalanceError).toBeInTheDocument();
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toBeNull();
    });

    it('Repeated token error is shown', () => {
      localStorage.setItem('tokens', JSON.stringify(tokens));
      renderWithRouter(<App />);
      const addTokenBtn = screen.getByText('Add Token');
      fireEvent.click(addTokenBtn);
      const repeatedTokenErrorGetter = screen.queryByText('Token already in wish wallet');
      expect(repeatedTokenErrorGetter).not.toBeInTheDocument();
      const tokenInput = screen.getByTestId('token-input');
      const balanceInput = screen.getByTestId('balance-input');
      fireEvent.change(tokenInput, { target: { value: 'KLV' } })
      fireEvent.change(balanceInput, { target: { value: 10250.50 } });
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      expect(location.pathname).toBe('/add');
      const repeatedTokenError = screen.getByText('Token already in wish wallet');
      expect(repeatedTokenError).toBeInTheDocument();
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toStrictEqual(tokens);
      localStorage.clear();
    });

    it('Saves data in local storage', () => {
      renderWithRouter(<App />);
      const addTokenBtn = screen.getByText('Add Token');
      fireEvent.click(addTokenBtn);
      const tokenInput = screen.getByTestId('token-input');
      const balanceInput = screen.getByTestId('balance-input');
      fireEvent.change(tokenInput, { target: { value: 'KLV' } })
      fireEvent.change(balanceInput, { target: { value: '10250.50' } });
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toStrictEqual([{ token: 'KLV', balance: '10250.50' }]);
      localStorage.clear();
    });

    it('Redirects to home', () => {
      renderWithRouter(<App />);
      const addTokenBtn = screen.getByText('Add Token');
      fireEvent.click(addTokenBtn);
      const tokenInput = screen.getByTestId('token-input');
      const balanceInput = screen.getByTestId('balance-input');
      fireEvent.change(tokenInput, { target: { value: 'KLV' } })
      fireEvent.change(balanceInput, { target: { value: '10250.50' } });
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      expect(location.pathname).toBe('/');
    });
  });
});
