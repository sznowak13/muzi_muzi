import React, { Component } from "react";
import logo from "./logo.png";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button
} from "react-bootstrap";

class Header extends Component {
  render() {
    return (
      <Navbar bg="warning" expand="lg">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="90"
            height="40"
            className="d-inline-block align-top"
          />
          {" MuziMuzi "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">My Bands</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">My Adverts</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Messages</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" />
            <Button className="ml-1" variant="success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {/* <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text> */}
          <Button className="ml-2" variant="success">
            Register
          </Button>
          <Button className="ml-2" variant="success">
            Log in
          </Button>
          {/* <Button className="ml-2" variant="danger">
            Log out
          </Button> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
