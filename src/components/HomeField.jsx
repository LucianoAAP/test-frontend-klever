import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import WishWalletTitle from './WishWalletTitle';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeField = () => {
  const navigate = useNavigate();
  const { tokens } = useContext(AppContext);

  return (
    <main className="container">
      <div className="home-container-title">
        <WishWalletTitle />
        <Button
          className="add-token-btn"
          type="button"
          onClick={ () => navigate('/add') }
        >
          Add Token
        </Button>
      </div>
      <div className="table-line">
        <h5 className="tokens-field-title">Tokens</h5>
        <h5 className="balance-field-title">Balance</h5>
      </div>
      { tokens.map(({ token, balance }, index) => (
        <div className="table-line" key={ index }>
          <div className="table-line-start">
            <button
              className="edit-btn"
              type="button"
              onClick={ () => navigate(`/edit/${index}`) }
            >
              <EditIcon className="edit-icon" />
            </button>
            <h2 className="token-info">{ token }</h2>
          </div>
          <h2 className="token-info">{ balance }</h2>
        </div>
      )) }
    </main>
  );
};

export default HomeField;
