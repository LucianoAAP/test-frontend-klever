import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';

const useHomeField = () => {
  const { tokens } = useContext(AppContext);
  const navigate = useNavigate();
  const tokensStorage = JSON.parse(localStorage.getItem('tokens'));
  const tokenList = tokensStorage || tokens;

  return { tokenList, navigate };
};

export default useHomeField;
