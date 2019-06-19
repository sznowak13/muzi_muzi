import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Schema,
  Modal,
  Button,
  Divider
} from "rsuite";

export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password1: "",
        password2: "",
        email1: "",
        email2: ""
      },
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }

  close() {
    this.setState({ show: false });
  }

  open() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.close} size="xs">
          <Modal.Header>
            <Modal.Title>Register new User</Modal.Title>
          </Modal.Header>
          <Divider />
          <Modal.Body>
            <Form fluid model={userModel}>
              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <FormControl name="username" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="email1" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirm email</ControlLabel>
                <FormControl name="email2" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password1" />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Confirm password</ControlLabel>
                <FormControl name="password2" />
              </FormGroup>
              <Button color="green">Submit</Button>
              <Button>Cancel</Button>
            </Form>
          </Modal.Body>
        </Modal>

        <Button onClick={this.open} appearance="primary" color="yellow" block>
          Register
        </Button>
      </div>
    );
  }
}
const { StringType } = Schema.Types;
const userModel = Schema.Model({
  username: StringType().isRequired("User name is required"),
  email1: StringType()
    .isEmail("Please enter correct email")
    .isRequired("Email is required"),
  email2: StringType().addRule(
    (value, data) => value === data.email1,
    "Emails must match"
  ),
  password1: StringType().isRequired("Password is required"),
  password2: StringType().addRule(
    (value, data) => value === data.password1,
    "Passwords must match"
  )
});
