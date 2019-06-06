import React, { Component } from "react";
import { Container, Card, CardDeck } from "react-bootstrap";
import genericband from "./generic-band.jpg";

export default class BandsSneakPeak extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latestBands: [],
      apiUrl: "http://127.0.0.1:8000/bands/latest?num=12"
    };
  }

  componentDidMount() {
    this.setState({ latestBands: [] });
    fetch(this.state.apiUrl)
      .then(res => res.json())
      .then(json =>
        this.setState({
          latestBands: json
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
            <i className="fas fa-home" />
            Homepage:
            <p>
              {" "}
              <a href={props.band.homepage}>{props.band.homepage}</a>{" "}
            </p>
          </div>
          <div>
            <i className="fas fa-map-marker-alt" />
            City: <p>{props.band.city}</p>
          </div>
          <div>
            <i className="fas fa-music" />
            Genres: <p>{props.band.genres}</p>
          </div>
        </Card.Body>
      </Card>
    </CardDeck>
  );
};
