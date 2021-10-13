import React from "react";
import {
  Switch,
  Route,
  Link
} from "react-router-dom";
import HomePage from './HomePage/HomePage';
import ListGenerator from './ListGenerator/ListGenerator';
import ListViewer from './ListViewer/ListViewer';

const PageRoutes = () => (
  <main className="container">
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
    </Switch>
  </main>
);

export default PageRoutes;
