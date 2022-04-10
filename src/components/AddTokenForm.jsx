import React from 'react';
import { Button } from 'react-bootstrap';
import { useAddTokenForm } from '../hooks';
import WishWalletTitle from './WishWalletTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddTokenForm = () => {
  const {
    token,
    balance,
    repeatedToken,
    emptyToken,
    emptyBalance,
    navigate,
    handleChange,
    handleSave,
  } = useAddTokenForm();

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
            data-testid="token-input"
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
            data-testid="balance-input"
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
