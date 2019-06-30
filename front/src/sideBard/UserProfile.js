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
      person_genres: data.genres,
      person_professions: data.professions
    });
  }

  render() {
    return (
      <Container className="news-container">
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <Image src={this.state.person_photo} roundedCircle />
          </Col>
          <Col md="auto">
            <h2 className="news-title">{this.state.person_first_name} {this.state.person_last_name}</h2>
            <h2 className="news-title"> "{this.state.person_username}" </h2>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 2 }} className="info-title">
            <Button variant="light" size="sm">
              <i className="fas fa-edit" />
            </Button>{" "}
            City:
          </Col>
          <Col md={{ span: 6, offset: 2 }}>{this.state.person_city}</Col>
          <Col md={{ span: 6, offset: 2 }} className="info-title">
            <Button variant="light" size="sm">
              <i className="fas fa-edit" />
            </Button>{" "}
            Description:
          </Col>
          <Col md={{ span: 6, offset: 2 }}>{this.state.person_description}</Col>
          <Col md={{ span: 6, offset: 2 }} className="info-title">
            <Button variant="light" size="sm">
              <i className="fas fa-edit" />
            </Button>{" "}
            Genres:
          </Col>
          <Col md={{ span: 6, offset: 2 }}>{this.state.person_genres}</Col>
          <Col md={{ span: 6, offset: 2 }} className="info-title">
            <Button variant="light" size="sm">
              <i className="fas fa-edit" />
            </Button>{" "}
            Professions:
          </Col>
          <Col md={{ span: 6, offset: 2 }}>{this.state.person_professions}</Col>
        </Row>

      </Container>
  )}
}
