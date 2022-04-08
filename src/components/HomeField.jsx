import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import WishWalletTitle from './WishWalletTitle';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeField = () => {
  const navigate = useNavigate();

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
    </main>
  );
};

export default HomeField;
