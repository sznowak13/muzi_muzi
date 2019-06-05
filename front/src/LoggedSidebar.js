import React, { Component } from "react";
import { Sidenav, Divider, Nav, Icon } from "rsuite";

export default class LoggedSidebar extends Component {
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
              <Nav.Item eventKey="1" icon={<Icon icon="avatar" />}>
                My profile
              </Nav.Item>
              <Nav.Item eventKey="2" icon={<Icon icon="envelope" />}>
                My messages
              </Nav.Item>
              <Nav.Item eventKey="3" icon={<Icon icon="sticky-note" />}>
                My adverts
              </Nav.Item>
              <Nav.Item eventKey="4" icon={<Icon icon="group" />}>
                My bands
              </Nav.Item>
              <Divider />
              <Nav.Item eventKey="5" icon={<Icon icon="sign-out" />}>
                Log out
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}
