import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "../node_modules/rsuite/dist/styles/rsuite.min.css";
import "./style/index.css";
import UserProfile from "./sideBard/UserProfile";
import Notfound from "./notFound";

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="profile" component={UserProfile} />
      <Route component={Notfound} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// ReactDOM.render(<App />, document.getElementById("root"));
