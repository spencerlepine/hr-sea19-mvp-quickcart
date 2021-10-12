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

    if (renderSignup) {
      handleLogin(formEntries);
      toggleRenderForm(false);
    } else {
      handleSignup(formEntries);
      toggleRenderForm(false);
    }
  }

  if (renderForm) {
    return (
      <Popup>
        {renderSignup ? (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                {'We\'ll never share your email with anyone else.'}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              className="accountBtn"
              onClick={handleSubmit}
              variant="primary"
              type="submit">
              Create
            </Button>
          </Form>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                {'We\'ll never share your email with anyone else.'}
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button
              className="accountBtn"
              onClick={handleSubmit}
              variant="primary"
              type="submit">
              Next
            </Button>
          </Form>
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
