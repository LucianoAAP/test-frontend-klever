import React, { useState } from 'react';
import Proptypes from 'prop-types';
import AppContext from './AppContext';

const Provider = ({ children }) => {
  const [tokens, setTokens] = useState([]);

  const contextValue = { tokens, setTokens };

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: Proptypes.node.isRequired,
};

export default Provider;
