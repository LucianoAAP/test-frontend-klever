import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const tokens = [
  { token: 'KLV', balance: 10250.50 },
  { token: 'DVK', balance: 50250.71 },
  { token: 'KFI', balance: 10 },
];

describe('Tests home page', () => {
  it('Renders initial components', () => {
    renderWithRouter(<App />);
    const kleverLogo = screen.getByTestId('klever-logo');
    expect(kleverLogo).toBeInTheDocument();
    const shootingStar = screen.getByTestId('shooting-star');
    expect(shootingStar).toBeInTheDocument();
    const wishWalletTitle = screen.getByText('Wish Wallet');
    expect(wishWalletTitle).toBeInTheDocument();
    const addTokenBtn = screen.getByText('Add Token');
    expect(addTokenBtn).toBeInTheDocument();
    const tokensTitle = screen.getByText('Tokens');
    expect(tokensTitle).toBeInTheDocument();
    const balanceTitle = screen.getByText('Balance');
    expect(balanceTitle).toBeInTheDocument();
  });

  it('Renders tokens', () => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
    renderWithRouter(<App />);
    tokens.forEach(({ token, balance }, index) => {
      const editBtn = screen.getByTestId(`edit-btn-${index}`);
      expect(editBtn).toBeInTheDocument();
      const tokenName = screen.getByText(token);
      expect(tokenName).toBeInTheDocument();
      const tokenBalance = screen.getByText(balance);
      expect(tokenBalance).toBeInTheDocument();
    });
    localStorage.clear();
  });

  it('Tests add token button', () => {
    renderWithRouter(<App />);
    const addTokenBtn = screen.getByText('Add Token');
    fireEvent.click(addTokenBtn);
    expect(location.pathname).toBe('/add');
    const backBtn = screen.getByText('Back');
    fireEvent.click(backBtn);
  });

  it('Tests edit button', async () => {
    window.localStorage.setItem('tokens', JSON.stringify(tokens));
    renderWithRouter(<App />);
    const editBtn = await screen.findByTestId('edit-btn-0');
    fireEvent.click(editBtn);
    expect(location.pathname).toBe('/edit/0');
    localStorage.clear();
  });
});
