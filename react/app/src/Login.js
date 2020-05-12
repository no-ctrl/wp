import React, { Component } from "react";
import { Container } from "reactstrap";
import Navigation from "./Navigation";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "test2",
      password: "test2",
      login: false,
      store: null,
    };
  }
  login() {
    fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(this.state),
    }).then((response) => {
      localStorage.setItem("token", response.json.body);
    });
  }
  render() {
    return (
      <>
        <Container className="w-50">
          <form>
            <h3>Најави се!</h3>

            <div className="form-group">
              <label>Корисничко име</label>
              <input
                type="text"
                className="form-control"
                placeholder="Внеси корисничко име."
                onChange={(event) => {
                  this.setState({ username: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <label>Лозинка</label>
              <input
                type="password"
                className="form-control"
                placeholder="Внеси лозинка"
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
            </div>

            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Запомни
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={() => {
                this.login();
              }}
            >
              Потврди
            </button>
            <p className="forgot-password text-right">
              <a href="/sign-up">Регистрирај се!</a>
            </p>
          </form>
        </Container>
      </>
    );
  }
}
