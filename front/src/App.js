import React, { Component } from "react";
import Table from "./Table";
import Header from "./Header";

class App extends Component {
  state = {
    advert: [],
    adress: "http://127.0.0.1:8000/adverts/"
  };

  componentDidMount() {
    const url = this.state.adress;
    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          advert: result
        });
        console.log(this.state);
      });
  }

  render() {
    const { advert } = this.state;
    return (
      <div>
        <Header />
        <Table advertData={advert} />
      </div>
    );
  }
}

export default App;
