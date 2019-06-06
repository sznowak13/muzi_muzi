import React, { Component } from "react";
import Header from "./Header";
import HeaderSearch from "./HeaderSearch";
import News from "./News";
import Footer from "./Footer";
// import LoggedSidebar from "./LoggedSidebar";
import { Col, Row } from "react-bootstrap";
import LoggedOutSidebar from "./LoggedOutSidebar";

class App extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <div>
          <div>
            <Header />
            <HeaderSearch />
          </div>
          <Row>
            <Col md="auto">
              {" "}
              {/* <LoggedSidebar /> */}
              <LoggedOutSidebar />
            </Col>
            <Col>
              <News />
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
