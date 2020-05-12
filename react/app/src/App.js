import React, { Component } from "react";
import "./App.css";
import Category from "./Category";
import Home from "./Home";
import Bill from "./Bill";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Todo from "./Todo";
import Signup from "./Signup";

import User from "./User";
import Login from "./Login";

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/categories" exact={true} component={Category} />
          <Route path="/bills" exact={true} component={Bill} />
          <Route path="/todos" exact={true} component={Todo} />
          <Route path="/sign-in" component={Login} />
          <Route path="/sign-up" component={Signup} />
          <Route path="/user" component={User} />
        </Switch>
      </Router>
    );
  }
}

export default App;
