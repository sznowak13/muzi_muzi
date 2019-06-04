import React, { Component } from "react";
import { Container, Button, Card, CardDeck } from "react-bootstrap";
import userphoto from "./userphoto.png";

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      next: "http://127.0.0.1:8000/users/",
      previous: null,
      users: []
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
          users: result.results,
          previous: result.previous
        });
        console.log(result);
      });
  }

  handlePage(nextOrPreviousPage) {
    this.setState({ users: [] });
    const url = nextOrPreviousPage;
    if (url !== null) {
      this.handleUrl(url);
    }
  }

  render() {
    const { users } = this.state;
    return (
      <Container className="adverts-container">
        <h2 className="section-title">New users</h2>
        <BandBody usersData={users} />
      </Container>
    );
  }
}

const BandBody = props => {
  const rows = props.usersData.map((row, index) => {
    return (
      <CardDeck className="bandsbox">
        <Card style={{ width: "12rem" }} key={index}>
          <Card.Img variant="top" src={userphoto} alt="ph" height="180" />
          <Card.Header>
            <p>{row.first_name}</p>
            <span> "{row.username}"</span>
          </Card.Header>
          <Card.Body>
            <span>
              <i class="fas fa-drum" />
            </span>
            <span>Professions: </span>
            <ul className="users-info">
              {row.professions.slice(0, 2).map(prof => {
                return <li key={prof}>{prof}</li>;
              })}
            </ul>
            <span>
              <i class="fas fa-music" />
            </span>
            <span>Genres: </span>
            <ul className="users-info">
              {row.genres.slice(0, 2).map(genre => {
                return <li key={genre}>{genre}</li>;
              })}
            </ul>
            <Card.Text>
              <i class="fas fa-map-marker-alt" />
              {row.city}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">More</Button>
          </Card.Footer>
        </Card>
      </CardDeck>
    );
  });
  return <div>{rows}</div>;
};
