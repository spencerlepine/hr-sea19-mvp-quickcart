import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const RecipesButton = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/recipes');
  }

  return (
    <Button className="accountBtn" onClick={handleClick}>Recipes</Button>
  );
}

export default RecipesButton;
