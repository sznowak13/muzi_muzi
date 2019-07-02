import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Col, Row, Image, Button } from "react-bootstrap";

export default class UserProfile extends Component {

  state = {
    person_first_name: null,
    person_last_name: null,
    person_username: null,
    person_city: null,
    person_description: null,
    person_photo: null,
    person_email: null,
    person_genres: [],
    person_professions: []
  };

  async componentDidMount() {
    const url = "http://127.0.0.1:8000/users/1";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      person_first_name: data.first_name,
      person_last_name: data.last_name,
      person_username: data.username,
      person_city: data.city,
      person_description: data.description,
      person_photo: data.photo_url,
      person_email: data.email,
      person_genres: data.genres,
      person_professions: data.professions
    });
  }

  render() {
    return (
      <Container className="news-container">
        <Container className="personal-info-person-container">
          <Row>
            <Col>
              <Image width="200" height="200"
                className="person-photo"
                src={this.state.person_photo}
                roundedCircle
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="news-title">
                {this.state.person_first_name} {this.state.person_last_name}
              </h2>
              <h2 className="news-title"> "{this.state.person_username}" </h2>
            </Col>
          </Row>
        </Container>
        <Container className="person-description-container">
          <Row>
            <Col className="person-info-title">Description:</Col>
          </Row>
          <Row>
            <Col>{this.state.person_description}</Col>
          </Row>
        </Container>
        <Container className="person-extra-info-container">
          <Row>
            <Col className="person-info-title">Email:</Col>
          </Row>
          <Row>
            <Col>
              {this.state.person_email}
            </Col>
          </Row>

          <Row>
            <Col className="person-info-title">City:</Col>
          </Row>
          <Row>
            <Col>
              {this.state.person_city}
            </Col>
          </Row>

          <Row>
            <Col className="person-info-title">Professions:</Col>
          </Row>
          <Row>
            <Col>
              {this.state.person_professions}
            </Col>
          </Row>

          <Row>
            <Col className="person-info-title">Genres:</Col>
          </Row>
          <Row>
            <Col>
              {this.state.person_genres}
            </Col>
          </Row>

        </Container>
      </Container>
    );
  }
}
