import React, { Component } from "react";
import { Navbar, Form, Button, FormControl, Nav } from "react-bootstrap";

class HeaderSearch extends Component {
  render() {
    return (
      <Navbar className="navbar-search" expand="md">
        <Nav className="mr-auto" />
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-2" />
          <Button variant="outline-warning">Search</Button>
        </Form>
      </Navbar>
    );
  }
}

export default HeaderSearch;
