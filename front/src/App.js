import React, { Component } from "react";
import Header from "./Header";
import News from "./News";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <News />
      </div>
    );
  }
}

export default App;
