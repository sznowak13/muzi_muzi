import React, { Component } from "react";
import Header from "./header/Header";
import HeaderSearch from "./header/HeaderSearch";
import News from "./mainContent/News";
import Footer from "./header/Footer";
import LoggedSidebar from "./sideBard/LoggedSidebar";
import { Col, Row } from "react-bootstrap";
import LoggedOutSidebar from "./sideBard/LoggedOutSidebar";
import EmailVerification from "./sideBard/EmailVerification";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
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
                <Route exact path="/" component={News} />
                <Route
                  path="/email-verification"
                  component={EmailVerification}
                />
              </Col>
            </Row>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
