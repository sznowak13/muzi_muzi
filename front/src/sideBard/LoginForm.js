import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar
} from "rsuite";
import { Button } from "react-bootstrap";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.updateState = this.updateState.bind(this);

    this.state = {
      username: "",
      password: ""
    };
  }
  handleClick() {
    console.log(this.state);
  }

  updateState(value, event) {
    if (event.target.name === "name") {
      this.setState({ username: value });
    } else if (event.target.name === "password") {
      this.setState({ password: value });
    }
  }

  authorizeUser() {
    let data = JSON.stringify(this.state);
    fetch("http://localhost:8000/api-token/login", {
      method: "POST",
      body: data
    });
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
              onClick={this.handleClick}
            >
              Submit
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    );
  }
}
