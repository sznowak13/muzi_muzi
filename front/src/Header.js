import React, { Component } from "react";
import logo from "./logo.png";
import { Navbar } from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar style={{ padding: "0px", backgroundColor: "#f6c90e" }}>
        <Navbar.Brand href="/">
          <img alt="" src={logo} width="160" height="55" />
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default Header;
