import React, { Component } from "react";
import Navigation from "./Navigation";

import { BrowserRouter as Router, Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./Signup";

export default class Home extends Component {
  render() {
    return (
      <>
        <Navigation></Navigation>
        <div className="row justify-content-between">
          <Login />
        </div>
      </>
    );
  }
}
