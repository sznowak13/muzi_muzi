import React, { Component } from "react";
import Header from "./Header";
import Header2 from "./Header2";
import News from "./News";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import { Col, Row } from "react-bootstrap";

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
              <Sidebar />
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
