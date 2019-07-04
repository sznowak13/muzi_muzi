import React, { Component } from "react";
import { Button, Modal } from "rsuite";
import { Link } from "react-router-dom";

export default class AdvertChoiceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }
  render() {
    return (
      <div className="modal-container">
        <Modal show={this.state.show} onHide={this.close}>
          <Modal.Header>
            <Modal.Title>What advert do you want create?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Link to="new-advert-musician">
              <Button color="orange" onClick={this.close}>
                Musician Advert
              </Button>
            </Link>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close} appearance="subtle">
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        <p onClick={this.open}>Add new advert</p>
      </div>
    );
  }
}
