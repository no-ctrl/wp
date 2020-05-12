import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavLink, NavItem } from "reactstrap";
import {
  faHome,
  faBox,
  faHandHoldingUsd,
  faCheckSquare,
  faUserCircle,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class Navigation extends Component {
  render() {
    return (
      <div>
        <Navbar
          className="bg-light navbar-default   navbar-dark bg-dark"
          color="muted"
          light
          expand="md"
        >
          <NavbarBrand className="navbar-brand  mx-auto" href="/">
            {" "}
            <FontAwesomeIcon icon={faPencilAlt} color="#95F9E3" />
            Алатки за продуктивност{" "}
          </NavbarBrand>

          <Nav className="mx-auto" navbar>
            <NavItem>
              <NavLink href="/">
                <FontAwesomeIcon icon={faHome} />
                Почетна
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/categories">
                <FontAwesomeIcon icon={faBox} />
                Категории
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/bills">
                {" "}
                <FontAwesomeIcon icon={faHandHoldingUsd} />
                Финансиски бележник
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink href="/todos">
                {" "}
                <FontAwesomeIcon icon={faCheckSquare} />
                Todo
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/user">
                {" "}
                <FontAwesomeIcon icon={faUserCircle} />
                Сметка
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
