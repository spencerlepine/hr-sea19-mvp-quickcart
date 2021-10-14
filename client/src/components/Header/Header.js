import React from 'react';
import SigninButton from './SigninButton/SigninButton';
import RecipesButton from './RecipesButton/RecipesButton';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  return (
    <header className="App-header">
      <h3 onClick={() => history.push('/')}>GroceryChecc</h3>
      <RecipesButton />
      <SigninButton />
    </header>
  )
};

export default Header;
