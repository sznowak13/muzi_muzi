/* eslint-disable eqeqeq */
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
      <CardDeck className="usersbox">
        <Card style={{ width: "12rem" }} key={index}>
          {row.photo_url == null ? (
            <Card.Img variant="top" src={userphoto} alt="ph" height="180" />
          ) : (
            <Card.Img variant="top" src={row.photo_url} alt="ph" height="180" />
          )}
          <Card.Header>
            <p>{row.first_name}</p>
            <span> "{row.username}"</span>
          </Card.Header>
          <Card.Body>
            <div className="users-body">
              <i className="fas fa-drum" />
              <span>Professions: </span>
              <p className="users-info">
                {row.professions.slice(0, 2).map((prof, i) => {
                  if (row.professions.slice(0, 2).length - 1 == i) {
                    return <span key={prof}>{prof}</span>;
                  } else {
                    return <span key={prof}>{prof}, </span>;
                  }
                })}
              </p>
            </div>
            <div className="users-body">
              <i className="fas fa-music" />
              <span>Genres: </span>
              <p className="users-info">
                {row.genres.slice(0, 2).map((genre, i) => {
                  if (row.genres.slice(0, 2).length - 1 == i) {
                    return <span key={genre}>{genre}</span>;
                  } else {
                    return <span key={genre}>{genre}, </span>;
                  }
                })}
              </p>
            </div>
            <Card.Text>
              <i className="fas fa-map-marker-alt" />
              {row.city}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="about-user">
            <Button variant="outline-dark">More</Button>
          </Card.Footer>
        </Card>
      </CardDeck>
    );
  });
  return <div>{rows}</div>;
};
