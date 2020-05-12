import React, { Component } from "react";
import { Container } from "reactstrap";
import Navigation from "./Navigation";

export default class SignUp extends Component {
  render() {
    return (
      <>
        <Navigation></Navigation>
        <Container className="w-50">
          <form>
            <h3>Регистрирај се!</h3>

            <div className="form-group">
              <label>корисничко име</label>
              <input
                type="username"
                className="form-control"
                placeholder="Внеси корисничко име."
              />
            </div>

            <div className="form-group">
              <label>лозинка</label>
              <input
                type="password"
                className="form-control"
                placeholder="Внеси лозинка."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Регистрирај се
            </button>
            <p className="forgot-password text-right">
              Веќе си регистриран <a href="/">најави се?</a>
            </p>
          </form>
        </Container>
      </>
    );
  }
}
