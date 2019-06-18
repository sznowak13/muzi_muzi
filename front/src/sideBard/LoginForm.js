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
    let response = await fetch("http://localhost:8000/api-token/login", {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json"
      }
    });
    let status = response.status;
    if (status === 400){
      console.log("jeb sie");
    } else if (status === 200){
      let json = await response.json();
      localStorage.setItem("muzi_muzi_token", json.token);
    }

      // .then(response => response.json())
      // .then(result => console.log(result))
      // .catch(error => console.log(error));
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
