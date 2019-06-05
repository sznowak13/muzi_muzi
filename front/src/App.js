import React, { Component } from "react";
import Header from "./Header";
import Header2 from "./Header2";
import News from "./News";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className="App Site">
        <div className="Site-content">
          <div className="App-header">
            <Header />
            <Header2 />
          </div>
          <div className="main">
            <News />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
