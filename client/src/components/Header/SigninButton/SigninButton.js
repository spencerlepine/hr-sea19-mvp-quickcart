import React, { useState } from 'react';
import useAuth from '../../../context/AuthContext';
import SigninForm from '../SigninForm/SigninForm';

const SigninButton = () => {
  const { userIsLoggedIn, handleLogout } = useAuth();
  const [openSigninForm, setOpenSigninForm] = useState(false);

  return (
    <>
      {userIsLoggedIn ? (
        <button className="accountBtn" onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button className="accountBtn" onClick={() => setOpenSigninForm(true)}>Log In</button>
          <SigninForm renderForm={openSigninForm} toggleRenderForm={setOpenSigninForm} />
        </>
      )}
    </>
  );
}

export default SigninButton;
