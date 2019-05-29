import React, { Component } from "react";
import { Container, Button, Card, Col, CardDeck } from "react-bootstrap";
import userphoto from "./userphoto.png";

export default class Bands extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      next: "http://127.0.0.1:8000/bands/",
      previous: null,
      bands: []
    };
  }

  componentDidMount() {
    const url = this.state.next;
    this.handleUrl(url);
  }

  handleUrl(url) {
    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          next: result.next,
          bands: result.results,
          previous: result.previous
        });
        console.log(result);
      });
  }

  handlePage(nextOrPreviousPage) {
    this.setState({ bands: [] });
    const url = nextOrPreviousPage;
    if (url !== null) {
      this.handleUrl(url);
    }
  }

  render() {
    const { bands } = this.state;
    return (
      <Container className="adverts-container">
        <h2 className="section-title">New bands</h2>
        <BandBody bandData={bands} />
      </Container>
    );
  }
}

const BandBody = props => {
  const rows = props.bandData.map((row, index) => {
    return (
      <CardDeck className="bandsbox">
        <Card border="warning" style={{ width: "11rem" }} key={index}>
          <Card.Img variant="top" src={userphoto} alt="ph" height="180" />
          <Card.Header as="h5">{row.name}</Card.Header>
          <Card.Body>
            <Card.Title>{row.genres}</Card.Title>
            <Card.Text>{row.city}</Card.Text>
            <Button variant="primary">More</Button>
          </Card.Body>
        </Card>
      </CardDeck>
    );
  });
  return <div>{rows}</div>;
};
