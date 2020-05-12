import React, { Component } from "react";
import Navigation from "./Navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from "react-moment";
import {
  Table,
  Container,
  Form,
  FormGroup,
  Button,
  Input,
  Label,
  Spinner,
} from "reactstrap";
import { faTrashAlt, faPlus } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default class Bill extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,

      isLoading: false,
      bills: [],
      categories: [],
      item: {
        date: "",
        description: "",
        price: 0,
        category: { id: 2, name: "Kategorija2" },
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange.item = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
  }

  handleChange = (e) => {
    let item = { ...this.state.item };
    item[e.target.name] = e.target.value;
    this.setState({
      item,
    });
    console.log(this.state);
  };

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.date = date;
    this.setState({ item });
    console.log(item);
  }
  handleCategory = (e) => {
    let item = { ...this.state.item };
    item.category.id = e.category.id;
    item.category.name = e.category.name;

    this.setState({ item });
    console.log(item);
  };

  async handleSubmit(event) {
    let item = {
      date: this.state.item.date,
      description: this.state.item.description,
      price: this.state.item.price,
      category: {
        id: this.state.item.category.id,
        name: this.state.item.category.name,
      },
    };

    await fetch(`/api/bills`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
      body: JSON.stringify(item),
    });

    event.preventDefault();
    this.props.history.push("/bills");
  }

  async remove(id) {
    await fetch(`api/bills/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "applicaton/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    }).then(() => {
      let updatedBills = [...this.state.bills].filter((i) => i.id !== id);
      this.setState({ bills: updatedBills });
    });
  }

  async componentDidMount() {
    const response = await fetch("api/categories", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    });
    const body = await response.json();
    this.setState({ categories: body, isLoading: false });

    const responseBill = await fetch("api/bills", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MiIsImV4cCI6MTU4OTI4NDc2MywiaWF0IjoxNTg5MjQ4NzYzfQ.znURwmlqoryB2ukMaNxC9LYTPwCRW0YXJkqaQk1mnJk",
      },
    });
    const bodyBill = await responseBill.json();
    this.setState({ bills: bodyBill, isLoading: false });
  }

  render() {
    const title = <h3>Додај сметкa</h3>;
    const { categories } = this.state;
    const { bills, isLoading } = this.state;

    if (isLoading)
      return (
        <div>
          <Spinner className="centered-spinner" color="primary" />
        </div>
      );
    let categoryList = categories.map((category) => (
      <option name="categoryid" key={category.id}>
        {category.name}
      </option>
    ));

    let rows = bills.map((bill) => (
      <tr key={bill.id}>
        <td>{bill.description}</td>
        <td>{bill.price}</td>
        <td>
          <Moment date={bill.date} format="YYYY-MM-DD"></Moment>
        </td>
        <td>{bill.category.name}</td>
        <td>
          <Button size="sm" color="danger" onClick={() => this.remove(bill.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <Navigation />

        <Container>
          <h3>Листа на сметки</h3>
          <div className="alert alert-light" role="alert">
            Во овој прозорец може да додавате,бришете и менувате сметки
          </div>
          <Table className="mt-4" dark>
            <thead>
              <tr>
                <th width="20%">Опис</th>
                <th width="10%">Цена</th>
                <th width="10%">Датум</th>
                <th width="10%">Категорија</th>
                <th width="10%">Опции</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <Button
            className="float-xl-right ml-5 ml-lg-0  btn-lg text-center"
            onClick={() => {
              this.setState({ show: !this.state.show });
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
            {this.state.show
              ? "Сокриј прозорец за додавање сметки"
              : "Додади сметки"}
          </Button>
          {this.state.show ? (
            <Container>
              <Form>
                {title}

                <FormGroup>
                  <Label htmlFor="description">Наслов</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="category">Категорија</Label>
                  <select name="category" onChange={this.handleChange}>
                    {categoryList}
                  </select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="date">Датум</Label>
                  <DatePicker
                    selected={this.state.item.date}
                    onChange={this.handleDateChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label>Цена</Label>
                  <Input
                    name="price"
                    id="price"
                    value={this.state.item.price.value}
                    type="number"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Button color="primary" type="submit">
                    Зачувај
                  </Button>{" "}
                  <Button color="secondary" tag={Link} to="/categories">
                    Откажи
                  </Button>{" "}
                </FormGroup>
              </Form>
            </Container>
          ) : null}
        </Container>
      </div>
    );
  }
}
