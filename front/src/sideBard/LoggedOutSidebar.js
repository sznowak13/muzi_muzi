import React, { Component } from "react";
import { Sidenav, Icon, Divider, Dropdown } from "rsuite";
import LoginForm from "./LoginForm";

import RegisterModal from "./RegisterModal";

export default class LoggedOutSidebar extends Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Sidenav>
          <Sidenav.Body>
            <Sidenav.Header>
              <div className="header-styles">
                <h3 className="welcome-sign main">
                  Welcome to the MuziMuzi community.
                </h3>
              </div>
            </Sidenav.Header>
            <div className="welcome-sign">
              <p>Don't have an account?</p>
              <p>It's free! </p>
              <p>Sign up and join us.</p>
              <p>
                <Icon icon="heart" />
              </p>
            </div>
            <Divider />
            <div className="welcome-btn">
              <RegisterModal />
            </div>
            <Divider />
            <Dropdown eventKey="1" title="Login">
              <Dropdown.Item eventKey="1-1" style={{ paddingLeft: 0 }}>
                <LoginForm />
              </Dropdown.Item>
            </Dropdown>
          </Sidenav.Body>
        </Sidenav>
      </div>
    );
  }
}
