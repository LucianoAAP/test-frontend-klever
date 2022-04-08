import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import WishWalletTitle from './WishWalletTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTokenForm = () => {
  const [token, setToken] = useState('');
  const [balance, setBalance] = useState('');
  const navigate = useNavigate();
  const { tokens, setTokens } = useContext(AppContext);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'token-input') setToken(value);
    if (name === 'balance-input') setBalance(value);
  };

  const handleSave = () => {
    const newTokens = [...tokens, { token, balance }];
    setTokens(newTokens);
    setToken('');
    setBalance('');
    navigate('/');
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
        <div className="add-form-bottom">
          <Button className="save-btn" type="button" onClick={ handleSave }>Save</Button>
        </div>
      </form>
    </main>
  );
};

export default AddTokenForm;
