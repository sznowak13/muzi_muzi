import React, { Component } from "react";
import { Image } from "react-bootstrap";
import {
  Input,
  InputGroup,
  Icon,
  IconButton,
  Col,
  Row,
  Tooltip,
  Whisper,
  Tag,
  TagGroup
} from "rsuite";
import { userProfileFiledMapping as fieldMapping } from "../sideBar/mappings";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person_id: { edit: false, value: "" },
      person_first_name: { edit: false, value: "" },
      person_last_name: { edit: false, value: "" },
      person_username: { edit: false, value: "" },
      person_city: { edit: false, value: "" },
      person_description: { edit: false, value: "" },
      person_photo: { edit: false, value: "" },
      person_email: { edit: false, value: "" },
      person_genres: { edit: false, value: [] },
      person_professions: { edit: false, value: [] }
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
    for (let entry of Object.entries(fieldMapping)) {
      formated[entry[0]] = { ...this.state[entry[0]], value: data[entry[1]] };
    }
    return formated;
  }

  createTags(arr) {
    let tags = [];
    for (let v of arr) {
      tags.push(<Tag color="cyan">{v}</Tag>);
    }
    return <TagGroup>{tags}</TagGroup>;
  }

  formatFieldDisplay(fieldName, label) {
    let field;
    let labelSpan = <span className="field-label">{label + ": "}</span>;
    let value = this.state[fieldName].value;
    if (!value) {
      value = "---";
    } else if (Array.isArray(value)) {
      value = this.createTags(value);
    }
    field = <div className="field-value">{value}</div>;
    return (
      <div className="field-group">
        {labelSpan}
        {field}
      </div>
    );
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
    const tooltip = <Tooltip>Edit this section</Tooltip>;
    return (
      <div className="profile-container">
        <div className="top-section">
          <div className="main-profile-section section">
            <div className="edit-section">
              <Whisper placement="left" trigger="hover" speaker={tooltip}>
                <IconButton
                  appearance="subtle"
                  icon={<Icon icon="edit2" className="edit-button" size="lg" />}
                  onClick={() => console.log("hej")}
                />
              </Whisper>
            </div>
            <div className="flex-center">
              <Image
                width="200"
                height="200"
                className="person-photo"
                src={this.state.person_photo.value}
                roundedCircle
              />
            </div>
            {this.formatFieldDisplay("person_first_name", "First name")}
            {this.formatFieldDisplay("person_last_name", "Last name")}
            {this.formatFieldDisplay("person_username", "Username")}
          </div>
          <div className="additional-profile-section section">
            <div className="edit-section">
              <Whisper placement="left" trigger="hover" speaker={tooltip}>
                <IconButton
                  appearance="subtle"
                  icon={<Icon icon="edit2" className="edit-button" size="lg" />}
                />
              </Whisper>
            </div>
            {this.formatFieldDisplay("person_email", "Email")}
            {this.formatFieldDisplay("person_city", "City")}
            {this.formatFieldDisplay("person_genres", "Genres")}
            {this.formatFieldDisplay("person_professions", "Professions")}
          </div>
        </div>
        <div className="desc-profile-section section">
          <div className="edit-section">
            <Whisper placement="left" trigger="hover" speaker={tooltip}>
              <IconButton
                appearance="subtle"
                icon={<Icon icon="edit2" className="edit-button" size="lg" />}
              />
            </Whisper>
          </div>
          {this.formatFieldDisplay("person_description", "Description")}
        </div>
      </div>
    );
  }
}
