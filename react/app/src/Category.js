import React, { Component } from "react";
import Navigation from "./Navigation";
import { Spinner, Button, Input, Container, Table } from "reactstrap";
import { faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Categories: [],
      name: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const name = this.state.name;
    await fetch(`/api/category`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
      body: JSON.stringify(name),
    });
    event.preventDefault();
    this.props.history.push("/categories");
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }
  async componentDidMount() {
    const response = await fetch("/api/categories", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    });
    const body = await response.json();
    this.setState({ Categories: body, isLoading: false });
  }

  async remove(id) {
    await fetch(`api/category/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Cotent-Type": "application/json,",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    }).then(() => {
      let updatedCategories = [...this.state.Categories].filter(
        (i) => i.id !== id
      );
      this.setState({ Categories: updatedCategories });
    });
  }

  render() {
    const { Categories, isLoading } = this.state;
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
    let rows = Categories.map((category) => (
      <tr key={category.id}>
        <td>{category.name}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(category.id)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </td>
      </tr>
    ));

    return (
      <>
        <Navigation />

        <Container>
          <h3>Преглед на Категории</h3>
          <Table className="mt-4" dark>
            <thead>
              <tr>
                <th width="95%">Опис</th>
                <th>Опции</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
          <Container className="flex">
            <h3>Додај категорија: </h3>
            <Input
              className="name w-50"
              type="text"
              placeholder="Внеси категорија"
              onChange={this.handleChange}
            />{" "}
            <Button className="btn  -sm" onClick={this.handleSubmit}>
              <FontAwesomeIcon icon={faSave} /> Зачувај
            </Button>{" "}
          </Container>
        </Container>
      </>
    );
  }
}
