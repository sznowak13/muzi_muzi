import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonToolbar
} from "rsuite";
import { Button } from "react-bootstrap";
import { Alert } from "rsuite";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.authorizeUser = this.authorizeUser.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }

  updateState(value, event) {
    if (event.target.name === "name") {
      this.setState({ username: value });
    } else if (event.target.name === "password") {
      this.setState({ password: value });
    }
  }

  async authorizeUser() {
    let data = JSON.stringify(this.state);
    let response;
    try {
      response = await fetch("http://localhost:8000/api-token/login", {
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json"
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }

    let status = response.status;
    if (status === 400) {
      Alert.warning("Unable to log in with proviaded credentials.", 5000);
    } else if (status === 200) {
      let json = await response.json();
      localStorage.setItem("muzi_muzi_token", json.token);
      window.location.reload();
    }
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl name="name" onChange={this.updateState} />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            type="password"
            onChange={this.updateState}
          />
          <HelpBlock>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button
              variant="outline-secondary"
              block
              onClick={this.authorizeUser}
            >
              Submit
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    );
  }
}
