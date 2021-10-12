import React, { useState } from 'react';
import useAuth from '../../../context/AuthContext';
import SigninForm from '../SigninForm/SigninForm';
import Button from 'react-bootstrap/Button';

const SigninButton = () => {
  const { userIsLoggedIn, handleLogout } = useAuth();
  const [openSigninForm, setOpenSigninForm] = useState(false);

  return (
    <>
      {userIsLoggedIn ? (
        <Button className="accountBtn" onClick={handleLogout}>Logout</Button>
      ) : (
        <>
          <Button className="accountBtn" onClick={() => setOpenSigninForm(true)}>Log In</Button>
          <SigninForm renderForm={openSigninForm} toggleRenderForm={setOpenSigninForm} />
        </>
      )}
    </>
  );
}

export default SigninButton;
