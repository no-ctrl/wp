import React, { Component } from "react";
import Navigation from "./Navigation";

import { Container } from "reactstrap";

export default class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: "",
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <>
        <Navigation></Navigation>
        <Container>
          {" "}
          <div className="container">
            <header className="jumbotron">
              <h3>
                <strong>{currentUser.username}</strong> Профил
              </h3>
            </header>
            <p>
              <strong>Token:</strong>
            </p>
            <p>
              <strong>Id:</strong> {currentUser.id}
            </p>
          </div>
        </Container>
      </>
    );
  }
}
