import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ListStorageProvider } from './context/ListStorageContext';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Router>
    <ListStorageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ListStorageProvider>
  </Router>
  , document.getElementById('root'));
