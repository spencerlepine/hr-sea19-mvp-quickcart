import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
// import * as authUser from 'api/firebase/account';
const authUser = {};

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   authUser.checkLoginStatus(authenicatedUser => {
  //     if (authenicatedUser) {
  //       setCurrentUser(authenicatedUser);
  //     }
  //   }, []);
  // }, []);

  const loginUser = (email, password) => {
    setLoading(true);
    authUser.signInWithEmailAndPassword(email, password, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }

  const signupUser = (displayName, email, password) => {
    setLoading(true);
    authUser.createUserWithEmailAndPassword(displayName, email, password, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }

  const logoutUser = () => {
    setLoading(true);
    authUser.signOut(() => {
      setCurrentUser(null);
      setLoading(false);
    });
  }

  // function resetPassword(email) {
  //   setLoading(true);
  //   authUser.sendPasswordResetEmail(email, () => {
  //     setLoading(false);
  //   });
  // }

  // function updateEmail(email) {
  //   setLoading(true);
  //   authUser.updateEmail(email, user => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });
  // }

  // function updatePassword(password) {
  //   setLoading(true);
  //   authUser.updatePassword(password, () => {
  //     setLoading(false);
  //   });
  // }

  const value = {
    loading,
    // accountDetails,
    // resetPassword,
    // updatePassword,
    // updateEmail,
    currentUser,
    loginUser,
    logoutUser,
    signupUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export default useAuth;

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
