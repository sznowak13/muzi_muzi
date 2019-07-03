import React, { Component } from "react";
import { Container } from "react-bootstrap";
import Flexbox from 'flexbox-react';
import { Col, Row, Image } from "react-bootstrap";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advert_id: "",
      advert_username: "",
      advert_city: "",
      advert_band_name: "",
      advert_title: "",
      advert_description: "",
      advert_genre: "",
      advert_profession: "",
      advert_posted_on: ""
    };
  }

  async componentDidMount() {
    const url = `http://127.0.0.1:8000/adverts/1/`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      advert_id: data.advert_id,
      advert_username: data.username,
      advert_city: data.city,
      advert_band_name: data.band_name,
      advert_title: data.title,
      advert_description: data.description,
      advert_posted_on: data.posted_on,
      advert_genre: data.genre,
      advert_profession: data.profession
    });
  }

  render() {
    return (
      <Container className="news-container">
        <Flexbox flexDirection="row" justifyContent="space-around" margin="1%">
          <div className="advert-header"> BAND </div>
          <div className="advert-header"> {this.state.advert_city} </div>
          <div className="advert-header"> {this.state.advert_profession} </div>
          <div className="advert-header"> {this.state.advert_genre}</div>
        </Flexbox>
      </Container>
    );
  }
}
