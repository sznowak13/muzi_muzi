import React, { Component } from "react";
import { Image } from "react-bootstrap";
import { Input, InputGroup, Icon, Col, Row, Container } from "rsuite";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields_map: {
        person_id: "user_id",
        person_first_name: "first_name",
        person_last_name: "last_name",
        person_username: "username",
        person_city: "city",
        person_description: "description",
        person_photo: "photo_url",
        person_email: "email",
        person_genres: "genres",
        person_professions: "professions"
      },
      person_id: { edit: false, value: "" },
      person_first_name: { edit: false, value: "" },
      person_last_name: { edit: false, value: "" },
      person_username: { edit: false, value: "" },
      person_city: { edit: false, value: "" },
      person_description: { edit: false, value: "" },
      person_photo: { edit: false, value: "" },
      person_email: { edit: false, value: "" },
      person_genres: { edit: false, value: [] },
      person_professions: { edit: false, value: "" }
    };
  }

  async componentDidMount() {
    const url = `http://127.0.0.1:8000/users/${localStorage.getItem(
      "muzi_muzi_user_id"
    )}/`;
    const response = await fetch(url);
    let data = await response.json();
    data = this.formatFetchData(data);
    this.setState(data);
  }

  formatFetchData(data) {
    let formated = {};
    for (let entry of Object.entries(this.state.fields_map)) {
      formated[entry[0]] = { ...this.state[entry[0]], value: data[entry[1]] };
    }
    console.log(formated);
    return formated;
  }

  formatFieldDisplay(fieldName) {
    let value = this.state[fieldName].value;
    if (!value) {
      return "---";
    } else if (Array.isArray(value)) {
      return value.join(", ");
    } else {
      return value;
    }
  }

  toggleEdit(fieldName) {
    return () => {
      this.setState({
        [fieldName]: {
          ...this.state[fieldName],
          edit: !this.state[fieldName].edit
        }
      });
    };
  }

  checkIfEdit(fieldName, label) {
    let body;
    let labelElement = <Col className="person-info-title">{label}</Col>;
    if (this.state[fieldName].edit) {
      body = (
        <InputGroup style={{ width: 300 }} onBlur={this.toggleEdit(fieldName)}>
          <Input value={this.state[fieldName].value} />
          <InputGroup.Button>
            <Icon icon="check-square" />
          </InputGroup.Button>
        </InputGroup>
      );
    } else {
      body = (
        <Row>
          <Col>{this.formatFieldDisplay(fieldName)}</Col>
          <Col className="edit-button" onClick={this.toggleEdit(fieldName)}>
            Edit
          </Col>
        </Row>
      );
    }
    return [<Row>{labelElement}</Row>, body];
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
                src={this.state.person_photo.value}
                roundedCircle
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="news-title">
                {this.state.person_first_name.value}{" "}
                {this.state.person_last_name.value}
              </h2>
              <h2 className="news-title">
                {" "}
                "{this.state.person_username.value}"{" "}
              </h2>
            </Col>
          </Row>
        </Container>

        <Container className="person-info-container">
          <Row>
            <Col className="person-info-title">Email:</Col>
          </Row>
          <Row>
            <Col>{this.state.person_email.value}</Col>
          </Row>

          <Row>
            <Col className="person-info-title">City:</Col>
          </Row>
          <Row>
            <Col>{this.state.person_city.value}</Col>
          </Row>

          <Row>
            <Col className="person-info-title">Professions:</Col>
          </Row>
          <Row>
            <Col>
              {this.state.person_professions.value.length > 0 ? (
                this.state.person_professions.value.toString()
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
              {this.state.person_genres.value.length > 0 ? (
                this.state.person_genres.value.toString()
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
            <Col>{this.state.person_description.value}</Col>
          </Row>
        </Container>
      </Container>
    );
  }
}
