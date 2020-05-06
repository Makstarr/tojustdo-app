import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"; 

import './css/index.min.css';

ReactDOM.render(
  <Router>
    <Route exact path="/sing-in">
      <h1>Sing in window will apear here</h1>
    </Route>
    <Route exact path="/sing-up">
      <h1>Sing up window will apear here</h1>
    </Route>
    <Route path="/">
      <App />
    </Route>
  </Router>,
  document.getElementById('root')
);
