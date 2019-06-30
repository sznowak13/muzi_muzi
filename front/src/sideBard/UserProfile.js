import React, { Component } from "react";
import { Container } from "react-bootstrap";

export default class UserProfile extends Component {

  state = {
    person_first_name: null,
    person_last_name: null,
    person_username: null,
    person_city: null,
    person_description: null,
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
      person_genres: data.genres,
      person_professions: data.professions
    });
  }

  render() {
    return (
      <Container>
        <div>{this.state.person_city}</div>
      </Container>
  )}
}
