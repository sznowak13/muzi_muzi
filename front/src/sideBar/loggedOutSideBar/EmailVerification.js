import React, { Component } from "react";
import { Loader, Container, Content, Message } from "rsuite";
import { sendVerificationToken } from "../../registerService";
import queryString from "query-string";

export default class EmailVerification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifying: true,
      verified: false
    };
  }
  componentDidMount() {
    this.setState({
      verifying: true,
      verified: false
    });
    const params = queryString.parse(this.props.location.search);
    sendVerificationToken(params.key).then(verified => {
      this.setState({ verifying: false, verified: verified });
    });
  }

  render() {
    return (
      <Container>
        {this.state.verifying ? (
          <Loader center backdrop content="Verifying..." vertical size="lg" />
        ) : this.state.verified ? (
          <Content>
            <Message
              showIcon
              type="success"
              title="Success"
              description="Success! Your account is now activated and you can login."
            />
          </Content>
        ) : (
          <Content>
            <Message
              showIcon
              type="warning"
              title="Not verified :C"
              description="Provided token was not verified. Check the activation link again."
            />
          </Content>
        )}
      </Container>
    );
  }
}
