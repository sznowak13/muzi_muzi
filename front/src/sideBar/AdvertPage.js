import React, { Component } from "react";
import { Container, Image } from "react-bootstrap";
import Flexbox from "flexbox-react";
import { Divider, Button } from "rsuite";
import userphoto from "../resources/userphoto.png";
import genericband from "../resources/generic-band.jpg";
import { Link } from "react-router-dom";
import { Tag, TagGroup } from "rsuite";
import moment from "moment";

export default class AdvertPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      advert_id: "",
      advert_username: "",
      advert_user_id: "",
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
    const url = `http://127.0.0.1:8000/adverts/${this.props.match.params.id}/`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      advert_id: data.advert_id,
      advert_username: data.username,
      advert_user_id: data.user_id,
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
        <Flexbox
          flexDirection="row"
          justifyContent="space-around"
          margin="1%"
          padding="3%"
        >
          <TagGroup className="tag-group-advert">
            <a className="advert-header" /> TYPE:
            <Tag color="cyan" className="advert-tag">
              {" "}
              {this.state.advert_band_name != null ? (
                <span> BAND </span>
              ) : (
                <span> USER </span>
              )}{" "}
            </Tag>
            <a className="advert-header" /> CITY:
            <Tag color="green" className="advert-tag">
              {this.state.advert_city}
            </Tag>
            <a className="advert-header" /> PROFESSION:
            <Tag color="yellow" className="advert-tag">
              {this.state.advert_profession}
            </Tag>
            <a className="advert-header" /> GENRE:
            <Tag color="orange" className="advert-tag">
              {this.state.advert_genre}
            </Tag>
          </TagGroup>
        </Flexbox>
        <Divider />
        <Flexbox
          flexDirection="row"
          justifyContent="space-around"
          margin="1%"
          padding="3%"
        >
          <div>
            {" "}
            {this.state.advert_band_name != null ? (
              <img className="advert-photo" src={genericband} alt="Logo" />
            ) : (
              <img className="advert-photo" src={userphoto} alt="Logo" />
            )}{" "}
          </div>
          <div className="advert-page-title"> {this.state.advert_title} </div>
        </Flexbox>
        <Divider />
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
        <Divider />
        <Flexbox
          flexDirection="row"
          justifyContent="flex-end"
          margin="1%"
          padding="3%"
        >
          <div className="advert-posted"> Posted by: </div>
          <div className="advert-posted">
            <Link
              className="links"
              to={`../profile/${this.state.advert_user_id}`}
            >
              {this.state.advert_username}
            </Link>
          </div>
          <div className="advert-posted"> Posted : </div>
          <div className="advert-posted">
            {" "}
            {moment(this.state.advert_posted_on).fromNow()}{" "}
          </div>
        </Flexbox>
        <Flexbox
          flexDirection="row"
          justifyContent="flex-end"
          margin="1%"
          padding="3%"
        >
          <Button className="advert-button" color="cyan">
            Answer this advert
          </Button>
          <Button className="advert-button" appearance="ghost">
            Take me back
          </Button>
        </Flexbox>
      </Container>
    );
  }
}
