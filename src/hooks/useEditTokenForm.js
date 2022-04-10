import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppContext from '../context/AppContext';

const useEditTokenForm = () => {
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
    const otherTokens = tokenList.filter((obj) => obj !== tokenList[id]);
    const tokenIsRepeated = otherTokens.some((obj) => obj.token === token);

    if (tokenIsRepeated || token === '' || balance === '') {
      setEntriesAreValid(false);
    } else {
      setEntriesAreValid(true);
    }
  }, [token, balance, tokenList, id]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'token-input') setToken(value);
    if (name === 'balance-input') setBalance(value);
  };

  const handleErrorMessages = () => {
    const otherTokens = tokenList.filter((obj) => obj !== tokenList[id]);
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
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Confirm',
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

  return {
    token,
    balance,
    repeatedToken,
    emptyToken,
    emptyBalance,
    navigate,
    handleChange,
    handleSave,
    handleRemove,
  };
};

export default useEditTokenForm;
