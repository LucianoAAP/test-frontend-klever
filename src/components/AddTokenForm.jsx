import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import WishWalletTitle from './WishWalletTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTokenForm = () => {
  const { tokens, setTokens } = useContext(AppContext);
  const [token, setToken] = useState('');
  const [balance, setBalance] = useState('');
  const [repeatedToken, setRepeatedToken] = useState(false);
  const [emptyToken, setEmptyToken] = useState(false);
  const [emptyBalance, setEmptyBalance] = useState(false);
  const [entriesAreValid, setEntriesAreValid] = useState(false);
  const navigate = useNavigate();
  const tokensStorage = JSON.parse(localStorage.getItem('tokens'));
  const tokenList = tokensStorage || tokens;

  useEffect(() => {
    const tokenIsRepeated = tokenList.some((obj) => obj.token === token);

    if (tokenIsRepeated || token === '' || balance === '') {
      setEntriesAreValid(false);
    } else {
      setEntriesAreValid(true);
    }
  }, [token, balance, tokenList]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'token-input') setToken(value);
    if (name === 'balance-input') setBalance(value);
  };

  const handleErrorMessages = () => {
    const tokenIsRepeated = tokenList.some((obj) => obj.token === token);

    if (tokenIsRepeated) {
      setRepeatedToken(true);
    } else {
      setRepeatedToken(false);
    }
    if (token.length === 0) {
      setEmptyToken(true);
    } else {
      setEmptyToken(false);
    }
    if (balance.length === 0) {
      setEmptyBalance(true);
    } else {
      setEmptyBalance(false);
    }
  };

  const handleSave = () => {
    if (entriesAreValid) {
      const newTokens = [...tokenList, { token, balance }];
      localStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens);
      return navigate('/');
    }
    return handleErrorMessages();
  };

  return (
    <main className="container">
      <WishWalletTitle />
      <form className="add-token-form">
        <div className="add-form-top">
          <h3 className="add-title">Add Token</h3>
          <Button
            className="back-btn"
            type="button"
            onClick={ () => navigate('/') }
          >
            Back
          </Button>
        </div>
        <label htmlFor="token-input">
          Token
          <input
            name="token-input"
            type="text"
            value={ token }
            onChange={ handleChange }
          />
        </label>
        { repeatedToken && <p className="error-message">Token already in wish wallet</p> }
        { emptyToken && <p className="error-message">Token field is required</p> }
        <label htmlFor="balance-input">
          Balance
          <input
            name="balance-input"
            type="number"
            lang="en-US"
            value={ balance }
            onChange={ handleChange }
          />
        </label>
        { emptyBalance && <p className="error-message">Balance field is required</p> }
        <div className="add-form-bottom">
          <Button className="save-btn" type="button" onClick={ handleSave }>
            Save
          </Button>
        </div>
      </form>
    </main>
  );
};

export default AddTokenForm;
