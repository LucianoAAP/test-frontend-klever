import React from 'react';
import { Button } from 'react-bootstrap';
import { useHomeField } from '../hooks';
import WishWalletTitle from './WishWalletTitle';
import { ReactComponent as EditIcon } from '../assets/edit-icon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeField = () => {
  const { tokenList, navigate } = useHomeField();

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
      { tokenList.map(({ token, balance }, index) => (
        <div className="table-line" key={ index }>
          <div className="table-line-start">
            <button
              className="edit-btn"
              data-testid={ `edit-btn-${index}` }
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
