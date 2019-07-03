import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Col, Row, Image } from "react-bootstrap";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person_id: "",
      person_first_name: "",
      person_last_name: "",
      person_username: "",
      person_city: "",
      person_description: "",
      person_photo: "",
      person_email: "",
      person_genres: [],
      person_professions: []
    };
  }

  async componentDidMount() {
    const url = `http://127.0.0.1:8000/users/${localStorage.getItem(
      "muzi_muzi_user_id"
    )}/`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      person_id: data.user_id,
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
        <Container className="personal-info-container">
          <Row>
            <Col>
              <Image
                width="200"
                height="200"
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

        <Container className="person-info-container">
          <Row>
            <Col className="person-info-title">Email:</Col>
          </Row>
          <Row>
            <Col>{this.state.person_email}</Col>
          </Row>

          <Row>
            <Col className="person-info-title">City:</Col>
          </Row>
          <Row>
            <Col>{this.state.person_city}</Col>
          </Row>

          <Row>
            <Col className="person-info-title">Professions:</Col>
          </Row>
          <Row>
            <Col>
              {this.state.person_professions.length > 0 ? (
                this.state.person_professions.toString()
              ) : (
                <span>Not provided</span>
              )}
            </Col>
          </Row>

          <Row>
            <Col className="person-info-title">Genres:</Col>
          </Row>
          <Row>
            <Col>
              {this.state.person_genres.length > 0 ? (
                this.state.person_genres.toString()
              ) : (
                <span>Not provided</span>
              )}
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
      </Container>
    );
  }
}
