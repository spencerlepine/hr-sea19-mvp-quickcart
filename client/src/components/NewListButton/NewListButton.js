import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const NewListButton = () => {
  const history = useHistory();

  return (
    <Button variant="primary" onClick={() => history.push('./new')}>New List</Button>
  );
};

export default NewListButton;
