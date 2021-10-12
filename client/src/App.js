import React from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageRoutes from './components/PageRoutes';
import './App.css';

const App = () => (
  <div className="App">
    <Header />
    <PageRoutes />
    <Footer />
  </div>
);

export default App;
