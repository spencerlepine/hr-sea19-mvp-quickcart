import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../../context/AuthContext';

const SigninForm = ({ renderForm, toggleRenderForm }) => {
  const { userIsLoggedIn, loginUser: handleLogin, signupUser: handleSignup } = useAuth();
  const [formEntries, setFormEntries] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormEntries(prevEntries => ({
      ...prevEntries,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userIsLoggedIn) {
      handleLogin(formEntries);
      toggleRenderForm(false);
    } else {
      handleSignup(formEntries);
      toggleRenderForm(false);
    }
  }

  if (renderForm) {
    return (
      <form>
        {userIsLoggedIn ? (
          <h3>Log In</h3>
        ) : (
          <h3>Sign Up</h3>
        )}

        <label>
          Email
          <input onChange={handleChange}></input>
        </label>

        <button className="accountBtn" onClick={handleSubmit}>Next</button>
      </form>
    );
  } else {
    return null;
  }
}

export default SigninForm;

SigninForm.propTypes = {
  renderForm: PropTypes.bool.isRequired,
  toggleRenderForm: PropTypes.func.isRequired,
}
