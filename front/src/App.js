import React, { Component } from "react";
import Header from "./Header";
import Header2 from "./Header2";
import News from "./News";

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <Header />
        <Header2 />
        <News />
      </div>
    );
  }
}

export default App;
