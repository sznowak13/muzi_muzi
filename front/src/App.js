import React, { Component } from "react";
import Header from "./header/Header";
import HeaderSearch from "./header/HeaderSearch";
import News from "./mainContent/News";
import Footer from "./header/Footer";
import LoggedSidebar from "./sideBard/LoggedSidebar";
import { Col, Row } from "react-bootstrap";
import LoggedOutSidebar from "./sideBard/LoggedOutSidebar";

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
              {localStorage.getItem("muzi_muzi_token") !== null ? (
                <LoggedSidebar />
              ) : (
                <LoggedOutSidebar />
              )}
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
