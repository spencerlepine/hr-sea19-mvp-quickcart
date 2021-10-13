import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAuth from '../../../context/AuthContext';
import Popup from '../../Popup/Popup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SigninForm = ({ renderForm, toggleRenderForm }) => {
  const { loginUser: handleLogin, signupUser: handleSignup } = useAuth();
  const [renderSignup, setRenderSignup] = useState(false);
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

    if (!renderSignup) {
      const { email, password } = formEntries;
      handleLogin(email, password);
      toggleRenderForm(false);
    } else {
      const { name, email, password } = formEntries;
      handleSignup(name, email, password);
      toggleRenderForm(false);
    }
  }

  if (renderForm) {
    return (
      <Popup togglePopup={toggleRenderForm}>
        {!renderSignup ? (
          <>
            <Form className="accountForm">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" value={formEntries['email']} onChange={handleChange} />
                <Form.Text className="text-muted">
                  {'We\'ll never share your email with anyone else.'}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={formEntries['password']} onChange={handleChange} />
              </Form.Group>
              <Button
                className="accountBtn"
                onClick={handleSubmit}
                variant="primary"
                type="submit">
                Create
              </Button>
            </Form>
            <p className="accountForm">{'Don\'t'} have an account? <a href="/" onClick={(e) => { e.preventDefault(); setRenderSignup(!renderSignup) }}>Sign up</a></p>
          </>
        ) : (
          <>
            <Form className="accountForm">
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="name" placeholder="Enter Name" value={formEntries['name']} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name="email" type="email" placeholder="Enter email" value={formEntries['email']} onChange={handleChange} />
                <Form.Text className="text-muted">
                  {'We\'ll never share your email with anyone else.'}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={formEntries['password']} onChange={handleChange} />
              </Form.Group>
              <Button
                className="accountBtn"
                onClick={handleSubmit}
                variant="primary"
                type="submit">
                Next
              </Button>
            </Form>
            <p className="accountForm">Already have an account? <a href="/" onClick={(e) => { e.preventDefault(); setRenderSignup(!renderSignup) }}>Log in</a></p>
          </>
        )}
      </Popup>
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
