import React, { useState } from 'react';
import useAuth from '../../../context/AuthContext';
import SigninForm from '../SigninForm/SigninForm';
import Button from 'react-bootstrap/Button';

const SigninButton = () => {
  const { currentUser, logoutUser } = useAuth();
  const [openSigninForm, setOpenSigninForm] = useState(false);

  return (
    <>
      {currentUser ? (
        <Button className="accountBtn" onClick={logoutUser}>Logout</Button>
      ) : (
        <>
          <Button className="accountBtn" onClick={() => setOpenSigninForm(true)}>Log In</Button>
          <SigninForm renderForm={openSigninForm} toggleRenderForm={() => setOpenSigninForm(!openSigninForm)} />
        </>
      )}
    </>
  );
}

export default SigninButton;
