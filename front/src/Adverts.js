import React, { Component } from "react";
import { Container, Button } from "react-bootstrap";
import userphoto from "./userphoto.png";

export default class Adverts extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      next: "http://127.0.0.1:8000/adverts/",
      previous: null,
      adverts: []
    };
  }

  componentDidMount() {
    const url = this.state.next;
    this.handleUrl(url);
  }

  handleUrl(url) {
    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          next: result.next,
          adverts: result.results,
          previous: result.previous
        });
        console.log(result);
      });
  }

  handlePage(nextOrPreviousPage) {
    this.setState({ adverts: [] });
    const url = nextOrPreviousPage;
    if (url !== null) {
      this.handleUrl(url);
    }
  }

  render() {
    const { adverts, next, previous } = this.state;
    return (
      <Container className="adverts-container">
        <h2 className="section-title">New adverts</h2>
        <PaginationPage
          next={next}
          previous={previous}
          handlePage={this.handlePage}
        />
        <AdvBody advertData={adverts} />
      </Container>
    );
  }
}

const PaginationPage = props => {
  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Button
            className="page-link"
            disabled={props.previous === null}
            onClick={() => props.handlePage(props.previous)}
          >
            Previous
          </Button>
        </li>
        <li className="page-item">
          <Button
            className="page-link"
            disabled={props.next === null}
            onClick={() => props.handlePage(props.next)}
          >
            Next
          </Button>
        </li>
      </ul>
    </nav>
  );
};

const AdvBody = props => {
  const rows = props.advertData.map((row, index) => {
    return (
      <div className="boxes" key={index}>
        <div className="grid-container">
          <div className="item1">{row.title}</div>
          <div className="item2">
            {row.photo_url = = null ? (
              <img src={userphoto} alt="ph" width="180" height="180" />
            ) : (
              <img src={row.photo_url} alt="ph" width="180" height="180" />
            )}
          </div>
          <div className="item3">
            Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem
            Ipsum Lorem Ipsum
          </div>
          <div className="item4">{row.city}</div>
          <div className="item5">{row.genre}</div>
          <div className="item6">{row.posted_on.substring(0, 10)}</div>
        </div>
      </div>
    );
  });

  return <div>{rows}</div>;
};
