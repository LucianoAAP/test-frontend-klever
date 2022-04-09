import React from 'react';
import { ReactComponent as ShootingStar } from '../assets/shooting-star.svg';

const WishWalletTitle = () => (
  <div className="wish-wallet">
    <ShootingStar fill="yellow" className="shooting-star" data-testid="shooting-star" />
    <h2 className="wish-wallet-title">Wish Wallet</h2>
  </div>
);

export default WishWalletTitle;
