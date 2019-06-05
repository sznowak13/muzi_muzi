import React, { Component } from "react";
import Header from "./Header";
import Header2 from "./Header2";
import News from "./News";
import Footer from "./Footer";
import LoggedSidebar from "./LoggedSidebar";
import { Col, Row } from "react-bootstrap";
import LoggedOutSidebar from "./LoggedOutSidebar";

class App extends Component {
  render() {
    return (
      <div className="app-site">
        <div className="site-content">
          <div className="app-header">
            <Header />
            <Header2 />
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
