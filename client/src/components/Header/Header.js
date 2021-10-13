import React from 'react';
import SigninButton from './SigninButton/SigninButton';
// import NewListButton from '../NewListButton/NewListButton';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  return (
    <header className="App-header">
      <h3 onClick={() => history.push('/')}>GroceryChecc</h3>
      {/* <NewListButton /> */}
      <SigninButton />
    </header>
  )
};

export default Header;
