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

// Adding capitalize function for utility
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const createTags = arr => {
  let tags = arr.map((v, i) => {
    return (
      <Tag key={i} color="cyan">
        {v}
      </Tag>
    );
  });
  return <TagGroup>{tags}</TagGroup>;
};

const noneditableFields = ["username", "email"];

class EditableSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props,
      edit: false,
      updating: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  showLoader() {
    if (this.state.updating) {
      return (
        <Loader backdrop center size="md" content="Sending data..." vertical />
      );
    }
  }

  componentDidUpdate(prevProps) {
    let diff = false;
    for (let k in prevProps) {
      if (this.props[k] !== prevProps[k]) {
        diff = true;
        break;
      }
    }
    if (diff) {
      this.setState({ userData: this.props });
    }
  }

  updateUserProfile(data) {
    this.setState({ edit: false, updating: true });
    const token = localStorage.getItem("muzi_muzi_token");
    const user_id = localStorage.getItem("muzi_muzi_user_id");
    fetch(`http://127.0.0.1:8000/users/${user_id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      },
      body: JSON.stringify(data)
    }).then(res => {
      this.setState({ updating: false });
      let title, desc;
      if (res.ok) {
        title = "success";
        desc = "Profile updated!";
      } else {
        title = "error";
        desc = "Something went wrong...";
      }
      Notification[title]({
        title: title.capitalize(),
        description: <p>{desc}</p>,
        style: { width: 1000 }
      });
    });
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
    let value = this.state.userData[fieldName];
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
    let isDisabled = noneditableFields.includes(fieldName);
    let labelSpan = (
      <ControlLabel className="field-label">{label + ": "}</ControlLabel>
    );
    let value = this.state.userData[fieldName];
    field = (
      <Input
        disabled={isDisabled}
        onChange={value =>
          this.setState({
            userData: { ...this.state.userData, [fieldName]: value }
          })
        }
        className="field-value"
        defaultValue={value}
      />
    );
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
            first_name={this.state.person_first_name.value}
            last_name={this.state.person_last_name.value}
            photo_url={this.state.person_photo.value}
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
  constructor(props) {
    super(props);
    console.log(this);
  }

  displayFields() {
    if (this.state.edit) {
      return (
        <Form fluid>
          {this.formatFieldEdit("first_name", "First name")}
          {this.formatFieldEdit("last_name", "Last name")}
          {this.formatFieldEdit("username", "Username")}
          <Button
            onClick={this.updateUserProfile.bind(this, this.state.userData)}
            appearance="primary"
          >
            Update
          </Button>
        </Form>
      );
    } else {
      return (
        <div>
          {this.formatFieldDisplay("first_name", "First name")}
          {this.formatFieldDisplay("last_name", "Last name")}
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
            src={this.state.userData.photoUrl}
            roundedCircle
          />
        </div>
        {this.displayFields()}
        {this.showLoader()}
      </div>
    );
  }
}

class DetailSection extends EditableSection {
  constructor(props) {
    super(props);
    this.state = {
      userData: props,
      allProfessions: [],
      allGenres: []
    };
    this.handlePickerUpdate = this.handlePickerUpdate.bind(this);
  }
  componentDidMount() {
    this.handlePickerUpdate("professions", "allProfessions");
    this.handlePickerUpdate("genres", "allGenres");
  }

  handlePickerUpdate(resource, stateData) {
    if (this.state[stateData].length === 0) {
      this.setState({ [stateData]: [] });
      fetch(`http://127.0.0.1:8000/${resource}/all`)
        .then(res => res.json())
        .then(json =>
          this.setState({
            [stateData]: json
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
              defaultValue={this.state.userData.genres}
              labelKey="name"
              valueKey="name"
              onChange={value => {
                console.log(value);
                this.setState({
                  userData: { ...this.state.userData, genres: value }
                });
              }}
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
              onChange={value =>
                this.setState({
                  userData: { ...this.state.userData, professions: value }
                })
              }
              data={this.state.allProfessions}
              style={{ justifyContent: "initial" }}
              className="field-value"
              defaultValue={this.state.userData.professions}
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
          <Button
            onClick={this.updateUserProfile.bind(this, this.state.userData)}
            appearance="primary"
          >
            Update
          </Button>
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
        {this.showLoader()}
      </div>
    );
  }
}

class DescSection extends EditableSection {
  displayFields() {
    if (this.state.edit) {
      return (
        <Form fluid>
          <ControlLabel className="field-label">Description</ControlLabel>
          <FormGroup>
            <FormControl
              onChange={value =>
                this.setState({
                  userData: { ...this.state.userData, description: value }
                })
              }
              componentClass="textarea"
            >
              {this.state.userData.description}
            </FormControl>
            <Button
              onClick={this.updateUserProfile.bind(this, this.state.userData)}
              appearance="primary"
            >
              Update
            </Button>
          </FormGroup>
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
        {this.showLoader()}
      </div>
    );
  }
}
