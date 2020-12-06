import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import Form from 'views/Form.js'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Reducer from './Store/Reducer'
const middleWare = [thunk];
const initialState = {
  subCat:[],
  cat:[],
  img:[],
  cart:[]
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  Reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/form" component={Form} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/landing-page" component={Components} />
    </Switch>
  </Router>
  </Provider>,
  document.getElementById("root")
);
