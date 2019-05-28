import React, { Component } from "react";
import Adverts from "./Adverts";
import Header from "./Header";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Adverts />
      </div>
    );
  }
}

export default App;
