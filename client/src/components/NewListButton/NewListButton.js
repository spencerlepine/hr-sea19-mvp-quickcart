import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NewListButton = () => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/list') {
      window.location.reload();
      return
    }
    history.push('./list')
  }

  return (
    <Button variant="primary" onClick={handleClick}>New List</Button>
  );
};

export default NewListButton;
