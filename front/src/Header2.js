import React, { Component } from "react";
import { Navbar, Form, Button, FormControl, Nav } from "react-bootstrap";

class Header2 extends Component {
  render() {
    return (
      <Navbar className="nav2" expand="lg">
        <Nav className="mr-auto" />
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-warning">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default Header2;
