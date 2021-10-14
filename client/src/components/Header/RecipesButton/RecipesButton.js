import React, { useState } from 'react';
// import useListStorage from '../../../context/ListStorageContext';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const RecipesButton = () => {
  const history = useHistory();
  // const { allLists } = useListStorage();

  const handleClick = () => {
    history.push('/recipes');
  }

  return (
    <Button className="accountBtn" onClick={handleClick}>Recipes</Button>
  );
}

export default RecipesButton;
