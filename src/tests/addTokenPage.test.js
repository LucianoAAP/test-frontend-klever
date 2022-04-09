import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const tokens = [
  { token: 'KLV', balance: 10250.50 },
  { token: 'DVK', balance: 50250.71 },
  { token: 'KFI', balance: 10 },
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
  });
});
