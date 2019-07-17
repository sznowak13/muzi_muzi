import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { AdvBody } from "./AdvertBody";

export default class UserAdverts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      APIurl: "http://127.0.0.1:8000/adverts/latest?num=3",
      adverts: []
    };
  }

  componentDidMount() {
    this.setState({ adverts: [] });
    fetch(this.state.APIurl)
      .then(res => res.json())
      .then(json =>
        this.setState({
          adverts: json
        })
      );
  }

  render() {
    const { adverts } = this.state;
    return (
      <Container className="news-container">
        <h3 className="news-title">Your adverts</h3>
        <AdvBody advertData={adverts} />
      </Container>
    );
  }
}
