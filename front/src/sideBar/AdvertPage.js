import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import Flexbox from "flexbox-react";
import Button from "react-bootstrap/Button";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advert_id: "",
      advert_username: "",
      advert_city: "",
      advert_band_name: null,
      advert_title: "",
      advert_description: "",
      advert_genre: "",
      advert_profession: "",
      advert_posted_on: ""
    };
  }

  async componentDidMount() {
    const url = `http://127.0.0.1:8000/adverts/10/`;
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

  goToUserPage() {
      console.log("jestem")
  }

  render() {
    return (
      <Container className="news-container">
        <Flexbox
          flexDirection="row"
          justifyContent="space-around"
          margin="1%"
          padding="3%"
        >
          <div className="advert-header">
            {" "}
            {this.state.advert_band_name != null ? (
              <span> BAND </span>
            ) : (
              <span> USER </span>
            )}{" "}
          </div>
          <div className="advert-header"> {this.state.advert_city} </div>
          <div className="advert-header"> {this.state.advert_profession} </div>
          <div className="advert-header"> {this.state.advert_genre}</div>
        </Flexbox>
        <Flexbox
          flexDirection="row"
          justifyContent="space-around"
          margin="1%"
          padding="3%"
        >
          <div> kiedys bedzie image</div>
          <div className="news-title"> {this.state.advert_title} </div>
        </Flexbox>
        <Flexbox
          flexDirection="row"
          justifyContent="center"
          margin="1%"
          padding="3%"
        >
          <div className="advert-description">
            {" "}
            {this.state.advert_description}{" "}
          </div>
        </Flexbox>
        <Flexbox
          flexDirection="row"
          justifyContent="flex-end"
          margin="1%"
          padding="3%"
        >
          <div className="advert-posted"> Posted by: </div>
          <div className="advert-posted" onClick={this.goToUserPage}>
            {" "}
            {this.state.advert_username}{" "}
          </div>
          <div className="advert-posted"> Posted on: </div>
          <div className="advert-posted"> {this.state.advert_posted_on} </div>
        </Flexbox>
        <Flexbox
          flexDirection="row"
          justifyContent="flex-end"
          margin="1%"
          padding="3%"
        >
          <Button className="advert-button" variant="info">
            Answer this advert
          </Button>
          <Button className="advert-button" variant="secondary">
            Take me back
          </Button>
        </Flexbox>
      </Container>
    );
  }
}
