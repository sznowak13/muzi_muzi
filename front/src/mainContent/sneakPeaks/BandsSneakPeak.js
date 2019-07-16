import React, { Component } from "react";
import { Container, Card, CardDeck } from "react-bootstrap";
import genericband from "../../resources/generic-band.jpg";

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
      <Container className="news-container">
        <h2 className="news-title">New bands</h2>
        {this.state.latestBands.map((band, index) => {
          return <Band band={band} key={index} />;
        })}
      </Container>
    );
  }
}

const Band = props => {
  return (
    <CardDeck
      style={{ display: "-webkit-inline-box", margin: "20px 0 10px 0" }}
    >
      <Card key={props.index} style={{ width: "20rem" }}>
        <Card.Img variant="top" src={genericband} className="band-background" />
        <Card.ImgOverlay>
          <div className="band-name">{props.band.name}</div>
        </Card.ImgOverlay>
        <Card.Body>
          <div className="users-and-bands-body">
            <i className="fas fa-home" />
            Homepage:
            <p>
              {" "}
              <a href={props.band.homepage}>{props.band.homepage}</a>{" "}
            </p>
          </div>
          <div className="users-and-bands-body">
            <i className="fas fa-map-marker-alt" />
            City: <p className="users-info">{props.band.city}</p>
          </div>
          <div>
            <i className="fas fa-music" />
            Genres: <p className="users-info">{props.band.genres}</p>
          </div>
        </Card.Body>
      </Card>
    </CardDeck>
  );
};
