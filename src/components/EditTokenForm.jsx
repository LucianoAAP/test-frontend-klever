import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';
import WishWalletTitle from './WishWalletTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditTokenForm = () => {
  const { tokens, setTokens } = useContext(AppContext);
  const tokensStorage = JSON.parse(localStorage.getItem('tokens'));
  const tokenList = tokensStorage || tokens;
  const { id } = useParams();
  const [token, setToken] = useState(tokenList[id].token);
  const [balance, setBalance] = useState(tokenList[id].balance);
  const [repeatedToken, setRepeatedToken] = useState(false);
  const [emptyToken, setEmptyToken] = useState(false);
  const [emptyBalance, setEmptyBalance] = useState(false);
  const [entriesAreValid, setEntriesAreValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const otherTokens = tokenList.filter((obj) => obj.token !== token);
    const tokenIsRepeated = otherTokens.some((obj) => obj.token === token);

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
    const otherTokens = tokenList.filter((obj) => obj.token !== token);
    const tokenIsRepeated = otherTokens.some((obj) => obj.token === token);

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
      const newTokens = [...tokenList];
      newTokens[id] = { token, balance };
      localStorage.setItem('tokens', JSON.stringify(newTokens));
      setTokens(newTokens);
      return navigate('/');
    }
    return handleErrorMessages();
  };

  const handleRemove = () => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure you want to remove this token?',
      showCancelButton: true,
      cancelButtonText: 'No',
      confirmButtonText: 'Yes',
      customClass: {
        cancelButton: 'cancel-button',
        confirmButton: 'confirm-button',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newTokens = tokenList.filter((obj) => obj !== tokenList[id]);
        localStorage.setItem('tokens', JSON.stringify(newTokens));
        setTokens(newTokens);
        navigate('/');
      }
    });
  };

  return (
    <main className="container">
      <WishWalletTitle />
      <form className="edit-token-form">
        <div className="edit-form-top">
          <h3 className="edit-title">Edit Token</h3>
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
        <div className="edit-form-bottom">
          <Button
            className="remove-btn"
            type="button"
            onClick={ handleRemove }
          >
            Remove
          </Button>
          <Button className="save-btn" type="button" onClick={ handleSave }>
            Save
          </Button>
        </div>
      </form>
    </main>
  );
};

export default EditTokenForm;
