import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './HomePage/HomePage';
import ListGenerator from './ListGenerator/ListGenerator';
import ListViewer from './ListViewer/ListViewer';
import SigninButton from './Header/SigninButton/SigninButton';
import RecipesPage from './RecipesPage/RecipesPage';
import useAuth from '../context/AuthContext';

const PageRoutes = () => {
  const { currentUser } = useAuth();

  return (
    <main className="container">
      {currentUser ? (
        <Switch >
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/list">
            <ListGenerator />
          </Route>
          <Route path="/search">
            <ListViewer />
          </Route>
          <Route path="/recipes">
            <RecipesPage />
          </Route>
        </Switch>
      ) : (
        <Switch >
          <Route path="/">
            <SigninButton />
          </Route>
        </Switch>
      )}
    </main>
  )
};

export default PageRoutes;
