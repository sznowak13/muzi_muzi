import React, { Component } from "react";
import Header from "./header/Header";
import HeaderSearch from "./header/HeaderSearch";
import News from "./mainContent/News";
import Footer from "./header/Footer";
import LoggedSidebar from "./sideBar/LoggedSidebar";
import { Col, Row } from "react-bootstrap";
import AdvertPage from "./sideBar/AdvertPage";
import LoggedOutSidebar from "./sideBar/LoggedOutSidebar";
import EmailVerification from "./sideBar/EmailVerification";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddMusicianAdvert from "./mainContent/AddMusicianAdvert";
import UserProfile from "./sideBar/UserProfile";

class App extends Component {
  checkAuthorizedRouting() {
    if (localStorage.getItem("muzi_muzi_token")) {
      return <Route path="/my-profile" component={UserProfile} />;
    }
  }

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
                {localStorage.getItem("muzi_muzi_token") !== null ? (
                  <Route
                    path="/new-advert-musician"
                    component={AddMusicianAdvert}
                  />
                ) : (
                  true
                )}

                <Route exact path="/" component={News} />
                <Route path="/advert/:id/" component={AdvertPage} />
                <Route
                  path="/email-verification"
                  component={EmailVerification}
                />
                {this.checkAuthorizedRouting()}
              </Col>
            </Row>
          </div>
        </div>
        <Footer />
      </Router>
    );
  }
}

export default App;
