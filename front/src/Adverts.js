import React, { Component } from "react";
import { Container } from "react-bootstrap";
import userphoto from "./userphoto.png";

export default class Adverts extends Component {
  render() {
    const { advertData } = this.props;
    return (
      <Container>
        <AdvBody advertData={advertData} />
      </Container>
    );
  }
}

const AdvBody = props => {
  const rows = props.advertData.map((row, index) => {
    return (
      <div class="boxes" key={index}>
        <div class="grid-container">
          <div class="item1">{row.fields.title}</div>
          <div class="item2">
            <img src={userphoto} alt="ph" width="180" height="180" />
          </div>
          <div class="item3">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum
          </div>
          <div class="item4">{row.fields.city}</div>
          <div class="item5">{row.fields.genre}</div>
          <div class="item6">{row.fields.posted_on.substring(0, 10)}</div>
        </div>
      </div>
    );
  });

  return <tbody>{rows}</tbody>;
};
