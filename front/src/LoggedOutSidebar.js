import React, { Component } from "react";
import { Sidenav, Icon, Divider } from "rsuite";
import { Button } from "react-bootstrap";

export default class LoggedOutSidebar extends Component {
  render() {
    return (
      <div style={{ width: 250 }}>
        <Sidenav>
          <Sidenav.Body>
            <Sidenav.Header>
              <div className="header-styles">
                <h3 className="welcome-sign">
                  Welcome to the MuziMuzi community.
                </h3>
              </div>
            </Sidenav.Header>
            <div className="welcome-sign">
              Don't have an account? It's free! Sign up and join us.
              <p>{<Icon icon="heart" />}</p>
            </div>
            <Divider />
            <div className="welcome-btn">
              <Button variant="outline-secondary" block>
                Register
              </Button>
            </div>
            <Divider />
            <div className="welcome-btn">
              <Button variant="outline-success" block>
                Login
              </Button>
            </div>
            <Divider />
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}
