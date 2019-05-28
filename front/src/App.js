import React, { Component } from "react";
import Adverts from "./Adverts";
import Header from "./Header";

class App extends Component {
  state = {
    next: "http://127.0.0.1:8000/adverts/",
    previous: null,
    adverts: []
  };

  componentDidMount() {
    const url = this.state.next;
    this.handleUrl(url);
  }

  handleUrl(url) {
    fetch(url)
      .then(result => result.json())
      .then(result => {
        this.setState({
          next: result.next,
          adverts: result.results,
          previous: result.previous
        });
      });
  }

  handlePage(nextOrPreviousPage) {
    this.setState({ adverts: [] });
    const url = nextOrPreviousPage;
    if (url !== null) {
      this.handleUrl(url);
    }
  }

  render() {
    const { adverts } = this.state;
    return (
      <div>
        <Header />
        <Adverts
          advertData={adverts}
          handlePage={this.handlePage}
          next={this.next}
          previous={this.previous}
        />
      </div>
    );
  }
}

export default App;
