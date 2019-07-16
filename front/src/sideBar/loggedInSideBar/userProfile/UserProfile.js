import React, { Component } from "react";
import { Image } from "react-bootstrap";
import {
  Input,
  InputGroup,
  Icon,
  IconButton,
  Loader,
  Col,
  Row,
  Tooltip,
  Whisper,
  Tag,
  TagGroup
} from "rsuite";
import { userProfileFiledMapping as fieldMapping } from "./mappings";

const createTags = arr => {
  let tags = [];
  for (let v of arr) {
    tags.push(<Tag color="cyan">{v}</Tag>);
  }
  return <TagGroup>{tags}</TagGroup>;
};

class EditableSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      edit: false
    };
  }

  formatFieldDisplay(fieldName, label) {
    let field;
    let labelSpan = <span className="field-label">{label + ": "}</span>;
    let value = this.state[fieldName];
    if (!value) {
      value = "---";
    } else if (Array.isArray(value)) {
      value = createTags(value);
    }
    field = <div className="field-value">{value}</div>;
    return (
      <div className="field-group">
        {labelSpan}
        {field}
      </div>
    );
  }
}

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
    this.state.loading = true;
    const url = `http://127.0.0.1:8000/users/${localStorage.getItem(
      "muzi_muzi_user_id"
    )}/`;
    const response = await fetch(url);
    let data = await response.json();
    data = this.formatFetchData(data);
    this.setState({ ...data, loading: false });
  }

  formatFetchData(data) {
    let formated = {};
    for (let entry of Object.entries(fieldMapping)) {
      formated[entry[0]] = { ...this.state[entry[0]], value: data[entry[1]] };
    }
    return formated;
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

  showLoader() {
    if (this.state.loading) {
      return (
        <Loader backdrop center size="md" content="Sending data..." vertical />
      );
    }
  }

  render() {
    return (
      <div className="profile-container">
        <div className="top-section">
          <GeneralSection
            firstName={this.state.person_first_name.value}
            lastName={this.state.person_last_name.value}
            photoUrl={this.state.person_photo.value}
            username={this.state.person_username.value}
          />
          <DetailSection
            email={this.state.person_email.value}
            city={this.state.person_city.value}
            professions={this.state.person_professions.value}
            genres={this.state.person_genres.value}
          />
        </div>
        <DescSection description={this.state.person_description.value} />
        {this.showLoader()}
      </div>
    );
  }
}

const EditButton = props => (
  <Whisper
    placement="left"
    trigger="hover"
    speaker={<Tooltip>Edit this section</Tooltip>}
  >
    <IconButton
      appearance="subtle"
      icon={<Icon icon="edit2" className="edit-button" size="lg" />}
    />
  </Whisper>
);

class GeneralSection extends EditableSection {
  componentDidUpdate(prevProps) {
    if (
      this.props.firstName !== prevProps.firstName ||
      this.props.lastName !== prevProps.lastName ||
      this.props.username !== prevProps.username ||
      this.props.photoUrl !== prevProps.photoUrl
    ) {
      this.setState({ ...this.props, edit: this.state.edit });
    }
  }

  render() {
    return (
      <div className="main-profile-section section">
        <div className="edit-section">
          <EditButton />
        </div>
        <div className="flex-center">
          <Image
            width="200"
            height="200"
            className="person-photo"
            src={this.state.photoUrl}
            roundedCircle
          />
        </div>
        {this.formatFieldDisplay("firstName", "First name")}
        {this.formatFieldDisplay("lastName", "Last name")}
        {this.formatFieldDisplay("username", "Username")}
      </div>
    );
  }
}

class DetailSection extends EditableSection {
  componentDidUpdate(prevProps) {
    if (
      this.props.email !== prevProps.email ||
      this.props.city !== prevProps.city ||
      this.props.genres !== prevProps.genres ||
      this.props.professions !== prevProps.professions
    ) {
      this.setState({ ...this.props, edit: this.state.edit });
    }
  }

  render() {
    return (
      <div className="additional-profile-section section">
        <div className="edit-section">
          <EditButton />
        </div>
        {this.formatFieldDisplay("email", "Email")}
        {this.formatFieldDisplay("city", "City")}
        {this.formatFieldDisplay("genres", "Genres")}
        {this.formatFieldDisplay("professions", "Professions")}
      </div>
    );
  }
}

class DescSection extends EditableSection {
  componentDidUpdate(prevProps) {
    if (this.props.description !== prevProps.description) {
      this.setState({ ...this.props, edit: this.state.edit });
    }
  }
  render() {
    return (
      <div className="desc-profile-section section">
        <div className="edit-section">
          <EditButton />
        </div>
        {this.formatFieldDisplay("description", "Description")}
      </div>
    );
  }
}
