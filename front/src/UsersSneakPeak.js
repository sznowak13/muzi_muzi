/* eslint-disable eqeqeq */
import React, { Component } from "react";
import { Container, Button, Card, CardDeck } from "react-bootstrap";
import userphoto from "./userphoto.png";

export default class UsersSneakPeak extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      next: "http://127.0.0.1:8000/users/latest/",
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
          users: result
        });
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
      <Container className="news-container">
        <h3 className="news-title">New users</h3>
        <UsersBody usersData={users} />
      </Container>
    );
  }
}

const UsersBody = props => {
  const rows = props.usersData.map((row, index) => {
    return (
      <CardDeck style={{ display: "-webkit-inline-box" }} key={index}>
        <Card
          style={{
            width: "13.3em",
            margin: "20px 24px 10px 35px",
            minHeight: "480px"
          }}
        >
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
            <div className="users-and-bands-body">
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
            <div className="users-and-bands-body">
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
          <Card.Footer>
            <Button variant="outline-dark" block>
              More
            </Button>
          </Card.Footer>
        </Card>
      </CardDeck>
    );
  });
  return <div>{rows}</div>;
};
