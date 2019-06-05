import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a href="http://localhost:3000/"> MuziMuzi</a> | Designed by Thristy
        Cows | All Rights Reserved
      </footer>
    );
  }
}
