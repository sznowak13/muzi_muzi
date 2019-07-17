import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  SelectPicker,
  Icon,
  HelpBlock,
  Button,
  Schema,
  Loader
} from "rsuite";

export default class AddMusicianAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professions: [],
      genres: [],
      professionsUrl: "http://localhost:8000/professions/",
      genresUrl: "http://localhost:8000/genres/",
      formData: {
        title: "",
        description: "",
        city: "",
        profession: "",
        genre: ""
      },
      sendDataResult: {
        result: "failed",
        errors: {},
        data: {}
      },
      loading: false
    };
    this.handleProfessionsUpdate = this.handleProfessionsUpdate.bind(this);
    this.handleGenresUpdate = this.handleGenresUpdate.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.setState({ loading: true });
    this.sendMusicianAdvertData(fetch, this.state.formData).then(result => {
      this.setState({
        loading: false,
        sendDataResult: result,
        formData: {
          title: "",
          description: "",
          city: "",
          profession: "",
          genre: ""
        }
      });
    });
  }

  showLoader() {
    if (this.state.loading) {
      return (
        <Loader backdrop center size="md" content="Sending data..." vertical />
      );
    }
  }

  sendMusicianAdvertData = async (fetch, formData) => {
    let result = {
      success: true,
      errors: {},
      data: {
        title: formData.title,
        description: formData.description,
        city: formData.city,
        genre: formData.genre,
        profession: formData.profession
      }
    };
    let token = localStorage.getItem("muzi_muzi_token");
    let response = await fetch("http://127.0.0.1:8000/adverts/", {
      method: "POST",
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        city: formData.city,
        profession: formData.profession,
        genre: formData.genre
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token " + token
      }
    });
    let json;
    if (response.status === 500) {
      result.success = false;
      result.errors = { serverError: "Failed to fetch resources" };
    } else if (response.status === 400) {
      result.success = false;
      json = await response.json();
      result.errors = json;
    }
    console.log(result);
    return result;
  };

  formatData(data) {
    for (let item of data) {
      item.label = item.name;
      item.value = item.name;
    }
    return data;
  }

  handleProfessionsUpdate() {
    if (this.state.professions.length === 0) {
      this.setState({ professions: [] });
      fetch(this.state.professionsUrl)
        .then(res => res.json())
        .then(json =>
          this.setState({
            professions: this.formatData(json.results)
          })
        );
    }
  }

  handleGenresUpdate() {
    if (this.state.genres.length === 0) {
      this.setState({ genres: [] });
      fetch(this.state.genresUrl)
        .then(res => res.json())
        .then(json =>
          this.setState({
            genres: this.formatData(json.results)
          })
        );
    }
  }

  render() {
    const { professions } = this.state;
    const { genres } = this.state;
    const { formData } = this.state;
    return (
      <div>
        <h1 style={{ color: "#f6c90e" }}>Add Musician Advert</h1>
        <Form
          layout="inline"
          className="add-advert-container"
          model={musicianAdvertModel}
          formValue={formData}
          onChange={formValue => {
            this.setState({ formData: formValue });
          }}
        >
          <div className="flex-space">
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl name="title" />
            </FormGroup>
            <FormGroup>
              <ControlLabel>City</ControlLabel>
              <FormControl name="city" />
            </FormGroup>
          </div>
          <div className="flex-space">
            <FormGroup>
              <ControlLabel style={{ marginRight: 15 }}>
                Profession
              </ControlLabel>
              <SelectPicker
                data={professions}
                placeholder="Select Profession"
                style={{ width: 224 }}
                onOpen={this.handleProfessionsUpdate}
                onSearch={this.handleProfessionsUpdate}
                onChange={value =>
                  this.setState({
                    formData: { ...this.state.formData, profession: value }
                  })
                }
                renderMenu={menu => {
                  if (professions.length === 0) {
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
            </FormGroup>
            <FormGroup>
              <ControlLabel style={{ marginRight: 15 }}>Genre</ControlLabel>
              <SelectPicker
                data={genres}
                placeholder="Select Genre"
                style={{ width: 224 }}
                onOpen={this.handleGenresUpdate}
                onSearch={this.handleGenresUpdate}
                onChange={value =>
                  this.setState({
                    formData: { ...this.state.formData, genre: value }
                  })
                }
                renderMenu={menu => {
                  if (genres.length === 0) {
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
            </FormGroup>
          </div>
          <div className="flex-space">
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                style={{ width: 600 }}
                rows={4}
                name="description"
                componentClass="textarea"
              />
              <HelpBlock tooltip>Write few sentences about you</HelpBlock>
            </FormGroup>
          </div>
          <Button color="green" onClick={this.submit}>
            Submit
          </Button>
          {this.showLoader()}
        </Form>
      </div>
    );
  }
}

const { StringType } = Schema.Types;
const musicianAdvertModel = Schema.Model({
  title: StringType()
    .minLength(10, "The field cannot be less than 10 characters")
    .maxLength(100, "The field cannot be greater than 100 characters")
    .isRequired("Title is required"),
  description: StringType()
    .minLength(10, "The field cannot be less than 10 characters")
    .maxLength(1000, "The field cannot be greater than 1000 characters")
    .isRequired("Description is required"),
  city: StringType()
    .minLength(1, "The field cannot be less than 1 characters")
    .maxLength(100, "The field cannot be greater than 100 characters")
    .isRequired("City is required"),
  genre: StringType().isRequired("Genre is required"),
  profession: StringType().isRequired("Profession is required")
});
