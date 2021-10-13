import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ViewAllButton = () => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/search') {
      window.location.reload();
      return
    }
    history.push('./search')
  }

  return (
    <Button style={{ backgroundColor: 'orange' }} variant="primary" onClick={handleClick}>View All</Button>
  );
};

export default ViewAllButton;
