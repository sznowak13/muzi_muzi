import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  SelectPicker,
  Icon
} from "rsuite";
import { Button } from "react-bootstrap";

export default class AddMusicianAdvert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professions: [],
      apiUrl: "http://localhost:8000/professions/",
      formData: {
        title: "",
        description: "",
        city: "",
        profession: "",
        genre: ""
      }
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  formatData(professions) {
    for (let prof of professions) {
      prof.label = prof.name;
      prof.value = prof.name;
    }
    return professions;
  }

  handleUpdate() {
    if (this.state.professions.length === 0) {
      this.setState({ professions: [] });
      fetch(this.state.apiUrl)
        .then(res => res.json())
        .then(json =>
          this.setState({
            professions: this.formatData(json.results)
          })
        );
    }
  }

  render() {
    const { professions } = this.state;
    const { formData } = this.state;
    return (
      <div className="add-advert-container">
        <Form
          formValue={formData}
          onChange={formValue => {
            this.setState({ formData: formValue });
          }}
        >
          <FormGroup>
            <ControlLabel>Title</ControlLabel>
            <FormControl name="title" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl
              rows={5}
              name="description"
              componentClass="textarea"
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>City</ControlLabel>
            <FormControl name="city" />
          </FormGroup>
          <FormGroup>
            <SelectPicker
              data={professions}
              placeholder="Select Profession"
              style={{ width: 224 }}
              onOpen={this.handleUpdate}
              onSearch={this.handleUpdate}
              renderMenu={menu => {
                if (professions.length === 0) {
                  return (
                    <p
                      style={{ padding: 4, color: "#999", textAlign: "center" }}
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
            <ControlLabel>Genre</ControlLabel>
            <FormControl name="genre" />
          </FormGroup>
          <Button onClick={this.submit} color="green">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
