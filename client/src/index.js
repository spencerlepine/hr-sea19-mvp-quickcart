import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './index.css';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
  , document.getElementById('root'));
