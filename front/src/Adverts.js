import React, { Component } from "react";
import { Container } from "react-bootstrap";
import userphoto from "./userphoto.png";
import Pagination from "./Pagination.js";

export default class Adverts extends Component {
  render() {
    const { advertData, handlePage, next, previous } = this.props;
    return (
      <Container className="adverts-container">
        <h2 className="section-title">New adverts</h2>
        <Pagination handlePage={handlePage} next={next} previous={previous} />
        <AdvBody advertData={advertData} />
      </Container>
    );
  }
}

const AdvBody = props => {
  const rows = props.advertData.map((row, index) => {
    return (
      <div className="boxes" key={index}>
        <div className="grid-container">
          <div className="item1">{row.title}</div>
          <div className="item2">
            <img src={userphoto} alt="ph" width="180" height="180" />
          </div>
          <div className="item3">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum
          </div>
          <div className="item4">{row.username}</div>
          <div className="item5">{row.genre}</div>
          <div className="item6">{row.posted_on.substring(0, 10)}</div>
        </div>
      </div>
    );
  });

  return <div>{rows}</div>;
};
