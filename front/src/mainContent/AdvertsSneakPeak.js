import React, { Component } from "react";
import { Container } from "react-bootstrap";
import userphoto from "../resources/userphoto.png";
import moment from "moment";

export default class AdvertsSneakPeak extends Component {
  constructor(props) {
    super(props);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      next: "http://127.0.0.1:8000/adverts/latest/",
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
          adverts: result
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
    const { adverts } = this.state;
    return (
      <Container className="news-container">
        <h3 className="news-title">New adverts</h3>
        {/* <PaginationPage
          next={next}
          previous={previous}
          handlePage={this.handlePage}
        /> */}
        <AdvBody advertData={adverts} />
      </Container>
    );
  }
}

// const PaginationPage = props => {
//   return (
//     <nav aria-label="Page navigation">
//       <ul className="pagination justify-content-center">
//         <li className="page-item">
//           <Button
//             className="page-link"
//             disabled={props.previous === null}
//             onClick={() => props.handlePage(props.previous)}
//           >
//             Previous
//           </Button>
//         </li>
//         <li className="page-item">
//           <Button
//             className="page-link"
//             disabled={props.next === null}
//             onClick={() => props.handlePage(props.next)}
//           >
//             Next
//           </Button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

const AdvBody = props => {
  const rows = props.advertData.map((row, index) => {
    return (
      <div className="grid-container" key={index}>
        <div className="item1">
          <p className="advert-title">{row.title}</p>
        </div>
        <div className="item2">
          {row.photo_url == null ? (
            <img src={userphoto} alt="ph" width="180" height="180" />
          ) : (
            <img src={row.photo_url} alt="ph" width="180" height="180" />
          )}
        </div>
        <div className="item3">{row.description}</div>
        <div className="item4">
          <i className="fas fa-map-marker-alt" />
          <span className="advert-label">City:</span>
          <p className="advert-data">{row.city}</p>
        </div>
        <div className="item5">
          <i className="fas fa-music" />
          <span className="advert-label">Genres:</span>
          <p className="advert-data">{row.genre}</p>
        </div>
        <div className="item6">
          <i className="far fa-clock" />
          <span className="advert-label">Posted:</span>
          <p className="advert-data">
            {moment(row.posted_on)
              .startOf("minute")
              .fromNow()}
          </p>
        </div>
      </div>
    );
  });

  return <div>{rows}</div>;
};
