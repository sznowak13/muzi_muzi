import React, { Component } from "react";
import logo from "./logo.png";
import { Navbar } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Brand href="#home">
          <img alt="" src={logo} width="160" height="55" />
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
