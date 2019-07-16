import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  SelectPicker,
  Icon,
  HelpBlock,
  Button
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
      }
    };
    this.handleProfessionsUpdate = this.handleProfessionsUpdate.bind(this);
    this.handleGenresUpdate = this.handleGenresUpdate.bind(this);
  }

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
        </Form>
      </div>
    );
  }
}
