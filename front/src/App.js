import React, { Component } from "react";
import Header from "./header/Header";
import HeaderSearch from "./header/HeaderSearch";
import News from "./mainContent/News";
import Footer from "./header/Footer";
import LoggedSidebar from "./sideBar/loggedInSideBar/LoggedSidebar";
import { Col, Row } from "react-bootstrap";
import AdvertPage from "./sideBar/loggedInSideBar/adverts/AdvertPage";
import LoggedOutSidebar from "./sideBar/loggedOutSideBar/LoggedOutSidebar";
import EmailVerification from "./sideBar/loggedOutSideBar/EmailVerification";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddMusicianAdvert from "./sideBar/loggedInSideBar/adverts/AddMusicianAdvert";
import UserProfile from "./sideBar/loggedInSideBar/userProfile/UserProfile";

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
