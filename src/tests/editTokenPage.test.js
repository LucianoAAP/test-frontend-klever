import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import { act } from 'react-dom/test-utils';

window.scrollTo = jest.fn();

const tokens = [
  { token: 'KLV', balance: '10250.50' },
  { token: 'DVK', balance: '50250.71' },
  { token: 'KFI', balance: '10' },
];

describe('Tests edit token page', () => {
  beforeEach(() => {
    localStorage.setItem('tokens', JSON.stringify(tokens));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Renders initial components', () => {
    renderWithRouter(<App />);
    const editBtn = screen.getByTestId('edit-btn-0');
    fireEvent.click(editBtn);
    const kleverLogo = screen.getByTestId('klever-logo');
    expect(kleverLogo).toBeInTheDocument();
    const shootingStar = screen.getByTestId('shooting-star');
    expect(shootingStar).toBeInTheDocument();
    const wishWalletTitle = screen.getByText('Wish Wallet');
    expect(wishWalletTitle).toBeInTheDocument();
    const backBtn = screen.getByText('Back');
    expect(backBtn).toBeInTheDocument();
    const addTokenTitle = screen.getByText('Edit Token');
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
    const removeBtn = screen.getByText('Remove');
    expect(removeBtn).toBeInTheDocument();
    fireEvent.click(backBtn);
  });

  it('Inputs have the right values', () => {
    renderWithRouter(<App />);
    const editBtn = screen.getByTestId('edit-btn-0');
    fireEvent.click(editBtn);
    const tokenInput = screen.getByTestId('token-input');
    const balanceInput = screen.getByTestId('balance-input');
    expect(tokenInput).toHaveValue('KLV');
    expect(balanceInput).toHaveValue(10250.5);
    const backBtn = screen.getByText('Back');
    fireEvent.click(backBtn);
  });

  it('Tests back button', () => {
    renderWithRouter(<App />);
    const editBtn = screen.getByTestId('edit-btn-0');
    fireEvent.click(editBtn);
    const backBtn = screen.getByText('Back');
    fireEvent.click(backBtn);
    expect(location.pathname).toBe('/');
  });

  describe('Tests save button', () => {
    it('Empty field error messages are shown', () => {
      renderWithRouter(<App />);
      const editBtn = screen.getByTestId('edit-btn-0');
      fireEvent.click(editBtn);
      const emptyTokenErrorGetter = screen.queryByText('Token field is required');
      const emptyBalanceErrorGetter = screen.queryByText('Balance field is required');
      expect(emptyTokenErrorGetter).not.toBeInTheDocument();
      expect(emptyBalanceErrorGetter).not.toBeInTheDocument();
      const tokenInput = screen.getByTestId('token-input');
      const balanceInput = screen.getByTestId('balance-input');
      fireEvent.change(tokenInput, { target: { value: '' } })
      fireEvent.change(balanceInput, { target: { value: '' } });
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      expect(location.pathname).toBe('/edit/0');
      const emptyTokenError = screen.getByText('Token field is required');
      const emptyBalanceError = screen.queryByText('Balance field is required');
      expect(emptyTokenError).toBeInTheDocument();
      expect(emptyBalanceError).toBeInTheDocument();
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toStrictEqual(tokens);
      const backBtn = screen.getByText('Back');
      fireEvent.click(backBtn);
    });

    it('Repeated token error is shown', () => {
      localStorage.setItem('tokens', JSON.stringify(tokens));
      renderWithRouter(<App />);
      const editBtn = screen.getByTestId('edit-btn-0');
      fireEvent.click(editBtn);
      const repeatedTokenErrorGetter = screen.queryByText('Token already in wish wallet');
      expect(repeatedTokenErrorGetter).not.toBeInTheDocument();
      const tokenInput = screen.getByTestId('token-input');
      fireEvent.change(tokenInput, { target: { value: 'DVK' } })
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      expect(location.pathname).toBe('/edit/0');
      const repeatedTokenError = screen.getByText('Token already in wish wallet');
      expect(repeatedTokenError).toBeInTheDocument();
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toStrictEqual(tokens);
      const backBtn = screen.getByText('Back');
      fireEvent.click(backBtn);
    });

    it('Saves data in local storage', () => {
      renderWithRouter(<App />);
      const editBtn = screen.getByTestId('edit-btn-0');
      fireEvent.click(editBtn);
      const tokenInput = screen.getByTestId('token-input');
      const balanceInput = screen.getByTestId('balance-input');
      fireEvent.change(tokenInput, { target: { value: 'XBL' } })
      fireEvent.change(balanceInput, { target: { value: '123' } });
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toStrictEqual([
        { token: 'XBL', balance: '123' },
        { token: 'DVK', balance: '50250.71' },
        { token: 'KFI', balance: '10' },
      ]);
    });

    it('Redirects to home', () => {
      renderWithRouter(<App />);
      const editBtn = screen.getByTestId('edit-btn-0');
      fireEvent.click(editBtn);
      const tokenInput = screen.getByTestId('token-input');
      const balanceInput = screen.getByTestId('balance-input');
      fireEvent.change(tokenInput, { target: { value: 'XBL' } })
      fireEvent.change(balanceInput, { target: { value: '123' } });
      const saveBtn = screen.getByText('Save');
      fireEvent.click(saveBtn);
      expect(location.pathname).toBe('/');
    });
  });

  describe('Tests remove button', () => {
    it('Confirm button removes token from local storage', async () => {
      renderWithRouter(<App />);
      const editBtn = screen.getByTestId('edit-btn-0');
      fireEvent.click(editBtn);
      const removeBtn = screen.getByText('Remove');
      fireEvent.click(removeBtn);
      const confirmBtn = screen.getByText('Confirm');
      await act(async () => fireEvent.click(confirmBtn));
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toStrictEqual([
        { token: 'DVK', balance: '50250.71' },
        { token: 'KFI', balance: '10' },
      ]);
    });

    it('Confirm button redirects to home', async () => {
      renderWithRouter(<App />);
      const editBtn = screen.getByTestId('edit-btn-0');
      fireEvent.click(editBtn);
      const removeBtn = screen.getByText('Remove');
      fireEvent.click(removeBtn);
      const confirmBtn = screen.getByText('Confirm');
      await act(async () => fireEvent.click(confirmBtn));
      expect(location.pathname).toBe('/');
    });

    it('Shows alert and can cancel operation', () => {
      renderWithRouter(<App />);
      const editBtn = screen.getByTestId('edit-btn-0');
      fireEvent.click(editBtn);
      const removeBtn = screen.getByText('Remove');
      fireEvent.click(removeBtn);
      const message = screen.getByText('Are you sure you want to remove this token?');
      expect(message).toBeInTheDocument();
      const cancelBtn = screen.getByText('Cancel');
      expect(cancelBtn).toBeInTheDocument();
      const confirmBtn = screen.getByText('Confirm');
      expect(confirmBtn).toBeInTheDocument();
      fireEvent.click(cancelBtn);
      const storage = JSON.parse(localStorage.getItem('tokens'));
      expect(storage).toStrictEqual(tokens);
      expect(location.pathname).toBe('/edit/0');
    });
  });
});
