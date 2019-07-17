import React, { Component } from "react";
import { Image } from "react-bootstrap";
import {
  Input,
  Icon,
  IconButton,
  Button,
  Loader,
  Tooltip,
  Whisper,
  Tag,
  TagGroup,
  FormControl,
  Form,
  FormGroup,
  ControlLabel,
  TagPicker,
  Notification
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
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  displayIcon() {
    return this.state.edit ? (
      <CancelButton onClick={this.toggleEdit} />
    ) : (
      <EditButton onClick={this.toggleEdit} />
    );
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

  formatFieldEdit(fieldName, label) {
    let field;
    let labelSpan = (
      <ControlLabel className="field-label">{label + ": "}</ControlLabel>
    );
    let value = this.state[fieldName];
    if (Array.isArray(value)) {
      field = (
        <TagPicker
          data={this.state.pickerItems[fieldName]}
          cacheData={this.state.cacheData}
          value={this.state[fieldName]}
          style={{ width: 300 }}
          labelKey={this.state.labelKey}
          valueKey={this.state.valueKey}
          onChange={this.handleChange}
          onSearch={this.handleSearch}
          onSelect={this.handleSelect}
          renderMenu={menu => {
            if (this.state.loading) {
              return (
                <p style={{ padding: 4, color: "#999", textAlign: "center" }}>
                  <Icon icon="spinner" spin /> Loading...
                </p>
              );
            }
            return menu;
          }}
        />
      );
    } else {
      field = <FormControl className="field-value" placeholder={value} />;
    }
    return (
      <FormGroup>
        {labelSpan}
        {field}
      </FormGroup>
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
      icon={
        <Icon
          icon="edit2"
          className="icon-button edit-button"
          size="lg"
          onClick={props.onClick}
        />
      }
    />
  </Whisper>
);

const CancelButton = props => (
  <Whisper
    placement="left"
    trigger="hover"
    speaker={<Tooltip>Cancel editing</Tooltip>}
  >
    <IconButton
      appearance="subtle"
      icon={
        <Icon
          icon="close"
          className="icon-button cancel-button"
          size="lg"
          onClick={props.onClick}
        />
      }
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

  displayFields() {
    if (this.state.edit) {
      return (
        <Form fluid>
          {this.formatFieldEdit("firstName", "First name")}
          {this.formatFieldEdit("lastName", "Last name")}
          {this.formatFieldEdit("username", "Username")}
        </Form>
      );
    } else {
      return (
        <div>
          {this.formatFieldDisplay("firstName", "First name")}
          {this.formatFieldDisplay("lastName", "Last name")}
          {this.formatFieldDisplay("username", "Username")}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="main-profile-section section">
        <div className="edit-section">{this.displayIcon()}</div>
        <div className="flex-center">
          <Image
            width="200"
            height="200"
            className="person-photo"
            src={this.state.photoUrl}
            roundedCircle
          />
        </div>
        {this.displayFields()}
      </div>
    );
  }
}

class DetailSection extends EditableSection {
  constructor(props) {
    super(props);
    this.state = {
      allProfessions: [],
      allGenres: []
    };
    this.handlePickerUpdate = this.handlePickerUpdate.bind(this);
    this.handlePickerUpdate("professions", "allProfessions");
    this.handlePickerUpdate("genres", "allGenres");
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.email !== prevProps.email ||
      this.props.city !== prevProps.city ||
      this.props.genres !== prevProps.genres ||
      this.props.professions !== prevProps.professions
    ) {
      this.setState({ ...this.state, ...this.props });
    }
  }

  handlePickerUpdate(resource, stateData) {
    if (this.state[stateData].length === 0) {
      this.setState({ [stateData]: [] });
      fetch(`http://127.0.0.1:8000/${resource}/`)
        .then(res => res.json())
        .then(json =>
          this.setState({
            [stateData]: json.results
          })
        );
    }
  }

  displayFields() {
    if (this.state.edit) {
      return (
        <Form fluid>
          {this.formatFieldEdit("email", "Email")}
          {this.formatFieldEdit("city", "Location")}
          <div className="field-group">
            <ControlLabel className="field-label">Genres:</ControlLabel>
            <TagPicker
              data={this.state.allGenres}
              style={{ justifyContent: "initial" }}
              className="field-value"
              defaultValue={this.state.genres}
              labelKey="name"
              valueKey="name"
              renderMenu={menu => {
                if (this.state.allGenres.length === 0) {
                  return (
                    <p
                      style={{
                        padding: 4,
                        color: "#999",
                        textAlign: "center"
                      }}
                    >
                      <Icon icon="spinner" spin /> Please Wait...
                    </p>
                  );
                }
                return menu;
              }}
            />
          </div>
          <div className="field-group">
            <ControlLabel className="field-label">Professions:</ControlLabel>
            <TagPicker
              data={this.state.allProfessions}
              style={{ justifyContent: "initial" }}
              className="field-value"
              defaultValue={this.state.professions}
              labelKey="name"
              valueKey="name"
              renderMenu={menu => {
                if (this.state.allProfessions.length === 0) {
                  return (
                    <p
                      style={{
                        padding: 4,
                        color: "#999",
                        textAlign: "center"
                      }}
                    >
                      <Icon icon="spinner" spin /> Please Wait...
                    </p>
                  );
                }
                return menu;
              }}
            />
          </div>
        </Form>
      );
    } else {
      return (
        <div>
          {this.formatFieldDisplay("email", "Email")}
          {this.formatFieldDisplay("city", "Location")}
          {this.formatFieldDisplay("genres", "Genres")}
          {this.formatFieldDisplay("professions", "Professions")}
        </div>
      );
    }
  }

  render() {
    return (
      <div className="additional-profile-section section">
        <div className="edit-section">{this.displayIcon()}</div>
        {this.displayFields()}
      </div>
    );
  }
}

class DescSection extends EditableSection {
  componentDidUpdate(prevProps) {
    if (this.props.description !== prevProps.description) {
      this.setState({ ...this.state, ...this.props });
    }
  }

  displayFields() {
    if (this.state.edit) {
      return (
        <Form fluid>
          <ControlLabel className="field-label">Description</ControlLabel>
          <FormControl
            componentClass="textarea"
            defaultValue={this.state.description}
          />
        </Form>
      );
    } else {
      return <div>{this.formatFieldDisplay("description", "Description")}</div>;
    }
  }

  render() {
    return (
      <div className="desc-profile-section section">
        <div className="edit-section">{this.displayIcon()}</div>
        {this.displayFields()}
      </div>
    );
  }
}
