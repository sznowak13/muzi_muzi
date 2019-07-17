import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { AdvBody } from "../../sideBar/loggedInSideBar/adverts/AdvertBody";

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
