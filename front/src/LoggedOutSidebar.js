import React, { Component } from "react";
import { Sidenav, Divider, Nav, Icon, Button } from "rsuite";

export default class LoggedOutSidebar extends Component {
  render() {
    const headerStyles = {
      padding: 20,
      fontSize: 16,
      background: "#f6c90e",
      color: " #3a4750"
    };
    return (
      <div style={{ width: 250 }}>
        <Sidenav>
          <Sidenav.Header>
            <div style={headerStyles}>Custom Sidenav</div>
          </Sidenav.Header>
          <Sidenav.Body>
            <Nav>
              <Nav.Item eventKey="1" active icon={<Icon icon="avatar" />}>
                <Button>Register</Button>
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Icon icon="envelope" />}>
                My messages
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}
