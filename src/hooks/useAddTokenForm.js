import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const useAddTokenForm = () => {
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

  return {
    token,
    balance,
    repeatedToken,
    emptyToken,
    emptyBalance,
    navigate,
    handleChange,
    handleSave,
  };
};

export default useAddTokenForm;
