import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './App';
import { AuthProvider } from './context/AuthContext';
import {
  BrowserRouter as Router,
} from "react-router-dom";

const projectURL = 'https://github.com/spencerlepine/hr-sea19-mvp';
const projectAuthor = 'Spencer Lepine';

const App = () => (
  <Router>
    <AuthProvider>
      <Component />
    </AuthProvider>
  </Router>
)

test('renders project name', () => {
  render(<App />);
  const nameElement = screen.getByText(/GroceryChecc/i);
  expect(nameElement).toBeInTheDocument();
});

test('renders github repository link', () => {
  render(<App />);
  const linkElement = screen.getByRole('link', { name: /Source Code/i });
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.getAttribute('href')).toBe(projectURL);
});

test('renders author name', () => {
  render(<App />);
  const linkElement = screen.getByText(projectAuthor);
  expect(linkElement).toBeInTheDocument();
});
