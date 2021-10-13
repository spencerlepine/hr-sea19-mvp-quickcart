import React from 'react';
import SigninButton from './SigninButton/SigninButton';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  return (
    <header className="App-header">
      <h3 onClick={() => history.push('/')}>GroceryChecc</h3>
      <SigninButton />
    </header>
  )
};

export default Header;
