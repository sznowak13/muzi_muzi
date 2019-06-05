import React, { Component } from "react";
import { Container, Button, Card, CardDeck, ListGroup } from "react-bootstrap";
import genericband from "./generic-band.jpg";

export default class BandsSneakPeak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestBands: [],
      apiUrl: "http://127.0.0.1:8000/bands/"
    };
  }

  componentDidMount() {
    this.setState({ latestBands: [] });
    fetch(this.state.apiUrl)
      .then(res => res.json())
      .then(json =>
        this.setState({
          latestBands: json.results
        })
      );
  }

  render() {
    return (
      <Container className="adverts-container">
        <h2 className="section-title">New bands</h2>
        {this.state.latestBands.map((band, index) => {
          return <Band band={band} key={index} />;
        })}
      </Container>
    );
  }
}

const Band = props => {
  return (
    <CardDeck className="bandsbox">
      <Card key={props.index} style={{ width: "20rem" }}>
        <Card.Img variant="top" src={genericband} className="band-background" />
        <Card.ImgOverlay>
          <div className="band-name">{props.band.name}</div>
        </Card.ImgOverlay>
        <Card.Body>
          <div>
            Homepage: <a href={props.band.homepage}>{props.band.homepage}</a>
          </div>
          <div>
            City: <p className="item-data">{props.band.city}</p>
          </div>
          <div>
            Genres: <p className="item-data">{props.band.genres}</p>
          </div>
        </Card.Body>
      </Card>
    </CardDeck>
  );
};
