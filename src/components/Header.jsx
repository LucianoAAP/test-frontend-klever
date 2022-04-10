import React from 'react';
import { ReactComponent as KleverLogo } from '../assets/logo.svg';

const Header = () => (
  <header className="header">
    <KleverLogo className="klever-logo" data-testid="klever-logo" />
  </header>
);

export default Header;
