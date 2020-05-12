import React, { Component } from "react";
import Navigation from "./Navigation";
import {
  UncontrolledAlert,
  Input,
  Button,
  Badge,
  Container,
  Spinner,
} from "reactstrap";
import { faTrashAlt, faCheck, faSave } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Todo extends Component {
  lst = {
    title: this.title,
    status: "false",
  };
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      title: "",
    };
    this.addItem = this.addItem.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
  }

  async changeStatus(id) {
    await fetch(`api/todos/status/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",

        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    });
  }

  async addItem(e) {
    const name = {
      title: this.state.title,
      status: "false",
    };
    await fetch(`/api/todos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(name),
    });

    this.props.history.push("/todos");
  }
  async componentDidMount() {
    const response = await fetch("/api/todos", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    });
    const body = await response.json();
    this.setState({ items: body, isLoading: false });
  }
  handleChange(event) {
    this.setState({ title: event.target.value });
    console.log(this.state);
  }
  async remove(id) {
    await fetch(`api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Cotent-Type": "application/json,",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    }).then(() => {
      let updatedItems = [...this.state.items].filter((i) => i.id !== id);
      this.setState({ items: updatedItems });
    });
  }
  render() {
    const { items, isLoading } = this.state;
    if (isLoading)
      return (
        <div>
          <Navigation />
          <Container className="d-flex flex-row justify-content-center align-items-center">
            {" "}
            <Spinner />
          </Container>
        </div>
      );
    let rows = items.map((item) => (
      <div className="card-group w-70">
        <div className="card-body  bd-highlight" key={item.id}>
          <div className="card-title">
            {item.title}{" "}
            <span>
              {item.status && <Badge color="success">Завршено</Badge>}
              {!item.status && <Badge color="info">Не завршено</Badge>}
            </span>
          </div>
        </div>

        <div>
          <Button color="info" onClick={() => this.changeStatus(item.id)}>
            <FontAwesomeIcon icon={faCheck} />
          </Button>
          <Button color="danger" onClick={() => this.remove(item.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </div>
      </div>
    ));
    return (
      <>
        <Navigation></Navigation>
        <Container>
          <h3>Додади TODO </h3>
          <UncontrolledAlert color="info">
            Внесете ,сменете статус или избришете todo !
          </UncontrolledAlert>
          <Container className="input-group w-50">
            <Input
              type="text"
              onChange={this.handleChange}
              placeholder="Впиши текст"
            />
            <Button onClick={this.addItem} x>
              <FontAwesomeIcon icon={faSave} /> Внеси
            </Button>{" "}
          </Container>
          {rows}
        </Container>
      </>
    );
  }
}
